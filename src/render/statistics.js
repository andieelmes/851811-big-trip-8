import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  AllTypeToLabel,
  TrasnportTypeToLabel,
  BAR_HEIGHT,
} from '../constants';

import {
  getTripPointInfoByLabel,
  countTripPoints,
} from '../utils';

let moneyChart;
let transportChart;
let timeChart;

const renderStatistics = (data) => {
  const individualActivityPrices = getTripPointInfoByLabel(data, AllTypeToLabel, `price`);
  const individualTransportActivity = getTripPointInfoByLabel(data, TrasnportTypeToLabel);
  const individualActivityDurations = getTripPointInfoByLabel(data, AllTypeToLabel, `time`);

  const activityPrices = countTripPoints(individualActivityPrices, `price`);
  const transportActivityCounts = countTripPoints(individualTransportActivity);
  const activityDurations = countTripPoints(individualActivityDurations, `time`);

  const moneyCtx = document.querySelector(`.statistic__money`);
  const transportCtx = document.querySelector(`.statistic__transport`);
  const timeCtx = document.querySelector(`.statistic__time-spend`);

  // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
  moneyCtx.height = BAR_HEIGHT * Object.keys(activityPrices).length;
  transportCtx.height = BAR_HEIGHT * Object.keys(transportActivityCounts).length;
  timeCtx.height = BAR_HEIGHT * Object.keys(activityDurations).length;

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
      labels: [...Object.keys(transportActivityCounts)],
      datasets: [{
        data: [...Object.values(transportActivityCounts)],
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

  timeChart = new Chart(timeCtx, {
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
          font: {
            size: 13
          },
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
  if (moneyChart && transportChart) {
    moneyChart.destroy();
    transportChart.destroy();
    timeChart.destroy();
  }
};

export default renderStatistics;
