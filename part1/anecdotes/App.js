import React, { useState } from 'react'


const Button = ({action, text}) => 
{
  return (
    <div><button onClick={action}>{text}</button></div>
  )
}


const DisplayAnecdote = (props) => 
{
  return (
    <div><h3>{props.text}</h3></div>
  )
} 
const Votes = () => 
{
  
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState({number: 0, points: Array(7).fill(0), mostLikedAnecdote: 0})

  const getRandomAnecdote = () => 
  {
    setSelected({...selected, number: Math.trunc((Math.random() * 1000) % anecdotes.length)})
  }

  const voteForAnecdote = () => 
  {
    const copy = selected.points;
    copy[selected.number]++;

    let mostLikedAnecdote = 0;
    for(let i = 0; i < selected.points.length; i++)
    {
      if(selected.points[mostLikedAnecdote] < selected.points[i])
      {
        mostLikedAnecdote = i;
      }
    }

    setSelected({...selected, points: copy, mostLikedAnecdote});
    console.log(selected.points.join(' '));
  }


  return (
    <div>
      <div><h1>Anecdote of the day</h1></div>
      <DisplayAnecdote text = {anecdotes[selected.number]}/>
      <Button action = {getRandomAnecdote} text = {"next anecdote"}/>
      <Button action = {voteForAnecdote} text = {"vote"}/>
      <div> votes: {selected.points[selected.number]}</div>
      <div><h1>Anecdote with most likes</h1></div>
      <DisplayAnecdote text = {anecdotes[selected.mostLikedAnecdote]}/>
    </div>
  )
}

export default App