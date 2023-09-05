import React, { useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import "./FormStyles.css"; // Import CSS for styling

const MDBORegistration = () => {
  const [formData, setFormData] = useState({
    organizerName: "",
    organizerHeadName: "",
    startingYear: "",
    description: "",
    collegeName: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({
    organizerName: { state: false, para: { maxLength: 50, minLength: 1 } },
    organizerHeadName: { state: false, para: { maxLength: 50, minLength: 1 } },
    startingYear: { state: false },
    collegeName: { state: false, para: { maxLength: 50, minLength: 1 } },
    location: { state: false, para: { maxLength: 50, minLength: 1 } },
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
      para: {
        maxLength: 50,
        minLength: 6,
        match: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{6,}$/,
      },
    },
    confirmPassword: { state: false, para: { maxLength: 50, minLength: 6 } },
  });

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

  const validateForm = () => {
    // Trim all form field values
    const trimmedformData = {};
    for (const key in formData) {
      trimmedformData[key] = formData[key].trim();
    }
    setFormData(trimmedformData);

    // Validate each field
    const updatedErrors = { ...errors };
    for (const key in updatedErrors) {
      const value = trimmedformData[key];
      const para = updatedErrors[key].para;

      if (value === "" || value === null || value === undefined) {
        updatedErrors[key].state = true;
      } else if (
        para != null &&
        para.minLength !== null &&
        (value.length < para.minLength || value.length > para.maxLength)
      ) {
        updatedErrors[key].state = true;
      } else if (
        para != null &&
        para.match != null && !value.match(para.match)) {
        updatedErrors[key].state = true;
      } else {
        updatedErrors[key].state = false;
      }
    }
    setErrors(updatedErrors);
  };

  const sendDataToBackend = async () => {
    if (!errors.password.state && !errors.confirmPassword.state) {

      if (formData.password === formData.confirmPassword) {

        let totalValidInputs = 0;
        for (const key in errors) {

          if (!errors[key].state) {
            totalValidInputs++;
          }

        } 
        
        if (totalValidInputs === (Object.keys(errors).length)) {

          // console.log("Sending data")

          let dataToSend = formData

          delete dataToSend["confirmPassword"]

          // console.log(dataToSend)

          await axios.post("/register/organizer", dataToSend)
            .then((response) => {
          
              // //console.log(response)
              // //console.log("Registered successfully as Organizer");

            })
            .catch((error) => {
              // //console.log("Error during registration", error);
              // //console.log(error.response);
              if(error.response.data.msg === 'duplicate email') {

                setErrors((prevData) => {
                  return {
                    ...prevData,
                    email: {
                      ...prevData.email,
                      state: true,
                      errMsg: 'User with this email already exists'
                    }
                  }
                });

              }
            });
          
            
        }
      } else {
        setErrors((prevData) => {
          return {
            ...prevData,
            confirmPassword: {
              ...prevData.confirmPassword,
              state: true
            }
          }
        });
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await validateForm();
    await sendDataToBackend();
  }

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <MDBInput
        label="Organizer Name"
        type="text"
        name="organizerName"
        value={formData.organizerName}
        onChange={handleChange}
        className="mt-4" 
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.organizerName.state ? (
          <div className="error-message" >Please provide Organizer name</div>
        ) : null}
      <MDBInput
        label="Organizer Head Name"
        type="text"
        name="organizerHeadName"
        value={formData.organizerHeadName}
        onChange={handleChange}
        className="mt-4" 
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.organizerHeadName.state ? (
          <div className="error-message" >Please provide name of the head of the organization</div>
        ) : null}
      <MDBInput
        label="Starting Year"
        type="text"
        name="startingYear"
        value={formData.startingYear}
        onChange={handleChange}
        className="mt-4" 
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.startingYear.state ? (
          <div className="error-message" >Please provide organization starting year</div>
        ) : null}
      <MDBInput
        label="Description"
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="mt-4" 
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      <MDBInput
        label="College Name"
        type="text"
        name="collegeName"
        value={formData.collegeName}
        onChange={handleChange}
        className="mt-4" 
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.collegeName.state ? (
          <div className="error-message" >Please provide your college name</div>
        ) : null}
      <MDBInput
        label="Location"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="mt-4" 
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.location.state ? <div className="error-message" >Please provide your location</div> : null}
      <MDBInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="mt-4" 
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.email.state ? (errors.email.errMsg !== '' ? <div className="error-message">{errors.email.errMsg}</div> : <div className="error-message" >Please provide a valid email</div> ) : null}
      <MDBInput
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="mt-4" 
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.password.state ? (
          <div className="error-message" >Please provide a valid password</div>
        ) : null}
      <MDBInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="mt-4" 
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.confirmPassword.state ? (
          <div className="error-message" >Please confirm your password</div>
        ) : null}
      <MDBBtn type="submit" className="mt-4" block>
        Sign up as Organizer
      </MDBBtn>
    </form>
  );
};

export default MDBORegistration;
