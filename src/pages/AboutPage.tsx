import React from "react";
import muiTheme from "@/util/muiTheme";
import { ThemeProvider } from "@emotion/react"
import TitlePage from "@/components/ui/TitlePage";



export const About = () => {
  return (
    <ThemeProvider theme={muiTheme}>
          <TitlePage title="About Us" />
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
      </div>
    </ThemeProvider>
  )
};
export default About 


