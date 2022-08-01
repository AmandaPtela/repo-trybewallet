import React from 'react';
import { connect } from 'react-redux';
import WalletForm from '../components/WalletForm';
import PropTypes from 'prop-types';
// Feito com consulta ao https://serfrontend.com/blog/redux-com-react-para-iniciantes/index.html
class Wallet extends React.Component {
  render() {
    const { despesas } = this.props;
    return (
      <div className="carteira">
        <p>Lista de Gastos</p>
        <WalletForm />
        {despesas.map((item, index) => <li key={ index }>{ item }</li>)}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
});

Wallet.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.array).isRequired,
};
export default connect(mapStateToProps)(Wallet);
