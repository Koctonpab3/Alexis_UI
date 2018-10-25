import { LOAD_ACTIVE_WORDGROUPS } from '../constans/setup';

export const loadActiveWordGroups = resData => ({
  type: LOAD_ACTIVE_WORDGROUPS,
  resData,
});
