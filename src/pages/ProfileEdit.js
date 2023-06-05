import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      name: '',
      email: '',
      description: '',
      image: '',
      disabledButton: true,
      finished: '',
    };
  }

  componentDidMount() {
    this.UserInfo();
  }

  UserInfo = async () => {
    this.setState({ loading: true });
    const infos = await getUser();
    const { name, email, description, image } = infos;
    this.setState({
      name,
      email,
      description,
      image,
    });
    this.setState({ loading: false });
    this.enableButton();
  }

  enableButton = () => {
    const { name, email, image, description } = this.state;
    if (name.length > 0
      && this.correctEmail(email)
      && image.length > 0
      && description.length > 0
    ) {
      this.setState({ disabledButton: false });
    }
  }

  correctEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({
        [name]: value,
      });
      this.enableButton();
    }

    NewPerfil = () => {
      const { name, email, image, description } = this.state;
      this.setState({ loading: true });
      const newUser = {
        name,
        email,
        image,
        description,
      };
      updateUser(newUser);
      this.setState({ loading: false, finished: true });
    }

    render() {
      const {
        loading,
        disabledButton,
        name,
        email,
        description,
        image,
        finished,
      } = this.state;
      return (
        <div data-testid="page-profile-edit">
          <Header />
          { loading ? <Loading />
            : (
              <div>
                <input
                  name="name"
                  type="text"
                  placeholder="Nome"
                  data-testid="edit-input-name"
                  value={ name }
                  onChange={ this.handleChange }
                />
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  data-testid="edit-input-email"
                  value={ email }
                  onChange={ this.handleChange }
                />
                <input
                  name="description"
                  type="textarea"
                  placeholder="Descrição"
                  data-testid="edit-input-description"
                  value={ description }
                  onChange={ this.handleChange }
                />
                <input
                  name="image"
                  type="url"
                  placeholder="Foto"
                  data-testid="edit-input-image"
                  value={ image }
                  onChange={ this.handleChange }
                />
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ disabledButton }
                  onClick={ this.NewPerfil }
                >
                  Salvar
                </button>
              </div>
            )}
          { finished && <Redirect to="/profile" /> }
        </div>
      );
    }
}
export default ProfileEdit;
