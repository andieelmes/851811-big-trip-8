import {getRandomInt} from '../utils';

const tripDayInfo = () => {
  return {
    number: [1, 2, 3, 4][getRandomInt(0, 3)],
    date: Date.now() + getRandomInt(2, 5) * 24 * 60 * 60 * 1000,
  };
};

export default tripDayInfo;
