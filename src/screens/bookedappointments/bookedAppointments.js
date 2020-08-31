import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import * as firebase from "firebase";
import "./bookedAppointments.css";
import { AppContext } from "../../setContext";
import {
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function BookedAppointments() {
  const [finalSlots, setFinalSlots] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({});

  const { setUserState } = useContext(AppContext);

  let tempArray = [...finalSlots];
  const history = useHistory();

  function handleClick() {
    var auth = firebase.auth();
    auth
      .signOut()
      .then(function () {
        setUserState(null);
        console.log("ON LOGOUT###");
        history.push("/");
        // localStorage.removeItem("user");
      })
      .catch(function (error) {
        console.log("error occured", error);
      });
  }
  function getEvents() {
    let eventsList = [];
    finalSlots.map((item) => {
      let obj = {
        date: item.date,
        title: getTitle(item),
        extendedProps: {
          details: item,
        },
      };
      eventsList.push(obj);
    });
    return eventsList;
  }

  function getTitle(item) {
    return item.time + "-" + item.name;
  }

  var db = firebase.firestore();

  useEffect(() => {
    db.collection("bookedSlots")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        // console.log("The data from Firestore is:", data);
        for (var i = 0; i < data.length - 1; i++) {
          tempArray.push({
            date: data[i].date,
            time: data[i].time,
            name: data[i].name,
            email: data[i].email,
            phoneno: data[i].phoneno,
          });
        }
        // console.log("FINAL EVENTS:", tempArray);

        setFinalSlots(tempArray);
      });
  }, []);

  return (
    <Box className="App-intro">
      <Box className="log-out-button">
        <Button
          color="secondary"
          variant="outlined"
          size="medium"
          onClick={() => handleClick()}
        >
          {" "}
          Logout
        </Button>
      </Box>
      <Dialog
        id=" booking-description"
        open={showDialog}
        onClose={() => setShowDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <u>Booking Details</u>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>Name : {selectedSlot.name}</div>
            <div>Email : {selectedSlot.email}</div>
            <div>Phone : {selectedSlot.phoneno}</div>
            <div>Booking Time : {selectedSlot.time}</div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Box>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={getEvents()}
          eventOverlap="false"
          eventClick={(info) => {
            setShowDialog(true);
            setSelectedSlot(info.event.extendedProps.details);
          }}
        />
      </Box>
    </Box>
  );
}

export default BookedAppointments;
