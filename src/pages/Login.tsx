import React, { useState } from "react"
import { Container, TextField, Button, Typography } from "@mui/material"
import axios from "axios"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    axios
      .post("http://your-api-url/login", { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token)
        // Redirect to dashboard or home page
      })
      .catch((error) => {
        console.error("Login failed!", error)
      })
  }

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Container>
  )
}

export default LoginPage
