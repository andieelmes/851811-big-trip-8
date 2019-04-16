import moment from 'moment';

import {
  TRIP_POINTS_SELECTOR,
  NEW_EVENT_BTN_SELECTOR,
} from '../constants';

import {
  capitalize,
  catchError,
} from '../utils';

import TripPoint from '../render/trip-point';
import EditTripPoint from '../render/edit-trip-point';
import renderTripInfo from '../render/trip-info';
import renderTripDayInfo from '../render/trip-day-info';
import makeNewTripPoint from './new-trip-point';
import makeFilters from '../make/filter';
import makeSort from '../make/sort';

const closeTripPoint = (tripPointComponent, editTripPointComponent, tripPointsElement) => {
  tripPointComponent.render();
  tripPointsElement.replaceChild(tripPointComponent.element, editTripPointComponent.element);
  editTripPointComponent.unrender();
};

const updateTrip = (tripPointsDataModel, provider) => {
  renderTripDayInfo(tripPointsDataModel);
  renderTripInfo(tripPointsDataModel);
  makeTripPoints(tripPointsDataModel, tripPointsDataModel.data, provider);
  makeFilters(tripPointsDataModel, provider);
  makeSort(tripPointsDataModel, provider);
};

const makeTripPoints = (tripPointsDataModel, tripPoints, provider) => {
  const {destinations, offers} = tripPointsDataModel;
  const createTripPointComponents = () => {
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

        provider.updateTripPoint({id: tripPointData.id, data: tripPointData.toRAW()})
          .then((newTripPoint) => {
            editTripPointComponent.unBlock();
            tripPointComponent.update(newTripPoint);

            tripPointsDataModel.update(tripPointData);
            updateTrip(tripPointsDataModel, provider);
          })
          .catch((err) => {
            catchError(`submit`, err, editTripPointComponent);
          });
      };

      editTripPointComponent.onDelete = ({id}) => {
        editTripPointComponent.blockDeleting();

        provider.deleteTripPoint({id})
          .then(() => {
            editTripPointComponent.unBlock();

            tripPointComponent.unrender();
            editTripPointComponent.unrender();

            tripPointsDataModel.remove(id);

            updateTrip(tripPointsDataModel, provider);
          })
          .catch((err) => {
            catchError(`delete`, err, editTripPointComponent);
          });
      };

      editTripPointComponent.onEsc = () => {
        closeTripPoint(tripPointComponent, editTripPointComponent, tripPointsElement);
      };

      editTripPointComponent.onClickOutside = () => {
        closeTripPoint(tripPointComponent, editTripPointComponent, tripPointsElement);
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

  createTripPointComponents(tripPoints);

  const newEventBtn = document.querySelector(NEW_EVENT_BTN_SELECTOR);
  newEventBtn.addEventListener(`click`, () => {
    makeNewTripPoint(tripPointsDataModel, provider);
  });

};

export default makeTripPoints;
