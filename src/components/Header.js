import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Feito com consulta ao https://serfrontend.com/blog/redux-com-react-para-iniciantes/index.html
class Header extends React.Component {
  render() {
    const { user, despesas, dispatch } = this.props;
    const soma = () => despesas.reduce((acc, i) => acc
    + (i.value * i.exchangeRates[i.currency].ask), 0).toFixed(2);
    dispatch({ type: 'somaTotal', value: Number(soma()) });

    return (
      (user.length > 0)
        ? (
          <div className="header">
            <span className="header-logo">TrybeWallet</span>
            <p data-testid="email-field">
              { user }
            </p>
            <span data-testid="total-field">
              { Number(soma()).toFixed(2) }
            </span>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        )
        : (
          <span className="header-off">
            TrybeWallet
          </span>
        )
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user.email,
  despesas: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  despesas: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
