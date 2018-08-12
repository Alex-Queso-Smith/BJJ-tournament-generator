import React from 'react';

import RoundTile from '../components/RoundTile';

class ActiveTournamentTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bracket1_finished: false,
      bracket2_finished: false,
      bracket3_finished: false,
      winner: null,
      populated: false,
      currentBracketId: null
    };
    this.startTournament = this.startTournament.bind(this)
    this.handleStartTournamentClick = this.handleStartTournamentClick.bind(this)
  }

  componentDidMount(){

  }

  startTournament(entrants){
    fetch(`api/v1/tournaments/${this.props.tournamentId}/brackets.json`, {
      credentials: 'same-origin',
      method: 'POST',
      body: entrants
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
        populated: true,
        currentBracketId: null
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleStartTournamentClick(){

  }

  render(){
    let firstRounds;

    if (this.props.initialRounds) {
      firstRounds = this.props.initialRounds.map((round) => {
        return(
          <RoundTile
            key={round.id}
            id={round.id}
            entrant1={round.entrant1}
            entrant2={round.entrant2}
          />
        )
      })
    }
    return(
      <div>
        Started Tournament
        {firstRounds}
      </div>
    )
  }
}

export default ActiveTournamentTile;
