import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import '../styles/musicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      favorite: false,
    };
  }

  componentDidMount() {
    this.showFavorites();
  }

  favoriteMusic = async () => {
    const { song } = this.props;
    const { favorite } = this.state;
    if (favorite === false) {
      this.setState({ loaded: true });
      const songFavorite = await addSong(song);
      this.setState({ loaded: false, favorite: true });
      return songFavorite;
    }
    this.setState({ loaded: true });
    await removeSong(song);
    this.setState({ loaded: true, favorite: false });
    this.showFavorites();
  }

  showFavorites = async () => {
    const { song } = this.props;
    this.setState({ loaded: true });
    const favorites = await getFavoriteSongs();
    this.setState({ loaded: false });
    if (favorites.some((songs) => songs.trackId === song.trackId)) {
      this.setState({ favorite: true });
    }
    await getFavoriteSongs();
  }

  render() {
    const { loaded, favorite } = this.state;
    const { trackName, previewUrl, song } = this.props;
    return (
      <div className="musics-card">
        {loaded ? <Loading /> : ((
          <section>
            <h5>{trackName}</h5>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>

            <label htmlFor="checkbox-input">
              Favorita
              <input
                data-testid={ `checkbox-music-${song.trackId}` }
                type="checkbox"
                id="checkbox-input"
                checked={ favorite }
                onChange={ this.favoriteMusic }
              />
            </label>
          </section>)) }
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  song: PropTypes.objectOf(PropTypes.string).isRequired,
};
