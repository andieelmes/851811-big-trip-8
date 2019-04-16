import {
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
import makeSort from '../make/sort';

import EditTripPoint from '../render/edit-trip-point';
import ModelTripPoint from '../model/trip-point';

const makeNewTripPoint = (tripPointsDataModel, provider) => {
  const {destinations, offers} = tripPointsDataModel;

  const tripPointsContainerElement = document.querySelector(TRIP_POINTS_CONTAINER_SELECTOR);

  const tripPointData = new ModelTripPoint({
    'id': +tripPointsDataModel.data[tripPointsDataModel.data.length - 1].id + 1,
    'is_favorite': false,
    'type': offers[0].type.toLowerCase(),
    'date_from': Date.now(),
    'date_to': Date.now(),
    'base_price': 100,
    'destination': {
      'description': destinations[0].description,
      'name': destinations[0].name,
      'pictures': destinations[0].pictures,
    },
    'offers': offers[0].offers.reduce((renamedOffers, current) => {
      renamedOffers.push({
        title: current.name,
        price: current.price,
        accepted: current.accepted,
      });
      return renamedOffers;
    }, [])
  });

  const newTripPointComponent = new EditTripPoint(tripPointData, destinations);

  newTripPointComponent.onSubmit = (newObject) => {
    Object.assign(tripPointData, newObject);

    newTripPointComponent.blockSubmitting();

    provider.createTripPoint(tripPointData.toRAW())
      .then((tripPoint) => {
        newTripPointComponent.unBlock();
        tripPointsDataModel.add(tripPoint);
        renderTripDayInfo(tripPointsDataModel);
        renderTripInfo(tripPointsDataModel);
        makeTripPoints(tripPointsDataModel, tripPointsDataModel.data, provider);
        makeFilters(tripPointsDataModel, provider);
        makeSort(tripPointsDataModel, tripPointsDataModel.data, provider);
      })
      .catch((err) => {
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
  };

  newTripPointComponent.onChangeDestination = (newObject) => {
    tripPointData.destination = newObject.destination;
    tripPointData.desc = destinations.find((destination) => destination.name === newObject.destination).description;
    tripPointData.pictures = destinations.find((destination) => destination.name === newObject.destination).pictures;

    newTripPointComponent.update(tripPointData);
  };

  tripPointsContainerElement.prepend(newTripPointComponent.render());
};

export default makeNewTripPoint;
