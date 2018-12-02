import React, { Component } from 'react';
import axios from 'axios';

import './Search.css';

const testData = [
  'Burger King', 
  'McDonalds',
  'Taco Bell'
]

class Search extends Component {
  state = {
    query: '',
  }

  componentDidMount () {
    this.search.focus();
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    })

    /**
     * Every time this function fires, I need an algorithm to read the 
     * current value in the input, and append elements from the 
     * the data structure 'testData' above to the autocomplete 
     * dropdown that match the value in input at that time (fuzzy
     * text search)
     * 
     * for (let i = 0; i < testData.length; i++) {
     *   if (testData[i].indexOf(this.state.query) > -1) {
     *     append testData[i] to the list of autocomplete suggestions
     *   }
     * }
     * 
     * This is a slow loop, not because of the impementation, but because
     * it runs every time a user presses a key within the search bar
     */

    if (this.search.value) { 
      document.getElementsByClassName('autocomplete')[0].style.visibility = 'visible'; 
    } else {
      document.getElementsByClassName('autocomplete')[0].style.visibility = 'hidden'; 
    }
  }

  render () {
    return (
      <form autoComplete="off">
        <input 
          // Refs provide a way to access DOM nodes (like <input />) 
          // created in the render method.
          ref={input => this.search = input} 
          onChange={this.handleInputChange} 
          type="search" 
          name="search" 
          placeholder="Try typing 'Burger King' or 'McDonald's'" />
        <input type="submit" value="Search" />

        <div className="autocomplete">
          <ul>
            <li><a href="/">{this.state.query}</a></li>
          </ul>
        </div>
      </form>
    )
  }
}

export default Search;