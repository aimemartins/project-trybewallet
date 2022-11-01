import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      able: false,
    };
  }

  emailValidation = () => {
    const { email } = this.state;
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const emailValid = email.match(regexEmail);
    return emailValid;
  };

  passwordValidation = () => {
    const { password } = this.state;
    const min6 = 6;
    const passwordValid = password.length >= min6;
    return passwordValid;
  };

  completeValidation = () => {
    if (this.passwordValidation() && this.emailValidation()) {
      this.setState({
        able: true,
      });
    } else {
      this.setState({
        able: false,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(({
      [name]: value,
    }), () => this.completeValidation());
  };

  // Em group programming com Joseane, João Pedro,
  // João Lelles, Sérgio Moreira e Scarlat

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const { able } = this.state;
    return (
      <div>
        <p>Acesse aqui o seu TrybeWallet</p>
        <form>
          <input
            name="email"
            type="email"
            data-testid="email-input"
            placeholder="Email"
            required
            onChange={ this.handleChange }
          />
          <input
            name="password"
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            required
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ !able }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
