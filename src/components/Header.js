import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Feito com consulta ao https://serfrontend.com/blog/redux-com-react-para-iniciantes/index.html
class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      (user.length > 0)
        ? (
          <div className="header">
            <span className="header-off">TrybeWallet</span>
            <p data-testid="email-field">
              {user}
            </p>
            <span data-testid="total-field">0</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        )
        : (
          <span className="header-off">TrybeWallet</span>
        )
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user.email,
  despesas: state.wallet.expenses,
  moedas: state.wallet.currencies,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
