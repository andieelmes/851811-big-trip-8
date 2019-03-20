import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  AllTypeToLabel,
  TrasnportTypeToLabel,
} from '../constants';

import {
  getTripPointDataByLabel,
  sumTripPointPrices,
} from '../utils';

let moneyChart;
let transportChart;

const renderStatistics = (data) => {
  const individualActivityPrices = getTripPointDataByLabel(data, AllTypeToLabel);
  const individualTransportActivityPrices = getTripPointDataByLabel(data, TrasnportTypeToLabel);

  const activityPrices = sumTripPointPrices(individualActivityPrices);
  const transportActivityPrices = sumTripPointPrices(individualTransportActivityPrices);

  const allTransportActivityPrices = [...Object.values(transportActivityPrices)].reduce((acc, cur) => acc + cur, 0);
  const relativeTransportActivityPrices = {};

  [...Object.entries(transportActivityPrices)].forEach((transportActivity) => {
    relativeTransportActivityPrices[transportActivity[0]] = Math.round((transportActivity[1] / allTransportActivityPrices) * 100);
  });

  const moneyCtx = document.querySelector(`.statistic__money`);
  const transportCtx = document.querySelector(`.statistic__transport`);

  // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
  const BAR_HEIGHT = 55;
  moneyCtx.height = BAR_HEIGHT * [...Object.keys(activityPrices)].length;
  transportCtx.height = BAR_HEIGHT * [...Object.keys(transportActivityPrices)].length;

  moneyChart = new Chart(moneyCtx, {
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
          font: {
            size: 13
          },
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
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });

  transportChart = new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [...Object.keys(relativeTransportActivityPrices)],
      datasets: [{
        data: [...Object.values(relativeTransportActivityPrices)],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
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
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

export const destroyCanvas = () => {
  moneyChart.destroy();
  transportChart.destroy();
};

export default renderStatistics;
