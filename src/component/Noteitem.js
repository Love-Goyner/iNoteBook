import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deletenote} = context;
    const {mode, note, updateNote} = props;

  return (
    <div className='col-md-3'>
        <div className="card mb-3" style={{overflow:'hidden'}}>
            <div className={`card-body bg-${mode === "light"?"white" :"black"}`} >
                <div className=" d-flex align-items-center justify-content-between" >
                    <h5 className={`card-title text-${mode === "light"?"dark" :"light"}`}>{note.title}</h5>
                    <i className="fa-solid fa-trash-can mr-3"  style={{ color: mode === "light" ? "#333" : "#fff" }} onClick={()=>{deletenote(note._id); props.showAlert("Note is Delete successfully", "warning")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-3"  style={{ color: mode === "light" ? "#333" : "#fff" }} onClick={()=>{updateNote(note)}} ></i>
                </div>
                <p className={`card-text text-${mode === "light"?"dark" :"light"}`}>{note.description}</p>
                <p className={`card-text text-${mode === "light"?"dark" :"light"}`}>{note.tag}</p>
            </div>
        </div>
    </div>
  )
}

export default Noteitem
