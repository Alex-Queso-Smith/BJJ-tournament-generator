import React from 'react';

import AcademyShowTile from '../components/AcademyShowTile'

class AcademiesShowContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      academy: {},
      currentUser: null,
      adminStatus: null
    };
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
        currentUser: body.user_id
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    return(
      <div>
      <AcademyShowTile
        id={this.state.academy.id}
        name={this.state.academy.name}
        adminStatus={this.state.adminStatus}
        academyOwner={this.state.academy.user_id}
        userId={this.state.currentUser}
      />
      </div>
    )
  }
}

export default AcademiesShowContainer;
