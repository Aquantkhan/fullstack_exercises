

import React, { useEffect, useState } from 'react'
import Filter from './Filter'

import PersonsForm from './PersonsForm'
import DisplayPersons from './DisplayPersons' 

import axios from 'axios'
import axiosService from './services/axiosService'

import './index.css'



const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSearch, setNewSearch] = useState('');
  const [notification, setNotification] = useState(null);
  const [cssClassName, setCssClassName] = useState('');

  const hook = () => 
  {
    axiosService.getAll().then(persons => setPersons(persons));
  }
  useEffect(hook,[]); //useEffect is to use an imperative code that needs to be executed after every render

  const personsShow = persons.filter((person) => person.name.toLowerCase().includes( newSearch.toLowerCase() ) );

  const handleNameChange = function(event)
  {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handlePhoneChange = function(event) 
  {
    console.log(event.target.value);
    setNewPhone(event.target.value);
  }

  const handleSearchChange = function(event) 
  {
    setNewSearch(event.target.value);
  }

  const handleNewPerson = (event) => 
  {
                                        //it is used to prevent the event handler from reloading the page, since the 
    event.preventDefault();             //defualt usage of the form leads to the page reload

    if(newPhone.length < 2)
    {
      alert(`Phone number is too short`);
    }
    else if(persons.every((person) => newName != person.name)) //array.every() return true if every element passes specified function
    {
      const newPerson = {id: persons.length + 1, name: newName, phone: newPhone};
      axiosService.post(newPerson).then(responsePerson => 
        {
          setPersons(persons.concat(responsePerson));
          setCssClassName('successNotification');
          setNotification(`"${responsePerson.name}" is succesfully added to the contacts list`)
          setTimeout(() => 
          {
            setNotification(null);
          }, 5000)
        });
      setNewName('');
      setNewPhone('');
    }
    else 
    {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`))
      {
        const neededPerson = persons.find(person => person.name === newName ? person : NaN);
        const copy = ({...neededPerson, phone: newPhone});

        // console.log(copy);
        axiosService.update(copy.id, copy)
          .then(response => 
          {
            setCssClassName('successNotification');
            setPersons(persons.map(person => person.id === response.id ? response : person));
            setNotification(`"${response.name}"'s phone number is successfully changed`)
            setNewPhone('');
            setTimeout(() => 
            {
              setNotification(null);
            }, 5000)
          })
          .catch(error => 
            {
              setCssClassName('errorNotification');
              setNotification(`Information of ${neededPerson.name} was already deleted from the server`)
              setPersons(persons.filter(person => person.id !== neededPerson.id));
              setNewPhone('');
              setTimeout(() => 
              { 
              setNotification(null);
              }, 5000)
            })
      }
      setNewName('');
    }
  }

  const handleDeletePerson = id => 
  {
    console.log(id);
    // axiosService.remove(id).then(newPersons => setPersons(newPersons));
    axiosService.remove(id).then(() => 
    {
      const personsCopy = persons.filter(person => person.id !== id);
      const deletedPerson = persons.find(person => person.id === id);

      setPersons(personsCopy);
      setCssClassName('successNotification');
      setNotification(`"${deletedPerson.name}" is succesfully deleted from the list`)
      setTimeout(() => 
      {
        setNotification(null);
      }, 5000);
    });
  }

  const Notification = ({message, className}) => 
  {
    if(message === null) return null;
    
    return (
      <div className = {className}>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notification} className = {cssClassName}/>
      <Filter filter = {newSearch} action = {handleSearchChange} />
      <h2>Add new contact</h2>
      <PersonsForm newNameValue={newName} newPhoneValue={newPhone} 
                  phoneChangeAction={handlePhoneChange} nameChangeAction={handleNameChange} 
                  submitAction={handleNewPerson}/>
      <h2>Numbers</h2>
      <DisplayPersons personsShow = {personsShow} deletePerson = {handleDeletePerson}/>
    </div>
  )
}

export default App;