import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  console.log(message);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // You can add API call here
    try {
      const res = await axios.post("http://localhost:3000/auth/signup", form, {
        withCredentials: true,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup error");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2, height: "50px" }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
