const storage = {
  get: key => {
    let getItem = localStorage.getItem(key);
    try {
      const parsedValue = JSON.parse(getItem);
      return parsedValue;
    } catch (err) {}
    return getItem;
  },
  save: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  },
  saveHistory: value => {
    const key = "histories";
    const histories = storage.get(key);
    if (histories && Array.isArray(histories)) {
      histories.unshift(value);
      return storage.save(key, histories);
    }
    return storage.save(key, [value]);
  }
};

export default storage;
