import React, { useState } from "react";
import { BrowserRouter, Route} from "react-router-dom";
import Box from "@material-ui/core/Box";
import "./App.css";
import auth from "./index";

import DoctorDetails from "./screens/doctordetails/Doctordetails"; //BACK BUTTON Component
import SlotSelection from "./screens/selectdate/selectDate"; // BOOK APPOINTMENT Component
import FinalScreen from "./screens/thankyou/thankyou"; //  THANK YOU Component
import BookedAppointments from "./screens/bookedappointments/bookedAppointments"; // DOCTOR LOGIN Component
import LoginAsDoctor from "./screens/loginasdoctor/loginAsDoctor"; //BOOKED SLOTS FOR DOCTOR

const App = () => {
  // const [user, setuser] = useState(auth.currentUser);
  return (
    <BrowserRouter>
      <Box className="App">
        {/* <Box className="App-intro"> */}
          <Route path= "/login-as-doctor" component={LoginAsDoctor} />
          <Route path="/bookslot" component={SlotSelection} />
          <Route path="/thankyou" component={FinalScreen} />
          <Route path="/booked-appointments" component={BookedAppointments}/>
          <Route
            path="/"
            exact
            render={(props) => <DoctorDetails {...props} showButton={true} />}
          />
        </Box>
      {/* </Box> */}
    </BrowserRouter>
  );
};

export default App;
