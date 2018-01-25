import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      aanet: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    }
  }

  klik = ()  => () => {
    var koko = this.props.anecdotes.length
    const selected = this.getRandomInt(0,koko)
    // Nyt kun nimeää randomin samalla kuin this.staten avaimen nimen, niin se osaa laittaa sen suoraan oikeaan arvoon
    this.setState({ selected })
  }

  getRandomInt(min, max) {
    var muuttuja = Math.floor(Math.random() * (max - min)) + min
    console.log(muuttuja)
    return muuttuja;
  }

  vote = (aanenSaaja) => () => {
    var aani = this.state.aanet[aanenSaaja]
    var kopio = {...this.state.aanet} //kopio oliosta
    kopio[aanenSaaja] = aani + 1

    this.setState({aanet: kopio})
  }

  mostVoted = () => () => {
    console.log('ollanko sisällä')
    var aanestetyin = 0
    var aanimaara = 0
    var i = 0
    for (i = 0 ; i < 6 ; i++){
      if (this.state.aanet[i] > aanimaara) {
        aanestetyin = i
        aanimaara = this.state.aanet[i]
      }
    }
    console.log(aanestetyin)
    return this.props.anecdotes[aanestetyin]
  }

  getVote = (anecdote) => () => {
    return this.state.aanet[anecdote]
  }

  render() {
    return (
      <div>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <Button
          handleClick={this.vote(this.state.selected)}
          text="Vote"
        />
        <Button
          handleClick={this.klik()}
          text="Next anecdote"
        />

        <h2>Anecdote with the most votes:</h2>
        <MostVoted
          anecdote={this.mostVoted()}
          votes={this.getVote(this.mostVoted())}
        />
      </div>
    )
  }
}

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const MostVoted = ({ anecdote, votes}) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
