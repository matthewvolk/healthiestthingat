import axios from 'axios';
import React, { Component } from 'react';

import './Search.css';

class Search extends Component {
  state = {
    query: '',
    dropdownResults: []
  }

  componentDidMount = () => {
    this.search.focus();
  }

  renderDropdownListItems = () => {
    axios.get('/search/dropdown', {
      params: {
        q: this.search.value
      }
    })
    .then((response) => {
      this.setState({
        dropdownResults: this.search.value ? response.data.dropdownList : [],
      });

      return;
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        dropdownResults: this.search.value ? ["500 Internal Server Error"] : [],
      });

      return;
    });
  }

  handleSubmit = (event) => {
    // TODO: do I need to setState for this? Probably not
    this.setState({
      query: this.search.value,
    })
    console.log(this.state.query);

    // This is where AJAX call will go for actual search results (/search?q=restaurantQuery)

    // Add the redirection to /search?q=query directly at the end of this handleSubmit method with the history API 
    // (https://reacttraining.com/react-router/web/api/history)
  }

  render() {
    return (
      <div>

        {/* Headline Text */}
        <h1>Healthiest thing at {"_____________"}</h1>
        <p>Type in the name of a restaurant to get started:</p>

        {/* Input Field */}
        <form className="search" onSubmit={this.handleSubmit}>
          <input
            type="search"
            name="q"
            className="search-input"
            placeholder="Try searching for 'Burger King'"
            ref={input => this.search = input}
            onChange={this.renderDropdownListItems}
          />

          {/* Submit Button */}
          <input type="submit" className="search-btn" value="Search"/>
        
          {/* Dropdown */}{
            (/*this.state.query &&*/ this.state.dropdownResults && this.state.dropdownResults.length > 0) && 

            // Do not create a separate Dropdown.js component for now. Overcomplicating.
            <div className="dropdown">
              <ul>
                {this.state.dropdownResults.map(result => <li key={result}><a href="/">{result}</a></li>)}
              </ul>
            </div>
          }
        </form>

        {/* Results? */}

      </div>
    )
  }
}

export default Search;
