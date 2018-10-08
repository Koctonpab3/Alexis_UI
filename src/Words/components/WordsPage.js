import React from 'react';

// components
import Words from './Words';

const WordsPage = props => (
  <div className="wordsTable">
    <Words {...props} />
  </div>
);

export default WordsPage;
