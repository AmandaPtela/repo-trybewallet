import React from 'react';
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

export default Wallet;
