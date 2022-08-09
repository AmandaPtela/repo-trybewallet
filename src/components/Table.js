import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
/*   remove = (e) => {
    const { despesas, dispatch } = this.props;
    const filtro = despesas.filter((item) => item.id !== e.target.value);
    dispatch({
      type: 'walletExpense',
      value: filtro,
    });
  } */

  render() {
    const { despesas } = this.props;
    const n = 3;
    return (
      <>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            despesas.map((i, index) => (
              <tr key={ index }>
                <td>{ i.description }</td>
                <td>{ i.tag }</td>
                <td>{ i.method }</td>
                <td>{ Number(i.value).toFixed(2) }</td>
                <td>{ i.currency }</td>
                <td>{ i.exchangeRates[i.currency].name}</td>
                <td>{ Number(i.exchangeRates[i.currency].ask).toFixed(2) }</td>
                <td>{ i.value * Number(i.exchangeRates[i.currency].ask).toFixed(n) }</td>
                <td>Real</td>
                <button
                  type="button"
                  value={ i.id }
                  data-testid="delete-btn"
                  onClick={ () => console.log('opa') }
                >
                  Excluir
                </button>
              </tr>
            ))
          }
        </tbody>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

Table.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.string).isRequired,
  // dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
