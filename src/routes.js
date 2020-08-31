import React, { useState, useEffect, useContext } from "react";
import Box from "@material-ui/core/Box";
import { Route } from "react-router-dom";
import * as firebase from "firebase";
import DoctorDetails from "../src/screens/doctordetails/Doctordetails"; //BACK BUTTON Component
import SlotSelection from "../src/screens/selectdate/selectDate"; // BOOK APPOINTMENT Component
import FinalScreen from "../src/screens/thankyou/thankyou"; //  THANK YOU Component
import BookedAppointments from "../src/screens/bookedappointments/bookedAppointments"; // DOCTOR LOGIN Component
import LoginAsDoctor from "../src/screens/loginasdoctor/loginAsDoctor"; //BOOKED SLOTS FOR DOCTOR
import withAuthProtection from "./withAuthProtection";
import { AppContext } from "./setContext";
import "./App.css";

const ProtectedProfile = withAuthProtection("/")(BookedAppointments);

function Routes() {
  const { me, setUserState } = useContext(AppContext);

  useEffect(() => {
    console.log(me, "### vc");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // localStorage.setItem("user", JSON.stringify(user))
        console.log("USER IS PRESENT ###", user);
        setUserState(user);
      } else {
        setUserState(null);
        console.log("USER IS NOT AUTHENTICATED");
      }
      console.log("### the logged user is;", user);
    });
  });
  return (
    <Box className="App">
      <Route path="/login-as-doctor" component={LoginAsDoctor} />
      <Route path="/bookslot" component={SlotSelection} />
      <Route path="/thankyou" component={FinalScreen} />
      <Route
        path="/booked-appointments"
        render={(props) => <ProtectedProfile {...props} me={me} />}
      />
      <Route
        path="/"
        exact
        render={(props) => <DoctorDetails {...props} showButton={true} />}
      />
    </Box>
  );
}

export default Routes;
