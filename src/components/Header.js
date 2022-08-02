import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Feito com consulta ao https://serfrontend.com/blog/redux-com-react-para-iniciantes/index.html
class Header extends React.Component {
  state = {
    // gastos: [],
    moedasArray: [],
  }

  componentDidMount() {
    const { moedas } = this.props;
    this.setState({
      moedasArray: moedas,
      // gastos: despesas,
    });
  }

  render() {
    const { user, moedas } = this.props;
    const { moedasArray } = this.state;
    console.log(moedas);
    return (
      (user.length > 0)
        ? (
          <div className="header">
            <span className="header-logo">TrybeWallet</span>
            <p data-testid="email-field">
              { user }
            </p>
            <p data-testid="total-field">
              0
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        )
        : (
          <span className="header-off">
            TrybeWallet
            { moedasArray }
          </span>
        )
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user.email,
  despesas: state.wallet.expenses,
  moedas: state.wallet.currencies,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  // despesas: PropTypes.arrayOf(PropTypes.array).isRequired,
  moedas: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default connect(mapStateToProps)(Header);
