import React from 'react';
import { Link } from 'react-router';

class AcademyIndexTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    let image = '';

    if (this.props.photo.url) {
      image = <img src={this.props.photo.url} />
    } else {
      image = <img src="/assets/heart.jpg" alt="/public/heart.jpg" />
    }

    return(
      <div className="cell">
        <figure className="index-image">
          {image}
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

export default AcademyIndexTile;
