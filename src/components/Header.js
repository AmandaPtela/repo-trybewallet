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
  const { dispatch, despesas } = this.props;
  let soma = Object.values(despesas)
  .map((item) => item).reduce((acc, item) => {
    acc = acc += Number(item.value);
    return acc;
  }, 0);
  dispatch({type: 'somaTotal', value: soma})
}
  render() {
    const { user, valorTotal, exchangeRates, cambio, valorCambio  } = this.props;
    
    const moedaCambio = Object.values(exchangeRates)
    .filter((item) => item.code === cambio)
    .map((item) => item.ask)
    const teste = Object.values(valorCambio).find((item) => item === moedaCambio)
    console.log(teste);
    
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
                { valorTotal * Number(moedaCambio) }
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
  valorCambio: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Header);
