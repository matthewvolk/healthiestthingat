import React, { Component } from 'react';
import './index.css';

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
  }

  render () {
    return (
      <form>
        <input 
          type="search"
          placeholder="Try typing 'Burger King' or 'McDonald's'"
          ref={input => this.search = input}
          onChange={this.handleInputChange}
          name="" 
          id=""
        />

        <input 
          type="submit" 
          value="Search" 
        />

        <p>{this.state.query}</p>

      </form>
    )
  }
}

export default Search;