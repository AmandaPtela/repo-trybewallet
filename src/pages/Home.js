import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Header from '../components/Header';
import Wallet from './Wallet';

class Home extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={ Login } />
          <Route path="/carteira" component={ Wallet } />
        </Switch>
      </>
    );
  }
}
export default Home;
