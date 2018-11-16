  export const reDrawPie = ({ inprogress, learned }) => ({
    type: 'REDRAW',
    inprogress,
    learned,
  })
  
  export const changeToInprogress = () => ({
    type: 'CHANGE_TO_WRONG',
  });
  export const changeToLearned = () => ({
    type: 'CHANGE_TO_SUCCESS',
  });
  export const selectGroup = ({ defaultSelectValue, activeGroupId }) => ({
    type: 'SELECT_GROUP',
    defaultSelectValue,
    activeGroupId,
  });
  export const loadWords = ({ wordsTable }) => ({
    type: 'LOAD_WORDS',
    wordsTable,
  });