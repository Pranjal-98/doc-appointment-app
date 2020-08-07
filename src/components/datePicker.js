import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import { timeslots, weekendTimeslots } from "../const";
import "./datePicker.css";
import PatientDetailsForm from "./formValidation";
import { setDate } from "date-fns";
import { colors } from "@material-ui/core";
import { red, green } from "@material-ui/core/colors";

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

    bookedSlots.map((item) => {
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
