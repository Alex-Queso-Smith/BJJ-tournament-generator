import React from 'react';
import { Link } from 'react-router';
import Image from 'react-image-resizer';

class AcademyIndexTile extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    let image = '';

    // if (this.props.photo.url) {
    //   image =
    //   <Image
    //     src={this.props.photo.url}
    //     height={300}
    //     width={300}
    //   />
    // } else {
      image =
      <Image
        src={"/assets/heart.jpg"}
        height={300}
        width={300}
      />
    // }

    return(
      <div className="">
        <figure className="index-image">
          {image}
          <figcaption>
            <p>{this.props.name}</p>
            <p>{`${this.props.address}, ${this.props.city} ${this.props.state}`}</p>
          </figcaption>
            <Link to={`/academies/${this.props.id}`} />
        </figure>
      </div>
    )
  }
}

export default AcademyIndexTile;
