import React from "react";
import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";

const Welcome = () => {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div
          style={{
            paddingTop: "10%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <br />
          <br />
          <br />
          <br />
          <h1>Check your inbox</h1>
          <br />
          <h5>We sent a confirmation email to you.</h5>
          <br />
          <br />
          <br />
          <br />
          <p>Nothing in your inbox? Don't forget to check your spam folder.</p>
          <br />
          <Link href="/" variant="body2">
            Click here to go back to homepage.
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Welcome;
