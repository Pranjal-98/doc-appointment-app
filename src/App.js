import React from "react";
import { BrowserRouter, Route} from "react-router-dom";
import Box from "@material-ui/core/Box";
import "./App.css";

import DoctorDetails from "./screens/doctordetails/Doctordetails"; //BACK BUTTON Component
import SlotSelection from "./screens/selectdate/selectDate"; // BOOK APPOINTMENT Component
import FinalScreen from "./screens/thankyou/thankyou"; //  THANK YOU Component

const App = () => {
  return (
    <BrowserRouter>
      <Box borderRadius={4} boxShadow={2} className="App">
        <Box className="App-intro">
          <Route path="/bookslot" component={SlotSelection} />
          <Route path="/thankyou" component={FinalScreen} />
          <Route
            path="/"
            exact
            render={(props) => <DoctorDetails {...props} showButton={true} />}
          />
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
