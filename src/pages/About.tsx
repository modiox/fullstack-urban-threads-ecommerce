import React from "react";
import muiTheme from "@/util/muiTheme";
import { ThemeProvider } from "@emotion/react"

export const About = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <div className="about-container">
        <p className="about-text">
          <h1> Hello from the about page </h1>
        </p>
      </div>
    </ThemeProvider>
  )
};
export default About 


