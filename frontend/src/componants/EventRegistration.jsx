import React, { useEffect, useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import { Vortex } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const EventRegistration = () => {


  useEffect(() => {

  }, [])


  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    tagline: "",
    description: "",
    maxTeamSize: "",
    charges: "",
    contactPersonName: "",
    emailContact: "",
    contactNumber: "",
    eventStartDate: "",
    eventEndDate: "",
    registrationStartDate: "",
    registrationLastDate: "",
    otherInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({
    eventName: { state: false, para: { maxLength: 50, minLength: 1 } },
    tagline: { state: false, para: { maxLength: 50, minLength: 1 } },
    description: { state: false },
    maxTeamSize: { state: false },
    charges: { state: false },
    contactPersonName: { state: false, para: { maxLength: 50, minLength: 1 } },
    emailContact: {
      state: false,
      errMsg: "",
      para: {
        maxLength: 500,
        minLength: 3,
        match:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
    },
    contactNumber: { state: false, para: { maxLength: 10, minLength: 10 } },
    eventStartDate: { state: false },
    eventEndDate: { state: false },
    registrationStartDate: { state: false },
    registrationLastDate: { state: false },
  });

  const unsetErrors = (event) => {
    let key = event.target.name;
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

  const validateForm = () => {
    setIsLoading(true);
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
        para.match != null &&
        !value.match(para.match)
      ) {
        updatedErrors[key].state = true;
      } else {
        updatedErrors[key].state = false;
      }
    }
    setErrors(updatedErrors);
    setIsLoading(false);
  };

  const sendDataToBackend = async () => {
    console.log(formData)
    setIsLoading(true);

    let totalValidInputs = 0;
    for (const key in errors) {
      if (!errors[key].state) {
        totalValidInputs++;
      }
    }
    console.log(totalValidInputs, Object.keys(errors).length)
    if (totalValidInputs === Object.keys(errors).length) {
      
      let dataToSend = formData;
      // dataToSend['istoken'] = false;
      // console.log(dataToSend);
      console.log("Sending data", dataToSend)
      dataToSend['organizer'] = localStorage.getItem('evently-organizer-id')

      await axios
        .post("http://127.0.0.1:5000/events/create", dataToSend)
        .then((response) => {
          console.log("Registered successfully");
          setIsLoading(false);
          navigate("/");
        })
        .catch((error) => {
          setIsLoading(false);
          // //console.log("Error during registration", error);
          console.log(error.response)
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
    setIsLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await validateForm();
    await sendDataToBackend();
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <MDBInput
        label="Event Name"
        type="text"
        name="eventName"
        value={formData.eventName}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => unsetErrors(event, "eventName")}
      />
      {errors.eventName.state ? (
        <div className="error-message">Please provide Event Name</div>
      ) : null}
      <MDBInput
        label="Tagline"
        type="text"
        name="tagline"
        value={formData.tagline}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => unsetErrors(event, "tagline")}
      />
      {errors.tagline.state ? (
        <div className="error-message">Please provide Tagline</div>
      ) : null}
      <MDBInput
        label="Description"
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => unsetErrors(event, "description")}
      />
      {errors.description.state ? (
        <div className="error-message">Please provide Description</div>
      ) : null}
      <MDBInput
        label="Max Team Size"
        type="text"
        name="maxTeamSize"
        value={formData.maxTeamSize}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => unsetErrors(event, "maxTeamSize")}
      />
      {errors.maxTeamSize.state ? (
        <div className="error-message">Please provide Max Team Size</div>
      ) : null}
      <MDBInput
        label="Charges"
        type="text"
        name="charges"
        value={formData.charges}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => unsetErrors(event, "charges")}
      />
      {errors.charges.state ? (
        <div className="error-message">Please provide Charges</div>
      ) : null}
      <MDBInput
        label="Contact Person Name"
        type="text"
        name="contactPersonName"
        value={formData.contactPersonName}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => unsetErrors(event, "contactPersonName")}
      />
      {errors.contactPersonName.state ? (
        <div className="error-message">Please provide Contact Person Name</div>
      ) : null}
      <MDBInput
        label="Email Contact"
        type="email"
        name="emailContact"
        value={formData.emailContact}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => unsetErrors(event, "emailContact")}
      />
      {errors.emailContact.state ? (
        <div className="error-message">Please provide Email Contact</div>
      ) : null}
      <MDBInput
        label="Contact Number"
        type="text"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => unsetErrors(event, "contactNumber")}
      />
      {errors.contactNumber.state ? (
        <div className="error-message">Please provide Contact Number</div>
      ) : null}
      <MDBInput
        label="Event Start Date"
        type="date"
        name="eventStartDate"
        value={formData.eventStartDate}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => unsetErrors(event, "eventStartDate")}
      />
      {errors.eventStartDate.state ? (
        <div className="error-message">Please provide Event Start Date</div>
      ) : null}
      <MDBInput
        label="Event End Date"
        type="date"
        name="eventEndDate"
        value={formData.eventEndDate}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => unsetErrors(event, "eventEndDate")}
      />
      {errors.eventEndDate.state ? (
        <div className="error-message">Please provide Event End Date</div>
      ) : null}

      <MDBInput
        label="Registration Start Date"
        type="date"
        name="registrationStartDate"
        value={formData.registrationStartDate}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => unsetErrors(event, "registrationStartDate")}
      />
      {errors.registrationStartDate.state ? (
        <div className="error-message">
          Please provide Registration Start Date
        </div>
      ) : null}

      <MDBInput
        label="Registration Last Date"
        type="date"
        name="registrationLastDate"
        value={formData.registrationLastDate}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => unsetErrors(event, "registrationLastDate")}
      />
      {errors.registrationLastDate.state ? (
        <div className="error-message">
          Please provide Registration Last Date
        </div>
      ) : null}

      <MDBInput
        label="Other Info"
        type="text"
        name="otherInfo"
        value={formData.otherInfo}
        onChange={handleChange}
        className="mt-4"
        onFocusCapture={(event) => unsetErrors(event, "otherInfo")}
      />
      <MDBBtn type="submit" className="mt-4" block>
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
          "Register Event"
        )}
      </MDBBtn>
    </form>
  );
};

export default EventRegistration;
