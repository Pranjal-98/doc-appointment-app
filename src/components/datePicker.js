import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {InputLabel, MenuItem, FormControl, Select, Box} from "@material-ui/core";
import { timeslots, weekendTimeslots } from "../const";
import "./datePicker.css";
import PatientDetailsForm from "./formValidation";

function disableSunday(date) {
  return date.getDay() === 0;
}
var bookedTime = [];

function DateTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedTime, handleTimeChange] = useState("09:00");
  console.log(
    "In date Picker;",
    JSON.parse(localStorage.getItem("bookedSlots"))
  );

  function setDate(e) {
    handleDateChange(e);
    var year = e.getFullYear();
    var month = e.getMonth() + 1;
    var day = e.getDate();
    var date = day + "-" + month + "-" + year;
    console.log("Date is:", date);

    var bookedSlots = JSON.parse(localStorage.getItem("bookedSlots"));

    bookedSlots.items.map((item) => {
      if (item.date === date) {
        bookedTime.push(item.time);
      }
    });
    console.log("Booked Time are:", bookedTime, "for date:", date);
  }
  return (
    <Box className="patient-details-and-slot-booking">
      <Box className="text-select-date">
        <Box className="date-time-booking"> Select a Date & Time</Box>
        <Box className="date-time-booking">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              label="Select Date"
              id="simple-date-picker-label"
              value={selectedDate}
              // onChange={handleDateChange}
              onChange={(e) => {
                setDate(e);
              }}
              disablePast
              shouldDisableDate={disableSunday}
            />
          </MuiPickersUtilsProvider>

          <FormControl>
            <InputLabel id="simple-input-label">Select Time</InputLabel>
            <Select
              id="simple-select-label"
              style={{ width: "100px" }}
              value={selectedTime}
              onChange={(e) => {
                handleTimeChange(e.target.value);
              }}
            >
              {selectedDate.getDay() === 6
                ? weekendTimeslots.map((item) => {
                    return (
                      <MenuItem
                        disabled={bookedTime.includes(item)}
                        value={item}
                      >
                        {item}
                      </MenuItem>
                    );
                  })
                : timeslots.map((item) => {
                    return (
                      <MenuItem
                        disabled={bookedTime.includes(item)}
                        value={item}
                      >
                        {item}
                      </MenuItem>
                    );
                  })}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box className="text-select-date">
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
