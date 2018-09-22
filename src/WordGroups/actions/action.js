import { LOAD_DATA, ADD_WORDGROUP, DELETE_WORDGROUP } from '../constans/WordTable';

export const loadData = dataSource => ({
  type: LOAD_DATA,
  dataSource,
});

export const addWordGroup = newWordGroup => ({
  type: ADD_WORDGROUP,
  newWordGroup,
});


export const deleteWordGroup = id => ({
  type: DELETE_WORDGROUP,
  id,
});
