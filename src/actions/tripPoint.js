import {
  TRIP_POINTS_SELECTOR,
} from '../constants';
import generateTripPointData from '../data/tripPoint';

import TripPoint from '../render/tripPoint';
import EditTripPoint from '../render/editTripPoint';
import renderTripInfo from '../render/tripInfo';

import makeStatistics from './statistics';

const tripPointsElement = document.querySelector(TRIP_POINTS_SELECTOR);

const deleteTripPoint = (tripPoints, id) => {
  const tripPointToDelete = tripPoints.find((tripPoint) => tripPoint.id === id);
  const index = tripPoints.indexOf(tripPointToDelete);
  tripPoints.splice(index, 1);
};

export const makeTripPoints = (numberOfTripPoints) => {
  return new Array(+numberOfTripPoints).fill(``).map(() => generateTripPointData());
};

const renderTripPoints = (tripPoints) => {
  makeStatistics(tripPoints);

  tripPointsElement.innerHTML = ``;

  tripPoints.forEach((tripPointData) => {
    const tripPointComponent = new TripPoint(tripPointData);
    const editTripPointComponent = new EditTripPoint(tripPointData);

    tripPointComponent.onEdit = () => {
      editTripPointComponent.render();
      tripPointsElement.replaceChild(editTripPointComponent.element, tripPointComponent.element);
      tripPointComponent.unrender();
    };

    editTripPointComponent.onSubmit = (newObject) => {
      tripPointData.type = newObject.type;
      tripPointData.destination = newObject.destination;
      tripPointData.offer = newObject.offer;
      tripPointData.price = newObject.price;
      tripPointData.favorite = newObject.favorite;
      tripPointData.timeStart = newObject.timeStart;
      tripPointData.timeEnd = newObject.timeEnd;

      tripPointComponent.update(tripPointData);

      tripPointComponent.render();
      tripPointsElement.replaceChild(tripPointComponent.element, editTripPointComponent.element);
      editTripPointComponent.unrender();

      renderTripInfo(tripPoints);
    };

    editTripPointComponent.onDelete = () => {
      editTripPointComponent.unrender();
      deleteTripPoint(tripPoints, tripPointData.id);
      tripPointComponent.unrender();
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

    tripPointsElement.appendChild(tripPointComponent.render());
  });

};

export default renderTripPoints;
