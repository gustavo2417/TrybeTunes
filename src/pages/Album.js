import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/musicCard';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      Musics: [],
      info: '',
      loading: false,
      // favoritesMusics: [],
    };
  }

  componentDidMount() {
    this.showSong();
  }

  showFavorites = async () => {
    this.setState({ loading: true });
    // const favorites = await getFavoriteSongs();
    this.setState({ loading: false });
  }

  showSong = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const Musics = await getMusics(id);
    const info = Musics[0];
    console.log(await Musics);
    this.setState({ Musics, info });
  }

  render() {
    const { Musics, info, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : ((
          <section>
            <h1 data-testid="artist-name">{ info.artistName }</h1>
            <p data-testId="album-name">{info.collectionName}</p>
            { Musics.slice(1).map((music) => (
              <MusicCard
                key={ music.id }
                trackName={ music.trackName }
                src={ music.previewUrl }
                song={ music }
              />
            ))}
          </section>)) }
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};
