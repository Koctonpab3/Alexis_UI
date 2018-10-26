import { LOAD_ACTIVE_WORDGROUPS, GET_CONFIG, SET_APPROACH, SET_DEFAULT_WGROUP } from '../constans/setup';

export const loadActiveWordGroups = resData => ({
  type: LOAD_ACTIVE_WORDGROUPS,
  resData,
});

export const getSetupCongig = resConfig => ({
  type: GET_CONFIG,
  resConfig,
});

export const setApproach = approach => ({
  type: SET_APPROACH,
  approach,
});

export const setDefaultWGroup = wGroup => ({
  type: SET_DEFAULT_WGROUP,
  wGroup,
});