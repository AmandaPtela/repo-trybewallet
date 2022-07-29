import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import actionLogin from '../redux/actions';

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
    if(regexEmail.test(emailOk) && passOk.length > minPass) {
      this.setState({
        buttonDisabled: false,
      });
    }
    else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }
  render() {
    const { buttonDisabled, emailOk, passOk } = this.state;
    const { dispatchUSer } = this.props;
    //REGEX EMAIL: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // REGEX SENHA: /^[0-9][6]/
    return (
    <div className="Login">
      <form>
        <input data-testid="email-input" name="emailOk" value = {emailOk} type="text" onChange={this.handleChange}/>
        <input data-testid="password-input" name="passOk" value={ passOk } type="password" onChange={this.handleChange}/>
        <Link to="/wallet">
          <button
            type="submit"
            onClick={ () => this.setState({
              emailOk: '',
              passOk: '',
            }, dispatchUSer(emailOk))}
            disabled={buttonDisabled}
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>)
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchUSer: (email) => dispatch(actionLogin(email))});

export default connect(mapDispatchToProps)(Login);
