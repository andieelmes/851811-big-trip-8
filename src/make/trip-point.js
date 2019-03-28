import {
  TRIP_POINTS_SELECTOR,
} from '../constants';

import TripPoint from '../render/trip-point';
import EditTripPoint from '../render/edit-trip-point';
import renderTripInfo from '../render/trip-info';

import makeStatistics from './statistics';

const tripPointsElement = document.querySelector(TRIP_POINTS_SELECTOR);

const makeTripPoints = (tripPoints, destinations, offers, api) => {
  makeStatistics(tripPoints);

  tripPointsElement.innerHTML = ``;

  tripPoints.forEach((tripPointData) => {
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

      renderTripInfo(tripPoints);

      editTripPointComponent.blockSubmitting();

      api.updateTripPoint({id: tripPointData.id, data: tripPointData.toRAW()})
        .then((newTripPoint) => {
          editTripPointComponent.unBlock();
          tripPointComponent.update(newTripPoint);

          tripPointComponent.render();
          tripPointsElement.replaceChild(tripPointComponent.element, editTripPointComponent.element);
          editTripPointComponent.unrender();

        })
        .catch(() => {
          editTripPointComponent.shake();
          editTripPointComponent.makeRedBorder();
          editTripPointComponent.unBlock();
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
        .catch(() => {
          editTripPointComponent.shake();
          editTripPointComponent.makeRedBorder();
          editTripPointComponent.unBlock();
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

    tripPointsElement.appendChild(tripPointComponent.render());
  });

};

export default makeTripPoints;
