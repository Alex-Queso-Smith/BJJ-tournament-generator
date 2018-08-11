import React from 'react';

import BackButton from '../components/BackButton';

class TournamentShow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      belt: '',
      startDate: '',
      weight: '',
      gender: '',
      entrants: [],
      winner: null,
      finished: null,
      currentUserId: null
    };
    this.createEntrant = this.createEntrant.bind(this)
    this.handleSubmitEntrantClick = this.handleSubmitEntrantClick.bind(this)
    this.checkEntrantStatus = this.checkEntrantStatus.bind(this)
  }

  componentDidMount(){
    fetch( `/api/v1/tournaments/${this.props.params.id}`, {
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
        belt: body.tournament.belt,
        startDate: body.tournament.start_date,
        weight: body.tournament.weight,
        gender: body.tournament.gender,
        winner: body.tournament.winner,
        finished: body.tournament.finished,
        currentUserId: body.current_user_id,
        entrants: body.entrants
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  createEntrant(payload){
    fetch(`/api/v1/tournaments/${this.props.params.id}/tourney_rosters.json`, {
      credentials: 'same-origin',
      method: 'POST',
      body: payload
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
    .then(body => {
      let newEntrants = this.state.entrants
      newEntrants.push(body.new_entrant)
      this.setState({
        entrants: newEntrants
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSubmitEntrantClick(event){
    event.preventDefault();
    let payload = {
      currentUserId: this.state.currentUserId
    }

    this.createEntrant(payload)
  }

  checkEntrantStatus(entrants){
    let status = true
    entrants.forEach((entrant) => {
      if (entrant.id == this.state.currentUserId) {
        status = false
      }
    })
    return status
  }

  render(){
    let entrants;
    let signUpButton;

    if(this.state.entrants.length != 0){
      entrants = this.state.entrants.map((entrant) => {
        return(
          <h4 key={entrant.id}>{entrant.first_name}</h4>
        )
      })
    }

    if(this.checkEntrantStatus(this.state.entrants)){
      signUpButton = <button onClick={this.handleSubmitEntrantClick} className="button medium hover-button-yellow">Enter this Tournament</button>
    } else {
      signUpButton = <h2>You're Signed Up!</h2>
    }

    return(
      <div>
        {this.state.belt}
        {this.state.startDate}
        {this.state.weight}
        {this.state.gender}
        {this.state.winner}
        {this.state.finished}
        {entrants}
        {signUpButton}
        <BackButton
        />
      </div>
    )
  }
}

export default TournamentShow;
