import React, { useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";


export default function MDBPRegistration() {
  const genderOptions = ["Male", "Female", "Other"];
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    collegeName: "",
    email: "",
    password: "",
    gender: "",
    birthDate: "",
    completionYear: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: { state: false, para: { maxLength: 50, minLength: 1 } },
    lastName: { state: false, para: { maxLength: 50, minLength: 1 } },
    middleName: { state: false, para: { maxLength: 50, minLength: 1 } },
    collegeName: { state: false, para: { maxLength: 50, minLength: 1 } },
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
    birthDate: {
      state: false,
      para: {
        maxLength: null,
        minLength: null,
        minDate: new Date().toJSON().slice(0, 10),
      },
    },
    completionYear: {
      state: false,
      para: { maxLength: null, minLength: null },
    },
    gender: { state: false, para: { maxLength: null, minLength: null } },
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
          state: false,
        },
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    //console.log("Inside the validate form")
    // Trim all form field values
    const trimmedFormData = {};
    for (const key in formData) {
      trimmedFormData[key] = formData[key].trim();
    }
    setFormData(trimmedFormData);

    // Validate each field
    const updatedErrors = { ...errors };
    for (const key in updatedErrors) {
      const value = trimmedFormData[key];
      const para = updatedErrors[key].para;
      if (value === "" || value === null || value === undefined) {
        updatedErrors[key].state = true;
      } else if (
        para.minLength !== null &&
        (value.length < para.minLength || value.length > para.maxLength)
      ) {
        updatedErrors[key].state = true;
      } else if (para.match && !value.match(para.match)) {
        updatedErrors[key].state = true;
      } else {
        updatedErrors[key].state = false;
      }
    }
    // //console.log(formData)
    setErrors(updatedErrors);
  };

  const sendDataToBackend = async () => {
    // console.log("send to backend",formData)
    if (!errors.password.state && !errors.confirmPassword.state) {
      if (formData.password === formData.confirmPassword) {
        let totalValidInputs = 0;
        for (const key in errors) {
            if (!errors[key].state) {
                totalValidInputs++;
                // //console.log(key)
          }
        }
        console.log(totalValidInputs,Object.keys(errors).length)
        if (totalValidInputs === Object.keys(errors).length) {
            //console.log("total",formData)
          let dataToSend = formData;

          delete dataToSend["confirmPassword"];

          console.log(dataToSend);

          await axios
            .post("/register/participant", dataToSend)
            .then((response) => {
              console.log(response)
              console.log("Registered Successfully as Participant");
            })
            .catch((error) => {
              //console.log("Error during registration", error);
              //console.log(error.response);
              if (error.response.data.msg === "duplicate email") {
                setErrors((prevData) => {
                  return {
                    ...prevData,
                    email: {
                      ...prevData.email,
                      state: true,
                      errMsg: "User with this email already exists",
                    },
                  };
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
              state: true,
            },
          };
        });
      }
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    await validateForm();
    await sendDataToBackend();
  };

  return (
    <form onSubmit={handleRegister} className="registration-form">
      {/* Participant registration form fields */}
      <MDBInput
        label="First Name"
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.firstName.state ? <div className="error-message" >Please provide first name</div> : null}
      <MDBInput
        label="Middle Name"
        type="text"
        name="middleName"
        value={formData.middleName}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      <MDBInput
        label="Last Name"
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.lastName.state ? <div className="error-message" >Please provide last name</div> : null}
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
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.email.state ? (
        errors.email.errMsg !== "" ? (
          <div className="error-message">{errors.email.errMsg}</div>
        ) : (
          <div className="error-message" >Please provide a valid email</div>
        )
      ) : null}
      {/* <MDBInput
        label="Gender"
        type="text"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="mt-4"
      /> */}

      <select
        name="gender"
        onChange={handleChange}
        value={formData.gender}
        className="mt-4 form-gender"
        onFocusCapture={(event) => {unsetErrors(event)}}
        required
      >
        <option value="" disabled>
          Select Gender
        </option>
        {genderOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors.gender.state ? <div className="error-message" >Please select your gender</div> : null}

      <MDBInput
        label="Birth Date"
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.birthDate.state ? (
        <div className="error-message" >Please provide your birth date</div>
      ) : null}
      <MDBInput
        label="Completion Year"
        type="text"
        name="completionYear"
        value={formData.completionYear}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.completionYear.state ? (
          <div className="error-message" >Please provide your college completion year</div>
        ) : null}
      <MDBInput
      label="Password"
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="mt-4"
      onFocusCapture={(event) => {unsetErrors(event)}}
      />
      {errors.password.state ? <div className="error-message" >Please provide a valid password(Atleat 6 character including[numbers, lower and upper case letters and special characters])</div> : null}
      
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
        Sign up as Participant
      </MDBBtn>
    </form>
  );
}
