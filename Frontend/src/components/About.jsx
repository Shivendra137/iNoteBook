import React, { useContext, useEffect } from "react";
// import Notecontext from "../context/notes/Notecontext";

const About = () => {
  // const a = useContext(Notecontext);  // consuming the context // ye a usii returned value ke equal hoga

  return (
    <div>
      <h1>About iNotebook</h1>

      <div className="card my-2">
        <div className="card-body">
          <ul>
            <li>iNotebook is a web-based application for note-taking and managing personal notes.</li>
            <li>Designed to help users organize their thoughts, tasks, and ideas efficiently.</li>
          </ul>

        </div>
      </div>

      <div className="card my-2">
        <div className="card-body"><ul>
            <li>Secure login and registration system.</li>
            <li>Uses JWT (JSON Web Tokens) for authentication.</li>
            <li>Password encryption with bcrypt for enhanced security.</li>
          </ul></div>
      </div>

      <div className="card my-2">
        <div className="card-body"><ul>
            <li>Create new notes with a title, description, and optional tags.</li>
            <li>Edit existing notes to update content.</li>
            <li>Delete notes that are no longer needed.</li>
            <li>Fetch all notes for viewing.</li>
          </ul></div>
      </div>

    
    </div>
  );
};

export default About;
