import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount() {
    this.nameOnDisplay();
  }

    nameOnDisplay = async () => {
      const { name } = await getUser();
      this.setState({
        loading: false,
        name,
      });
    }

    render() {
      const { loading, name } = this.state;
      return (
        <header data-testid="header-component">
          { loading ? <Loading /> : <h3 data-testid="header-user-name">{ name }</h3>}
          <Link data-testid="link-to-search" to="/search">
            search
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites">
            Favorites
          </Link>
          <Link data-testid="link-to-profile" to="/profile">
            Profile
          </Link>
        </header>
      );
    }
}

export default Header;
