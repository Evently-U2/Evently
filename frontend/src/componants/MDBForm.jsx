import React, { useState } from "react";
import MDBPRegistration from "./MDBPRegistration";
import MDBORegistration from "./MDBORegistration";
import MDBOLogin from "./MDBOLogin";
import MDBPLogin from "./MDBPLogin";
// import Loading from "./Loading";
// import axios from "axios";
import logo from "../assets/logoSymbol.png";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MDBForm() {
  const navigate = useNavigate();

  useEffect(() => {
    let tokenOwner = "";
    let dataToSend;
    const participantToken = localStorage.getItem("evently-jwt-participant");
    const organizerToken = localStorage.getItem("evently-jwt-organizer");

    if (participantToken || organizerToken) {
      dataToSend = {
        istoken: true,
        token: "",
        purpose: "verify",
        email: "",
        password: "",
      };

      if (participantToken) {
        dataToSend.token = participantToken;
        tokenOwner = "participant";
      } else {
        dataToSend.token = organizerToken;
        tokenOwner = "organizer";
      }

      const fetchData = async () => {
        try {
          await axios.post(`login/${tokenOwner}`, dataToSend);
          navigate("/");
        } catch (err) {
          navigate("/");
          console.error("Error fetching user info:", err);
        }
      };

      fetchData();
    } else {
      navigate("/form");
    }
  }, [navigate]);

  const [loginRegisterActive, setLoginRegisterActive] = useState("login");
  const [userType, setUserType] = useState("participant"); // Added userType state

  const handleLoginRegisterClick = (tab) => {
    setLoginRegisterActive(tab);
  };

  const handleUserTypeClick = (type) => {
    setUserType(type);
  };

  return (
    <>
      <div className="form-formDiv">
        <div className="form-presentation">
          <div className="form-brand">
            <img src={logo} alt="Logo" className="form-presentationLogo" />
            <p>Evently</p>
          </div>
        </div>
        <div className="form-allFormsContainer">
          <MDBTabs pills justify className="form-switchContainer">
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleLoginRegisterClick("login")}
                active={loginRegisterActive === "login"}
              >
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleLoginRegisterClick("register")}
                active={loginRegisterActive === "register"}
              >
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent className="form-formInputs">
            <MDBTabsPane show={loginRegisterActive === "login"}>
              <div className="text-center">
                <MDBTabs pills className="form-switchContainer">
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleUserTypeClick("participant")}
                      active={userType === "participant"}
                    >
                      Participant
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleUserTypeClick("organizer")}
                      active={userType === "organizer"}
                    >
                      Organizer
                    </MDBTabsLink>
                  </MDBTabsItem>
                </MDBTabs>
              </div>
              {userType === "participant" ? (
                // Participant Login Form
                <MDBPLogin />
              ) : (
                // Organizer Login Form
                <MDBOLogin />
              )}
            </MDBTabsPane>
            <MDBTabsPane show={loginRegisterActive === "register"}>
              <div className="text-center">
                <MDBTabs pills className="form-switchContainer">
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleUserTypeClick("participant")}
                      active={userType === "participant"}
                    >
                      Participant
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleUserTypeClick("organizer")}
                      active={userType === "organizer"}
                    >
                      Organizer
                    </MDBTabsLink>
                  </MDBTabsItem>
                </MDBTabs>
              </div>
              {userType === "participant" ? (
                // Participant Registration Form
                <MDBPRegistration />
              ) : (
                // Organizer Registration Form
                <MDBORegistration />
              )}
            </MDBTabsPane>
          </MDBTabsContent>
        </div>
      </div>
    </>
  );
}
