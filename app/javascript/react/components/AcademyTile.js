import React from 'react';

class AcademyTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return(
      <div>
      {this.props.name}
      {this.props.address}
      {this.props.city}
      {this.props.state}
      {this.props.zipcode}
      {this.props.website}
      </div>
    )
  }
}

export default AcademyTile;
