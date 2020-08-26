import React from "react";
import { Button, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DoctorDetails from "../doctordetails/Doctordetails";
import SlotSelection from "../../components/datePicker";
import "./selectDate.css";
import "../../App.css";

function SelectDate() {
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }
  return (
    <Box className="date-selection-screen" borderRadius={4} boxShadow={2}>
      <Box className="book-date" >
        <Button
          id="back-button"
          color="secondary"
          variant="contained"
          onClick={handleClick}
        >
          {" "}
          Back
        </Button>
        <DoctorDetails showButton={false}></DoctorDetails>
      </Box>
      <Box className="book-slot" borderLeft={1} borderColor={'#d3d3d3'}>
        <SlotSelection></SlotSelection>
      </Box>
    </Box>
  );
}

export default SelectDate;
