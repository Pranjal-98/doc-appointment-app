import React, { Component } from "react";
import { Button, Box } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./formValidation.css";
import db from "../index";
import * as firebase from "firebase";

class PatientDetailsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        name: "",
        email: "",
        phoneno: "",
      },
      submitted: false,
    };
  }

  handleClick = () => {
    var year = this.props.slotDate.getFullYear();
    var month = this.props.slotDate.getMonth() + 1;
    var day = this.props.slotDate.getDate();
    var date = day + "-" + month + "-" + year;

    // Store the slots in local storage.
    var slot_booked_latest =
      JSON.parse(localStorage.getItem("slot_booked")) || [];

    var results = [];
    var final_results = [];
    var toSearchDate = date;
    var toSearchTime = this.props.slotTime;

    db.collection("bookedSlots")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());

        for (var i = 0; i < data.length; i++) {
          for (var key in data[i]) {
            if (data[i][key].indexOf(toSearchDate) != -1) {
              results.push(data[i]);
            }
          }
        }
        for (var i = 0; i < results.length; i++) {
          for (var key in results[i]) {
            if (results[i][key].indexOf(toSearchTime) != -1) {
              final_results.push(results[i]);
            }
          }
        }
        slot_booked_latest.push(final_results);
        localStorage.setItem("slot_booked", JSON.stringify(slot_booked_latest));
        console.log(
          "Final results:::",
          final_results.length,
          final_results[0].date
        );
      });

    if (final_results.length > 1) {
      console.log("slot repeated");
    } else {
      db.collection("bookedSlots").add({
        date: date,
        time: this.props.slotTime,
      });
      // slotItems.items.push({
      //   date: date,
      //   time: this.props.slotTime,
      // });

      // localStorage.setItem("bookedSlots", JSON.stringify(slotItems));

      this.props.history.push("/thankyou");
    }
  };
  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
  };

  render() {
    const { formData, submitted } = this.state;

    return (
      <ValidatorForm
        className="form-content"
        ref="form"
        onSubmit={this.handleSubmit}
      >
        <Box className="field-container">
          <TextValidator
            className="form-element"
            size="small"
            fullWidth={true}
            label="Name"
            variant="outlined"
            onChange={this.handleChange}
            name="name"
            value={formData.name}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Box>

        <br />
        <Box className="field-container">
          <TextValidator
            fullWidth={true}
            className="form-element"
            size="small"
            label="Email"
            variant="outlined"
            onChange={this.handleChange}
            name="email"
            value={formData.email}
            validators={["required"]}
            errorMessages={["this field is required", "email is not valid"]}
          />
        </Box>

        <br />
        <Box className="field-container">
          <TextValidator
            fullWidth={true}
            className="form-element"
            size="small"
            label="Phone number"
            variant="outlined"
            onChange={this.handleChange}
            name="phoneno"
            value={formData.phoneno}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Box>

        <br />
        <Box id="button-container">
          <Button
            id="submit-button"
            color="secondary"
            size="small"
            variant="outlined"
            type="submit"
            disabled={submitted}
            onClick={this.handleClick}
          >
            {(submitted && "Thank you") || (!submitted && "Submit")}
          </Button>
        </Box>
      </ValidatorForm>
    );
  }
}
export default withRouter(PatientDetailsForm);
