import React from "react";
import { Box, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./thankyou.css";

const ThankYou = () => {
  var slotItems = JSON.parse(localStorage.getItem("bookedSlots"));
  var date = slotItems[slotItems.length - 1].date;
  var time = slotItems[slotItems.length - 1].time;

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
