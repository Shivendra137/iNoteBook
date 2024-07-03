import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Alert from './Alert';

const SignUp = (props) => {
    const host = "http://localhost:5000"
    let navigate =useNavigate();
    const[credentials, setCredentials] = useState({fullname:'',email:'', password:'', cpassword:''})

    const handleSubmit=async (e)=> {
       
        e.preventDefault();
      
        if(credentials.password=== credentials.cpassword){
          const resp=  await fetch(`${host}/api/auth/createUser`, {
            method: "POST",
      
            headers: {
                'Content-Type': 'application/json'
            },
      
            body: JSON.stringify({
                name: credentials.fullname,
              email: credentials.email,
              password: credentials.password,
              
            }),
          });
      
          const json = await resp.json(); //token
          console.log(json);
          if( json.authToken) {
            // console.log('redirect ...')
            localStorage.setItem('token', json.authToken) // local storage mein authtoken ko save kr liya
            props.showAlert('Account created successfully', 'success')
            navigate('/')  // ye line <Home/> render kra degi or we are changing the current location
          }
          else {
            // alert('invalid credentials')
             props.showAlert('Invalid Credentials', 'danger')
          }
          setCredentials({email:'', password:'',fullname:'',cpassword:''})

        }

        else {
          props.showAlert('please confirm the password', 'info')
        }
       
    }

    const handleChange =  (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
  return (
    <div className="container">
      <h1> Sign Up to create an Account</h1>
      <form onSubmit={handleSubmit} autoComplete="off">

      <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            name="fullname"
            onChange={handleChange}
            value={credentials.fullname}
            autoComplete="off"
            required
           
            
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email 
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleChange}
            value={credentials.email}
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            value={credentials.password}
            autoComplete="off"
            required
            minLength={5}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
           Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={handleChange}
            value={credentials.cpassword}
            autoComplete="off"
            required
            
          />
        </div>



        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
