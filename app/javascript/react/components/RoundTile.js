import React from 'react';

import EntrantTile from './EntrantTile';

class RoundTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.determineWinnerTile = this.determineWinnerTile.bind(this);
  }

  determineWinnerTile(winner, entrant){
    if (winner == entrant) {
      return "entrant-tile winner";
    } else {
      return "entrant-tile";
    }
  }

  render(){
    let handleSelectWinner1 = () => {
      this.props.updateRoundWinner(this.props.entrant1, this.props.id);
    };
    let handleSelectWinner2 = () => {
      this.props.updateRoundWinner(this.props.entrant2, this.props.id);
    };

    return(
      <div>
        <EntrantTile
          className={this.determineWinnerTile(this.props.winner, this.props.entrant1)}
          entrant={this.props.entrant1}
          onClick={handleSelectWinner1}
        />
        <div>
          VS.
        </div>
        <EntrantTile
          className={this.determineWinnerTile(this.props.winner, this.props.entrant2)}
          entrant={this.props.entrant2}
          onClick={handleSelectWinner2}
        />
      </div>
    )
  }
}

export default RoundTile;
