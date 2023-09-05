import React, { useState } from 'react';
import axios from 'axios'

const ParticipantLogin = () => {

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: {
      state: false,
      errMsg: '',
      para: {
        maxLength: 500,
        minLength: 3,
        match:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    },
    password: {
      state: false,
      errMsg: '',
    }
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    // Send loginData to backend for authentication
    
    // for both organizer and participant you need to do
    await axios.post('/login/participant', loginData)
      .then((response) => {
        // console.log(response);
        console.log('Login Successfully as Participant')
        // Redirect to main page
      })
      .catch((error) => {
        console.log(error);
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

  const unsetErrors = (event) => {
    let key = event.target.name;
    // console.log(key)
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

  return (
    <div>
      <h2>Participant Login</h2>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email or Username"
          onChange={handleInputChange}
          onFocusCapture={(event) => {unsetErrors(event)}}
        />
        {errors.email.state ? (errors.email.errMsg !== '' ? <div>{errors.email.errMsg}</div> : <div>Please provide a valid email</div> )  : null}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
          onFocusCapture={(event) => {unsetErrors(event)}}
        />
        {errors.password.state ? (errors.password.errMsg !== '' ? <div>{errors.password.errMsg}</div> : <div>Please provide the password</div> )  : null}
        <button onClick={handleLogin}>Login</button>
        
      </div>
    </div>
  );
};

export default ParticipantLogin;
