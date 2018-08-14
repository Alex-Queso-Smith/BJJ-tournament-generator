import React from 'react';
import { Link, Route, IndexRoute, Router, browserHistory } from 'react-router';

import AcademiesIndexContainer from './AcademiesIndexContainer'
import AcademyFormContainer from './AcademyFormContainer'
import AcademiesShowContainer from './AcademiesShowContainer'
import EditAcademyForm from './EditAcademyForm'
import TournamentFormContainer from './TournamentFormContainer'
import TournamentShow from './TournamentShow'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    $(function(){
      var flashDurationInSeconds = 5;
      var flashContainerId = 'flash-messages';

      function removeFlashMessages() {
        $('#' + flashContainerId).remove();
      }

      setTimeout(removeFlashMessages, flashDurationInSeconds * 1000);
    })

    return (
      <Router history={browserHistory} >
        <Route path='/'>
          <IndexRoute component={AcademiesIndexContainer} />
          <Route path='/academies' component={AcademiesIndexContainer} />
          <Route path='/academies/new' component={AcademyFormContainer} />
          <Route path='/academies/:id' component={AcademiesShowContainer} />
          <Route path='/academies/:id/edit' component={EditAcademyForm} />
          <Route path='/academies/:id/tournaments/new' component={TournamentFormContainer} />
          <Route path='/tournaments/:id' component={TournamentShow} />
        </Route>
      </Router>
    )
  }
}

export default App
