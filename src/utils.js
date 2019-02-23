export const getRandomInt = (min, max) => Math.floor(Math.random() * Math.floor((max - min) + 1) + min);

export const getRandomElements = (array, length) => {
  const elements = [];
  const elementsLength = length;
  while (elements.length < elementsLength) {
    const randomArrayElementNumber = getRandomInt(0, array.length - 1);
    const randomArrayElement = array[randomArrayElementNumber];

    if (elements.indexOf(randomArrayElement) === -1) {
      elements.push(randomArrayElement);
    }
  }

  return elements;
};

export const populateDom = (array, parentElement, render, clear = false) => {
  const fragment = document.createElement(`template`);
  array.forEach((item) => {
    fragment.innerHTML += render(item);
  });

  if (clear) {
    parentElement.innerHTML = ``;
  }
  parentElement.appendChild(fragment.content);
};
