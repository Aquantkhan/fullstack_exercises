import { tab } from '@testing-library/user-event/dist/tab';
import React, {useState} from 'react';
import './style.css';

const Header = text => (<h1>{text.value}</h1>)

const Button = ({action, text}) => 
{
  return (
    <button onClick = {action}> {text} </button>
  )
}

const StatisticLine = (props) => 
{
  return (
    <table>
      <tbody>
        <tr>
         <td><p>{props.text}</p></td>
         <td><p>{props.value} </p></td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = ({good, bad, neutral}) => 
{
  if(good + bad + neutral === 0)
  {
    return (
      <div>
      <div> <h1>Statistics</h1></div>
      <div> <p>No statistics is given</p></div>
      </div>
    )
  }
  return(
    <div>
        <div><h1>Statistics</h1></div>
        <StatisticLine text = 'good:' value = {good}/>
        <StatisticLine text = 'bad:' value = {bad}/>
        <StatisticLine text = 'neutral:' value = {neutral}/>
        <StatisticLine text = 'all:' value = {(good + bad + neutral)}/>
        <StatisticLine text = 'average:' value = {((good - bad) / (good + bad + neutral)).toPrecision(3)}/>
        <StatisticLine text = 'positive:' value = {((good / (good + bad + neutral)) * 100).toPrecision(3)}/>
    </div>
  )
}


const App = () => 
{

  const [reviews, setReview] = useState({good: 0, neutral: 0, bad: 0});

  const handleGoodReview = () => 
  {
    setReview({...reviews, good: reviews.good + 1})
  }

  const handleBadReview = () => 
  {
    setReview({...reviews, bad: reviews.bad + 1})
  }

  const handleNeutralReview = () => 
  {
    setReview({...reviews, neutral: reviews.neutral + 1})
  }

  return (
    <div>
      <Header value = "Give Feedback"/>
      <Button action = {handleGoodReview} text = 'good'/>
      <Button action = {handleBadReview} text = 'bad'/>
      <Button action = {handleNeutralReview} text = 'neutral'/>
      <Statistics good = {reviews.good} bad = {reviews.bad} neutral = {reviews.neutral} />
    </div>
  )
}



export default App;