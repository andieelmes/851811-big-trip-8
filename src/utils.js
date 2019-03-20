import shuffle from 'lodash.shuffle';
import moment from 'moment';

export const getRandomInt = (min, max) => Math.floor(Math.random() * Math.floor((max - min) + 1) + min);

export const getRandomElements = (array, length = 1) => shuffle(array).slice(0, length);

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const populateDom = (config) => {
  const {
    array,
    parentElement,
    render,
    clear = false,
    fromMock = true
  } = config;

  const fragment = document.createElement(`template`);
  fragment.innerHTML = array.map((item) => fromMock ? render(item) : item).join(``);

  if (clear) {
    parentElement.innerHTML = ``;
  }
  parentElement.appendChild(fragment.content);
};

export const appendToDom = (config) => {
  const {
    newElements,
    parentElement,
    clear = false,
  } = config;

  const fragment = document.createElement(`template`);
  fragment.innerHTML += newElements;

  if (clear) {
    parentElement.innerHTML = ``;
  }
  parentElement.appendChild(fragment.content);
};

export const getRandomBool = () => getRandomInt(0, 1) === 1;

export const getHourAndMinutes = (diff) => `${Math.floor(moment.duration(diff).asHours())}H ${moment.duration(diff).minutes()}M`;

export const getOfferId = (str) => str.replace(/ /g, `-`).toLowerCase();

export const getTripPointPriceByLabel = (data, labels) => {
  return data.map((day) => {
    const {
      type,
      price
    } = day;

    const typeLabel = type[0];
    const label = labels[typeLabel];

    return {label, price};
  }).filter((activity) => activity.label);
};

export const getTripPointByLabel = (data, labels) => {
  return data.map((day) => {
    const {
      type,
    } = day;

    const typeLabel = type[0];
    const label = labels[typeLabel];

    return {label};
  }).filter((activity) => activity.label);
};

export const sumTripPointPrices = (individualObject) => {
  const sumObject = {};

  individualObject.forEach((activity) => {
    if (sumObject[activity.label]) {
      sumObject[activity.label] += +activity.price;
    } else {
      sumObject[activity.label] = +activity.price;
    }
  });

  return sumObject;
};

export const countTripPoints = (individualObject) => {
  const sumObject = {};

  individualObject.forEach((activity) => {
    if (sumObject[activity.label]) {
      sumObject[activity.label] += 1;
    } else {
      sumObject[activity.label] = 1;
    }
  });

  return sumObject;
};
