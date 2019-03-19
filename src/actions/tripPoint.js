import {
  getRandomInt,
} from '../utils';
import {
  TRIP_POINTS_SELECTOR,
  MIN_NUMBER_OF_TRIP_POINTS,
  MAX_NUMBER_OF_TRIP_POINTS,
} from '../constants';
import generateTripPointData from '../data/tripPoint';

import TripPoint from '../render/tripPoint';
import EditTripPoint from '../render/editTripPoint';

const tripPointsElement = document.querySelector(TRIP_POINTS_SELECTOR);
const defaultNumberOfTripPoints = getRandomInt(MIN_NUMBER_OF_TRIP_POINTS, MAX_NUMBER_OF_TRIP_POINTS);

const makeTripPoints = (numberOfTripPoints) => {
  return new Array(+numberOfTripPoints).fill(``).map(() => {
    const data = generateTripPointData();
    return [new TripPoint(data), new EditTripPoint(data), data];
  });

};

const renderTripPoints = (numberOfTripPoints = defaultNumberOfTripPoints) => {
  const tripPoints = makeTripPoints(numberOfTripPoints);

  tripPointsElement.innerHTML = ``;

  tripPoints.forEach(([tripPointComponent, editTripPointComponent, data]) => {
    tripPointComponent.onEdit = () => {
      editTripPointComponent.render();
      tripPointsElement.replaceChild(editTripPointComponent.element, tripPointComponent.element);
      tripPointComponent.unrender();
    };

    editTripPointComponent.onSubmit = (newObject) => {
      data.destination = newObject.destination;
      data.offer = newObject.offer;
      data.price = newObject.price;
      data.favorite = newObject.favorite;

      tripPointComponent.update(data);

      tripPointComponent.render();
      tripPointsElement.replaceChild(tripPointComponent.element, editTripPointComponent.element);
      editTripPointComponent.unrender();
    };

    editTripPointComponent.onReset = () => {
      editTripPointComponent.unrender();
      tripPointComponent.unrender();
    };

    tripPointsElement.appendChild(tripPointComponent.render());
  });

};

export default renderTripPoints;
