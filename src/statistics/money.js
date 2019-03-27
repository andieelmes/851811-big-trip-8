import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  AllTypeToLabel,
  BAR_HEIGHT,
  CHART_OPTIONS_CONFIG,
  STATISTICS_MONEY_SELECTOR,
} from '../constants';

import {
  getTripPointInfoByLabel,
  countTripPoints,
} from '../utils';

const renderMoneyStatistics = (data) => {
  const individualActivityPrices = getTripPointInfoByLabel(data, AllTypeToLabel, `price`);
  const activityPrices = countTripPoints(individualActivityPrices, `price`);
  const moneyCtx = document.querySelector(STATISTICS_MONEY_SELECTOR);

  moneyCtx.height = BAR_HEIGHT * Object.keys(activityPrices).length;

  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [...Object.keys(activityPrices)],
      datasets: [{
        data: [...Object.values(activityPrices)],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          fontSize: 13,
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      ...CHART_OPTIONS_CONFIG,
    }
  });

  return moneyChart;
};

export default renderMoneyStatistics;
