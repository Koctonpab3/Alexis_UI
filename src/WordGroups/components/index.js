import React from 'react';
import { history } from '../../Base/routers/AppRouter'
// components
import WordTable from './table';
import Path from './path';

class Wordgroups extends React.Component {

  componentDidMount() {
    console.log(history.location)
  }

  render() {
    return (
      <div className="wordTableContainer">
        <Path />
        <WordTable />
      </div>
    )
  }
}
/* const Wordgroups = () => (
  <div className="wordTableContainer">
    <Path />
    <WordTable />
  </div>
); */
export default Wordgroups;
