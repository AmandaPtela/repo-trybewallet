import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Feito com consulta ao https://serfrontend.com/blog/redux-com-react-para-iniciantes/index.html
class Header extends React.Component {
  state = {
    // gastos: [],
  }

  componentDidUpdate() {
    const { dispatch, despesas, exchangeRates, cambio } = this.props;
    const lista = Object.values(despesas)
      .map((item) => item);
    const soma = lista.reduce((acc, item) => {
      acc += Number(item.value);
      return acc;
    }, 0);

    const moedaCambio = Object.values(exchangeRates)
      .splice(0, 1);
    const moedaUso = moedaCambio.filter((item) => item.code === cambio)
      .map((item) => Number(item.ask));

    console.log(moedaUso);
    dispatch({ type: 'somaTotal', value: (soma * moedaUso).toFixed(2) });
  }

  render() {
    const { user, valorTotal } = this.props;

    return (
      (user.length > 0)
        ? (
          <div className="header">
            <span className="header-logo">TrybeWallet</span>
            <p data-testid="email-field">
              { user }
            </p>
            <span data-testid="total-field">
              <p>
                { valorTotal }
              </p>
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
  exchangeRates: state.wallet.exchangeRates,
  valorTotal: state.wallet.somaTotal,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  despesas: PropTypes.arrayOf(PropTypes.string).isRequired,
  // valorCambio: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  valorTotal: PropTypes.number.isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.array).isRequired,
  cambio: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
