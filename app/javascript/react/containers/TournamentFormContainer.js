import React from 'react';
import { browserHistory } from 'react-router';

import BackButton from '../components/BackButton'

class TournamentFormController extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      belt: '',
      gender: '',
      startDate: '',
      weight: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this)
    this.validateEntry = this.validateEntry.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.createTournament = this.createTournament.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleClear(){
    this.setState({
      belt: '',
      weight: '',
      startDate: '',
      gender: '',
      errors: {}
    })
  }

  createTournament(payload){
   fetch(`/api/v1/academies/${this.props.params.id}/tournaments.json`, {
     credentials: 'same-origin',
     headers: { 'Content-Type': 'application/json' },
     method: 'POST',
     body: JSON.stringify(payload)
   })
     .then(response => {
       if(response.ok){
         return response
       } else {
         let errorMessage = `${response.status} (${response.statusText})`,
             error = new Error(errorMessage)
         throw(error)
       }
     })
     .then(response => response.json())
     .then(body => browserHistory.push(`/academies/${this.props.params.id}`))
     .catch(error => console.error(`Error in fetch: ${error.message}`));
   }

   handleSubmit(event){
     event.preventDefault();
     Object.keys(this.state).forEach(key => {
       if (key != "errors") {
         this.validateEntry(key, this.state[key])
       }
     })
     if (Object.keys(this.state.errors).length == 0){
       let newTournament = {
         belt: this.state.belt,
         weight: this.state.weight,
         start_date: this.state.startDate,
         gender: this.state.gender
       }

       this.handleClear();
       this.createTournament(newTournament);
     }
   }

  render(){
    let errorDiv;

    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return(
      <form className="grid-container" id="academy-form" onSubmit={this.handleSubmit}>
        {errorDiv}
        <h1 className="user-title">New Tournament</h1>
        <label htmlFor="startDate" >Please Input Start Date (e.g. May 1st, 2018)</label>
        <input type="text" name="startDate" value={this.state.startDate} onChange={this.handleChange} />

        <label htmlFor="weight">Please input weight range (e.g., 150 - 185, Absolute, 155 and up)</label>
        <input type="text" name="weight" value={this.state.weight} onChange={this.handleChange} />

        <div className="grid-x grid-padding-x">
          <div className="field small-6 cell">
            <label>
              Select Belt
              <select name="belt" onChange={this.handleChange}>
                <option value=""></option>
                <option value="White">White</option>
                <option value="Blue">Blue</option>
                <option value="Purple">Purple</option>
                <option value="Brown">Brown</option>
                <option value="Black">Black</option>
              </select>
            </label>
          </div>

          <div className="field small-6 cell">
            <label>
              Select Gender
              <select name="gender" onChange={this.handleChange}>
                <option value=""></option>
                <option value="Women's">Women</option>
                <option value="Men's">Men</option>
                <option value="Men and Women">Co-Ed</option>
              </select>
            </label>
          </div>
        </div>
      <button id="form-button" type="submit" className="button medium hover-button-yellow" value="Submit">Create Tournament</button>
      <BackButton
      />
      </form>

    );
  }
}

export default TournamentFormController;
