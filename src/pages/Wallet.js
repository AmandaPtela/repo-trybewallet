import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Feito com consulta ao https://serfrontend.com/blog/redux-com-react-para-iniciantes/index.html
class Wallet extends React.Component {
  state = {
    valorGasto: '',
  }

  handleValor = (e) => {
    this.setState({ valorGasto: e.target.value });
  }

  addGasto = () => {
    const { despesas } = this.props;
    const { valorGasto } = this.state;
    despesas.push(valorGasto);
    this.setState({
      valorGasto: '',
    });
  }

  render() {
    const { valorGasto } = this.state;
    const { despesas } = this.props;
    return (
      <div className="carteira">
        <div className="carteira-botao">
          <input
            value={ valorGasto }
            onChange={ this.handleValor }
          />
          <button
            type="button"
            onClick={ this.addGasto }
          >
            add
          </button>
          <p>Lista de Gastos</p>
        </div>
        <p>{ despesas }</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  despesas: state.wallet.wallet.expenses,
});

Wallet.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default connect(mapStateToProps)(Wallet);
