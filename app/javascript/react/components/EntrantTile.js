import React from 'react';

const EntrantTile = props => {
  return(
    <button onClick={props.onClick} className={props.className}>
      <span>{props.entrant}</span><i className="ion-checkmark"></i>
    </button>
  )
}

export default EntrantTile;
