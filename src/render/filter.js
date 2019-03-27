import Component from './tripPointComponent';

class Filter extends Component {
  constructor(data) {
    super();
    this._type = data.type;
    this._disabled = data.disabled;

    this._onClick = this._onClick.bind(this);

    this._onFilter = null;
  }

  get template() {
    return `<span><input type="radio"
      id="filter-${this._type}"
      name="filter"
      value="${this._type}"
      ${this._disabled ? `disabled` : ``}
    />
    <label
      class="trip-filter__item"
      for="filter-${this._type}"
    >
    ${this._type.toUpperCase()}
    </label></span>`.trim();
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onClick() {
    return !this._disabled && typeof this._onFilter === `function` && this._onFilter();
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

export default Filter;
