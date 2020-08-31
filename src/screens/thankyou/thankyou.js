import React from "react";
import { Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./thankyou.css";

const ThankYou = () => {
  var slot_booked_latest =
    JSON.parse(localStorage.getItem("slot_booked")) || [];
  var date = slot_booked_latest[slot_booked_latest.length - 1].date;
  var time = slot_booked_latest[slot_booked_latest.length - 1].time;

  console.log("Latest booked slot;", slot_booked_latest.length, date, time);

  let history = useHistory();
  function handleClick() {
    history.push("/bookslot");
  }
  function handleHomeClick() {
    history.push("/");
  }
  return (
    <Box className="description-of-meeting" borderRadius={4} boxShadow={10}>
      <Box id="thank-you"> Thank You! </Box>
      <Box className="slot-details">
        Your meeting is scheduled with Dr. Rakesh Poonia.
      </Box>
      <Box className="slot-details">
        Booking Slot: {date} {time}
        {((date = []), (time = []))}
      </Box>
      <Button
        id="book_again_button"
        color="secondary"
        variant="contained"
        size="large"
        onClick={handleClick}
      >
        {" "}
        Book Again
      </Button>
      <Button
        id="goto-home_button"
        color="secondary"
        variant="contained"
        size="large"
        onClick={handleHomeClick}
      >
        {" "}
        Go to home
      </Button>
    </Box>
  );
};
export default ThankYou;
