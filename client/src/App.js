import React, { Component } from 'react';
import './App.css';

import Nav from './Nav';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Nav />

        <h1>Find the healthiest food at your favorite restaurant</h1>
        <p>Type in the name of a restaurant to get started:</p>

        <Search />
        
      </div>
    );
  }
}

export default App;
