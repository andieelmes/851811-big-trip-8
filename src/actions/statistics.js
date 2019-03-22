import {
  STATS_BTN_SELECTOR,
  TRIP_POINTS_TABLE_BTN_SELECTOR,
  STATS_SELECTOR,
  MAIN_SELECTOR,
} from '../constants';

import renderStatistics, {destroyCanvas} from '../render/statistics';

const statsElement = document.querySelector(STATS_BTN_SELECTOR);
const tripPointsTableElement = document.querySelector(TRIP_POINTS_TABLE_BTN_SELECTOR);

const makeStatistics = (data) => {
  statsElement.addEventListener(`click`, () => {
    destroyCanvas();
    document.querySelector(STATS_SELECTOR).classList.remove(`visually-hidden`);
    document.querySelector(MAIN_SELECTOR).classList.add(`visually-hidden`);
    renderStatistics(data);
  });

  tripPointsTableElement.addEventListener(`click`, () => {
    document.querySelector(MAIN_SELECTOR).classList.remove(`visually-hidden`);
    document.querySelector(STATS_SELECTOR).classList.add(`visually-hidden`);
    destroyCanvas();
  });
};

export default makeStatistics;
