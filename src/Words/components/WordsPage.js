import React from 'react';

// components
import WrappedWordsTable from './Words';

const WordsPage = props => (
  <div className="wordsTable">
    <WrappedWordsTable {...props} />
  </div>
);

export default WordsPage;
