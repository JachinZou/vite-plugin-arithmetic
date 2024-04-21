class InitStorage {
  storage;
  constructor(storage) {
    this.storage = storage;
  }
  getItem(key) {
    const value = this.storage.getItem(key) ?? null;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  setItem(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  removeItem(key) {
    this.storage.removeItem(key);
  }
  clear() {
    this.storage.clear();
  }
  keys() {
    return Object.keys(this.storage);
  }
}

export default InitStorage
