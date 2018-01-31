import React from 'react';
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: props.persons,
      newName: '',
      newNumber: '',
      showAll: true,
      search: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()

    for (let i = 0; i < this.state.persons.length; i++) {
      if (this.state.persons[i].name.toLocaleUpperCase() === this.state.newName.toLocaleUpperCase()) {
        this.setState({ newName: ''})
        alert('Kokeileppa uudestaa, nimi löytyy jo')
        return
      }
    }

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const persons = this.state.persons.concat(personObject)

    this.setState({
      persons,
      newName: '' ,
      newNumber: ''
    })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value})
    if(event.target.value !== '') {
      this.setState({ showAll: false})
    }
  }

  render() {
    const namesToShow =
      this.state.showAll ?
        this.state.persons : this.state.persons.filter(person => person.name.includes(this.state.search))
    return (
      <div>
        <h2>Haku</h2>
          <div>
            nimi: <input
              value={this.state.search}
              onChange={this.handleSearchChange}
            />
          </div>

      <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="Submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          <table>
            <tbody>
              {namesToShow.map(person => <Person key={person.name} person={person}/>)}
            </tbody>
          </table>
      </div>
    )
  }
}

export default App
