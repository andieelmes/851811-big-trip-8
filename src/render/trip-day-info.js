import moment from 'moment';
import {appendToDom} from '../utils';
import {TRIP_POINTS_CONTAINER_SELECTOR} from '../constants';

const tripPointsContainerElement = document.querySelector(TRIP_POINTS_CONTAINER_SELECTOR);

const makeTripDaySection = ({dayTimestamp, count, title}) => {
  return `
  <section class="trip-day" data-day=${+dayTimestamp}>
    <article class="trip-day__info">
      <span class="trip-day__caption">Day</span>
      <p class="trip-day__number">${count}</p>
      <h2 class="trip-day__title">${title}</h2>
    </article>
    <div class="trip-day__items">

    </div>
  </section>`;
};

const makeTripDayInfo = (tripPointsDataModel) => {
  tripPointsDataModel.sortByTimeStamp();

  const tripPoints = tripPointsDataModel.data;

  const timeStamps = tripPoints.map((tripPoint) => tripPoint.timeStart);

  const dayTimestamps = timeStamps.reduce((dayStamps, timeStamp) => {
    const currentTimeStamp = moment(timeStamp);
    const startOfDay = currentTimeStamp.startOf(`day`);

    dayStamps[startOfDay] = startOfDay;

    return dayStamps;
  }, {});

  const firstDay = Object.values(dayTimestamps)[0];

  return Object.values(dayTimestamps).map((dayTimestamp) => {
    const count = dayTimestamp.diff(firstDay, `days`) + 1;
    const title = dayTimestamp.format(`MMMM D`);

    return makeTripDaySection({dayTimestamp, count, title});
  }).join(``);
};

const renderTripDayInfo = (tripPoints) => {
  appendToDom({
    newElements: makeTripDayInfo(tripPoints),
    parentElement: tripPointsContainerElement,
    clear: true,
  });
};

export default renderTripDayInfo;
