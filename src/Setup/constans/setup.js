import React from 'react';
// actions constants
export const LOAD_ACTIVE_WORDGROUPS = 'LOAD_ACTIVE_WORDGROUPS';
export const GET_CONFIG = 'GET_CONFIG';
export const SET_APPROACH = 'SET_APPROACH';
export const SET_DEFAULT_WGROUP = 'SET_DEFAULT_WGROUP';

// components constants
export const failApproaches = ['1', '2', '3'];
export const wGroupMessage = 'Default';
export const mainSetupText = 'You can choose the fail approach and the default group';
export const selectClasses = 'select-block-item select-item select-input fail-num-select';
export const selectOnSelectClass = 'select-block-item select-item select-input fail-num-select select-input-selected-color';
export const defaultWordGroupContent = 'The Quiz start group. If the group is not chosen or default group is chosen - quiz will be started from the random group';
export const failApproachesContent = 'The acceptable number of incorrectly named words';
