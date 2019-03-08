import {populateDom} from './utils';
import {FILTERS_SELECTOR} from './constants';
import filterMocks from './data/filters';

import makeFilter from './render/filter';
import renderTripPoints from './actions/tripPoint';
import renderTripInfo from './render/tripInfo';
import renderTripDayInfo from './render/tripDayInfo';
import subscribeToFilterClicks from './actions/filter';

const filtersElement = document.querySelector(FILTERS_SELECTOR);

const init = () => {
  populateDom({
    array: filterMocks,
    parentElement: filtersElement,
    render: makeFilter,
    clear: true
  });
  renderTripPoints();
  renderTripInfo();
  renderTripDayInfo();
  subscribeToFilterClicks();
};

init();
