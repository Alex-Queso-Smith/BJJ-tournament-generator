import React from 'react';
import { Link } from 'react-router'

import AcademyIndexTile from '../components/AcademyIndexTile'

class AcademiesIndexContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      academies: [],
      currentUserAcademyId: null,
      adminStatus: false,
      instructorStatus: false,
    };
  }

  componentDidMount(){
    fetch('/api/v1/academies.json', {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        academies: body.academies,
        adminStatus: body.admin_status,
        instructorStatus: body.instructor_status,
        currentUserAcademyId: body.current_user_academy_id
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){
    let { academies, instructorStatus, adminStatus } = this.state
    let academiesArray, newAcademyButton;

    if (this.state.instructorStatus && !this.state.currentUserAcademyId || adminStatus) {
      newAcademyButton =
      <Link to="/academies/new">
        <button className="button medium hover-button new-academy">
          Add Your Academy
        </button>
      </Link>
    }

    if (academies.length != 0) {
      academiesArray = academies.map((academy) => {
        return(
            <AcademyIndexTile
              key={academy.id}
              id={academy.id}
              name={academy.name}
              address={academy.address}
              city={academy.city}
              state={academy.state}
              zipcode={academy.zipcode}
              website={academy.zipcode}
              photo={academy.academy_photo}
            />
        )
      })
    }
    return(
      <div>
        <div className="grid-container">
          <h1 className="title-index">Academies</h1>
          <div id="index-page" className="grid-x grid-margin-x grid-margin-y">
              {academiesArray}
          </div>
          {newAcademyButton}
        </div>
      </div>
    )
  }
}

export default AcademiesIndexContainer
