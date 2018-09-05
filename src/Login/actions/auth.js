export const login = ({ name, image }) => ({
  type: 'LOGIN',
  name,
  image,
});

export const logout = () => ({
  type: 'LOGOUT',
});
