import React from "react";
import muiTheme from "@/util/muiTheme";
import { ThemeProvider, Typography, Box } from "@mui/material";
import TitlePage from "@/components/ui/TitlePage";

const Contact = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          padding: "0 20px",
        }}
        className="contact-container"
      >
        <TitlePage title="Contact" />
        <Typography variant="h4" sx={{ mb: 2 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          If you have any questions or feedback, feel free to reach out to us using the information
          provided below:
        </Typography>
        <ul className="contact-info" style={{ listStyleType: "none", paddingLeft: 0 }}>
          <li>Email: info@urbanthreads.com</li>
          <li>Phone: 123-456-7890</li>
          <li>Address: 123 st, City, Country</li>
        </ul>
      </Box>
    </ThemeProvider>
  );
};

export default Contact;
