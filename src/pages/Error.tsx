import TitlePage from "@/components/ui/TitlePage"
import React from "react"
import { ThemeProvider, Typography } from "@mui/material"
import muiTheme from "@/util/muiTheme"

export const Error = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Typography
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <div className="contact-container">
          <TitlePage title="404 Error" />
          <h2 className="contact-title">Error..Page Not Found</h2>
        </div>
      </Typography>
    </ThemeProvider>
  )
}

export default Error
