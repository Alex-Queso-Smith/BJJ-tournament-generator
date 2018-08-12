import React from 'react';

class EntrantTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){

    return(
      <div onClick={this.props.onClick} className={this.props.className}>
        {this.props.entrant}
      </div>
    )
  }
}

export default EntrantTile;
