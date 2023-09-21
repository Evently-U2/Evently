import Loading from "./Loading";
import ParticipantProfilePage from "./ParticipantProfilePage";
import OrganizerProfilePage from "./OrganizerProfilePage";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  //setParticipatedEvents will be later used
  // const [participatedEvents, setParticipatedEvents] = useState([
  //   "Event1",
  //   "Event2",
  //   "Event3",
  // ]);
  const [isParticipant, setIsParticipant] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    setIsParticipant(
      localStorage.getItem("evently-jwt-participant") ? true : false
    );
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isParticipant ? (
            <ParticipantProfilePage />
          ) : (
            <OrganizerProfilePage />
          )}
        </>
      )}
    </>
  );
}
