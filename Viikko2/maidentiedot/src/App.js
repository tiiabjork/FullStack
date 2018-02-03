import React from 'react';
import Countries from './components/Countries'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      search: ''
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => { this.setState({ countries : response.data }) } )
  }


  handleSearchChange = (event) => {
    this.setState({ search: event.target.value})
  }

  render() {
    const countriesToShow = this.state.countries.filter(country => {return country.name.toLowerCase().includes(this.state.search.toLowerCase())})

    return (
      <div>
        <h2>Countries</h2>
            Search countries: <input
              value={this.state.search}
              onChange={this.handleSearchChange}
            />
        <div>
          <Countries countriesToShow={countriesToShow}/>
        </div>
      </div>
    )
  }
}

export default App
