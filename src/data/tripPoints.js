import {getRandomInt} from '../utils';

import {
  MIN_PRICE,
  MAX_PRICE,
} from '../constants';

const taskMocks = [
  {
    icon: `🚂`,
    title: `Slow train`,
    timeStart: `10:00`,
    timeEnd: `10:30`,
    duration: `30m`,
    price: getRandomInt(MIN_PRICE, MAX_PRICE),
  },
  {
    icon: `🚄`,
    title: `Fast train`,
    timeStart: `12:30`,
    timeEnd: `12:33`,
    duration: `3m`,
    price: getRandomInt(MIN_PRICE, MAX_PRICE),
  },
  {
    icon: `🛶`,
    title: `Bet you've never travelled on a boat before`,
    timeStart: `14:00`,
    timeEnd: `16:00`,
    duration: `2h`,
    price: getRandomInt(MIN_PRICE, MAX_PRICE),
  },
  {
    icon: `🚲`,
    title: `Guess what time to do some exersize`,
    timeStart: `16:20`,
    timeEnd: `17:30`,
    duration: `1h 30m`,
    price: getRandomInt(MIN_PRICE, MAX_PRICE),
  },
  {
    icon: `🎪`,
    title: `Find your own clown`,
    timeStart: `18:00`,
    timeEnd: `20:20`,
    duration: `2h 20m`,
    price: getRandomInt(MIN_PRICE, MAX_PRICE),
  },
  {
    icon: `🏙️`,
    title: `That's not Dubai but look a skyscraper with a view`,
    timeStart: `22:15`,
    timeEnd: `22:30`,
    duration: `15m`,
    price: getRandomInt(MIN_PRICE, MAX_PRICE),
  },
  {
    icon: `🏟️`,
    title: `Ole ole ole`,
    timeStart: `23:00`,
    timeEnd: `23:55`,
    duration: `55m`,
    price: getRandomInt(MIN_PRICE, MAX_PRICE),
  },
];

export default taskMocks;
