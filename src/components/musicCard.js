import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      favorite: false,
    };
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
  }

  render() {
    const { loaded, favorite } = this.state;
    const { trackName, previewUrl, song } = this.props;
    return (
      <div>
        <h5>{trackName}</h5>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        {loaded ? <Loading /> : ((
          <label htmlFor="checkbox-input">
            Favorita
            <input
              data-testid={ `checkbox-music-${song.trackId}` }
              type="checkbox"
              name="checkbox-input"
              checked={ favorite }
              onChange={ this.favoriteMusic }
            />
          </label>
        )) }
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
