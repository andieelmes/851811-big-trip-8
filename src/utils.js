import shuffle from 'lodash.shuffle';

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

export const convertTimeIntoHoursAndMinutes = (timeStart, timeEnd) => {
  const dateStart = new Date(timeStart);
  const dateEnd = new Date(timeEnd);
  const hours = dateEnd.getHours() - dateStart.getHours();
  const minutes = Math.abs(dateEnd.getMinutes() - dateStart.getMinutes());
  return `${hours ? `${hours}H` : ``} ${minutes ? `${minutes}M` : ``}`;
};

export const getRandomBool = () => getRandomInt(0, 1) === 1;

export const getHourAndMinutes = (timeStamp) => new Date(timeStamp).toLocaleTimeString(`en-gb`, {hour: `2-digit`, minute: `2-digit`})
