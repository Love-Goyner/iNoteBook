import React, {useContext, useEffect, useRef, useState} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
import './AddNote.css'

const Notes = (props) => {
  const {mode} = props;
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const {notes, getnote, editnote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getnote();
    }else{
      navigate('/login');
    }
    // eslint-disable-next-line 
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""});

  const updateNote = (currNote)=>{
    ref.current.click();
    setNote({id:currNote._id, etitle: currNote.title, edescription: currNote.description, etag: currNote.tag});
  }

  const clickHandle = (e)=>{
    editnote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note is updated successfully", "success")

  }
  
  
  const onchange = (e)=>{
    setNote({...note, [e.target.name] : e.target.value})
  }

  return (
    <>
      <Addnote showAlert={props.showAlert} mode={mode}/>
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className={`modal-content text-${mode === "light"?"dark" :"light"} bg-${mode === "light"?"light" :"dark"}`}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className={`btn-close btn-close-${mode === "light" ? "": "white"}`} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <div className="container my-3">
                  <form className='my-3'>
                    <div className="form-group my-3">
                      <label htmlFor="title">Title</label>
                      <input type="text" className={`form-control bg-${mode === "light"?"white" :"black"} text-${mode === "light"?"dark" :"light"}`} id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" placeholder="Enter Title" onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="description">Desciption</label>
                      <textarea type="text" rows='5'  className={`form-control bg-${mode === "light"?"white" :"black"} text-${mode === "light"?"dark" :"light"}`}id="edescription" name="edescription" value={note.edescription} placeholder="Your Note Description" onChange={onchange} minLength={5} required/>
                    </div>
                    <div className="form-group my-4">
                      <label htmlFor="tag">Tag</label>
                      <input type="text" className={`form-control bg-${mode === "light"?"white" :"black"} text-${mode === "light"?"dark" :"light"}`} id="etag" name="etag" value={note.etag} placeholder="Enter a Tag" onChange={onchange}/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={clickHandle}>Update changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2 className={`mb-4 text-${mode === "light"?"dark" :"light"}`}>Your Notes</h2>
        <div className={`container mx-2 text-${mode === "light"?"dark" :"light"}`}> 
          {notes.length===0 && 'Add Your New Notes'}
        </div>
        
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} mode={mode}/>;
        })}
      </div>
    </>
  );
};

export default Notes;
