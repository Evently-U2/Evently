import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import React from "react";
import axios from "axios";
// import LoadingContext from '../App'

const LandingPage = () => {
  // const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("evently-jwt-participant");
    localStorage.removeItem("evently-jwt-organizer");
    window.location.reload();
  };
  useEffect(() => {
    let tokenOwner = "";
    const participantToken = localStorage.getItem("evently-jwt-participant");
    const organizerToken = localStorage.getItem("evently-jwt-organizer");
    if (participantToken || organizerToken) {
      const dataToSend = {
        istoken: true,
        token: "",
        purpose: "verify",
        email: "",
        password: "",
      };

      if (participantToken) {
        // dataToSend.token = `Bearer ${participantToken}`;
        dataToSend.token = participantToken;
        tokenOwner = "participant";
      } else {
        // dataToSend.token = `Bearer ${organizerToken}`;
        dataToSend.token = organizerToken;
        tokenOwner = "organizer";
      }
      console.log(tokenOwner);
      const fetchData = async () => {
        await axios
          .post(`login/${tokenOwner}`, dataToSend)
          .then((response) => {
            const data = response.data[tokenOwner];
            setUserData(data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log("hihihihihierrrrrrrrrr", err);
            setIsLoading(false);
          });
      };
      fetchData();
    } else {
      console.log("Inside the error");
      // navigate("/")
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
          in; otherwise, it will show a normal landing page. User -
          {userData.firstName
            ? userData.firstName
            : userData.organizerName
            ? userData.organizerName
            : "Not Logged in"}
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
