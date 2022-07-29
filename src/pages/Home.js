import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Wallet from './Wallet';

class Home extends React.Component {
  state = {
    canLog: 'false',
  }
  render() {
    return (
      <Switch>
      <Route path="/" exact component={ Login }></Route>
      <Route path="/wallet" component={ Wallet }></Route>
    </Switch>
    )
  }
}

export default Home;