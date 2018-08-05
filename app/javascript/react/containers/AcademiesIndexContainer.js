import React from 'react';
import { Link } from 'react-router'

import AcademyTile from '../components/AcademyTile'

class AcademiesIndexContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      academies: [],
      adminStatus: false,
      instructorStatus: false
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
        instructorStatus: body.instructor_status
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render(){
    let { academies, instructorStatus, adminStatus } = this.state
    let academiesArray;
    let newAcademyButton;

    if(instructorStatus || adminStatus){
      newAcademyButton =
      <Link to="/academies/new">
        <button className="button">
          Add Your Academy
        </button>
      </Link>
    }

    if(academies.length != 0){
      academiesArray = academies.map((academy) => {
        return(
          <AcademyTile
            key={academy.id}
            id={academy.id}
            name={academy.name}
            address={academy.address}
            city={academy.city}
            state={academy.state}
            zipcode={academy.zipcode}
            website={academy.zipcode}
          />
        )
      })
    }
    return(
      <div>
        <h1>Hello from react index container</h1>
        {academiesArray}
        {newAcademyButton}
      </div>
    )
  }
}

export default AcademiesIndexContainer
