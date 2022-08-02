import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Feito com consulta ao https://serfrontend.com/blog/redux-com-react-para-iniciantes/index.html
class Header extends React.Component {
  state = {
    gastos: [],
  }

  async componentDidMount() {
    const { despesas } = this.props;
    this.setState({ gastos: despesas }, () => console.log(despesas));
  }

  render() {
    const { user } = this.props;
    const { gastos } = this.state;
    return (
      (user.length > 0)
        ? (
          <div className="header">
            <span className="header-logo">TrybeWallet</span>
            <p data-testid="email-field">
              { user }
            </p>
            <p data-testid="total-field">
              {gastos}
            </p>
            <p data-testid="header-currency-field">BRL</p>
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
  despesas: PropTypes.arrayOf(PropTypes.array).isRequired,
  // moedas: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default connect(mapStateToProps)(Header);
