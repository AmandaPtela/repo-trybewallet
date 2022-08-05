import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends React.Component {
  state = {
    idE: 0,
    valueE: '',
    descriptionE: '',
    currencyE: 'USD',
    methodE: 'Dinheiro',
    tagE: 'Alimentação',
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
            value: Object.values(data)
              .filter((key) => key.code !== 'USDT'),
          });
        });
    };
    fetchApi();
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    const { currencyE } = this.state;
    dispatch({
      type: 'exchange',
      value: currencyE,
    });
  }

  handleValor = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

    addGasto = () => {
      const fetchApi = () => {
        const apiMoedas = 'https://economia.awesomeapi.com.br/json/all';
        fetch(apiMoedas)
          .then((response) => response.json())
          .then((data) => data);
      };
      fetchApi();

      const { dispatch, exchangeRatesP, expense } = this.props;
      const { valueE, descriptionE, currencyE, methodE, tagE, idE } = this.state;
      this.setState((prevState) => ({ idE: prevState.idE + 1 }));

      const expenses = {
        id: idE,
        value: valueE,
        description: descriptionE,
        currency: currencyE,
        method: methodE,
        tag: tagE,
        exchangeRates: exchangeRatesP,
      };
      dispatch({
        type: 'walletExpense',
        value: [...expense, expenses],
      });

      this.setState({
        valueE: '',
        descriptionE: '',
        methodE: '',
        tagE: '',
      });
    }

    render() {
      const { valueE, descriptionE } = this.state;
      const { currencies, expense } = this.props;
      return (
        <div className="carteira-botao">
          <input
            data-testid="value-input"
            placeholder="Valor da despesa"
            name="valueE"
            value={ valueE }
            onChange={ this.handleValor }
          />
          <input
            data-testid="description-input"
            name="descriptionE"
            placeholder="Descrição da despesa"
            onChange={ this.handleValor }
            value={ descriptionE }
          />
          <select
            data-testid="currency-input"
            name="currencyE"
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
            name="methodE"
            onChange={ this.handleValor }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tagE"
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
  exchangeRatesP: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
