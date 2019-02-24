export const getRandomInt = (min, max) => Math.floor(Math.random() * Math.floor((max - min) + 1) + min);

const _shuffle = (array) => {
  for (let i = 0; i < array.length; i++) {
    const randomIndex = getRandomInt(i, array.length - 1);
    const value = array[randomIndex];

    array[randomIndex] = array[i];
    array[i] = value;
  }
  return array;
};

export const getRandomElements = (array, length) => _shuffle(array).slice(0, length);

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
