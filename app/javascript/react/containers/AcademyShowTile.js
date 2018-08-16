import React from 'react';

import ClosedTournamentContainer from './ClosedTournamentContainer';

class AcademyShowTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  

  render(){
    let tournaments;

    if (this.props.closedTournaments.length != 0) {
      tournaments = this.props.closedTournaments.map((tournament) => {
        return(
          <ClosedTournamentContainer
          key={tournament.id}
          tournament={tournament}
          videos={tournament.youtube_videos}
          />
        )
      })
    }

    return(
      <div className="show-tile">
        {tournaments}
      </div>
    )
  }
};

export default AcademyShowTile;
