import {getRandomInt} from '../utils';

import {
  START_DATE,
  END_DATE,
} from '../constants';

const tripDayInfo = () => {
  const currentDay = getRandomInt(START_DATE, END_DATE);
  return {
    day: currentDay - START_DATE + 1,
    date: new Date(new Date().setDate(currentDay)),
  };
};

export default tripDayInfo;
