import React from 'react';

import RoundTile from '../components/RoundTile';

class ActiveTournamentTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bracket1Finished: false,
      bracket1Winners: [],
      bracket2Finished: false,
      bracket2Id: null,
      bracket3Finished: false,
      winner: null,
      currentBracketId: null
    };
    this.checkIfBracketReady = this.checkIfBracketReady.bind(this)
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
        bracket1Winners: body.bracket1_winners,
        bracket2Id: body.tournament.bracket2_id
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  checkIfBracketReady(winners, length){
    return winners.length == length
  }

  render(){
    let firstRounds, secondRounds, finalRound, advanceTournamentButton;

    let bracket1Ready = this.checkIfBracketReady(this.props.bracket1Winners, 4)
    let bracket2Ready = this.checkIfBracketReady(this.props.bracket2Winners, 2)
    let bracket3Ready = this.checkIfBracketReady(this.props.bracket3Winner, 1)

    if (bracket1Ready && bracket2Ready && bracket3Ready) {
      advanceTournamentButton =
      <button onClick={this.props.handleBracket2Advance} className="button small hover-button-yellow">
        Finish Tournament!
      </button>
    } else if (bracket1Ready && bracket2Ready) {
      advanceTournamentButton =
      <button onClick={this.props.handleBracket2Advance} className="button small hover-button-yellow">
        Final Bracket!
      </button>
    } else if (bracket1Ready) {
      advanceTournamentButton =
        <button onClick={this.props.handleBracket1Advance} className="button small hover-button-yellow">
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
            updateRoundWinner={this.props.updateRoundWinnerBracket1}
          />
        )
      })
    }

    if (this.props.secondBracketRounds) {
      secondRounds = this.props.secondBracketRounds.map((round) => {
        return(
          <RoundTile
            key={round.id}
            id={round.id}
            entrant1={round.entrant1}
            entrant2={round.entrant2}
            winner={round.winner}
            updateRoundWinner={this.props.updateRoundWinnerBracket2}
          />
        )
      })
    }

    if (this.props.finalBracketRound) {
      finalRound = this.props.finalBracketRound.map((round) => {
        return(
          <RoundTile
            key={round.id}
            key={round.id}
            id={round.id}
            entrant1={round.entrant1}
            entrant2={round.entrant2}
            winner={round.winner}
            updateRoundWinner={this.props.updateRoundWinnerBracket3}
          />
        )
      })
    }

    return(
      <div id="tournament-tile" className="grid-container">
        <div className="grid-x grid-margin-x">
          <div className="cell small-4">
            <div className="grid-container">
              <div className="grid-y grid-margin-y">
                {firstRounds}
              </div>
            </div>
          </div>
           <div className="cell small-4">
             <div className="grid-container">
               <div className="grid-y grid-margin-y">
                 {secondRounds}
               </div>
             </div>
           </div>
           <div className="cell small-4">
             <div className="grid-container">
               <div className="grid-y grid-margin-y">
                 {finalRound}
               </div>
             </div>
           </div>
        </div>
        {advanceTournamentButton}
      </div>
    )
  }
}

export default ActiveTournamentTile;
