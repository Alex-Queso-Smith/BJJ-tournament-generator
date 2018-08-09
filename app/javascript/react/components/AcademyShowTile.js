import React from 'react';


class AcademyShowTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }


  render(){

    return(
      <div className="show-tile">
      {this.props.name}
      </div>
    )
  }
};

export default AcademyShowTile;
