const makeTripPointOffer = (offer) => {
  const [name, price] = offer;
  return `<li>
    <button class="trip-point__offer">${name} +&euro;&nbsp;${price}</button>
  </li>`;
};
export default makeTripPointOffer;
