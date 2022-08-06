import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Feito com consulta ao https://serfrontend.com/blog/redux-com-react-para-iniciantes/index.html
class Header extends React.Component {
  componentDidUpdate() {
    const { dispatch, despesas, exchangeRates, cambio } = this.props;
    console.log(cambio);

    const moedaCambio = Object.values(exchangeRates);
    const moedaUso = moedaCambio.filter((item) => item.code === cambio)
      .map((item) => item.ask);
    const lista = Object.values(despesas);
    const soma = lista.reduce((acc, item) => {
      acc += Number(item.value) * Number(moedaUso[0]).toFixed(2);
      return acc;
    }, 0);
    console.log(`Valor moeda de cambio ${Number(moedaUso[0]).toFixed(2)}`);
    console.log(`reduce ${soma}`);

    dispatch({ type: 'somaTotal', value: soma });
    /* const moedaCambio = Object.values(exchangeRates);
    const moedaUso = moedaCambio.filter((item) => item.code === cambio)
      .map((item) => Number(item.ask));
    const soma = Object.values(despesas)
      .reduce((acc, item) => {
        acc += Number(item.value);
        return acc;
      }, 0);
    if (moedaCambio.filter((item) => item.code === cambio)) {
      console.log(soma);
      console.log(moedaUso[0]);
      dispatch({ type: 'somaTotal', value: (soma * moedaUso[0]).toFixed(2) });
    } */
  }

  render() {
    const { user, valorTotal } = this.props;
    console.log(`total ${valorTotal}`);
    return (
      (!user.length > 0)
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
