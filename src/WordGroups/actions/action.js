import { LOAD_DATA, ADD_WORDGROUP, DELETE_WORDGROUP } from '../constans/WordTable';

export const loadData = dataSource => ({
  type: LOAD_DATA,
  dataSource,
});

export const addWordGroup = dataSource => ({
  type: ADD_WORDGROUP,
  dataSource,
});


export const deleteWordGroup = dataSource => ({
  type: DELETE_WORDGROUP,
  dataSource,
});
