import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as  Router} from 'react-router-dom';
import App from './app'

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/books/:id" component={App}/>
      </Switch>
    </Router>
  );
};