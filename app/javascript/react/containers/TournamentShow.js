import React from 'react';
import { browserHistory } from 'react-router'

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
      currentBracketId: null,
      bracket1Id: null,
      bracket2Id: null,
      bracket3Id: null,
      bracket1Winners: [],
      tournamentReady: false,
      tournamentBegun: false,
      instructorStatus: false,
      initialRounds: []
    };
    this.createEntrant = this.createEntrant.bind(this)
    this.handleSubmitEntrantClick = this.handleSubmitEntrantClick.bind(this)
    this.checkEntrantStatus = this.checkEntrantStatus.bind(this)
    this.deleteEntrant = this.deleteEntrant.bind(this)
    this.startTournament = this.startTournament.bind(this)
    this.handleTournamentStart = this.handleTournamentStart.bind(this)
    this.updateRoundWinner = this.updateRoundWinner.bind(this)
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
        tournamentBegun: body.tournament.tournament_begun,
        currentBracketId: body.tournament.current_bracket_id,
        bracket1Id: body.tournament.bracket1_id,
        currentUserId: body.current_user_id,
        entrants: body.entrants,
        rosterId: body.roster_id,
        instructorStatus: body.instructor_status,
        initialRounds: body.initial_rounds,
        bracket1Winners: body.bracket1_winners
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

  startTournament(payload){
    fetch(`/api/v1/tournaments/${this.props.params.id}/brackets.json`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
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
    .then(body => {
      this.setState({
        tournamentBegun: true,
        initialRounds: body.rounds,
        bracket1_Id: body.bracket1_id,
        currentBracketId: body.current_bracket_id
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleTournamentStart(event){
    event.preventDefault;
    let payload = {
      tournament_begun: true,
      entrants: this.state.entrants
    }
    this.startTournament(payload);
  }

  updateRoundWinner(winner, id){
    fetch(`/api/v1/rounds/${id}.json`, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify(winner)
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

      let newWinners = this.state.bracket1Winners.filter( entrant => {
        return entrant != body.uncheckedEntrant
      })
      this.setState({
        bracket1Winners: newWinners,
        initialRounds: body.rounds
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let signUpButton, tournamentTile, startTournamentButton;

    let handleDeleteEntrant = () => {
      this.deleteEntrant(this.state.currentUserId)
    }

    if(
      this.state.entrants.length == 8 &&
      this.state.instructorStatus &&
      !this.state.tournamentBegun
      ){
      startTournamentButton =
      <button className="button medium hover-button-yellow" onClick={this.handleTournamentStart}>
        Start the Tournament!
      </button>
    }

    if (this.checkEntrantStatus(this.state.entrants) && !this.state.instructorStatus){
      signUpButton =
      <button onClick={this.handleSubmitEntrantClick} className="button medium hover-button-yellow">
        Enter this Tournament
      </button>
    } else if (!this.state.instructorStatus) {
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
          tournamentId={this.props.params.id}
          initialRounds={this.state.initialRounds}
          currentBracketId={this.state.currentBracketId}
          updateRoundWinner={this.updateRoundWinner}
        />
    }


    return(
      <div>
        {this.state.belt}<br/>
        {this.state.startDate}<br/>
        {this.state.weight}<br/>
        {this.state.gender}<br/>
        {this.state.winner}<br/>
        {tournamentTile}
        {startTournamentButton}
      </div>
    )
  }
}

export default TournamentShow;
