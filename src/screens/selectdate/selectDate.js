import React from "react";
import "/Users/pranjal/Sites/Projects/doctors-appointment/src/App.css";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DoctorDetails from "../doctordetails/Doctordetails";
import "./selectDate.css";
import SlotSelection from "/Users/pranjal/Sites/Projects/doctors-appointment/src/components/datePicker";

function SelectDate() {
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }
  return (
    <Box className=" date-selection-screen" borderRadius={4} boxShadow={2}>
      <Box className="book-date" borderRadius={4} boxShadow={2}>
        <Button
          className="back-button"
          color="secondary"
          variant="outlined"
          onClick={handleClick}
        >
          {" "}
          Back
        </Button>
        <DoctorDetails showButton={false}></DoctorDetails>
      </Box>
      <Box className="book-slot">
        <SlotSelection></SlotSelection>
      </Box>
    </Box>
  );
}

export default SelectDate;
