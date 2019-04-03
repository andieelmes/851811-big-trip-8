import nanoid from 'nanoid';

import {
  FAVOURITE_OFF,
  TRIP_POINTS_CONTAINER_SELECTOR,
} from '../constants';

import {
  capitalize,
  catchError,
} from '../utils';

import renderTripInfo from '../render/trip-info';
import renderTripDayInfo from '../render/trip-day-info';
import makeTripPoints from '../make/trip-points';
import makeFilters from '../make/filter';

import EditTripPoint from '../render/edit-trip-point';
import ModelTripPoint from '../model/trip-point';

const makeNewTripPoint = (tripPointsDataModel, api) => {
  const {destinations, offers} = tripPointsDataModel;

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
      .then((tripPoint) => {
        newTripPointComponent.unBlock();
        tripPointsDataModel.add(tripPoint);
        renderTripDayInfo(tripPointsDataModel);
        renderTripInfo(tripPointsDataModel);
        makeTripPoints(tripPointsDataModel, tripPointsDataModel.data, api);
        makeFilters(tripPointsDataModel, api);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        catchError(`submit`, err, newTripPointComponent);
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

export default makeNewTripPoint;
