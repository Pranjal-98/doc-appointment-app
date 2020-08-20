import React, { useState, useEffect } from "react";
import { Button, Box } from "@material-ui/core";
import * as firebase from "firebase";
import "./doctorLogin.css";
import "../../App.css";

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
        let getTimestamp = (str) => +new Date(...str.split("-").reverse());
        let sortedDates = booked_dates.sort(
          (a, b) => getTimestamp(a) - getTimestamp(b)
        );
        booked_dates.splice(0, sortedDates.length, ...sortedDates);
        console.log("Slots booked are on these dates:", booked_dates);
        //   setBookedDate(booked_dates);

        for (var j = 0; j < booked_dates.length; j++) {
          for (var k = 0; k < data.length; k++) {
            if (data[k].date === booked_dates[j]) {
              booked_time_slots.push(data[k].time);
            }
          }

          // Add AM and PM so that sorting of time can be done.
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

          // Sort the time on which bookings are being made.
          booked_time_slots.sort(function (a, b) {
            return new Date("1970/01/01 " + a) - new Date("1970/01/01 " + b);
          });

          tempArray.push({
            date: booked_dates[j],
            timeSlots: booked_time_slots,
          });
          console.log(
            "Booked time slots for date",
            booked_dates[j],
            "are:",
            booked_time_slots
          );
          // setBookedTime(booked_time_slots);
          booked_time_slots = [];
        }
        setFinalSlots(tempArray);
      });
  }, []);

  return (
      <Box className= "slots-details">{
          finalSlots.map(function(item){
          return (<Box className="date-time-container" borderRadius={1}  boxShadow={2}>
          <Box className= "time-slots-of-each-day" borderRadius={1}>{item.date}{
            item.timeSlots.map(function(time){
            return (<Box className= "booked-time-slot">
                    <Box style={{width: "90%"}}> {time}</Box> 
                    </Box>)
            })}</Box> </Box>)
          })
        }
      </Box>
  ) 
 
}

export default DoctorLogin;
