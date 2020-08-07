import React from "react";
import "/Users/pranjal/Sites/Projects/doctors-appointment/src/App.css";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./doctorDetails.css";

function DoctorDetails({showButton}) {
  let history = useHistory();
  function handleClick() {
    history.push("/bookslot");
  }
  return (
    <Box className="doctor-details">

      <Box className="doctor_img">
        <img
          src={require("/Users/pranjal/Sites/Projects/doctors-appointment/src/Assets/doctor.jpg")}
          className="image-of-doctor"
          alt="Doctor profile"
        />
        </Box>
        <Box id="profile-info-name"> Dr. Rakesh Poonia</Box>
      <Box >
        <Box className= "doctor-qualification"> MBBS, MD(General Medicine)</Box>
        <Box className= "doctor-qualification">https://sms.com/pooniarakesh</Box>
      </Box>

      {showButton && <Button id= "book_appointment_button" color="secondary" variant= "outlined" size="large" onClick={handleClick}>
        {" "}
        Book Appointment
      </Button>}
    </Box>


  );
}
export default DoctorDetails;
