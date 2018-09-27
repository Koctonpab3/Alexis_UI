import { login, logout } from '../../../Login/actions/auth';
import { LOGIN, LOGOUT } from '../../../Login/constants/constanst';

// test login
test('should sava user info', () => {
  const action = login({ name: 'Alex', image: 'https://via.placeholder.com/350x150' });
  expect(action).toEqual({
    type: LOGIN,
    name: 'Alex',
    image: 'https://via.placeholder.com/350x150',
  });
});

// test logout
test('should logout user info', () => {
  const action = logout();
  expect(action).toEqual({
    type: LOGOUT,
  });
});
