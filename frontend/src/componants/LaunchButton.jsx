import React from "react";
import { Button } from "@mui/material";
import KeyBoardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function LaunchButton(props) {
  return (
    <div>
      <Button variant="contained" sx={{ borderRadius: 4, height: 50, px: 4, margin: '5px' }} >
        {props.value}
        { props.value !== "Sign Up" ?  <KeyBoardArrowRightIcon /> : null}
      </Button>
    </div>
  );
}

export default LaunchButton;
