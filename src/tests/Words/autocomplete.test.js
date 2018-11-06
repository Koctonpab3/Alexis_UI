import React from 'react';
// import { connect } from 'react-redux';
// import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import moment from 'moment';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { mount, shallow, render } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { stub } from 'sinon';
// import { render } from 'enzyme';
import Words from '../../Words/components/Words';
import WordsTable from '../../Words/components/Words';
import WrappedWordsTable from '../../Words/components/Words';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

test('it works', () => {
  const store = mockStore({});
  const wrapper = shallow(
    <Provider store={store}>
      <WordsTable />
    </Provider>,
  );
  // wrapper.find('.wordInput').simulate('click');
});
