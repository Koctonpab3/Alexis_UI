import React from 'react';

// import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

import {
  shallow, configure,
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
    container = shallow(<EditableTable store={store} handleAdd={jest.fn()} />);
  });

  it('+++ render the connected(SMART) EditableTable component', () => {
    expect(container.length).toEqual(1);
    expect(container.find('.WordGroupTable').exists()).toBe(true);
  });

  it('should call handleAdd function when addGroupBtn is clicked', () => {
    container.instance().handleAdd = jest.fn();
    container.find('.addGroupBtn').simulate('click');
    expect(container.instance().handleAdd).toHaveBeenCalled();
  });
});
