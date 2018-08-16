import React from 'react';
import YouTubeTileContainer from './YouTubeTileContainer';

class FirstTimeIndexContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <div>
        <div id="youtube-index" className="grid-container">
          <div id="youtube-index" className="grid-y grid-margin-x grid-margin-y">
          <p id="youtube-index-blurb">
            First time competition can be a stressful and intimidating idea.
            In-house tournaments can be a great way to introduce the environment of competition in a friendly atmosphere amongst fellow students.
          </p>
            <YouTubeTileContainer
              youtubeId={'hmk0SnJCsq8'}
            />
            <YouTubeTileContainer
              youtubeId={'vFNWVXafe-I'}
            />
            <YouTubeTileContainer
              youtubeId={'N1F9IN_qYZc'}
            />
            <YouTubeTileContainer
              youtubeId={'TRcGOUeizVw'}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default FirstTimeIndexContainer;
