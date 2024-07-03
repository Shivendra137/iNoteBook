import React, { useContext, useState } from "react";
import Notecontext from "../context/notes/Notecontext";

const Addnote = (props) => {
  const context = useContext(Notecontext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
 

  const handleClick = (e) => {
    e.preventDefault();
    // addNote(note);
    if (note.title.length >= 3 && note.description.length >= 5) {
      addNote(note.title, note.description, note.tag);
      props.showAlert('Added a note successfully','success')
      setNote({ title: "", description: "", tag: "" })
    } else {
      
    }

    
   
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); // jo chize note m h wo toh rhe , baki aur alg se chize add ya overwrite ho jaaye
  };
  return (
    <div>
      <div className="container my-3">
        <h1>Add a note</h1>

        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              name="title"
              value={note.title}
              type="text"
              className="form-control"
              id="title"
              aria-describedby="title"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              name="description"
              value={note.description}
              type="text"
              className="form-control"
              id="description"
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              name="tag"
              value={note.tag}
              type="text"
              className="form-control"
              id="tag"
              placeholder="optional"
              onChange={onChange}
            />
          </div>

          <button
          disabled={(note.title.length<3 || note.description.length<5)? true: false}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
