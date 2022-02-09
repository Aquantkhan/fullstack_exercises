import React from 'react'

const DisplayPersons = ({personsShow, deletePerson}) => 
{
  return(
    <div>
       {personsShow.map(person => <p key = {person.id}> {person.name}: {person.phone} <button onClick = {() => deletePerson(person.id)}>delete</button></p>)}
    </div>
  )
}

export default DisplayPersons;