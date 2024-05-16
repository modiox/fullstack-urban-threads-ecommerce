import React from "react";
import muiTheme from "@/util/muiTheme";
import { ThemeProvider } from "@emotion/react"
import { Typography } from "@mui/material";

export const About = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh"
        }}
        className="about-container"
      >
        <h2 className="contact-title">About Us</h2>
        <p className="contact-text">About page</p>
      </div>
    </ThemeProvider>
  )
};
export default About 


