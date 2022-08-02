import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends React.Component {
  state = {
    valorGasto: '',
    arrayMoedas: [],
  }

  componentDidMount() {
    const fetchApi = () => {
      const { currencies } = this.props;
      const apiMoedas = 'https://economia.awesomeapi.com.br/json/all';
      fetch(apiMoedas)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ arrayMoedas: Object.keys(data)
            .filter((key) => key !== 'USDT')
            .map((item) => currencies.push(item)),
          });
        });
    };
    fetchApi();
  }

  handleValor = (e) => {
    this.setState({ valorGasto: e.target.value });
  }

  addGasto = () => {
    const { despesas, dispatch } = this.props;
    const { valorGasto } = this.state;

    this.setState({
      valorGasto: '',
    });
    despesas.push(valorGasto);

    dispatch({ type: 'wallet', value: valorGasto });
  }

  render() {
    const { valorGasto, arrayMoedas } = this.state;
    const { currencies, despesas } = this.props;
    return (
      <div className="carteira-botao">
        <input
          data-testid="value-input"
          placeholder="Valor da despesa"
          value={ valorGasto }
          onChange={ this.handleValor }
        />
        <input
          data-testid="description-input"
          placeholder="Descrição da despesa"
        />
        <select
          data-testid="currency-input"
        >
          {currencies
            .map((item, i) => (
              <option key={ arrayMoedas[i] }>
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
        {despesas.map((item, index) => (
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
  despesas: state.wallet.expenses,
  currencies: state.wallet.currencies,
  // id: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.array).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
