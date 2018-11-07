export const findWordGroupById = (array, key, value) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i].name;
    }
  }
};
