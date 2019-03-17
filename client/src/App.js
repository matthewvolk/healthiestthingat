import React, { Component } from 'react';
import './App.css';

import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* TODO: add <Results /> component to list search results, and a 
        wrapper component to wrap <Search /> and <Results /> */}
        <Search />
      </div>
    );
  }
}

export default App;
