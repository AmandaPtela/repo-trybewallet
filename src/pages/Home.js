import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Wallet from './Wallet';

class Home extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    );
  }
}
export default Home;
