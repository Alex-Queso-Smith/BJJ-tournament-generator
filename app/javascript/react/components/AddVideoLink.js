import React from 'react';
import { Link } from 'react-router';

const AddVideoLink = props => {
  return(
    <Link to={`/tournaments/${props.id}/videos/new`} >
      <button className="button medium hover-button-yellow add-video">
        Add Youtube Video!
      </button>
    </Link>
  )
}

export default AddVideoLink;
