import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      UserInfo: [],
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ loading: true });
    const infos = await getUser();
    this.setState({ loading: false, UserInfo: infos });
  }

  render() {
    const { loading, UserInfo } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : ((
          <div>
            <p>{UserInfo.name}</p>
            <p>{UserInfo.email}</p>
            <p>{UserInfo.description}</p>
            <img
              src={ UserInfo.image }
              alt={ UserInfo.name }
              data-testid="profile-image"
            />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>

        ))}
      </div>
    );
  }
}

export default Profile;
