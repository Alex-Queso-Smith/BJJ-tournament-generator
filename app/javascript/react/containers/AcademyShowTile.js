import React from 'react';
import { Link } from 'react-router'

import ClosedTournamentContainer from './ClosedTournamentContainer';

class AcademyShowTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }



  render(){
    let tournaments, website;

    if (this.props.website) {
      website = <Link to={this.props.website} id="website-link"><i>{this.props.website}</i></Link>
    }

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
        <div className="academy-info">
          <h2>{this.props.name}</h2>
          <i>{`${this.props.address}, ${this.props.city} ${this.props.state} ${this.props.zipcode}`}</i><br />
          {website}
        </div>
        {tournaments}
      </div>
    )
  }
};

export default AcademyShowTile;
