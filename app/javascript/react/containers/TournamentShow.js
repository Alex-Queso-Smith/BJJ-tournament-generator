import React from 'react';

import WaitingTournamentTile from '../components/WaitingTournamentTile';
import ActiveTournamentTile from '../components/ActiveTournamentTile';

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
      currentUserId: null,
      rosterId: false,
      tournamentReady: false,
      tournamentBegun: false,
      instructorStatus: false
    };
    this.createEntrant = this.createEntrant.bind(this)
    this.handleSubmitEntrantClick = this.handleSubmitEntrantClick.bind(this)
    this.checkEntrantStatus = this.checkEntrantStatus.bind(this)
    this.deleteEntrant = this.deleteEntrant.bind(this)
    this.startTournament = this.startTournament.bind(this)
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
        entrants: body.entrants,
        rosterId: body.roster_id,
        instructorStatus: body.instructor_status
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
        entrants: newEntrants,
        rosterId: body.roster_id
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteEntrant(currentUserId){
    fetch(`/api/v1/tourney_rosters/${this.state.rosterId}.json`, {
      credentials: 'same-origin',
      method: 'DELETE'
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
      let newEntrants = this.state.entrants.filter( entrant => {
        return entrant.id != currentUserId
      })
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

  startTournament(event){
   event.preventDefault;
   this.setState({
     tournamentBegun: true
   })
  }

  render(){
    let signUpButton, tournamentTile;

    let handleDeleteEntrant = () => {
      this.deleteEntrant(this.state.currentUserId)
    }

    if(this.state.entrants.length == 8 && this.state.instructorStatus){
      signUpButton =
      <button className="button medium hover-button-yellow" onClick={this.startTournament}>
        Start the Tournament!
      </button>
    } else if (this.checkEntrantStatus(this.state.entrants)){
      signUpButton =
      <button onClick={this.handleSubmitEntrantClick} className="button medium hover-button-yellow">
        Enter this Tournament
      </button>
    } else {
      signUpButton =
      <div>
        <h2>You're Signed Up!</h2>
        <button onClick={handleDeleteEntrant} className="button medium hover-button">
          Withdraw From Tournament
        </button>
      </div>
    }

    if(!this.state.tournamentBegun){
      tournamentTile =
        <WaitingTournamentTile
          entrants={this.state.entrants}
          signUpButton={signUpButton}
          tournamentId={this.props.params.id}
        />
    } else {
      tournamentTile =
      <ActiveTournamentTile
      />
    }


    return(
      <div>
        {this.state.belt}<br/>
        {this.state.startDate}<br/>
        {this.state.weight}<br/>
        {this.state.gender}<br/>
        {this.state.winner}<br/>
        {this.state.finished}<br/>
        {tournamentTile}
      </div>
    )
  }
}

export default TournamentShow;
