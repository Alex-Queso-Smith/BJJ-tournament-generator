import React from 'react';
import YouTube from 'react-youtube';

class YouTubeTileContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
        controls: 1
      }
    };

    return (
      <div className="youtube">
      <YouTube
        videoId={this.props.youtubeId}
        opts={opts}
        onReady={this._onReady}
        apiKey='AIzaSyD5nIxo6RKTDUTxAlJjVWrabTVD83QBuDs'
      />
      </div>
    )
  }

  _onReady(event) {
    event.target.pauseVideo()
  }
}

export default YouTubeTileContainer;
