import React, { useState } from "react";
import axios from "axios";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Vortex } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";


export default function MDBOLogin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    istoken: false,
    token: "",
    purpose: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true)
    event.preventDefault();
    // Send loginData to backend for authentication
    
    await axios.post('/login/organizer', loginData)
      .then((response) => {
        localStorage.setItem("evently-jwt-organizer", response.data.token);
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        //console.log(error);
        setIsLoading(false)
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
      {isLoading ? (
            <Vortex
              visible={true}
              height="30"
              width="30"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={[
                "#ed2690",
                "#000032",
                "#ed2690",
                "#000032",
                "#000032",
                "#ed2690",
              ]}
            />
          ) : (
            "Sign in as Organizer"
          )}
      </MDBBtn>
    </form>
  );
}
