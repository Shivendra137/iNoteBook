import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Notestate from "./context/notes/Notestate";
import Alert from "./components/Alert";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
function App() {

  

  

  
  const [alert,setAlert] = useState(null);

const showAlert = (message, type) => {


  setAlert({

    msg : message, 
    type: type
  })

  setTimeout(()=> {
     setAlert(null)
  },3000)
}

  return (
    <>
      <Notestate>
        {/* the Notestate is also a component and the things contained bw <Notestate> and 
        </Notestate> act as the child components in the Notestate component. Context Provider:
The Notestate component returns a Notecontext.Provider which provides the state and update function to any of its children (SomeChildComponent in this case).

Consuming Context:
Inside SomeChildComponent, you can consume the context using the useContext hook:*/}
        <Router>
          <Navbar />
          <Alert alert={alert}/>
           
           <div className="container">
           <Routes>
            <Route exact path="/about" element={<About />} />

            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/login" element={<LogIn showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
          </Routes>
           </div>
          
        </Router>
      </Notestate>
    </>
  );
}

export default App;
