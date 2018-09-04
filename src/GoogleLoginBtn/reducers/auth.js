export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        name: action.name,
        image: action.image,
      };
    case 'LOGOUT':
      return {
        name: '',
        image: 'https://cdn.pets-menu.de/uploads/promotions/2018_02_02/5a7488dd41732.jpg',
      };
    default:
      return state;
  }
};
