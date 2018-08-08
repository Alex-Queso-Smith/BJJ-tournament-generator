import React from 'react';
import { Link} from 'react-router';

import EditAcademyLink from './EditAcademyLink'

class AcademyShowTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.academyOwnerCheck = this.academyOwnerCheck.bind(this)
  }

  academyOwnerCheck(userId){
    return userId == this.props.academyOwner
  }
  render(){
    let editAcademyButton;

    if(this.academyOwnerCheck(this.props.userId) || this.props.adminStatus){
        editAcademyButton = <EditAcademyLink id={this.props.id} />
      }

    return(
      <div className="show-tile">
      {this.props.name}
      {editAcademyButton}
      </div>
    )
  }
};

export default AcademyShowTile;
