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
    let openTournaments;
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

    if(this.props.openTournaments.length != 0){
      openTournaments = this.props.openTournaments.map((tournament) => {
        return(
          <Link className="menu-link" to={`/tournaments/${tournament.id}`} key={tournament.id}>
            {`${tournament.gender} ${tournament.belt} Belt Tournament on ${tournament.start_date}`}
          </Link>
        )
      })
    }

    return(
      <div>
        <div className="top-bar" id="academy-menu">
          <div className="top-bar-left">
            <ul className="dropdown menu" data-dropdown-menu>
              <Link className="menu-text " to={`/academies/${this.props.academyId}/tournaments/new`}>
                Create Tournament
              </Link>
              <li>
                <a>Students</a>
                <ul className="menu vertical">
                  {students}
                </ul>
              </li>
              <li>
                <a>Open Tournaments</a>
                <ul className="menu vertical">
                  {openTournaments}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default AcademyMenu;
