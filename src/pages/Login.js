import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      name: '',
      logado: false,
      loading: false,
    };
  }

  onChange = ({ target }) => {
    const { value } = target;
    const minLength = 3;
    this.setState({ name: value });
    if (value.length >= minLength) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  };

  submitInfo = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false, logado: true });
  }

  render() {
    const { button, loading, logado } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.onChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.submitInfo }
            disabled={ button }
          >
            Entrar
          </button>
        </form>
        {loading ? <Loading /> : null}
        {logado ? <Redirect to="/search" /> : null}
      </div>
    );
  }
}

export default Login;
