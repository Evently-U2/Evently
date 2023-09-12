import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import React from "react";
import axios from "axios";
// import LoadingContext from '../App'

const LandingPage = () => {
  // const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("evently-jwt-participant");
    localStorage.removeItem("evently-jwt-organizer");
    window.location.reload();
  };
  useEffect(() => {
    const participantToken = localStorage.getItem("evently-jwt-participant");
    const organizerToken = localStorage.getItem("evently-jwt-organizer");

    if (participantToken || organizerToken) {
      const dataToSend = {
        isToken: true,
        token: ``,
        purpose: "verify",
        user: "",
      };

      if (participantToken) {
        dataToSend.token = `Bearer ${participantToken}`;
        dataToSend.user = "participant";
      } else {
        dataToSend.token = `Bearer ${organizerToken}`;
        dataToSend.user = "organizer";
      }
      // Use async function here
      const fetchData = async () => {
        await axios
          .post(`login/participant`, dataToSend)
          .then((response) => {
            // console.log("res",response);
            if (response.data.response.isValid) {
              setUserData(() => {
                const newData = response.data.user;
                return newData;
              });
              setIsLoading(false);
            } else {
              setIsLoading(false);
              navigate("/");
            }
          })
          .catch((err) => {
            
            console.log();
            setIsLoading(false);
          });
      };

      fetchData();
    } else {

      setIsLoading(false);
    }
  }, [navigate]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          This is the landing page. It will show user details if already logged
          in; otherwise, it will show a normal landing page.
          User - {userData.email ? userData.email : "Not login yet"}
          <br />
          <button
            onClick={() => {
              userData.email ? handleLogout() : navigate("/form");
            }}
          >
            {userData.email ? "Logout" : "Sign Up"}
          </button>
        </div>
      )}
    </>
  );
};

export default LandingPage;
