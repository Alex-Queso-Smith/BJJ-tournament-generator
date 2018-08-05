import React from 'react';
import { Link, Route, IndexRoute, Router, browserHistory } from 'react-router';

import AcademiesIndexContainer from './AcademiesIndexContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory} >
      <Route path='/'>
        <IndexRoute component={AcademiesIndexContainer} />
      </Route>
    </Router>
  )
}

export default App
