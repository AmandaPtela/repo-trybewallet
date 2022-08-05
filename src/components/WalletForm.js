import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends React.Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
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
          dispatch({type: 'exchangeRates', value: Object.values(data)
          .filter((key) => key.code !== 'USDT')});
        });
    };
    fetchApi();
  }

  handleValor = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value })
  };

  componentDidUpdate() {
    const { dispatch } = this.props;
    dispatch({type: 'exchange', value: this.state.currency})
  }
  addGasto = () => {
    const fetchApi = () => {
      const apiMoedas = 'https://economia.awesomeapi.com.br/json/all';
      fetch(apiMoedas)
        .then((response) => response.json())
        .then((data) => data)
    };
    fetchApi();

    const { dispatch, exchangeRates, expense } = this.props;
    this.setState((prevState) => ({ id: prevState.id + 1 }));
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
    
    const expenses = {
      value: this.state.value,
      description: this.state.description,
      currency: this.state.currency,
      method: this.state.method,
      tag: this.state.tag,
      id: this.state.id,
      exchangeRates: exchangeRates,
      }
    dispatch({ type: 'walletExpense', value: [...expense, expenses]
    });
  }

  render() {
    const { value, description } = this.state;
    const { currencies, expense } = this.props;
    return (
      <div className="carteira-botao">
        <input
          data-testid="value-input"
          placeholder="Valor da despesa"
          name="value"
          value={ value }
          onChange={ this.handleValor }
        />
        <input
          data-testid="description-input"
          name="description"
          placeholder="Descrição da despesa"
          onChange={ this.handleValor }
          value={ description }
        />
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleValor }
        >
          {currencies
            .map((item, i) => (
              <option key={ i }>
                { item }
              </option>
            ))}
        </select>

        <select data-testid="method-input"
          name="method"
          onChange={this.handleValor}
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select data-testid="tag-input"
            name="tag"
            onChange={this.handleValor}
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
  exchangeRates: state.wallet.exchangeRates,
});

WalletForm.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.array).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
