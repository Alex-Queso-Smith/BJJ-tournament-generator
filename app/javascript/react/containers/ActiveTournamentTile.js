import React from 'react';

import RoundTile from './RoundTile';

class ActiveTournamentTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      winner: null
    };
    this.checkIfBracketReady = this.checkIfBracketReady.bind(this)
    this.checkIfBracketDone = this.checkIfBracketDone.bind(this)
    this.decoyFunction = this.decoyFunction.bind(this)
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
        winner: body.tournament.winner
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  checkIfBracketReady(winners, length){
    return winners.length == length
  }

  checkIfBracketDone(onClick, bracketStatus){
    if (bracketStatus) {
      return this.decoyFunction
    } else {
      return onClick
    }
  }

  decoyFunction(event){
    event.preventDefault;
  }

  render(){

    let firstRounds, secondRounds, finalRound, advanceTournamentButton, winner;

    let bracket1Ready = this.checkIfBracketReady(this.props.bracket1Winners, 4)
    let bracket2Ready = this.checkIfBracketReady(this.props.bracket2Winners, 2)
    let bracket3Ready = this.checkIfBracketReady(this.props.bracket3Winner, 1)

    if (bracket1Ready && bracket2Ready && bracket3Ready) {
      advanceTournamentButton =
      <button onClick={this.props.handleBracket3Advance} className="button large hover-button-yellow">
        Finish Tournament!
      </button>
    } else if (bracket1Ready && bracket2Ready) {
      advanceTournamentButton =
      <button onClick={this.props.handleBracket2Advance} className="button large hover-button-yellow">
        Final Bracket!
      </button>
    } else if (bracket1Ready) {
      advanceTournamentButton =
        <button onClick={this.props.handleBracket1Advance} className="button large hover-button-yellow">
          Next Bracket!
        </button>
    }



    if (this.props.initialRounds) {
      firstRounds = this.props.initialRounds.map((round) => {
        let updateRoundWinner =
        this.checkIfBracketDone(
          this.props.updateRoundWinnerBracket1,
          this.props.bracket1Status
        )
        return(
          <RoundTile
            key={round.id}
            id={round.id}
            entrant1={round.entrant1}
            entrant2={round.entrant2}
            winner={round.winner}
            updateRoundWinner={updateRoundWinner}
          />
        )
      })
    }

    if (this.props.secondBracketRounds) {
      secondRounds = this.props.secondBracketRounds.map((round) => {
        let updateRoundWinner =
        this.checkIfBracketDone(
          this.props.updateRoundWinnerBracket2,
          this.props.bracket2Status
        )
        return(
          <RoundTile
            key={round.id}
            id={round.id}
            entrant1={round.entrant1}
            entrant2={round.entrant2}
            winner={round.winner}
            updateRoundWinner={updateRoundWinner}
          />
        )
      })
    }

    if (this.props.finalBracketRound) {
      finalRound = this.props.finalBracketRound.map((round) => {
        let updateRoundWinner =
        this.checkIfBracketDone(
          this.props.updateRoundWinnerBracket3,
          this.props.bracket3Status
        )
        return(
          <RoundTile
            key={round.id}
            key={round.id}
            id={round.id}
            entrant1={round.entrant1}
            entrant2={round.entrant2}
            winner={round.winner}
            updateRoundWinner={updateRoundWinner}
          />
        )
      })
    }

    if (this.props.winner) {
      winner= this.props.winner
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
        {advanceTournamentButton} <span>{winner}</span>
      </div>
    )
  }
}

export default ActiveTournamentTile;
