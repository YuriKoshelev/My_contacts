import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AccessPage from '../pages/AccessPage';
import MainPage from '../pages/MainPage';

const App: React.FC = () => {
  return (
    <Router>
        <Switch>
            <Route exact path='/'>
                <AccessPage/>
            </Route>
            
            <Route exact path='/main'>
                <MainPage/>
            </Route>
        </Switch>
    </Router> 
  )
}

export default App;