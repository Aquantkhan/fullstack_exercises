import React from 'react'


const Filter = ({filter, action}) => 
{
  return(
    <div>
      <form>
        <div> Search by name: <input value = {filter} onChange = {action}/></div>
      </form>
    </div>
  )
}

export default Filter;
