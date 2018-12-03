import React, { Component } from 'react';
import './App.css';

import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
        <p>test</p>
      </div>
    );
  }
}

export default App;
