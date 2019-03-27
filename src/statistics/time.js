import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  AllTypeToLabel,
  BAR_HEIGHT,
  CHART_OPTIONS_CONFIG,
  STATISTICS_TIME_SELECTOR,
} from '../constants';

import {
  getTripPointInfoByLabel,
  countTripPoints,
} from '../utils';

const renderTimeStatistics = (data) => {
  const individualActivityDurations = getTripPointInfoByLabel(data, AllTypeToLabel, `time`);
  const activityDurations = countTripPoints(individualActivityDurations, `time`);
  const timeCtx = document.querySelector(STATISTICS_TIME_SELECTOR);

  timeCtx.height = BAR_HEIGHT * Object.keys(activityDurations).length;

  const timeChart = new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [...Object.keys(activityDurations)],
      datasets: [{
        data: [...Object.values(activityDurations)],
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
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TIME`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      ...CHART_OPTIONS_CONFIG,
    }
  });

  return timeChart;
};

export default renderTimeStatistics;
