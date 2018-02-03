import React from 'react';


const Countries = ({ countriesToShow }) => {
  console.log(countriesToShow)
  if (countriesToShow.length === 0) {
    return <p>No matches.</p>
  }

  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  console.log('kohta pitäisi pysähtyä')
  if (countriesToShow.length === 1) {
    return <OnlyOne country={countriesToShow}/>
  }

  return <UnderTen countries={countriesToShow}/>
}

const UnderTen = ({countries}) => {
  const countriess = countries.map(country => {
    return(
      <p key={country.name}> {country.name}
      </p>
    )
  })
  return countriess
}

const OnlyOne = ({ country }) => {
  console.log(country)
  const countryy = country.map(countrye => {
    return(
      <div>
        <h1>{countrye.name}</h1>
        <p>capital: {countrye.capital}</p>
        <p>population: {countrye.population}</p>
        <img src={countrye.flag} />
      </div>
    )
  })
  return countryy
}

export default Countries
