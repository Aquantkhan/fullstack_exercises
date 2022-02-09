import React, {useState, useEffect} from 'react'

const DisplayCountries = ({showCountries, newSearch, setNewSearch}) => 
{   
    const [show, setShow] = useState(false);
    let id = 0;
    let lid = 0;


    const createID = () => 
    {
        return (id += 1); 
    }
    const createLangID = () => 
    {
        return (lid += 1); 
    }
    const handleShowInfo = (event) => 
    {   

        const country = showCountries[event.target.id];
        console.log(country);
        let languages = [];
        for(let key in country.languages)
        {
            languages.push(country.languages[key]);
        }
        setNewSearch(country.name.official);
        return(
            <div>
                <h1>{country.name.official}</h1>
                <p>Capital: {country.capital[0]}</p>
                <p>Independancy: {country.independent ? 'Independant' : 'Not-independant'}</p>
                <p>Region: {country.region}</p>
                <p>Population: {country.population}</p>
                <h2>Languages</h2>
                <div> {languages.map(lang => <p key = {createLangID()}>{lang}</p>)} </div>
                <img src={country.flags.png}></img>
            </div>
        )
    }

    if(newSearch === '')
    {
        return (
            <div>
            Input the filter
            </div>
        )
    }
    if(showCountries.length == 0)
    {
        return (
            <div>
            No matches
            </div>
        )
    }
    if(showCountries.length == 1)
    {
        const country = showCountries[0];
        let languages = [];
        for(let key in country.languages)
        {
            languages.push(country.languages[key]);
        }
        console.log(languages);
        return (
            <div>
                <h1>{country.name.official}</h1>
                <p>Capital: {country.capital[0]}</p>
                <p>Independancy: {country.independent ? 'Independant' : 'Not-independant'}</p>
                <p>Region: {country.region}</p>
                <p>Population: {country.population}</p>
                <h2>Languages</h2>
                <div> {languages.map(lang => <p key = {createLangID()}>{lang}</p>)} </div>
                <img src={country.flags.png}></img>
            </div>
        )
    }
    if(showCountries.length < 10)
    {
        return (
            <div>
                {showCountries.map(showCountry => <p key = {createID()}>{showCountry.name.official} <button type='submit' id = {id} onClick={handleShowInfo}>show</button></p>)}
            </div>
        )
    }
    return (
        <div>
        Too many matches, specify another filter
        </div>
    )
}

export default DisplayCountries;