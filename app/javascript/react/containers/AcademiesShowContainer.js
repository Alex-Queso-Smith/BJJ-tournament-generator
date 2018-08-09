import React from 'react';
import { Link} from 'react-router';

import EditAcademyLink from '../components/EditAcademyLink'
import AcademyShowTile from '../components/AcademyShowTile'
import AcademyMenu from './AcademyMenu'

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
      currentUser: null,
      adminStatus: null
    };
    this.academyOwnerCheck = this.academyOwnerCheck.bind(this)
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
        currentUser: body.user_id,
        students: body.students,
        whiteBelts: body.white_belts,
        blueBelts: body.blue_belts,
        purpleBelts: body. purple_belts,
        brownBelts: body.brownBelts,
        blackBelts: body.black_belts
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  academyOwnerCheck(userId){
    return userId == this.state.academy.user_id
  }

  render(){
    let editAcademyButton;

    if(this.academyOwnerCheck(this.state.currentUser) || this.state.adminStatus){
        editAcademyButton = <EditAcademyLink id={this.props.id} />
      }

    return(
      <div>
      <AcademyMenu
        academyName={this.state.academy.name}
        students={this.state.students}
      />
      <AcademyShowTile
        id={this.state.academy.id}
        name={this.state.academy.name}
        adminStatus={this.state.adminStatus}
        academyOwner={this.state.academy.user_id}
        userId={this.state.currentUser}
      />
      {editAcademyButton}
      </div>
    )
  }
}

export default AcademiesShowContainer;
