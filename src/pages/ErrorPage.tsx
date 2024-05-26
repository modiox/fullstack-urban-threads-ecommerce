import TitlePage from "@/components/ui/TitlePage"
import React from "react"
import { ThemeProvider } from "@mui/material"
import muiTheme from "@/util/muiTheme"

export const ErrorPage = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <TitlePage title="404 Error" />
      <div style ={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
        <div className="contact-container">
          <TitlePage title="404 Error" />
          <h2 className="contact-title"> 404. Page Not Found</h2>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default ErrorPage
