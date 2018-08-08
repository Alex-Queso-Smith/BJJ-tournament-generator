import React from 'react';

import AcademyShowTile from '../components/AcademyShowTile'

class AcademiesShowContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      academy: {},
      current_user: null,
      adminStatus: null,
      instructorStatus: null
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
        academy: body.academy
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    return(
      <div>
      <AcademyShowTile

      />
      </div>
    )
  }
}

export default AcademiesShowContainer;
