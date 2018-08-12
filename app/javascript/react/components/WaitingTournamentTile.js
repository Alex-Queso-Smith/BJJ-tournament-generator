import React from 'react';

class WaitingTournamentTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return(
      <div>
        <h2>Entrants</h2>
        {this.props.entrants}
        {this.props.tournamentSpots}
        {this.props.signUpButton}
      </div>
    )
  }
}

export default WaitingTournamentTile;
