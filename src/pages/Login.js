import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Feito com consulta ao https://serfrontend.com/blog/redux-com-react-para-iniciantes/index.html
// https://react-redux.js.org/using-react-redux/connect-mapdispatch
class Login extends React.Component {
  state = {
    passOk: '',
    emailOk: '',
    buttonDisabled: true,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.resetInputs);
  }

  resetInputs = () => {
    const { emailOk, passOk } = this.state;
    const minPass = 5;
    const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (regexEmail.test(emailOk) && passOk.length > minPass) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  render() {
    const { buttonDisabled, emailOk, passOk } = this.state;
    const { dispatch } = this.props;

    return (
      <div className="Login">
        <form>
          <input
            data-testid="email-input"
            name="emailOk"
            value={ emailOk }
            type="text"
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            name="passOk"
            value={ passOk }
            type="password"
            onChange={ this.handleChange }
          />
          <Link to="/carteira">
            <button
              type="submit"
              onClick={ () => this.setState({
                emailOk: '',
                passOk: '',
              }, dispatch({ type: 'login', value: emailOk })) }
              disabled={ buttonDisabled }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
