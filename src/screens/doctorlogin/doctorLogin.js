import React, { useState, useEffect } from "react";
import { Button, Box } from "@material-ui/core";
import * as firebase from "firebase";
import "./doctorLogin.css";
import "../../App.css";
import { monthNames } from "../../const";

// variables used for converting date format.
var count = 0;
var month_number = 0;
var month_by_name = "";
var day_number = "";
var year_number = "";
var date_name_format = "";

function sort_dates(booked_dates) {
  let getTimestamp = (str) => +new Date(...str.split("-").reverse());
  let sortedDates = booked_dates.sort(
    (a, b) => getTimestamp(a) - getTimestamp(b)
  );
  booked_dates.splice(0, sortedDates.length, ...sortedDates);
  return booked_dates;
}
function add_am_pm(booked_time_slots) {
  var sortedTime = [];
  var before_noon = " am";
  var after_noon = " pm";
  for (var m = 0; m < booked_time_slots.length; m++) {
    if (
      parseInt(booked_time_slots[m]) < 12 &&
      parseInt(booked_time_slots[m]) > 8
    ) {
      sortedTime.push(booked_time_slots[m].concat(before_noon));
    } else {
      sortedTime.push(booked_time_slots[m].concat(after_noon));
    }
  }
  booked_time_slots.splice(0, sortedTime.length, ...sortedTime);
  return booked_time_slots;
}

function date_format_conversion(booked_dates) {
  //Getting day from the date.
  for (var x = 0; x < booked_dates.length - 1; x++) {
    if (booked_dates[1] == "-") {
      day_number = booked_dates[0];
      console.log("Day is:", day_number);
    } else {
      day_number = booked_dates[0].concat(booked_dates[1]);
      console.log("Day is:", day_number);
    }
  }
  // Getting name of month in place of number.
  for (var x = 0; x < booked_dates.length - 1; x++) {
    if (booked_dates[x] == "-") {
      count = count + 1;
      if (count == 1 && booked_dates[x + 2] != "-") {
        month_number = parseInt(
          booked_dates[x + 1].concat(booked_dates[x + 2])
        );
        month_by_name = monthNames[month_number - 1];
        console.log("Month is:::", monthNames[month_number - 1]);
      } else if (count == 1 && booked_dates[x + 2] == "-") {
        month_number = parseInt(booked_dates[x + 1]);
        month_by_name = monthNames[month_number - 1];
        console.log("M@nth is:", monthNames[month_number - 1]);
      }
    }
  }

  // Getting year from the date.
  let length_date = booked_dates.length - 1;
  year_number = booked_dates[length_date - 3].concat(
    booked_dates[length_date - 2],
    booked_dates[length_date - 1],
    booked_dates[length_date]
  );
  console.log("Year is:", year_number);
  date_name_format = day_number.concat(" ", month_by_name, "'", year_number);

  day_number = "";
  count = 0;
  month_number = 0;
  month_by_name = "";
  year_number = "";
  return date_name_format;
}

function DoctorLogin() {
  const [bookedDates, setBookedDate] = useState([]);
  const [bookedTimeSlots, setBookedTime] = useState([]);
  const [finalSlots, setFinalSlots] = useState([]);
  var booked_dates = [...bookedDates];
  var booked_time_slots = [...bookedTimeSlots];
  let tempArray = [...finalSlots];

  var db = firebase.firestore();
  useEffect(() => {
    db.collection("bookedSlots")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log("The data from Firestore is:", data);
        for (var i = 0; i < data.length - 1; i++) {
          if (booked_dates.includes(data[i].date)) {
            console.log("Already present");
          } else {
            booked_dates.push(data[i].date);
          }
        }

        // Sort the dates on which bookings are being made.
        booked_dates = sort_dates(booked_dates);
        console.log("Slots booked are on these dates:", booked_dates);

        for (var j = 0; j < booked_dates.length; j++) {
          for (var k = 0; k < data.length; k++) {
            if (data[k].date === booked_dates[j]) {
              booked_time_slots.push(data[k].time);
            }
          }

          // Add AM and PM so that sorting of time can be done.
          booked_time_slots = add_am_pm(booked_time_slots);

          // Sort the time on which bookings are being made.
          booked_time_slots.sort(function (a, b) {
            return new Date("1970/01/01 " + a) - new Date("1970/01/01 " + b);
          });

          // Converting date into different format(dd-mm-yyyy --> dd Month' yyyy)
          date_name_format = date_format_conversion(booked_dates[j]);

          tempArray.push({
            date: date_name_format,
            timeSlots: booked_time_slots,
          });
          console.log(
            "Booked time slots for date",
            date_name_format,
            "are:",
            booked_time_slots
          );
          booked_time_slots = [];
        }
        setFinalSlots(tempArray);
      });
  }, []);

  return (
    <Box className="slots-details">
      {finalSlots.map(function (item) {
        return (
          <Box className="date-time-container" borderRadius={1} boxShadow={2}>
            <Box className="time-slots-of-each-day" borderRadius={1}>
              {item.date}
              {item.timeSlots.map(function (time) {
                return (
                  <Box className="booked-time-slot">
                    <Box style={{ width: "90%" }}> {time}</Box>
                  </Box>
                );
              })}
            </Box>{" "}
          </Box>
        );
      })}
    </Box>
  );
}

export default DoctorLogin;
