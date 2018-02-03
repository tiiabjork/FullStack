import React from 'react';
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      showAll: true,
      search: '',
      notification: null
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addPerson = (event) => {
    event.preventDefault()

    //tarkistetaan, löytyykö henkilö jo
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

    personService
      .create(personObject)
      .then(response => {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNumber:'',
          notification : `Uusi henkilö lisättiin onnistuneesti puhelinluetteloon.`
        })
        setTimeout(() => this.setState({notification: null}), 5000)
      })
  }

  removePerson = (id) => {
    //etsitään henkilö
    const personToRemove = this.state.persons.filter(person => person.id === id)

    if (window.confirm(`Haluatko varmasti poistaa henkilön ${personToRemove.name}`)) {
      const remainingPersons = this.state.persons.filter(person => person.id !== id)

      personService
        .remove(id)
        .then( () => {
          this.setState({
            persons: remainingPersons,
            notification: `Henkilö poistettu onnistuneesti!`
          })
          setTimeout(() => this.setState({notification: null}), 5000)
        })
    }
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
    console.log('render')
    const namesToShow =
      this.state.showAll ?
        this.state.persons : this.state.persons.filter(person => person.name.includes(this.state.search))
    return (
      <div>
        <Notification message={this.state.notification} />
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
              {namesToShow.map(person => <Person key={person.id} person={person} onRemove={this.removePerson}/>)}
            </tbody>
          </table>
      </div>
    )
  }
}

export default App
