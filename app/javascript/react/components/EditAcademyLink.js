import React from 'react';
import { Link } from 'react-router';

const EditAcademyLink = props => {
  return(
    <Link to={`/academies/${props.id}/edit`} >
      <button className="button medium hover-button-yellow edit-academy">
        Edit Academy Info
      </button>
    </Link>
  )
}

export default EditAcademyLink
