import React from 'react';
import { Link } from 'react-router'

class AcademyTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return(
      <div className="cell">
        <figure className="index-image">
          <img src="/assets/heart.jpg" alt="/public/heart" />
          <figcaption>
            <h3>{this.props.name}</h3>
            <p>{`${this.props.address}, ${this.props.city} ${this.props.state}`}</p>
          </figcaption>
            <Link to={`/academies/${this.props.id}`} />
        </figure>
      </div>
    )
  }
}

export default AcademyTile;
