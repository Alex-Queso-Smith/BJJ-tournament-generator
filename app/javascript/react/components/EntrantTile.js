import React from 'react';

const EntrantTile = props => {
  return(
    <div onClick={props.onClick} className={props.className}>
      {props.entrant}
    </div>
  )
}

export default EntrantTile;
