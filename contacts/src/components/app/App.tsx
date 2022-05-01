import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AccessPage from '../pages/AccessPage';
import RegistrPage from '../pages/RegistrPage';
import MainPage from '../pages/MainPage';
import Page404 from '../pages/Page404'

const App: React.FC = () => {
  return (
    <Router>
        <Switch>
            <Route exact path='/'>
                <AccessPage/>
            </Route>
            
            <Route exact path='/registr'>
                <RegistrPage/>
            </Route>

            <Route exact path='/main'>
                <MainPage/>
            </Route>

            <Route path='*'>
                <Page404/>
            </Route>
        </Switch>
    </Router> 
  )
}

export default App;