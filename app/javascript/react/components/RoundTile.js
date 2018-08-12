import React from 'react';

class RoundTile extends React.Component {
  constructor(props){
    super(props);
    this.state ={

    };
  }

  render(){
    return(
      <div>
        <div>
          {this.props.entrant1}
        </div>
        <div>
          VS.
        </div>
        <div>
          {this.props.entrant2}
        </div>
      </div>
    )
  }
}

export default RoundTile;
