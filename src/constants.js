import moment from 'moment';

export const MIN_NUMBER_OF_TRIP_POINTS = 10;
export const MAX_NUMBER_OF_TRIP_POINTS = 15;
export const FILTERS_SELECTOR = `.trip-filter`;
export const SORTING_SELECTOR = `.trip-sorting`;
export const OFFERS_FORM_NAME = `offer`;
export const PRICE_FORM_NAME = `price`;
export const DESTINATION_FORM_NAME = `destination`;
export const MIN_PRICE = 50;
export const MAX_PRICE = 100;
export const MAX_OFFER_NUMBER = 3;
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
  TRAVEL: `Travel`,
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
  [Types.RESTATURANT, `🍴`],
  [Types.TRAVEL, `🌍`]
]);

export const AllTypeToLabel = {
  Flight: `✈️ FLY`,
  [`Check-in`]: `🏨 STAY`,
  Drive: `🚗 DRIVE`,
  Sightseeing: `🏛️ LOOK`,
  Restaurant: `🍴 EAT`,
  Taxi: `🚕 RIDE`,
  Bus: `🚌 BUS`,
  Train: `🚂 CHOO-CHOO`,
  Ship: `🛳️ SAIL`,
  Transport: `🚊 GO AROUND`,
};

export const AllTypeToInputLabel = {
  Flight: `Flight to`,
  [`Check-in`]: `Check-in at hotel in`,
  Drive: `Drive to`,
  Sightseeing: `Sightseeing in`,
  Restaurant: `Restaurant in`,
  Taxi: `Taxi to`,
  Bus: `Bus to`,
  Train: `Train to`,
  Ship: `Ship to`,
  Transport: `Transport to`,
  Travel: `Travel to`,
};

export const TrasnportTypeToLabel = {
  Drive: `🚗 DRIVE`,
  Taxi: `🚕 RIDE`,
  Flight: `✈️ FLY`,
  Ship: `🛳️ SAIL`,
  Train: `🚂 CHOO-CHOO`,
  Transport: `🚊 GO AROUND`,
  Bus: `🚌 BUS`,
};

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
export const TRIP_POINTS_CONTAINER_SELECTOR = `.trip-points`;
export const TRIP_POINTS_SELECTOR = `.trip-day__items`;
export const TRIP_INFO_SELECTOR = `.trip`;
export const TRIP_DAY_INFO_SELECTOR = `.trip-day__info`;
export const START_HOURS = [10, 16];
export const END_HOURS = [16, 23];
export const MINUTES = [0, 59];
export const START_DATE = [moment().date() - 2, moment().date() + 2];
export const END_DATE = [moment().date() + 3, moment().date() + 2];
export const FAVOURITE_OFF = `off`;
export const FAVOURITE_ON = `on`;

export const STATS_BTN_SELECTOR = `[href="#stats"]`;
export const TRIP_POINTS_TABLE_BTN_SELECTOR = `[href="#table"]`;
export const STATS_SELECTOR = `.statistic`;
export const MAIN_SELECTOR = `main`;

export const BAR_HEIGHT = 55;

export const CHART_OPTIONS_CONFIG = {
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
};

export const STATISTICS_MONEY_SELECTOR = `.statistic__money`;
export const STATISTICS_TRANSPORT_SELECTOR = `.statistic__transport`;
export const STATISTICS_TIME_SELECTOR = `.statistic__time-spend`;

export const FLATPICKR_CONFIG = {
  enableTime: true,
  altInput: true,
  altFormat: `H:i`,
  dateFormat: `U`,
  [`time_24hr`]: true
};

export const ESC_KEYCODE = 27;

export const ENDPOINT_URL = `https://es8-demo-srv.appspot.com/big-trip`;
export const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=kekghghtjgfbjfgbfj--00021}`;

export const TRIP_POINT_GET_LOADING = `Loading route...`;
export const TRIP_POINT_GET_ERROR = `Something went wrong while loading your route info. Check your connection or try again later`;

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const NEW_EVENT_BTN_SELECTOR = `.trip-controls__new-event`;
export const FilterTypes = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};
export const SORT_TYPES = [
  {
    type: `event`,
    tripPointType: `destination`,
  },
  {
    type: `time`,
    tripPointType: `timeStart`
  },
  {
    type: `price`,
    tripPointType: `price`
  },
  {
    type: `offers`,
    tripPointType: `offer`
  }
];
