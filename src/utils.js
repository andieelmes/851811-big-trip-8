import shuffle from 'lodash.shuffle';
import moment from 'moment';
import 'moment-duration-format';

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

export const getOffersPrice = (offers) => offers.reduce((price, current) => current.accepted ? price + +current.price : price + 0, 0);

export const getTripPointInfoByLabel = (data, labels, tripPointKey) => {

  return data.reduce((activities, day) => {
    const {
      type,
      timeStart,
      timeEnd,
    } = day;

    const typeLabel = capitalize(type);
    const label = labels[typeLabel];

    if (label) {
      let tripPointInfo;
      if (tripPointKey === `time`) {
        tripPointInfo = {label, [tripPointKey]: moment(timeEnd).diff(timeStart)};
      } else if (tripPointKey === `price`) {
        tripPointInfo = {label, [tripPointKey]: +day[tripPointKey] + +getOffersPrice(day.offers)};
      } else {
        tripPointInfo = tripPointKey ? {label, [tripPointKey]: day[tripPointKey]} : {label};
      }
      activities.push(tripPointInfo);
    }

    return activities;
  }, []);
};

export const countTripPoints = (individualTripPoints, tripPointKey) => {
  return individualTripPoints.reduce((obj, activity) => {
    const amount = obj[activity.label];
    let activityAmount;
    if (tripPointKey === `time`) {
      activityAmount = +moment.duration(activity[tripPointKey], `milliseconds`).format(`h`);
    } else {
      activityAmount = +activity[tripPointKey] || 1;
    }
    obj[activity.label] = amount ? amount + activityAmount : activityAmount;
    return obj;
  }, {});
};

/**
 * shows certain block by clicking on corresponding link
 * block set depends on url hash
 * @param {String} urlHash
 * @return
 */

const showCertainBlock = (urlHash) => {
  document.querySelector(`[href="#${urlHash}"]`).click();
};

export const checkUrlHash = () => {
  const urlHash = location.hash.replace(`#`, ``);
  if (!urlHash) {
    return false;
  }

  const determineFunctionBasedOnUrl = {
    'stats': showCertainBlock.bind(null, urlHash),
  };

  const func = determineFunctionBasedOnUrl[urlHash];

  if (!func) {
    return false;
  }

  func();
};


export const capitalize = ([first, ...rest]) => first.toUpperCase().concat(...rest);

export const escapeHtml = (s) => {
  const text = document.createTextNode(s);
  const p = document.createElement(`p`);

  p.appendChild(text);
  return p.innerHTML;
};

export const catchError = (type, err, component) => {
  component.shake();
  component.makeRedBorder();
  component.unBlock();
  throw err;
};
