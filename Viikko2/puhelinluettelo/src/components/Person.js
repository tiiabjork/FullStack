import React from 'react'

const Person =  ({person, onRemove}) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={ () => onRemove(person.id)}>Poista</button></td>
    </tr>
  )
}

export default Person
