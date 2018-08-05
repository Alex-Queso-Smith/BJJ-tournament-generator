import React from 'react';
import { Link, Route, IndexRoute, Router, browserHistory } from 'react-router';

import AcademiesIndexContainer from './AcademiesIndexContainer'
import AcademyFormContainer from './AcademyFormContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory} >
      <Route path='/'>
        <IndexRoute component={AcademiesIndexContainer} />
        <Route path='/academies/new' component={AcademyFormContainer} />
      </Route>
    </Router>
  )
}

export default App
