import {getRandomInt} from "./utils";

export const MIN_NUMBER_OF_TRIP_POINTS = 10;
export const MAX_NUMBER_OF_TRIP_POINTS = 15;
export const FILTERS_SELECTOR = `.trip-filter`;
export const FILTER_SELECTOR = `.trip-filter__item`;
export const MIN_PRICE = 50;
export const MAX_PRICE = 100;
export const MIN_OFFER_NUMBER = 0;
export const MAX_OFFER_NUMBER = 2;
export const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const Types = {
  FLIGHT: `Flight`,
  CHECK_IN: `Check-in`,
  DRIVE: `Drive`,
  SIGHTSEEING: `Sightseeing`,
  RESTATURANT: `Restaurant`,
  TAXI: `Taxi`,
  BUS: `Bus`,
  TRAIN: `Train`,
  SHIP: `Ship`,
  TRANSPORT: `Transport`,
};

export const TYPES = new Map([
  [Types.TAXI, `🚕`],
  [Types.BUS, `🚌`],
  [Types.TRAIN, `🚂`],
  [Types.SHIP, `🛳️`],
  [Types.TRANSPORT, `🚊`],
  [Types.DRIVE, `🚗`],
  [Types.FLIGHT, `️✈️`],
  [Types.CHECK_IN, `🏨`],
  [Types.SIGHTSEEING, `🏛️`],
  [Types.RESTATURANT, `🍴`]
]);

/* eslint-disable */
export const AllTypeToLabel = {
  Flight: `✈️ FLY`,
  "Check-in": `🏨 STAY`,
  Drive: `🚗 DRIVE`,
  Sightseeing: `🏛️ LOOK`,
  Restaurant: `🏨 EAT`,
  Taxi: `🚕 RIDE`,
}
/* eslint-enale */

export const TrasnportTypeToLabel = {
  Drive: `🚗 DRIVE`,
  Taxi: `🚕 RIDE`,
  Flight: `✈️ FLY`,
  Ship: `🛳️ SAIL`,
}

export const CITIES = [
  `Paris`,
  `Dubrovnik`,
  `Barcelona`,
  `Oslo`,
  `Seul`,
  `Malmo`,
  `Amsterdam`,
  `San-Francisco`,
  `Derry`,
  `Fargo`,
  `New York`,
  `Los Angeles`
];
export const OFFERS = [
  {
    name: `Add luggage`,
    price: 10,
  },
  {
    name: `Switch to comfort class`,
    price: 11,
  },
  {
    name: `Add meal`,
    price: 12,
  },
  {
    name: `Choose seats`,
    price: 13,
  },
];
export const MIN_CITIES = 2;
export const MAX_CITIES = 5;
export const MIN_TOTAL_PRICE = 750;
export const MAX_TOTAL_PRICE = 2000;
export const TRIP_POINTS_SELECTOR = `.trip-day__items`;
export const TRIP_INFO_SELECTOR = `.trip`;
export const TRIP_DAY_INFO_SELECTOR = `.trip-day__info`;
export const START_HOURS = [10, 16];
export const END_HOURS = [16, 23];
export const MINUTES = [0, 59];
export const START_DATE = getRandomInt(1, 15);
export const END_DATE = getRandomInt(16, 28);
export const FAVOURITE_OFF = `off`;
export const FAVOURITE_ON = `on`;

export const STATS_BTN_SELECTOR = `[href="#stats"]`;
export const TRIP_POINTS_TABLE_BTN_SELECTOR = `[href="#table"]`;
export const STATS_SELECTOR = `.statistic`;
export const MAIN_SELECTOR = `main`;

export const BAR_HEIGHT = 55;
