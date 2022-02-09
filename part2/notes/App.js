import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './Note'
import noteServices from './services/notes';
import './index.css'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => 
    {
      noteServices.getAll().then(initialNotes => 
        {
          setNotes(initialNotes);
        });
    }

    useEffect(hook,[]);

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)
  
  const toggleImportance = (id) => 
  {
    const note = notes.find(note => note.id === id);
    const changedNote = {...note, important: !note.important};

    noteServices
          .update(id, changedNote)
          .then(returnedNote => 
            {
              setNotes(notes.map(note => note.id === id ? returnedNote : note));
            })
          .catch(error => 
            {
              setErrorMessage(
                `Note "${note.content}" was already deleted from server`
              )
              setTimeout(() => 
              {
                setErrorMessage(null)
              }, 5000)
              setNotes(notes.filter(note => note.id !== id))
            })
  }

  const addNote = (event) => 
  {
    event.preventDefault();
    const noteObject = 
    {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteServices
              .create(noteObject)
              .then(addedNote => 
                {
                  setNotes(notes.concat(addedNote));
                  setNewNote('');
                })
  }



  const handleNoteChange = (event) => 
  {
    console.log(event.target.value);
    // console.log(event.target);
    setNewNote(event.target.value);
  }

  const Notification = ({message}) => 
  {
    if(message === null) return null;

    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const Footer = () => 
  {
    const footerStyle = 
    {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }

    return (
      <div style = {footerStyle}>
        <br/>
        <em>Note app, Department of Computing, Hong Kong Polytechnic University, 2022</em>
      </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
            <div key = {note.id}><Note note={note} toggleImportance = {() => toggleImportance(note.id)}/></div>
        )}
      </ul>
      <form onSubmit = {addNote}>
          <input value = {newNote} //when we pass the value to an element with a default state, React component's state controls it
                 onChange = {handleNoteChange}/>
          <button type = "submit"> save </button>
      </form>
      <Footer/>
    </div>
  )
}

export default App