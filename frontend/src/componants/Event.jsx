import React from "react";
import { useParams } from "react-router-dom";

function Event() {
  const params = useParams();
  
  return (
    <>
      This page will show perticular event's details current event = {params.eventid}
    </>
  );
}

export default Event;
