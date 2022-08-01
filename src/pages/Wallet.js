import React from 'react';
import PropTypes from 'prop-types';
import WalletForm from '../components/WalletForm';
// Feito com consulta ao https://serfrontend.com/blog/redux-com-react-para-iniciantes/index.html
class Wallet extends React.Component {
  render() {
    return (
      <div className="carteira">
        <p>Lista de Gastos</p>
        <WalletForm />
      </div>
    );
  }
}

Wallet.propTypes = {
  despesas: PropTypes.arrayOf(PropTypes.array).isRequired,
};
export default Wallet;
