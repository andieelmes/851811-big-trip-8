export const getRandomInt = (min, max) => Math.floor(Math.random() * Math.floor((max - min) + 1) + min);

const _shuffle = (array) => {
  const copyArray = array.slice(0);
  copyArray.forEach((el, i) => {
    const randomIndex = getRandomInt(i, copyArray.length - 1);
    [copyArray[randomIndex], copyArray[i]] = [copyArray[i], copyArray[randomIndex]];
  });
  return copyArray;
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
