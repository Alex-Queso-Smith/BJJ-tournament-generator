import React from 'react';

const AcademyInput = props => {
  return(
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text" name={props.name} value={props.content} onChange={props.handleChange}></input>
    </div>
  );
};

export default AcademyInput;
