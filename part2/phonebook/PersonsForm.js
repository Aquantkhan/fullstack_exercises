import React from 'react'

const PersonsForm = ({newPhoneValue, newNameValue, nameChangeAction, phoneChangeAction, submitAction}) => 
{
  return (
  <div>
    <form onSubmit={submitAction}>
      <div>
        name: <input value = {newNameValue} onChange={nameChangeAction}/>
      </div>
      <div>
        number: <input value = {newPhoneValue} onChange = {phoneChangeAction}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
  )
}

export default PersonsForm;