import React from 'react';
import { Link} from 'react-router';

import EditAcademyLink from '../components/EditAcademyLink'
import AcademyShowTile from './AcademyShowTile'
import AcademyMenu from '../components/AcademyMenu'

class AcademiesShowContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      academy: {},
      students: [],
      whiteBelts: [],
      blueBelts: [],
      purpleBelts: [],
      brownBelts: [],
      blackBelts: [],
      openTournaments: [],
      closedTournaments: [],
      currentUserId: null,
      adminStatus: null
    };
    this.academyOwnerCheck = this.academyOwnerCheck.bind(this)
    this.academyStudentCheck = this.academyStudentCheck.bind(this)
  }

  componentDidMount(){
    fetch(`/api/v1/academies/${this.props.params.id}`, {
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        academy: body.academy,
        adminStatus: body.admin_status,
        currentUserId: body.user_id,
        students: body.students,
        whiteBelts: body.white_belts,
        blueBelts: body.blue_belts,
        purpleBelts: body.purple_belts,
        brownBelts: body.brownBelts,
        blackBelts: body.black_belts,
        openTournaments: body.open_tournaments,
        closedTournaments: body.closed_tournaments
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  academyOwnerCheck(userId){
    return userId == this.state.academy.user_id
  }

  academyStudentCheck(userId, academyId){
    return userId == academyId
  }

  render(){
    let editAcademyButton;

    if (this.academyOwnerCheck(this.state.currentUser) || this.state.adminStatus) {
        editAcademyButton = <EditAcademyLink id={this.props.params.id} />
      }

    return(
      <div>
      <AcademyMenu
        academy={this.state.academy}
        students={this.state.students}
        academyId={this.props.params.id}
        currentUserId={this.state.currentUserId}
        openTournaments={this.state.openTournaments}
        closedTournaments={this.state.closedTournaments}
        academyOwnerCheck={this.academyOwnerCheck}
      />
      <AcademyShowTile
        id={this.state.academy.id}
        name={this.state.academy.name}
        address={this.state.academy.address}
        city={this.state.academy.city}
        state={this.state.academy.state}
        zipcode={this.state.academy.zipcode}
        website={this.state.academy.website}
        adminStatus={this.state.adminStatus}
        academyOwner={this.state.academy.user_id}
        userId={this.state.currentUserId}
        studentCheck={this.academyStudentCheck}
        closedTournaments={this.state.closedTournaments}
      />
      {editAcademyButton}
      </div>
    )
  }
}

export default AcademiesShowContainer;
