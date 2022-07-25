import React from 'react';
import Header from '../components/Header';

class favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <h1>favorites</h1>
        <Header />
      </div>
    );
  }
}

export default favorites;
