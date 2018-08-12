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
      currentBracketId: null
    };
  }

  componentDidMount(){

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
            winner={round.winner}
            updateRoundWinner={this.props.updateRoundWinner}
          />
        )
      })
    }

    return(
      <div>
         Matches til next Bracket!
        {firstRounds}
      </div>
    )
  }
}

export default ActiveTournamentTile;
