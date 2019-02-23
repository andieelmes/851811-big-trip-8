import {populateDom} from './utils';
import {FILTERS_SELECTOR} from './constants';
import filterMocks from './data/filters';

import makeFilter from './render/filter';
import renderTripPoints from './render/tripPoint';
import subscribeToFilterClicks from './actions/filter';

const filtersElement = document.querySelector(FILTERS_SELECTOR);

const init = () => {
  populateDom(filterMocks, filtersElement, makeFilter, true);
  renderTripPoints();
  subscribeToFilterClicks();
};

init();
