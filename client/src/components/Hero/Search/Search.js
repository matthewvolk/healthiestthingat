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

    if (this.search.value) { 
      document.getElementsByClassName('autocomplete')[0].style.visibility = 'visible'; 
    } else {
      document.getElementsByClassName('autocomplete')[0].style.visibility = 'hidden'; 
    }
    /**
     * Also, if input val = 0, do not show dropdown
     */
  }

  render () {
    return (
      <form autoComplete="off">

        <input ref={input => this.search = input} onChange={this.handleInputChange} type="search" name="search" className="search" placeholder="Try typing 'Burger King' or 'McDonald's'" />
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