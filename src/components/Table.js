import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  remove = (e) => {
    const { despesas, dispatch, valorTotal } = this.props;
    const valor = e.target.value;
    const filtro = despesas.filter(({ value }) => value !== valor);
    dispatch({
      type: 'walletExpense',
      value: filtro,
    });
    dispatch({
      type: 'somaTotal',
      value: (valorTotal - valor),
    });
  }

  render() {
    const { despesas } = this.props;
    const n = 2;
    return (
      <>
        <thead className="tabela">
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
                <td>{ Number(i.value).toFixed(n) }</td>
                <td>{ i.currency }</td>
                <td>{ i.exchangeRates[i.currency].name}</td>
                <td>{ Number(i.value * i.exchangeRates[i.currency].ask).toFixed(n) }</td>
                <td>{ Number(i.exchangeRates[i.currency].ask).toFixed(n) }</td>
                <td>
                  <button
                    className="editor"
                    type="button"
                    value={ i.id }
                    key={ i.value }
                    data-testid="edit-btn"
                    onClick={ () => {
                      const { dispatch } = this.props;
                      dispatch({
                        type: 'editExpense',
                        value: true,
                      });
                      dispatch({ type: 'idToEdit', value: i.id });
                      console.log(i.exchangeRates[i.currency].name);
                    } }
                  >
                    Editar despesa
                  </button>
                  <button
                    type="button"
                    className="exclui"
                    value={ i.value }
                    key={ i.id }
                    data-testid="delete-btn"
                    onClick={ this.remove }
                  >
                    Excluir
                  </button>
                </td>
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
  valorTotal: state.wallet.somaTotal,
});

Table.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  valorTotal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Table);
