import renderMoneyStatistics from '../statistics/money';
import renderTransportStatistics from '../statistics/transport';
import renderTimeStatistics from '../statistics/time';

let moneyChart;
let transportChart;
let timeChart;

const renderStatistics = (data) => {
  moneyChart = renderMoneyStatistics(data);
  transportChart = renderTransportStatistics(data);
  timeChart = renderTimeStatistics(data);
};

export const destroyCanvas = () => {
  if (moneyChart && transportChart && timeChart) {
    moneyChart.destroy();
    transportChart.destroy();
    timeChart.destroy();
  }
};

export default renderStatistics;
