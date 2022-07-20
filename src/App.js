import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Album from './pages/Album';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import favorites from './pages/Favorites';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={ Login } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="/album/:id" component={ Album } />
            <Route path="/profile" component={ Profile } />
            <Route path="/favorites" component={ favorites } />
            <Route path="/search" component={ Search } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
