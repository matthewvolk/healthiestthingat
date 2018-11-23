import React, { Component } from 'react';
import './App.css';

import Hero from './components/Hero/Hero';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Hero />
      </div>
    );
  }
}

export default App;
