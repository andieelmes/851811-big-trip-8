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

export const getOfferId = (str) => str.replace(/\s/g, `-`).toLowerCase();

export const getTripPointInfoByLabel = (data, labels, tripPointKey) => {

  return data.reduce((activities, day) => {
    const {
      type,
    } = day;

    const typeLabel = type[0];
    const label = labels[typeLabel];

    if (label) {
      const tripPointInfo = tripPointKey ? {label, [tripPointKey]: day[tripPointKey]} : {label};
      activities.push(tripPointInfo);
    }
    return activities;
  }, []);
};

export const countTripPoints = (individualTripPoints, tripPointKey) => {
  return individualTripPoints.reduce((obj, activity) => {
    const amount = obj[activity.label];
    const activityAmount = +activity[tripPointKey] || 1;
    obj[activity.label] = amount ? amount + activityAmount : activityAmount;
    return obj;
  }, {});
};
