import {
  STATS_BTN_SELECTOR,
  TRIP_POINTS_TABLE_BTN_SELECTOR,
  STATS_SELECTOR,
  MAIN_SELECTOR,
} from '../constants';

import renderMoneyStatistics from '../statistics/money';
import renderTransportStatistics from '../statistics/transport';
import renderTimeStatistics from '../statistics/time';

const statsElement = document.querySelector(STATS_BTN_SELECTOR);
const tripPointsTableElement = document.querySelector(TRIP_POINTS_TABLE_BTN_SELECTOR);

let moneyChart;
let transportChart;
let timeChart;

const renderStatistics = (data) => {
  moneyChart = renderMoneyStatistics(data);
  transportChart = renderTransportStatistics(data);
  timeChart = renderTimeStatistics(data);
};

const destroyCanvas = () => {
  if (moneyChart && transportChart && timeChart) {
    moneyChart.destroy();
    transportChart.destroy();
    timeChart.destroy();
  }
};

const makeStatistics = ({data}) => {
  statsElement.addEventListener(`click`, () => {
    destroyCanvas();
    document.querySelector(STATS_SELECTOR).classList.toggle(`visually-hidden`);
    document.querySelector(MAIN_SELECTOR).classList.toggle(`visually-hidden`);
    renderStatistics(data);
  });

  tripPointsTableElement.addEventListener(`click`, () => {
    document.querySelector(MAIN_SELECTOR).classList.toggle(`visually-hidden`);
    document.querySelector(STATS_SELECTOR).classList.toggle(`visually-hidden`);
    destroyCanvas();
  });
};


export default makeStatistics;
