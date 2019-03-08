import {getRandomInt} from '../utils';

const tripDayInfo = () => {
  return {
    day: getRandomInt(1, 4),
    date: Date.now() + getRandomInt(2, 5) * 24 * 60 * 60 * 1000,
  };
};

export default tripDayInfo;
