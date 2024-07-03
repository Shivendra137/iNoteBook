import React ,{useContext}from "react";
import Notecontext from '../context/notes/Notecontext'
const NoteItem = (props) => {
  const context = useContext(Notecontext)
  const {deleteNote} = context;
  const { Note,updateNote ,DeleteNote} = props;
  return (
    <div className="col-md-3 my-2">
      
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
          <h5 className="card-title">{Note.title}</h5>
          <div className="mb-2">
          <i className="fa-solid fa-trash-can mx-2" onClick={() => {DeleteNote(Note) }}></i>
          <i className="fa-sharp fa-regular fa-pen-to-square mx-2" onClick={()=> {updateNote(Note)}}></i>
          </div>
          
          </div>
          
          <p className="card-text"> {Note.description}</p>
          
          <div>
          <p className="card-text font-bold"> <i>{Note.tag}</i></p>
          </div>
          
          
        </div>
        
      </div>
    </div>
  );
};

export default NoteItem;
