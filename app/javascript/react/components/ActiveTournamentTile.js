import React from 'react';

import RoundTile from '../components/RoundTile';

class ActiveTournamentTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bracket1Finished: false,
      bracket1Winners: [],
      bracket2Finished: false,
      bracket3Finished: false,
      winner: null,
      currentBracketId: null
    };
  }

  componentDidMount(){
    fetch(`/api/v1/tournaments/${this.props.tournamentId}`, {
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
        bracket1Winners: body.bracket1_winners
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let firstRounds, advanceTournamentButton;

    if (this.state.bracket1Winners.length == 4) {
      advanceTournamentButton =
        <button className="button small hover-button-yellow">
          Next Bracket!
        </button>
    }


    if (this.props.initialRounds) {
      firstRounds = this.props.initialRounds.map((round) => {

        return(
          <RoundTile
            key={round.id}
            id={round.id}
            entrant1={round.entrant1}
            entrant2={round.entrant2}
            winner={round.winner}
            updateRoundWinner={this.props.updateRoundWinner}
          />
        )
      })
    }

    return(
      <div className="grid-container">
        <div className="grid-y grid-margin-y grid padding-y">
           {firstRounds}
        </div>

        {advanceTournamentButton}
      </div>
    )
  }
}

export default ActiveTournamentTile;
