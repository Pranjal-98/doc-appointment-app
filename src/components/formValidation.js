import React, { Component } from "react";
import { Button, Box } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./formValidation.css";

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
    var slotItems = JSON.parse(localStorage.getItem("bookedSlots")) || [];

    var results = [];
    var final_results = [];
    var toSearchDate = date;
    var toSearchTime = this.props.slotTime;

    for (var i = 0; i < slotItems.length; i++) {
      for (var key in slotItems[i]) {
        if (slotItems[i][key].indexOf(toSearchDate) != -1) {
          results.push(slotItems[i]);
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
    console.log("Final results:", final_results);
    if (final_results.length > 0) {
      // toast("Slot already booked!! Please book again.");
      console.log("bnb");
    } else {
      slotItems.items.push({
        date: date,
        time: this.props.slotTime,
      });

      localStorage.setItem("bookedSlots", JSON.stringify(slotItems));
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
