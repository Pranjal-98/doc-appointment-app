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
    <Box className=" date-selection-screen" borderRadius={4} boxShadow={2}>
      <Box className="book-date" borderRadius={4} boxShadow={2}>
        <Button
          id="back-button"
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
