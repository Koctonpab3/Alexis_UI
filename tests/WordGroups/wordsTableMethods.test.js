import React from 'react';

// import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import {
  shallow, mount, render, configure,
} from 'enzyme';

import configureStore from 'redux-mock-store';
import { EditableTable } from '../../src/WordGroups/components/EditableTable';


configure({ adapter: new Adapter() });


describe('(Shallow + passing the {store} directly)', () => {
  const initialState = {
    editingKey: '',
    stateKey: '',
    dataSource: [],
  };
  const mockStore = configureStore();
  let store;
  let container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<EditableTable store={store} />);
  });

  it('+++ render the connected(SMART) component', () => {
    expect(container.length).toEqual(1);
  });

  // it('+++ check Prop matches with initialState', () => {
  //   expect(container.prop('dataSource')).toEqual(initialState.dataSource);
  // });
});


