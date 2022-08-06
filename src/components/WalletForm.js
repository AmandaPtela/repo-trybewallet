import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends React.Component {
  state = {
    Eid: 0,
    Evalue: '',
    Edescription: '',
    EcurrencyCopy: 'USD',
    Emethod: 'Dinheiro',
    Etag: 'Alimentação',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const fetchApi = () => {
      const apiMoedas = 'https://economia.awesomeapi.com.br/json/all';
      fetch(apiMoedas)
        .then((response) => response.json())
        .then((data) => {
          const moedas = Object.keys(data)
            .filter((key) => key !== 'USDT');
          dispatch({
            type: 'addCurrencies', value: moedas });
          dispatch({
            type: 'valoresCambio',
            value: Object.values(data)
              .map((item) => item.ask),
          });
          dispatch({
            type: 'exchangeRates',
            value: (data),
          });
        });
    };
    fetchApi();
    dispatch({
      type: 'exchange',
      value: 'USD',
    });
  }

    handleValor = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value });
    };

    addGasto = () => {
      const { dispatch, exchangeRatesP, expense } = this.props;
      const { Evalue, Edescription, EcurrencyCopy, Emethod, Etag, Eid } = this.state;
      this.setState((prevState) => ({ Eid: prevState.Eid + 1 }));
      if (EcurrencyCopy) {
        dispatch({
          type: 'exchange',
          value: EcurrencyCopy,
        });
      } else { dispatch({ type: 'exchange', value: 'USD' }); }
      const expenses = {
        id: Eid,
        value: Evalue,
        description: Edescription,
        currency: EcurrencyCopy,
        method: Emethod,
        tag: Etag,
        exchangeRates: exchangeRatesP,
      };
      dispatch({
        type: 'walletExpense',
        value: [...expense, expenses],
      });
      const fetchApi = () => {
        const apiMoedas = 'https://economia.awesomeapi.com.br/json/all';
        fetch(apiMoedas)
          .then((response) => response.json())
          .then((data) => data);
      };
      fetchApi();
      /*
      const lista = Object.values(expense);
      const soma = lista.reduce((acc, item) => {
        acc += Number(item.value);
        return acc;
      }, 0);
      console.log(expense);

      const moedaCambio = Object.values(exchangeRatesP);
      const moedaUso = moedaCambio.filter((item) => item.code === exchange)
        .map((item) => Number(item.ask));
      dispatch({ type: 'somaTotal', value: (soma * moedaUso).toFixed(2) });

      if (moedaCambio.filter((item) => item.code === 'USD')) {
        dispatch({ type: 'somaTotal', value: (soma * moedaUso[0]).toFixed(2) });
      } */

      this.setState({
        Evalue: '',
        Edescription: '',
      });
    }

    render() {
      const { Evalue, Edescription } = this.state;
      const { currencies, expense } = this.props;
      return (
        <div className="carteira-botao">
          <input
            data-testid="value-input"
            placeholder="Valor da despesa"
            name="Evalue"
            value={ Evalue }
            onChange={ this.handleValor }
          />
          <input
            data-testid="description-input"
            name="Edescription"
            placeholder="Descrição da despesa"
            onChange={ this.handleValor }
            value={ Edescription }
          />
          <select
            data-testid="currency-input"
            name="EcurrencyCopy"
            onChange={ this.handleValor }
          >
            {currencies
              .map((item, i) => (
                <option key={ i }>
                  { item }
                </option>
              ))}
          </select>
          <select
            data-testid="method-input"
            name="Emethod"
            onChange={ this.handleValor }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="Etag"
            onChange={ this.handleValor }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button
            type="button"
            onClick={ this.addGasto }
          >
            Adicionar despesa
          </button>
          {Object.values(expense).map((i, index) => (
            <li
              key={ index }
            >
              { i.value }
            </li>
          ))}
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
  expense: state.wallet.expenses,
  currencies: state.wallet.currencies,
  exchange: state.wallet.exchange,
  exchangeRatesP: state.wallet.exchangeRates,
});

WalletForm.propTypes = {
  expense: PropTypes.arrayOf(PropTypes.array).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  // exchange: PropTypes.string.isRequired,
  exchangeRatesP: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
