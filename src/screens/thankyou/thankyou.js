import React from "react";
import { Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./thankyou.css";

const ThankYou = () => {

  var slot_booked_latest = JSON.parse(localStorage.getItem("slot_booked")) || [];
  var date= slot_booked_latest[0][0].date;
  var time= slot_booked_latest[0][0].time;

  console.log("Latest booked slot;", slot_booked_latest.length, slot_booked_latest[0], slot_booked_latest[1]);

  let history = useHistory();
  function handleClick() {
    history.push("/bookslot");
  }
  return (
    <Box className="description-of-meeting">
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
        variant="outlined"
        size="large"
        onClick={handleClick}
      >
        {" "}
        Book Again
      </Button>
    </Box>
  );
};
export default ThankYou;
