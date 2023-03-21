export const localStoreService = {
  setItemLocal: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
  getItemLocal: (key) => {
    if (localStorage.hasOwnProperty(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
    return "";
  },
};
