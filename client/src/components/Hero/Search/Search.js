import React, { Component } from 'react';
import './Search.css';

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
      <div>
        <form>
          <input 
            type="search"
            placeholder="Try typing 'Burger King' or 'McDonald's'"
            ref={input => this.search = input}
            onChange={this.handleInputChange}
            name="" 
          />

          <input 
            type="submit" 
            value="Search" 
          />
        </form>

        <p>{this.state.query}</p>
      </div>
      
    )
  }
}

export default Search;