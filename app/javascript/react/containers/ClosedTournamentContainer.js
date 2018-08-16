import React from 'react';

import YoutubeTileContainer from './YouTubeTileContainer';
import AddVideoLink from '../components/AddVideoLink';

class ClosedTournamentContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    let tournament = this.props.tournament;
    let videos;

    if (this.props.videos) {
      videos = this.props.videos.map((video) => {
        return(
          <YoutubeTileContainer
            key={video.id}
            youtubeId={video.video_id}
          />
        )
      })
    }

    return(
      <div id="tournament-videos" className="grid-container">
        <div className="grid-y grid-margin-x grid-margin-y">
          <h4 className="videos-title">{`${tournament.belt} ${tournament.gender} - ${tournament.weight} - ${tournament.start_date}`}</h4>
          {videos}
          <AddVideoLink
            id={this.props.tournament.id}
          />
        </div>
      </div>
    )
  }
}

export default ClosedTournamentContainer;
