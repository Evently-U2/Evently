import React, { useState } from "react";
import axios from "axios";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";


export default function MDBOLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: {
      state: false,
      errMsg: "",
      para: {
        maxLength: 500,
        minLength: 3,
        match:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    },
    password: {
      state: false,
      errMsg: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const unsetErrors = (event) => {
    let key = event.target.name;
    // //console.log(key)
    setErrors((prevData) => {
      return {
        ...prevData,
        [key]: {
          ...prevData[key],
          state: false
      }
    }
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    // Send loginData to backend for authentication
    
    await axios.post('/login/organizer', loginData)
      .then((response) => {
        console.log(response);
        //console.log('Login Successfully as Organizer')
        // Redirect to main page
      })
      .catch((error) => {
        //console.log(error);
        if(error.response.data.msg === 'Email not found'){
          setErrors((prevData) => {
            return {
              ...prevData,
              email: {
                state: true,
                errMsg: 'Invalid email'
              }
            }
          })
        } else if (error.response.data.msg === 'Password is incorrect') {
          setErrors((prevData) => {
            return {
              ...prevData,
              password: {
                state: true,
                errMsg: 'Invalid Password'
              }
            }
          })
        }
      })
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <MDBInput
        label="Email"
        type="email"
        name="email"
        value={loginData.email}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.email.state ? (errors.email.errMsg !== '' ? <div className="error-message" >{errors.email.errMsg}</div> : <div className="error-message" >Please provide a valid email</div> )  : null}
      <MDBInput
        label="Password"
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.password.state ? (errors.password.errMsg !== '' ? <div className="error-message" >{errors.password.errMsg}</div> : <div className="error-message" >Please provide the password</div> )  : null}
      <MDBBtn type="submit" className="mt-4" block >
        Sign in as Organizer
      </MDBBtn>
    </form>
  );
}
