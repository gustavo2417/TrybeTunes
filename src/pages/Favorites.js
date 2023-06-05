import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from '../components/musicCard';

class favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favorite: [],
    };
  }

  componentDidMount() {
    this.showFavorites();
  }

  showFavorites = async () => {
    this.setState({ loading: true });
    const favorite = await getFavoriteSongs();
    this.setState({ loading: false, favorite });
  }

  render() {
    const { favorite, loading } = this.state;
    return (
      loading ? <Loading />
        : (
          <div data-testid="page-favorites">
            <Header />
            { favorite.map((music) => (
              <MusicCard
                key={ music.id }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                song={ music }
              />))}
          </div>
        )
    );
  }
}

export default favorites;
