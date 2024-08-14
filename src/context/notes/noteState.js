import NoteContext from "./noteContext";
import {useState} from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Get all notes function
  const getnote = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const jsonData = await response.json();
    setNotes(jsonData)
  };



  //Add notes function
  const addnote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });

    const note = await response.json()
    setNotes(notes.concat(note));
  };

  //delete note
  const deletenote = async (id) => {

    //API CALL
    // eslint-disable-next-line 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });

    const newNode = notes.filter((note) => {return note._id !== id;});
    setNotes(newNode);
    
  };

  //edit a note
  const editnote = async (id, title, description, tag) => {
    //API CALL
    // eslint-disable-next-line 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });

    //edit notes logic in client side
    const newNode = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNode.length; index++) {
      const element = newNode[index];
      if (element._id === id) {
        newNode[index].title = title;
        newNode[index].description = description;
        newNode[index].tag = tag;
        break;
      }
    }
    setNotes(newNode);
  };

  return (
    <NoteContext.Provider value={{notes, addnote, deletenote, getnote, editnote}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
