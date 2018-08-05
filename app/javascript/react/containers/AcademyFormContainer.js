import React from 'react';
import { browserHistory } from 'react-router';

class AcademyFormContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      website: "",
      errors: {}
    };
    this.handleClear = this.handleClear.bind(this)
  }

  handleClear(){
    this.setState({
      name: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      website: "",
      errors: {}
    })
  }

  render(){
    let errorDiv;


    return(
      <div>
      </div>
    )
  }
}

export default AcademyFormContainer
