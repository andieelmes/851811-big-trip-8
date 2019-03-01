import shuffle from 'lodash.shuffle';

export const getRandomInt = (min, max) => Math.floor(Math.random() * Math.floor((max - min) + 1) + min);

export const getRandomElements = (array, length) => shuffle(array).slice(0, length);

export const populateDom = (config) => {
  const {
    array,
    parentElement,
    render,
    clear = false,
    fromMock = true
  } = config;

  const fragment = document.createElement(`template`);
  array.forEach((item) => {
    if (fromMock) {
      fragment.innerHTML += render(item);
    } else {
      fragment.innerHTML += item;
    }
  });

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

export const coverTimeIntoHoursAndMinutes = (milliseconds) => {
  let minutes = Math.floor(milliseconds / (60 * 1000));
  const hours = Math.floor(minutes / 60);

  minutes = minutes % 60;

  return `${hours ? `${hours}H` : ``} ${minutes ? `${minutes}M` : ``}`;
};

export const getRandomBool = () => getRandomInt(0, 1) === 1;
