const makeTripPointTypeCheckbox = ([typeDesc, typeEmoji]) => {
  return `<input class="travel-way__select-input visually-hidden" type="radio" id="${typeDesc}" name="travel-way" value="${typeDesc}">
  <label class="travel-way__select-label" for="${typeDesc}">${typeEmoji} ${typeDesc}</label><br>`;
};

export default makeTripPointTypeCheckbox;
