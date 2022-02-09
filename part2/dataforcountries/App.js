import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayCountries from './DisplayCountries';

const App = () => 
{ 
  const [newSearch, setNewSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const countriesHook = () =>
  {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => 
      {
        console.log(response.statusText);
        setCountries(response.data);
      })
  }
  useEffect(countriesHook, []);

  const showCountries = countries.filter((country) => country.name.official.toLowerCase().includes(newSearch.toLowerCase()));

  const handleSearchChange = (event) => 
  {
    event.preventDefault();
    console.log(event.target.value);
    setNewSearch(event.target.value);
  }


  return (
    <div>
      <form>
        <div>
          find countries <input value = {newSearch} onChange = {handleSearchChange}></input>
        </div>
      </form>
      <div>
        <DisplayCountries showCountries={showCountries} newSearch = {newSearch} setNewSearch = {setNewSearch}/>
      </div>
    </div>
  )
}

export default App;

