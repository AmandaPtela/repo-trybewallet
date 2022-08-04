import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends React.Component {
  state = {
    valorGasto: '',
    description: '',
    valorFinal: '',
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
        });
    };
    fetchApi();
  }

  handleValor = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  addGasto = () => {
    const { dispatch, expenses } = this.props;
    const { valorGasto } = this.state;
    this.setState({
      valorGasto: '',
      description: '',
    });

    dispatch({ type: 'walletExpense', value: [...expenses, valorGasto] });
  }

  render() {
    const { valorGasto, description } = this.state;
    const { currencies, expenses } = this.props;
    return (
      <div className="carteira-botao">
        <input
          data-testid="value-input"
          placeholder="Valor da despesa"
          name="valorGasto"
          value={ valorGasto }
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
          name="moedaCambio"
          onChange={ (e) => {
            const { dispatch } = this.props;
            dispatch({ type: 'exchange', value: e.target.value });
          } }
        >
          {currencies
            .map((item, i) => (
              <option key={ i }>
                { item }
              </option>
            ))}
        </select>

        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select data-testid="tag-input">
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
        {expenses.map((item, index) => (
          <li
            key={ index }
            id={ index }
          >
            { item }
          </li>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  cambio: state.wallet.exchange,
  // id: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.array).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
