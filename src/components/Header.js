import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Feito com consulta ao https://serfrontend.com/blog/redux-com-react-para-iniciantes/index.html
class Header extends React.Component {
  state = {
    // gastos: [],
  }

  render() {
    const { user, despesas, valorCambio, moeda, cambio } = this.props;
    const soma = despesas.reduce((acc, item, index) => {
      let somas = acc += Number(item);
      const troca = valorCambio[index]; 
      if(moeda[index] === cambio) {
        return (somas * troca).toFixed(2)
      }
      return (somas * troca).toFixed(2);
    }, 0);
    console.log(despesas);
    return (
      (user.length > 0)
        ? (
          <div className="header">
            <span className="header-logo">TrybeWallet</span>
            <p data-testid="email-field">
              { user }
            </p>
            <span data-testid="total-field">
              {despesas.length >= 1
                ? (
                  <p>
                    { soma }
                  </p>)
                : <span>0</span> }
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
  cambio: state.wallet.exchange,
  moeda: state.wallet.currencies,
  valorCambio: state.wallet.currenciesValues,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  despesas: PropTypes.arrayOf(PropTypes.string).isRequired,
  valorCambio: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Header);
