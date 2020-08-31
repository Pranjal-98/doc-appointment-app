import React, { Component } from "react";
import { Button, Box } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withRouter } from "react-router-dom";
import * as firebase from "firebase";
import "./loginAsDoctor.css";

class loginAsDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: "",
        password: "",
      },
      submitted: false,
      errorInLogin: "",
    };
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };

  handleSubmit = (e) => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
    e.preventDefault();
    const auth = firebase.auth();
    // console.log("Submitted state is: ", this.state.submitted);

    auth
      .signInWithEmailAndPassword(
        this.state.formData.email,
        this.state.formData.password
      )
      .then((res) => {
        console.log("Already present, so sign in:", res);
        this.props.history.push("/booked-appointments");
      })
      .catch((e) => {
        this.setState({ errorInLogin: e.message }, () => {
          setTimeout(() => this.setState({ errorInLogin: " " }), 3000);
        });
        console.log("error in sign in", e.message);
      });
  };

  render() {
    const { formData, submitted } = this.state;
    const { loggedIn } = this.state;

    return (
      <Box
        display={"flex"}
        alignItems="center"
        height="70vh"
        width="100%"
        justifyContent="center"
      >
        <Box className="login-by-doctor" borderRadius={4} boxShadow={2}>
          <Box style={{ width: "100%" }}>
            <Box className="form-heading">Login as doctor</Box>
            <ValidatorForm
              className="form-content"
              ref="form"
              onSubmit={this.handleSubmit}
            >
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
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "This field is required",
                    "Email is not valid",
                  ]}
                />
              </Box>

              <br />
              <Box className="field-container">
                <TextValidator
                  fullWidth={true}
                  className="form-element"
                  size="small"
                  label="Password"
                  variant="outlined"
                  hintText="Password"
                  floatingLabelText="Password"
                  type="password"
                  onChange={this.handleChange}
                  name="password"
                  value={formData.password}
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                />
              </Box>

              <br />
              <Box
                style={{
                  marginBottom: "2%",
                  color: "#e61158",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  float: "left",
                }}
              >
                {this.state.errorInLogin}
              </Box>
              <Box id="button-container">
                <Button
                  id="submit-button"
                  color="secondary"
                  size="small"
                  style={{ width: "100%" }}
                  variant="contained"
                  type="submit"
                  disabled={submitted}
                >
                  {(submitted && "Login") || (!submitted && "Login")}
                </Button>
              </Box>
            </ValidatorForm>
          </Box>
        </Box>
      </Box>
    );
  }
}
export default withRouter(loginAsDoctor);
