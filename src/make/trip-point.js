import moment from 'moment';

import {
  TRIP_POINTS_SELECTOR,
} from '../constants';

import {
  capitalize,
} from '../utils';

import TripPoint from '../render/trip-point';
import EditTripPoint from '../render/edit-trip-point';
import renderTripInfo from '../render/trip-info';
import renderTripDayInfo from '../render/trip-day-info';

const makeTripPoints = (tripPointsDataModel, destinations, offers, api) => {
  const createTripPointComponents = (tripPoints) => {

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
      const editTripPointComponent = new EditTripPoint(tripPointData, destinations, offers);

      tripPointComponent.onEdit = () => {
        editTripPointComponent.render();
        tripPointsElement.replaceChild(editTripPointComponent.element, tripPointComponent.element);
        tripPointComponent.unrender();
      };

      editTripPointComponent.onSubmit = (newObject) => {
        tripPointData.type = newObject.type;
        tripPointData.destination = newObject.destination;
        tripPointData.offers = newObject.offers;
        tripPointData.price = newObject.price;
        tripPointData.favorite = newObject.favorite;
        tripPointData.timeStart = newObject.timeStart;
        tripPointData.timeEnd = newObject.timeEnd;

        editTripPointComponent.blockSubmitting();

        api.updateTripPoint({id: tripPointData.id, data: tripPointData.toRAW()})
          .then((newTripPoint) => {
            editTripPointComponent.unBlock();
            tripPointComponent.update(newTripPoint);

            tripPointsDataModel.update(tripPointData);
            renderTripDayInfo(tripPointsDataModel);
            renderTripInfo(tripPointsDataModel);
            makeTripPoints(tripPointsDataModel, destinations, offers, api);
          })
          .catch((err) => {
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
        const offerByType = offers.find((offer) => capitalize(offer.type) === newObject.type);
        tripPointData.offers = offerByType && offerByType.offers.length ? offerByType.offers : tripPointData.offers;

        tripPointComponent.update(tripPointData);
        editTripPointComponent.update(tripPointData);
        tripPointsDataModel.update(tripPointData);
      };

      editTripPointComponent.onChangeDestination = (newObject) => {
        tripPointData.destination = newObject.destination;
        tripPointData.desc = destinations.find((destination) => destination.name === newObject.destination).description;
        tripPointData.pictures = destinations.find((destination) => destination.name === newObject.destination).pictures;

        tripPointComponent.update(tripPointData);
        editTripPointComponent.update(tripPointData);
        tripPointsDataModel.update(tripPointData);
      };

      tripPointsDayElement.classList.remove(`visually-hidden`);
      tripPointsElement.appendChild(tripPointComponent.render());
    });
  };

  createTripPointComponents(tripPointsDataModel.data);


  document.body.addEventListener(`sort`, () => {
    createTripPointComponents(tripPointsDataModel.sortedData);
  });

  document.body.addEventListener(`filter`, () => {
    createTripPointComponents(tripPointsDataModel.filteredData);
  });

};

export default makeTripPoints;
