import React from 'react';
import { Link } from 'react-router'

class AcademyMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    $(document).foundation();
  }

  render(){

    let students;

    if(this.props.students.length != 0){
      students = this.props.students.map((student) => {
        if(student.nickname){
          return(
            <li key={student.id}>{`${student.first_name} '${student.nickname}' ${student.last_name}`}</li>
          )
        } else {
          return (
            <li key={student.id}>{`${student.first_name} ${student.last_name}`}</li>
          )
        }
      })
    }

    return(
      <div>
        <div className="top-bar" id="academy-menu">
          <div className="top-bar-left">
            <ul className="dropdown menu" data-dropdown-menu>
              <li className="menu-text">{this.props.academyName}</li>

                <Link className="menu-text" to={`/academies/${this.props.academyId}/tournaments/new`}>
                  Create Tournament
                </Link>

              <li>
                <a>Students</a>
                <ul className="menu vertical">
                  {students}
                </ul>
              </li>
              <li><a href="#">Two</a></li>
              <li><a href="#">Three</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default AcademyMenu;
