import React from 'react';
import { browserHistory } from 'react-router';

import WaitingTournamentTile from '../components/WaitingTournamentTile';
import ActiveTournamentTile from './ActiveTournamentTile';
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
      currentUserId: null,
      rosterId: false,
      currentBracketId: null,
      currentUserAcademyId: null,
      tournamentId: null,
      academyId: null,
      userEntered: false,
      name: null,
      bracket1Id: null,
      bracket2Id: null,
      bracket3Id: null,
      bracket1Winners: [],
      bracket2Winners: [],
      bracket3Winner: [],
      bracket1Finished: false,
      bracket2Finished: false,
      bracket3Finished: false,
      tournamentReady: false,
      tournamentBegun: false,
      instructorStatus: false,
      initialRounds: [],
      bracket2Rounds: [],
      bracket3Round: []
    };
    this.createEntrant = this.createEntrant.bind(this);
    this.handleSubmitEntrantClick = this.handleSubmitEntrantClick.bind(this);
    this.deleteEntrant = this.deleteEntrant.bind(this);
    this.startTournament = this.startTournament.bind(this);
    this.handleTournamentStart = this.handleTournamentStart.bind(this);
    this.updateRoundWinnerBracket1 = this.updateRoundWinnerBracket1.bind(this);
    this.updateRoundWinnerBracket2 = this.updateRoundWinnerBracket2.bind(this);
    this.updateRoundWinnerBracket3 = this.updateRoundWinnerBracket3.bind(this);
    this.handleBracket1AdvanceClick = this.handleBracket1AdvanceClick.bind(this);
    this.handleBracket1Advance = this.handleBracket1Advance.bind(this);
    this.handleBracket2AdvanceClick = this.handleBracket2AdvanceClick.bind(this);
    this.handleBracket2Advance = this.handleBracket2Advance.bind(this);
    this.handleBracket3AdvanceClick = this.handleBracket3AdvanceClick.bind(this);
    this.handleBracket3Advance = this.handleBracket3Advance.bind(this);
    this.checkEntrantAbility = this.checkEntrantAbility.bind(this);
    this.deleteTournament = this.deleteTournament.bind(this);
  }

  componentDidMount(){
    fetch( `/api/v1/tournaments/${this.props.params.id}.json`, {
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
        tournamentId: body.tournament.id,
        belt: body.tournament.belt,
        startDate: body.tournament.start_date,
        weight: body.tournament.weight,
        gender: body.tournament.gender,
        winner: body.tournament.winner,
        finished: body.tournament.finished,
        tournamentBegun: body.tournament.tournament_begun,
        currentBracketId: body.tournament.current_bracket_id,
        currentUserAcademyId: body.current_user_academy_id,
        academyId: body.tournament.academy_id,
        userEntered: body.user_entered,
        bracket1Id: body.tournament.bracket1_id,
        currentUserId: body.current_user_id,
        name: body.name,
        entrants: body.entrants,
        rosterId: body.roster_id,
        instructorStatus: body.instructor_status,
        adminStatus: body.admin_status,
        initialRounds: body.initial_rounds,
        bracket1Winners: body.bracket1_winners,
        bracket2Rounds: body.bracket2_rounds,
        bracket2Winners: body.bracket2_winners,
        bracket3Round: body.bracket3_round,
        bracket3Winner: body.bracket3_winner,
        bracket1Finished: body.bracket1_finished,
        bracket2Finished: body.bracket2_finished,
        bracket3Finished: body.bracket3_finished
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSubmitEntrantClick(event){
    event.preventDefault();
    let payload = {
      currentUserId: this.state.currentUserId
    };

    this.createEntrant(payload)
  };

  createEntrant(payload){
    fetch(`/api/v1/tournaments/${this.props.params.id}/tourney_rosters.json`, {
      credentials: 'same-origin',
      method: 'POST',
      body: payload
    })
    .then(response => {
      if(response.ok){
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newEntrants = this.state.entrants;
      newEntrants.push(body.new_entrant);
      this.setState({
        entrants: newEntrants,
        rosterId: body.roster_id,
        userEntered: true
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteEntrant(currentUserId){
    fetch(`/api/v1/tournaments/${this.props.params.id}/tourney_rosters/${this.state.rosterId}.json`, {
      credentials: 'same-origin',
      method: 'DELETE'
    })
    .then(response => {
      if(response.ok){
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newEntrants = this.state.entrants.filter( entrant => {
        return entrant != this.state.name;
      });
      this.setState({
        entrants: newEntrants,
        userEntered: false
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleTournamentStart(event){
    event.preventDefault();
    let payload = {
      tournament_begun: true,
      entrants: this.state.entrants
    };
    this.startTournament(payload);
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
        tournamentBegun: true,
        initialRounds: body.rounds,
        bracket1Id: body.bracket1_id,
        currentBracketId: body.current_bracket_id
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleBracket1AdvanceClick(event){
    event.preventDefault();

    let payload = {
      entrants: this.state.bracket1Winners
    };
    this.handleBracket1Advance(payload);
  }

  handleBracket1Advance(payload){
    fetch(`/api/v1/tournaments/${this.props.params.id}/advance_brackets.json`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if(response.ok){
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
        bracket2Id: body.bracket2_id,
        currentBracketId: body.current_bracket_id,
        bracket2Rounds: body.rounds,
        bracket1Finished: true
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleBracket2AdvanceClick(event){
    event.preventDefault();

    let payload = {
      entrants: this.state.bracket2Winners
    };
    this.handleBracket2Advance(payload);
  }

  handleBracket2Advance(payload){
    fetch(`/api/v1/tournaments/${this.props.params.id}/final_rounds.json`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if(response.ok){
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
        bracket3Id: body.bracket3_id,
        currentBracketId: body.current_bracket_id,
        bracket3Round: body.round,
        bracket2Finished: true
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleBracket3AdvanceClick(event){
    event.preventDefault();

    let payload = {
      winner: this.state.winner
    };
    this.handleBracket3Advance(payload);
  }

  handleBracket3Advance(payload){
    fetch(`/api/v1/tournaments/${this.props.params.id}/brackets/${this.state.currentBracketId}.json`, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if(response.ok){
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
        winner: body.winner
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  updateRoundWinnerBracket1(winner, id){
    fetch(`/api/v1/rounds/${id}.json`, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify({winner: winner})
    })
    .then(response => {
      if(response.ok){
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newWinners = this.state.bracket1Winners.filter( entrant => {
        return entrant != body.uncheckedEntrant;
      });
      if (!newWinners.includes(body.winner)) {
        newWinners.push(body.winner);
      }
      this.setState({
        bracket1Winners: newWinners,
        initialRounds: body.rounds
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  updateRoundWinnerBracket2(winner, id){
    fetch(`/api/v1/rounds/${id}.json`, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify({winner: winner})
    })
    .then(response => {
      if(response.ok){
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newWinners = this.state.bracket2Winners.filter( entrant => {
        return entrant != body.uncheckedEntrant;
      });
      if (!newWinners.includes(body.winner)) {
        newWinners.push(body.winner);
      }
      this.setState({
        bracket2Winners: newWinners,
        bracket2Rounds: body.rounds
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  updateRoundWinnerBracket3(winner, id){
    fetch(`/api/v1/rounds/${id}.json`, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify({winner: winner})
    })
    .then(response => {
      if(response.ok){
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let newWinner = this.state.bracket3Winner.filter( entrant => {
        return entrant != body.uncheckedEntrant;
      });
      if (!newWinner.includes(body.winner)) {
        newWinner.push(body.winner);
      }
      this.setState({
        bracket3Winner: newWinner,
        bracket3Round: body.rounds
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deleteTournament(){
    let result = confirm("Delete Tournament?")
    if (result == true) {
      fetch(`/api/v1/tournaments/${this.state.tournamentId}.json`, {
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json',
        'X-Requested-With': 'XHMLttpRequest' },
        method: 'DELETE',
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
      .then(body => browserHistory.push(`/academies/${this.state.academyId}`))
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  checkEntrantAbility(){
    if (
      !this.state.entrants.includes(this.state.name) &&
      this.state.entrants.length == 8) {
        return false
      } else {
        return true
      }
  }

  render(){

    let tournamentTile, startTournamentButton, signUpButton, deleteButton;
    let winner = "Undecided"

    if (this.state.winner) {
      winner = this.state.winner
    }

    let handleDeleteEntrant = () => {
      this.deleteEntrant(this.state.currentUserId);
    };

    if (
      this.state.entrants.length == 8 &&
      this.state.instructorStatus &&
      !this.state.tournamentBegun &&
      this.state.academyId == this.state.currentUserAcademyId
      ) {
      startTournamentButton =
      <button id="start-button" className="button medium hover-button-yellow" onClick={this.handleTournamentStart}>
        Start the Tournament!
      </button>
    }

    if (this.checkEntrantAbility() && this.state.academyId == this.state.currentUserAcademyId) {
      if (!this.state.userEntered && !this.state.instructorStatus) {
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
    }

    if (
      this.state.academyId == this.state.currentUserAcademyId &&
      this.state.instructorStatus || this.state.adminStatus
    ) {
      deleteButton =
      <button id="delete-button" onClick={this.deleteTournament} className="button medium hover-button">
        Delete this Tournament
      </button>
    }

    if (!this.state.tournamentBegun) {
      tournamentTile =
        <WaitingTournamentTile
          entrants={this.state.entrants}
          signUpButton={signUpButton}
          instructorStatus={this.state.instructorStatus}
        />
    } else {
      tournamentTile =
        <ActiveTournamentTile
          tournamentId={this.props.params.id}
          initialRounds={this.state.initialRounds}
          currentBracketId={this.state.currentBracketId}
          updateRoundWinnerBracket1={this.updateRoundWinnerBracket1}
          updateRoundWinnerBracket2={this.updateRoundWinnerBracket2}
          updateRoundWinnerBracket3={this.updateRoundWinnerBracket3}
          bracket1Winners={this.state.bracket1Winners}
          bracket2Winners={this.state.bracket2Winners}
          bracket3Winner={this.state.bracket3Winner}
          handleBracket1Advance={this.handleBracket1AdvanceClick}
          handleBracket2Advance={this.handleBracket2AdvanceClick}
          handleBracket3Advance={this.handleBracket3AdvanceClick}
          secondBracketRounds={this.state.bracket2Rounds}
          finalBracketRound={this.state.bracket3Round}
          bracket1Status={this.state.bracket1Finished}
          bracket2Status={this.state.bracket2Finished}
          bracket3Status={this.state.bracket3Finished}
          winner={this.state.winner}
        />
    }

    return(
      <div >
        <div className="tournament-title">
          <div className="tournament-info">
            <p>{`${this.state.belt} Belt Tournament`}</p>
            <p>{`${this.state.weight}`}</p>
            <p>{`${this.state.gender}`}</p>
            <p>{`Start Date: ${this.state.startDate}`}</p>
            <p>Tournament Winner</p>
            <p id="winner">{winner}</p>
          </div>
        </div>
        {tournamentTile}
        {startTournamentButton}
        {deleteButton}
        <BackButton id={"back-button"}/>
      </div>
    )
  }
}

export default TournamentShow;
