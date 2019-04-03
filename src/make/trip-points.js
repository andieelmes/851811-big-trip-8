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

const closeTripPoint = (tripPointComponent, editTripPointComponent, tripPointsElement) => {
  tripPointComponent.render();
  tripPointsElement.replaceChild(tripPointComponent.element, editTripPointComponent.element);
  editTripPointComponent.unrender();
};

const makeTripPoints = (tripPointsDataModel, tripPoints, api) => {
  const {destinations, offers} = tripPointsDataModel;
  const createTripPointComponents = () => {
    // TODO чистим весь trip-points, количество точек может меняться
    //
    // если добавить точку с датой, которой еще нет в разметке (аналогично если поменять при редактировании), то появляется новый блок с датой, или ты не это имел ввиду?
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
            makeTripPoints(tripPointsDataModel, tripPointsDataModel.data, api);
            makeFilters(tripPointsDataModel, api);
          })
          .catch((err) => {
            // TODO вынести метод
            catchError(`submit`, err, editTripPointComponent);
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
            catchError(`delete`, err, editTripPointComponent);
          });

        renderTripInfo(tripPoints);
      };

      editTripPointComponent.onEsc = () => {
        // TODO вынести функцию
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
    makeNewTripPoint(tripPointsDataModel, api);
  });

};

export default makeTripPoints;
