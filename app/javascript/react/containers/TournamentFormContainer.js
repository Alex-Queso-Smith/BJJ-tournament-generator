import React from 'react';

import TournamentInput from '../components/TournamentInput'

class TournamentFormController extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.handleChange = this.handleChange.bind(this)
    this.validateEntry = this.validateEntry.bind(this)
  }

  handleChange(event){
    this.validateEntry(event.target.name, event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  validateEntry(name, fieldValue){
    if (fieldValue.trim() === '') {
      let newError = { [name]: `You must enter a ${name}`};
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    } else {
      let errorState = this.state.errors;
      delete errorState[name];
      this.setState({ errors: errorState });
      return true;
    }
  }

  render(){
    return(
      <form className="grid-container" id="tournament-form">

      <button id="form-button" type="submit" className="button medium hover-button" value="Submit">Create Academy</button>
      </form>
    );
  }
}

export default TournamentFormController;
