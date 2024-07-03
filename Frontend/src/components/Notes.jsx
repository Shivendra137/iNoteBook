import React, { useContext, useRef, useState } from "react"; // useRef ki madad se aap kisi bhi element ko reference de sakte ho
import Notecontext from "../context/notes/Notecontext"; // iss context ke ander hi toh mera state h aur state ko update krne wala func h
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const navigate = useNavigate();

  const context = useContext(Notecontext);
  const { notes, getAllNotes, editNote ,deleteNote} = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes(); // sare notes ko fetch krne ka kaam keval ek bar hoga kyun ki dependencies mein kuch h hi nhi toh change kya hoga
    } else {
      navigate("/login");
    }
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const [note2, setNote2] = useState({
    id2: "",
    
  });

  const updateNote = (currentNote) => {
    // pura note hi le lega
    ref.current.click(); // show ho rha ho to hide ho jaye aur hide ho rha ho toh show ho jaye
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const DeleteNote = (currentNote) => {

    refDel.current.click();
    setNote2({
      id2: currentNote._id,
      
    });
   
  }

  const ref = useRef(null);
  const refClose = useRef(null);
  const refDel= useRef(null)
  const refDelClose= useRef(null)

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Updated the note successfully", "success");
    refClose.current.click();
  };


  const delHandleClick =(e) => {
    e.preventDefault();
    deleteNote(note2.id2);
    props.showAlert('deleted the note successfully', 'success');
    refDelClose.current.click();

  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); // jo chize note m h wo toh rhe , baki aur alg se chize add ya overwrite ho jaaye
  };

  return (
    <>
      <Addnote showAlert={props.showAlert} />

      
      <button
      ref={refDel}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModaldelete"
      >
        Delete a note
      </button>

      <div
        className="modal fade"
        id="exampleModaldelete"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Delete the note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are you sure that you want to delete this note?</div>
            <div className="modal-footer">
              <button
              ref={refDelClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button  onClick={delHandleClick} type="button" className="btn btn-primary">
                Yes! Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    name="etitle"
                    value={note.etitle}
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="etitle"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    name="edescription"
                    value={note.edescription}
                    type="text"
                    className="form-control"
                    id="edescription"
                    onChange={onChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    name="etag"
                    value={note.etag}
                    type="text"
                    className="form-control"
                    id="etag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                    ? true
                    : false
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your notes</h2>

        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              showAlert={props.showAlert}
              key={note._id}
              updateNote={updateNote}
              DeleteNote={DeleteNote}
              Note={note}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
