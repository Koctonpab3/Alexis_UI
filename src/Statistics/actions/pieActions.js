  export const reDrawPie = ({ inprogress, learned }) => ({
    type: 'REDRAW',
    inprogress,
    learned,
  })
  
  export const cahngeActicePies = resConfig => ({
    type: CHANGE_ACTIVE,
    resConfig,
  });