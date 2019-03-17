import axios from 'axios';
import React, { Component } from 'react';

import './Search.css'

class Search extends Component {
  state = {
    query: '',
    results: []
  }

  componentDidMount = () => {
    this.search.focus();
  }

  renderDropdown = () => {
    this.setState({
      query: this.search.value,
    })


    axios.get('http://localhost:3001/search/dropdown', {
      params: {
        q: this.search.value
      }
    })
    .then((response) => {
      this.setState({
        results: this.search.value ? response.data.dropdownResults : [],
      });

      return;
    })
    .catch((error) => {
      console.log(error);

      return;
    });
  }

  handleSubmit = () => {
    // This is where AJAX call will go for actual results (/search?q=restaurantQuery)
  }

  render() {
    return (
      <div>

        {/* Headline Text */}
        <h1>Find the healthiest food at your favorite restaurant.</h1>
        <p>Type in the name of a restaurant to get started:</p>

        {/* Input Field */}
        <form className="search">
          <input
            type="search"
            className="search-input"
            placeholder="Try searching for 'Burger King'"
            ref={input => this.search = input}
            onChange={this.renderDropdown}
          />

          {/* Submit Button */}
          <input type="submit" className="search-btn" value="Search"/>
        
          {/* Dropdown */}{
            (this.state.query && this.state.results && this.state.results.length > 0) && 

            // Do not create a separate Dropdown.js component for now. Overcomplicating.
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
