import Component from './trip-point-component';

class Sort extends Component {
  constructor(data) {
    super();
    this._type = data.type;

    this._onClick = this._onClick.bind(this);

    this._onSort = null;
  }

  get template() {
    return `<span><input type="radio"
        id="sorting-${this._type}"
        name="trip-sorting"
        value="${this._type}"
        ${this._checked ? `checked` : ``}
      />
    <label
      class="trip-sorting__item trip-sorting__item--${this._type}"
      for="sorting-${this._type}"
    >
      ${this._type.toUpperCase()}
    </label></span>`.trim();
  }

  set onSort(fn) {
    this._onSort = fn;
  }

  _onClick() {
    this._checked = true;
    return typeof this._onSort === `function` && this._onSort();
  }

  bind() {
    this._element.addEventListener(`click`, this._onClick);
  }

  unbind() {
    if (this._element) {
      this._element.removeEventListener(`click`, this._onClick);
    }
  }
}

export default Sort;
