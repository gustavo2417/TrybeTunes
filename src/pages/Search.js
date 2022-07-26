import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      searchedAlbum: '',
      loading: false,
      result: '',
      list: [],
    };
  }

  onChange = ({ target }) => {
    const { value } = target;
    const minLength = 2;
    this.setState({ searchedAlbum: value });
    if (value.length >= minLength) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  };

  SearchAlbum = async (event) => {
    event.preventDefault();
    const { searchedAlbum } = this.state;
    this.setState({ loading: true });
    const request = await searchAlbumsAPI(searchedAlbum);
    this.setState({ loading: false, result: searchedAlbum });
    this.setState({ searchedAlbum: '' });
    this.setState({ list: request });
  }

  render() {
    const { button, loading, result, list } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ this.onChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ button }
              onClick={ this.SearchAlbum }
            >
              Pesquisar
            </button>
          </form>)}

        {list.length > 0 ? ((
          <div>
            <h2>{`Resultado de álbuns de: ${result}`}</h2>
            {list.map((artist) => (
              <Link
                key={ artist.collectionId }
                to={ `/album/${artist.collectionId}` }
                data-testid={ `link-to-album-${artist.collectionId}` }
              >
                <div>
                  <h2>{ artist.collectionName }</h2>
                  <img src={ artist.artworkUrl100 } alt={ artist.collectionName } />
                </div>
              </Link>
            ))}
          </div>)
        )
          : <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default Search;
