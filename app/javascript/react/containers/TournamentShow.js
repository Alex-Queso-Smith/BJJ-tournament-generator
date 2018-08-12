import React from 'react';

import BackButton from '../components/BackButton';
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
      instructorStatus: false,
      spotsLeft: 8
    };
    this.createEntrant = this.createEntrant.bind(this)
    this.handleSubmitEntrantClick = this.handleSubmitEntrantClick.bind(this)
    this.checkEntrantStatus = this.checkEntrantStatus.bind(this)
    this.deleteEntrant = this.deleteEntrant.bind(this)
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
      let spots = 8 - body.entrants.length

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
        instructorStatus: body.instructor_status,
        spotsLeft: spots
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

  render(){
    let entrants, signUpButton, tournamentSpots, tournamentTile;

    if(this.state.spotsLeft != 0){
      tournamentSpots = <h2>{this.state.spotsLeft} Spots Left to Fill!</h2>
    } else {
      tournamentSpots = <h2>Tournament Filled!</h2>
    }

    let handleDeleteEntrant = () => {
      this.deleteEntrant(this.state.currentUserId)
    }

    if(this.state.entrants.length != 0){
      entrants = this.state.entrants.map((entrant) => {
        return(
          <h4 key={entrant.id}>{entrant.first_name}</h4>
        )
      })
    }

    if(this.state.spotsLeft == 0 && this.state.instructorStatus){
      signUpButton =
      <button className="button medium hover-button-yellow">
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
          entrants={entrants}
          tournamentSpots={tournamentSpots}
          signUpButton={signUpButton}
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
        <BackButton
        />
      </div>
    )
  }
}

export default TournamentShow;
