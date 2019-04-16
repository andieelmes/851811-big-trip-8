const Store = class {
  constructor({key, storage}) {
    this._storage = storage;
    this._storeKey = key;

    this._setItemInStorage = this._setItemInStorage.bind(this);
  }

  setItem({key, item}) {
    const items = this.getAll();
    items[key] = item;

    this._setItemInStorage(items);
  }

  getItem({key}) {
    const items = this.getAll();
    return items[key];
  }

  removeItem({key}) {
    const items = this.getAll();
    delete items[key];

    this._setItemInStorage(items);
  }

  getAll() {
    const emptyItems = {};
    const items = this._storage.getItem(this._storeKey);

    if (!items) {
      return emptyItems;
    }

    try {
      return JSON.parse(items);
    } catch (e) {
      return emptyItems;
    }
  }

  _setItemInStorage(items) {
    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }
};

export default Store;
