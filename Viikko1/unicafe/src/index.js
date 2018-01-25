import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  klik = (asteikko, arvo)  => () => {

    this.setState({ [asteikko]: arvo + 1 })
  }


  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <div>
          <Button
            handleClick={this.klik('hyva', this.state.hyva)}
            text="Hyvä"
          />
          <Button
            handleClick={this.klik('neutraali', this.state.neutraali)}
            text="Neutraali"
          />
          <Button
            handleClick={this.klik('huono', this.state.huono)}
            text="Huono"
          />
        </div>
        <div>
          <Statistics statistics={this.state} />
        </div>
      </div>
    )
  }
}

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}


const Statistics = ({statistics}) => {
  let summa = (statistics.hyva + statistics.neutraali + statistics.huono)

  if (summa === 0) {
    return(
      <div>
        <h2>Statistiikka</h2>
        <p>Ei yhtään palautetta annettu.</p>
        </div>
      )
  } else {
    return (
      <div>
        <h2>Statistiikka</h2>
          <table>
            <Statistic value={statistics.hyva} text={"Hyvä"}/>
            <Statistic value={statistics.neutraali} text={"Neutraali"}/>
            <Statistic value={statistics.huono} text={"Huono"}/>
            <Statistic value={((statistics.hyva*1 - statistics.huono*1) / summa).toFixed(1)} text={"Keskiarvo"}/>
            <Statistic value={(statistics.hyva * 100 /(summa)).toFixed(1) + '%'} text={"Positiivisia"}/>
          </table>
      </div>
        )
      }
}

const Statistic = ({ value, text }) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>

)


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
