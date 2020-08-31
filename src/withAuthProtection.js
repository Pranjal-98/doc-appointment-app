import * as firebase from "firebase";
import React from "react";

const withAuthProtection = (redirectPath) => (WrappedComponent) => {
  class WithAuthProtection extends React.Component {
    componentDidMount() {
      // use history from parent.
      const { history } = this.props;
      // const me = JSON.parse(localStorage.getItem("user"));
      // console.log("IN COMNPONENT DID MOUNT###"); //logged in
      if (!firebase.auth().currentUser) {
        // if(me === null){
        // console.log("BEFORE REDIRECTION###", firebase.auth().currentUser);
        // console.log(redirectPath, "*** redirect path");
        return history.push(redirectPath);
      }
    }
    componentWillReceiveProps(nextProps) {
      const { me, history } = this.props;
      const { me: nextMe } = nextProps;
      if (me && !nextMe) {
        // console.log("COMPONENT WILL RECIEVE PROPS###", redirectPath); //logged out
        history.push(redirectPath);
      }
    }
    render() {
      // const me = JSON.parse(localStorage.getItem("user"));
      const { me } = this.props;
      // console.log(me, "*** me");
      if (!me) {
        // console.log("DON'T RENDER ANYTHINBG IF NO AUTH###");
        // don't render anything if no auth
        return null;
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return WithAuthProtection;
};
export default withAuthProtection;
