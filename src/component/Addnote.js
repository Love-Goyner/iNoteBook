import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext";
import '../component/AddNote.css'

const Addnote = (props) => {
  const {mode} = props;
    const context = useContext(noteContext);
  const {addnote} = context;

  const [note, setNote] = useState({title:"", description:"", tag:"Default"});

  const clickHandle = (e)=>{
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""});
    props.showAlert("Note is Added successfully", "success")
  }
  const onchange = (e)=>{
    setNote({...note, [e.target.name] : e.target.value})
  }

  
  return (
    <div>
      <div className="container my-3">
        <h2 className={`text-${mode === "light"?"dark" :"light"}`}>Add a Note</h2>
        <form className='my-3'>
          <div className="form-group my-3">
            <label htmlFor="title" className={`text-${mode === "light"?"dark" :"light"}`}>Title</label>
            <input type="text" className={`form-control bg-${mode === "light"?"white" :"black"} text-${mode === "light"?"dark" :"light"}`} id="title" name="title" aria-describedby="emailHelp" placeholder="Enter Title" value={note.title} onChange={onchange} minLength={5} required/>
          </div>
          <div className="form-group my-3">
            <label htmlFor="description" className={`text-${props.mode === "light"?"dark" :"light"}`}>Desciption</label>
            <textarea type="text" rows='5'   className={`form-control bg-${mode === "light"?"white" :"black"} text-${mode === "light"?"dark" :"light"}`} id="description" name="description" placeholder="Your Note Description" value={note.description} onChange={onchange} minLength={5} required/>
          </div>
          <div className="form-group my-4">
            <label htmlFor="tag" className={`text-${props.mode === "light"?"dark" :"light"}`}>Tag</label>
            <input type="text"  className={`form-control bg-${mode === "light"?"white" :"black"} text-${mode === "light"?"dark" :"light"}`} id="tag" name="tag" placeholder="Enter a Tag" value={note.tag} onChange={onchange} minLength={5} required />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={clickHandle}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default Addnote
