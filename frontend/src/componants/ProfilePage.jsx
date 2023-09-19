import { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

export default function ProfilePage() {
  

  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
          const response = await axios.post(`login/${tokenOwner}`, dataToSend);
          const data = response.data[tokenOwner];
          setUserData(data);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          console.error("Error fetching user info:", err);
        }
      };

      fetchData();
    } else {
      setIsLoading(false);
      navigate("/form");
    }
  }, []);

  const participatedEvents = ["Event1", "Event2", "Event3"];

  //setParticipatedEvents will be later used
  // const [participatedEvents, setParticipatedEvents] = useState([
  //   "Event1",
  //   "Event2",
  //   "Event3",
  // ]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section style={{ backgroundColor: "#eee" }}>
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol>
                <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                  <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                </MDBBreadcrumb>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: "150px" }}
                      fluid
                    />
                    <p className="text-muted mb-1">
                      {userData.description
                        ? userData.description
                        : "Add Description"}
                    </p>
                    <div className="d-flex justify-content-center mb-2">
                      <MDBBtn>Edit Profile</MDBBtn>
                      <MDBBtn outline className="ms-1">
                        Delete Account
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>

                <MDBCard className="mb-4 mb-lg-0">
                  <MDBCardBody className="p-0">
                    <MDBListGroup className="rounded-3">
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fas icon="globe fa-lg text-warning" />
                        <MDBCardText>
                          {userData.portfolio
                            ? userData.portfolio
                            : "Add Portfolio Website Link"}
                        </MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="github fa-lg"
                          style={{ color: "#333333" }}
                        />
                        <MDBCardText>
                          {userData.github
                            ? userData.github
                            : "Add Github Account Link"}
                        </MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="twitter fa-lg"
                          style={{ color: "#55acee" }}
                        />
                        <MDBCardText>
                          {userData.twitter
                            ? userData.twitter
                            : "Add Twitter Account Link"}
                        </MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="instagram fa-lg"
                          style={{ color: "#ac2bac" }}
                        />
                        <MDBCardText>
                          {userData.instagram
                            ? userData.instagram
                            : "Add Instagram Account Link"}
                        </MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="facebook fa-lg"
                          style={{ color: "#3b5998" }}
                        />
                        <MDBCardText>
                          {userData.facebook
                            ? userData.facebook
                            : "Add Instagram Account Link"}
                        </MDBCardText>
                      </MDBListGroupItem>
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {userData.firstName
                            ? userData.firstName + " " + userData.lastName
                            : "Not Provided"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {userData.email ? userData.email : "Not Provided"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {userData.phone ? userData.phone : "Not Provided"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>College</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {userData.collegeName
                            ? userData.collegeName
                            : "Not Provided"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {userData.address ? userData.address : "Not Provided"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>

                <MDBRow>
                  <MDBCol md="12">
                    <MDBCard className="mb-4 mb-md-0">
                      <MDBCardBody>
                        <MDBCardText className="mb-4">
                          Participated Events
                        </MDBCardText>
                        <MDBCardText
                          className="mb-1"
                          style={{ fontSize: ".77rem" }}
                        >
                          Web Design
                        </MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar
                            width={80}
                            valuemin={0}
                            valuemax={100}
                          />
                        </MDBProgress>
                      </MDBCardBody>
                      {participatedEvents.map((items) => (
                        <MDBCard key={items} className="mb-10 mb-lg-3">
                          {items}
                        </MDBCard>
                      ))}
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      )}
    </>
  );
}
