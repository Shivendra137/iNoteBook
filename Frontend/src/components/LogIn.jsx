import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
const LogIn = (props) => {

    let navigate =useNavigate();
    const host = "http://localhost:5000"
    const[credentials, setCredentials] = useState({email:'', password:''})

    const handleSubmit=async (e)=> {
       
        e.preventDefault();
      
       const resp=  await fetch(`${host}/api/auth/login`, {
        method: "POST",
  
        headers: {
            'Content-Type': 'application/json'
        },
  
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
      });
  
      const json = await resp.json(); //token
      console.log(json);
      if( json.authToken) {
        // console.log('redirect ...')
        localStorage.setItem('token', json.authToken) // local storage mein authtoken ko save kr liya
        props.showAlert('Logged In successfully', 'success')
        navigate('/')  // ye line <Home/> render kra degi or we are changing the current location
      }
      else {
        // alert('invalid credentials')
        props.showAlert('Invalid Credentials', 'danger')
        
      }
      setCredentials({email:'', password:''})
    }

    const handleChange =  (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }


  return (
    <div>
      <h1> Log In to get your notes</h1>
       <form onSubmit={handleSubmit} autoComplete="off">
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input autoComplete="off" onChange={handleChange} name='email' type="email" value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input autoComplete="off" onChange={handleChange} name='password' type="password" value={credentials.password} className="form-control" id="password"/>
  </div>

  <button  type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default LogIn
