import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  TrasnportTypeToLabel,
  BAR_HEIGHT,
  CHART_OPTIONS_CONFIG,
  STATISTICS_TRANSPORT_SELECTOR,
} from '../constants';

import {
  getTripPointInfoByLabel,
  countTripPoints,
} from '../utils';

const renderTrasnportStatistics = (data) => {
  const individualTransportActivity = getTripPointInfoByLabel(data, TrasnportTypeToLabel);
  const transportActivityCounts = countTripPoints(individualTransportActivity);
  const transportCtx = document.querySelector(STATISTICS_TRANSPORT_SELECTOR);

  transportCtx.height = BAR_HEIGHT * Object.keys(transportActivityCounts).length;

  const transportChart = new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(transportActivityCounts),
      datasets: [{
        data: Object.values(transportActivityCounts),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: Object.assign({
      plugins: {
        datalabels: {
          fontSize: 13,
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
    }, CHART_OPTIONS_CONFIG)
  });

  return transportChart;
};

export default renderTrasnportStatistics;
