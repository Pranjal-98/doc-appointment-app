import React, { useContext, useEffect } from "react";
import { Button, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./doctorDetails.css";
import "../../App.css";

function DoctorDetails({ showButton }) {
  let history = useHistory();
  function handleClick() {
    history.push("/bookslot");
  }
  function handleClickByDoctor() {
    history.push("/login-as-doctor");
  }
  return (
    <Box
      className="doctor-details"
      borderRadius={4}
      boxShadow={showButton ? 10 : 0}
    >
      <Box className="doctor_img">
        <img
          src={require("/Users/pranjal/Sites/Projects/doctors-appointment/src/Assets/doctor.jpg")}
          id="image-of-doctor"
          alt="Doctor profile"
        />
      </Box>
      <Box id="profile-info-name"> Dr. Rakesh Poonia</Box>
      <Box id="doctor-contact">
        <Box className="doctor-qualification"> MBBS, MD(General Medicine)</Box>
        <Box className="doctor-qualification">https://sms.com/pooniarakesh</Box>
      </Box>

      {showButton && (
        <Button
          className="button-container"
          color="secondary"
          style={{ margin: "1%", width: "30%" }}
          variant="contained"
          size="medium"
          onClick={handleClickByDoctor}
        >
          {" "}
          Login as Doctor
        </Button>
      )}

      {showButton && (
        <Button
          className="button-container"
          color="secondary"
          style={{ margin: "1%", width: "30%" }}
          variant="contained"
          size="medium"
          onClick={handleClick}
        >
          {" "}
          Book Appointment
        </Button>
      )}
    </Box>
  );
}
export default DoctorDetails;
