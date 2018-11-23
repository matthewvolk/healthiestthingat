import React, { Component } from 'react';
import './Hero.css';

import Nav from './Nav/Nav';
import Search from './Search/Search';

class Hero extends Component {
  render() {
    return (
      <div className="Hero">
        <Nav />
        <h1>Find the healthiest food at your favorite restaurant</h1>
        <p>Type in the name of a restaurant to get started:</p>
        <Search />
      </div>
    );
  }
}

export default Hero;
