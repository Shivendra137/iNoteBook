//is file mein mai state banauga using context

import { useState } from "react";
import Notecontext from "./Notecontext";

const Notestate = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  
  //get all notes
  const getAllNotes = async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });

   
    const json = await response.json();
    setNotes(json);
  };

  // //add a note
  // const addNote = async (note) => {
  //   //API call
  //   const response = await fetch(
  //     `${host}/api/notes/addnote`,
  //     {
  //       method: "POST",

  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token":
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmJjOGZkZjZmZDczMTc2Mzc2YTJiZCIsImlhdCI6MTcxODM3NTU0MH0.SjkObusnyNFn9kspotejCNwsh43mT-m7eaLuFC7pNJs",
  //       },

  //       body: JSON.stringify(data),
  //     }
  //   );
  //   const json = response.json();

  //   //logic to add a note
  //   setNotes([...notes, note]);
  //   // notes array mein note ko add kr diya
  //   //upaar wale syntax ka matlab h ki notes me jo h wo rhe aur note usme add ho jaye ya overwrite(jb same note aa jaye) ho jaye
  // };

  //add a note
  const addNote = async (title, description, tag) => {
    //API call( use the package npm i cors in backend folder to fetch the api of backend from the frontend)
   const resp=  await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },

      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }), // inside the obj--> title : title , description: description , tag: tag
    });

    const json = await resp.json();//(new note received from backend)
    

   // logic to add a note( upar bakend me(everything will happen through the routes in backend) add ,niche frontend me add)
    const note = {
      _id : json._id,
      title: title,
      description: description,
      tag: tag,
    };
   

    setNotes(notes.concat(note));
    // getAllNotes();
   
  };

  //delete a note
  const deleteNote = async (id) => {
    //API call
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
    });

    //logic to edit the note
    console.log("deleting the note with id" + id);
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },

      body: JSON.stringify({ title:title, description:description, tag:tag }),
    });
    const json = response.json();


    let newNotes = JSON.parse(JSON.stringify(notes))  // here the newnotes is the copy of notes
    // logic to edit the note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;

        break;
      }
    }
   setNotes( newNotes)
    // getAllNotes();  ( bcz it will render all the notes again)
  };

  return (
    <Notecontext.Provider
      value={{ notes, addNote, deleteNote, editNote, getAllNotes }}  //  mera contextProvider ye jo states aur functions provide kra rha h , ye mere har ek child component( e.g Home , LogIn, etc) ko accessible hogi , aur in child components mein mai inn states aur functions ka  sidha use kr sakta hu use context hook ki help se 
    >
      {/* ab ye context jayega mere home pe */}
      {/* notes mera state h aur setNotes mera state ko update krne wala func h */}
      {/* upar ek obj bhi banaya gya h jisme state kivalue state h aur update ki value updatefunc h */}
      {/* is func ke ander jo bhi tum provide krna chahte ho usko value ke andar dal do */}

      {props.children}
    </Notecontext.Provider>
  );
};

export default Notestate;
