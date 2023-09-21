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

  const [organizerData, setorganizerData] = useState({});
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
          setorganizerData(data);
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
  }, [navigate]);

  const organizedEvents = ["Event1", "Event2", "Event3"];

  //setOrganizedEvents will be later used
  // const [organizedEvents, setOrganizedEvents] = useState([
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
                  <MDBBreadcrumbItem active>
                    Organizer's Profile
                  </MDBBreadcrumbItem>
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
                      style={{ width: "150px", margin: "10px" }}
                      fluid
                    />
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
                          {organizerData.portfolio
                            ? organizerData.portfolio
                            : "Add Portfolio Website Link"}
                        </MDBCardText>
                      </MDBListGroupItem>
                      {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="github fa-lg"
                          style={{ color: "#333333" }}
                        />
                        <MDBCardText>
                          {organizerData.github
                            ? organizerData.github
                            : "Add Github Account Link"}
                        </MDBCardText>
                      </MDBListGroupItem> */}
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon
                          fab
                          icon="twitter fa-lg"
                          style={{ color: "#55acee" }}
                        />
                        <MDBCardText>
                          {organizerData.twitter
                            ? organizerData.twitter
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
                          {organizerData.instagram
                            ? organizerData.instagram
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
                          {organizerData.facebook
                            ? organizerData.facebook
                            : "Add Facebook Account Link"}
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
                        <MDBCardText>Organizer Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {organizerData.organizerName
                            ? organizerData.organizerName
                            : "Not Provided"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Name of the Head</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {organizerData.organizerHeadName
                            ? organizerData.organizerHeadName
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
                          {organizerData.email
                            ? organizerData.email
                            : "Not Provided"}
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
                          {organizerData.phone
                            ? organizerData.phone
                            : "Not Provided"}
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
                          {organizerData.collegeName
                            ? organizerData.collegeName
                            : "Not Provided"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Location</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {organizerData.location
                            ? organizerData.location
                            : "Not Provided"}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Description</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {organizerData.description
                            ? organizerData.description
                            : "Not Provided"}
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
                          Organized Events
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
                      {organizedEvents.map((items) => (
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
