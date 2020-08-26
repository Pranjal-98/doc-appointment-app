import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Box, Button } from "@material-ui/core";
import { timeslots, weekendTimeslots } from "../const";
import "./datePicker.css";
import PatientDetailsForm from "./formValidation";
import * as firebase from "firebase";
import moment from 'moment-timezone';

function disableSunday(date) {
  return date.getDay() === 0;
}
var slotsOfTheDay = [];

function DateTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedTime, handleTimeChange] = useState("09:00");
  const [bookedTime, setBookedTime] = useState([]);

  var slotsOfTheDay = [...bookedTime];
  function setSlot(value) {
    handleTimeChange(value);
  }
  function setDate(e) {
    handleDateChange(e);
    handleTimeChange("09:00");
    var year = e.getFullYear();
    var month = e.getMonth() + 1;
    var day = e.getDate();
    var date_previous = day + "-" + month + "-" + year;
    var date = moment(e).format('YYYY-MM-DD');
    console.log("DATE IS:***", date, date_previous);

    // var bookedSlots = JSON.parse(localStorage.getItem("bookedSlots"));
    var db = firebase.firestore();
    var bookedSlotsInFS = [];
    db.collection("bookedSlots")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        bookedSlotsInFS = [...data];
        bookedSlotsInFS.map((item) => {
          console.log("Date from firestore:", item.date, "and date", date, data);
          if (item.date === date) {
            if (bookedTime.includes(item.time)) {
              console.log("Already present");
            } else {
              slotsOfTheDay.push(item.time);
            }
          }
        });
        setBookedTime(bookedTime=> slotsOfTheDay);
        console.log("Booked Time are:", slotsOfTheDay, "for date:", date);
      });

  }
  return (
    <Box className="patient-details-and-slot-booking">
      <Box className="text-select-date">
        <Box className="date-time-booking"> Select a Date & Time</Box>
        <Box className="date-time-booking">
          <Box className= "calendar">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              style= {{display: "flex", overflow: "scroll", minWidth: "auto"}}
              autoOk
              label="Select Date"
              id="simple-date-picker-label"
              variant="static"
              openTo="date"
              value={selectedDate}
              onChange={(e) => {
                setDate(e);
              }}
              disablePast
              shouldDisableDate={disableSunday}
            />
          </MuiPickersUtilsProvider>
          </Box>

          <Box className=" slot-buttons-container">
            {selectedDate.getDay() === 6
              ? weekendTimeslots.map((item) => {
                  return slotsOfTheDay.includes(item) ? (
                    <Button
                      className="button-container"
                      style={{ margin: "5%", padding: "3%" }}
                      color="secondary"
                      variant="outlined"
                      size="large"
                      disabled={slotsOfTheDay.includes(item)}
                      value={item}
                    >
                      {item}
                    </Button>
                  ) : (
                    <Button
                      className="button-container"
                      style={{ margin: "5%", padding: "3%" }}
                      color="secondary"
                      variant={selectedTime === item ? "contained" : "outlined"}
                      size="large"
                      value={item}
                      onClick={() => {
                        setSlot(item);
                      }}
                    >
                      {item}
                    </Button>
                  );
                })
              : timeslots.map((item) => {
                  return slotsOfTheDay.includes(item) ? (
                    <Button
                      className="button-container"
                      style={{ margin: "5%", padding: "3%" }}
                      color="secondary"
                      variant="outlined"
                      size="large"
                      disabled={slotsOfTheDay.includes(item)}
                      value={item}
                    >
                      {item}
                    </Button>
                  ) : (
                    <Button
                      className="button-container"
                      style={{ margin: "5%", padding: "3%" }}
                      color="secondary"
                      variant={selectedTime === item ? "contained" : "outlined"}
                      size="large"
                      value={item}
                      onClick={() => {
                        setSlot(item);
                      }}
                    >
                      {item}
                    </Button>
                  );
                })}
            {(slotsOfTheDay = [])}
          </Box>
        </Box>
      </Box>

      <Box className="text-select-date-2">
        <Box id="enter-details-text">Enter Details</Box>
        <PatientDetailsForm
          slotDate={selectedDate}
          slotTime={selectedTime}
        ></PatientDetailsForm>
      </Box>
    </Box>
  );
}
export default DateTimePicker;
