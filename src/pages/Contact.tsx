import TitlePage from "@/components/ui/TitlePage"
import React from "react"
import  muiTheme from "@/util/muiTheme"
import { ThemeProvider, Typography } from "@mui/material"

export const Contact = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <TitlePage title="Contact" />
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh"
        }}
        className="contact-container">
        <TitlePage title="Contact" />
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-text">
          If you have any questions or feedback, feel free to reach out to us using the information
          provided below:
        </p>
        <ul className="contact-info">
          <li>Email: info@ecommerce.com</li>
          <li>Phone: 123-456-7890</li>
          <li>Address: 123 st, City, Country</li>
        </ul>
      </div>
    </ThemeProvider>
  )
}
export default Contact

