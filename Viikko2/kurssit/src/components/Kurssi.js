import React from 'react'

const Otsikko = ({kurssi}) => <h1>{kurssi.nimi}</h1>

const Sisalto = ({osat}) => {
  return (
    <div>
      {osat.map(osa => <Osa key={osa.id} osa={osa}/>)}
    </div>
  )
}

const Osa = ({osa}) => <p>{osa.nimi} {osa.tehtavia}</p>

const Yhteensa = ({osat}) => {
  const yhteensa = osat.reduce((summa, yks) => summa + yks.tehtavia, 0)
  return(
    <p>Yhteensä {yhteensa} tehtävää</p>
  )
}

const Kurssi = ({kurssi}) => {
  return(
    <div>
      <Otsikko kurssi={kurssi}/>
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

export default Kurssi
