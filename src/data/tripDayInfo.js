import {getRandomInt} from '../utils';

import {
  START_DATE,
  END_DATE,
} from '../constants';

const tripDayInfo = () => {
  const start = getRandomInt(...START_DATE);
  const end = getRandomInt(...END_DATE);
  const currentDay = getRandomInt(start, end);
  return {
    day: currentDay - start + 1,
    date: Date.now(),
  };
};

export default tripDayInfo;
