export const FILTERS_SELECTOR = `.trip-filter`;
export const SORTING_SELECTOR = `.trip-sorting`;
export const OFFERS_FORM_NAME = `offer`;
export const PRICE_FORM_NAME = `price`;
export const DESTINATION_FORM_NAME = `destination`;
export const FAVOURITE_OFF = `off`;
export const FAVOURITE_ON = `on`;
export const MAX_OFFER_NUMBER = 3;

export const Type = {
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
  [Type.TAXI, `🚕`],
  [Type.BUS, `🚌`],
  [Type.TRAIN, `🚂`],
  [Type.SHIP, `🛳️`],
  [Type.TRANSPORT, `🚊`],
  [Type.DRIVE, `🚗`],
  [Type.FLIGHT, `️✈️`],
  [Type.CHECK_IN, `🏨`],
  [Type.SIGHTSEEING, `🏛️`],
  [Type.RESTATURANT, `🍴`],
  [Type.TRAVEL, `🌍`]
]);

export const AllTypeToLabel = {
  FLIGHT: `✈️ FLY`,
  [`CHECK-IN`]: `🏨 STAY`,
  DRIVE: `🚗 DRIVE`,
  SIGHTSEEING: `🏛️ LOOK`,
  RESTATURANT: `🍴 EAT`,
  TAXI: `🚕 RIDE`,
  BUS: `🚌 BUS`,
  TRAIN: `🚂 CHOO-CHOO`,
  SHIP: `🛳️ SAIL`,
  TRANSPORT: `🚊 GO AROUND`,
};

export const AllTypeToInputLabel = {
  FLIGHT: `Flight to`,
  [`CHECK-IN`]: `Check-in at hotel in`,
  DRIVE: `Drive to`,
  SIGHTSEEING: `Sightseeing in`,
  RESTATURANT: `Restaurant in`,
  TAXI: `Taxi to`,
  BUS: `Bus to`,
  TRAIN: `Train to`,
  SHIP: `Ship to`,
  TRANSPORT: `Transport to`,
  TRAVEL: `Travel to`,
};

export const TransportTypeToLabel = {
  DRIVE: `🚗 DRIVE`,
  TAXI: `🚕 RIDE`,
  FLIGHT: `✈️ FLY`,
  SHIP: `🛳️ SAIL`,
  TRAIN: `🚂 CHOO-CHOO`,
  TRANSPORT: `🚊 GO AROUND`,
  BUS: `🚌 BUS`,
};

export const TRIP_POINTS_CONTAINER_SELECTOR = `.trip-points`;
export const TRIP_POINTS_SELECTOR = `.trip-day__items`;
export const TRIP_INFO_SELECTOR = `.trip`;
export const NEW_EVENT_BTN_SELECTOR = `.trip-controls__new-event`;

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
export const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=kekghghtjgfbjfgbfj--00031}`;
export const TRIP_POINT_STORE_KEY = `trip-point-store-key`;

export const TRIP_POINT_GET_LOADING = `Loading route...`;
export const TRIP_POINT_GET_ERROR = `Something went wrong while loading your route info. Check your connection or try again later`;

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const FilterType = {
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
