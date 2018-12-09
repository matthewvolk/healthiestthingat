import React, { Component } from 'react';

import './Search.css'

const testData = [
  'Burger King',
  "Carl's Jr.",
  "In N Out",
  "Jack in the Box",
  "McDonald's",
  "Taco Bell",
  "Shake Schack",
  "Wendy's",
  "El Pollo Loco",
]

class Search extends Component {
  state = {
    query: '',
    results: []
  }

  setResults = () => {
    
  }

  componentDidMount = () => {
    this.search.focus();
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    })

    // This is where the axios AJAX call will go
    const results = testData.filter(data => data.includes(this.search.value))

    this.setState({
      results: this.search.value ? results : [],
    })
  }

  render() {
    return (
      <div>
        <h1>Find the healthiest food at your favorite restaurant.</h1>
        <p>Type in the name of a restaurant to get started:</p>

        <form className="search">
          <input
            type="search"
            className="search-input"
            placeholder="Try searching for 'Burger King'"
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />

          <input type="submit" className="search-btn" value="Search"/>
        
          { 
            (this.state.query && this.state.results && this.state.results.length > 0) && 
            <div className="dropdown">
              <ul>
                {this.state.results.map(result => <li key={result}><a href="/">{result}</a></li>)}
              </ul>
            </div>
          }
        </form>
      </div>
    )
  }
}

export default Search;
