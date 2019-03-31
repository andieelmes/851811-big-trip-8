import moment from 'moment';
import nanoid from 'nanoid';

import {
  TRIP_POINTS_SELECTOR,
  NEW_EVENT_BTN_SELECTOR,
  FAVOURITE_OFF,
  TRIP_POINTS_CONTAINER_SELECTOR,
} from '../constants';

import {
  capitalize,
} from '../utils';

import TripPoint from '../render/trip-point';
import EditTripPoint from '../render/edit-trip-point';
import renderTripInfo from '../render/trip-info';
import renderTripDayInfo from '../render/trip-day-info';

import ModelTripPoint from '../model/trip-point';

const makeTripPoints = (tripPointsDataModel, api) => {
  const {destinations, offers} = tripPointsDataModel;
  const createTripPointComponents = (tripPoints) => {
    // TODO чистим весь trip-points, количество точек может меняться
    document.querySelectorAll(`[data-day]`).forEach((element) => {
      const tripPointsElement = element.querySelector(TRIP_POINTS_SELECTOR);
      tripPointsElement.innerHTML = ``;
      element.classList.add(`visually-hidden`);
    });

    tripPoints.forEach((tripPointData) => {
      const startOfDayTimestamp = +moment(tripPointData.timeStart).startOf(`day`);
      const tripPointsDayElement = document.querySelector(`[data-day="${startOfDayTimestamp}"]`);
      const tripPointsElement = tripPointsDayElement.querySelector(TRIP_POINTS_SELECTOR);

      const tripPointComponent = new TripPoint(tripPointData);
      const editTripPointComponent = new EditTripPoint(tripPointData, destinations);

      tripPointComponent.onEdit = () => {
        editTripPointComponent.render();
        tripPointsElement.replaceChild(editTripPointComponent.element, tripPointComponent.element);
        tripPointComponent.unrender();
      };

      editTripPointComponent.onSubmit = (newObject) => {
        Object.assign(tripPointData, newObject);

        editTripPointComponent.blockSubmitting();

        api.updateTripPoint({id: tripPointData.id, data: tripPointData.toRAW()})
          .then((newTripPoint) => {
            editTripPointComponent.unBlock();
            tripPointComponent.update(newTripPoint);

            tripPointsDataModel.update(tripPointData);
            renderTripDayInfo(tripPointsDataModel);
            renderTripInfo(tripPointsDataModel);
            makeTripPoints(tripPointsDataModel, api);
          })
          .catch((err) => {
            // TODO вынести метод
            // eslint-disable-next-line no-console
            console.error(`submit error: ${err}`);
            editTripPointComponent.shake();
            editTripPointComponent.makeRedBorder();
            editTripPointComponent.unBlock();
            throw err;
          });
      };

      editTripPointComponent.onDelete = ({id}) => {
        editTripPointComponent.blockDeleting();

        api.deleteTripPoint({id})
          .then(() => {
            editTripPointComponent.unBlock();

            tripPointComponent.unrender();
            editTripPointComponent.unrender();
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(`delete error: ${err}`);
            editTripPointComponent.shake();
            editTripPointComponent.makeRedBorder();
            editTripPointComponent.unBlock();
            throw err;
          });

        renderTripInfo(tripPoints);
      };

      editTripPointComponent.onEsc = () => {
        // TODO вынести функцию
        tripPointComponent.render();
        tripPointsElement.replaceChild(tripPointComponent.element, editTripPointComponent.element);
        editTripPointComponent.unrender();
      };

      editTripPointComponent.onClickOutside = () => {
        tripPointComponent.render();
        tripPointsElement.replaceChild(tripPointComponent.element, editTripPointComponent.element);
        editTripPointComponent.unrender();
      };

      editTripPointComponent.onChangeType = (newObject) => {
        tripPointData.type = newObject.type;
        tripPointData.offers = offers.find((offer) => capitalize(offer.type) === newObject.type) || [];
        tripPointComponent.update(tripPointData);
        editTripPointComponent.update(tripPointData);
        tripPointsDataModel.update(tripPointData);
      };

      editTripPointComponent.onChangeDestination = ({destination}) => {
        const {description, pictures} = destinations.find(({name}) => name === destination);
        tripPointData.destination = destination;
        tripPointData.desc = description;
        tripPointData.pictures = pictures;

        tripPointComponent.update(tripPointData);
        editTripPointComponent.update(tripPointData);
        tripPointsDataModel.update(tripPointData);
      };

      tripPointsDayElement.classList.remove(`visually-hidden`);
      tripPointsElement.appendChild(tripPointComponent.render());
    });
  };

  // TODO вынести в отдельный модуль
  const createNewTripPoint = () => {
    const tripPointsContainerElement = document.querySelector(TRIP_POINTS_CONTAINER_SELECTOR);

    const tripPointData = ModelTripPoint.parseTripPoint({
      id: nanoid(),
      favorite: FAVOURITE_OFF,
      type: offers[0].type,
      timeStart: Date.now(),
      timeEnd: Date.now(),
      price: 0,
      desc: destinations[0].description,
      destination: destinations[0].name,
      pictures: destinations[0].pictures,
      offers: offers[0].offers,
    });

    const newTripPointComponent = new EditTripPoint(tripPointData, destinations);

    newTripPointComponent.onSubmit = (newObject) => {
      Object.assign(tripPointData, newObject);

      newTripPointComponent.blockSubmitting();

      api.createTripPoint(tripPointData.toRAW())
        .then(() => {
          newTripPointComponent.unBlock();
          tripPointsDataModel.update(tripPointData);
          renderTripDayInfo(tripPointsDataModel);
          renderTripInfo(tripPointsDataModel);
          makeTripPoints(tripPointsDataModel, api);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(`submit error: ${err}`);
          newTripPointComponent.shake();
          newTripPointComponent.makeRedBorder();
          newTripPointComponent.unBlock();
          throw err;
        });
    };

    newTripPointComponent.onDelete = () => {
      newTripPointComponent.unrender();
    };

    newTripPointComponent.onEsc = () => {
      newTripPointComponent.unrender();
    };

    newTripPointComponent.onClickOutside = () => {
      newTripPointComponent.unrender();
    };

    newTripPointComponent.onChangeType = (newObject) => {
      tripPointData.type = newObject.type;
      const offerByType = offers.find((offer) => capitalize(offer.type) === newObject.type);
      tripPointData.offers = offerByType && offerByType.offers.length ? offerByType.offers : tripPointData.offers;

      newTripPointComponent.update(tripPointData);
      // tripPointsDataModel.update(tripPointData);
    };

    newTripPointComponent.onChangeDestination = (newObject) => {
      tripPointData.destination = newObject.destination;
      tripPointData.desc = destinations.find((destination) => destination.name === newObject.destination).description;
      tripPointData.pictures = destinations.find((destination) => destination.name === newObject.destination).pictures;

      newTripPointComponent.update(tripPointData);
      // tripPointsDataModel.update(tripPointData);
    };

    tripPointsContainerElement.prepend(newTripPointComponent.render());
  };

  createTripPointComponents(tripPointsDataModel.data);

  document.body.addEventListener(`sort`, () => {
    createTripPointComponents(tripPointsDataModel.sortedData);
  });

  document.body.addEventListener(`filter`, () => {
    createTripPointComponents(tripPointsDataModel.filteredData);
  });

  const newEventBtn = document.querySelector(NEW_EVENT_BTN_SELECTOR);
  newEventBtn.addEventListener(`click`, createNewTripPoint);

};

export default makeTripPoints;
