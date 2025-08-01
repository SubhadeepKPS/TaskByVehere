import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  console.log("Login message:", message);
  console.log("Login user:", message.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // You can add API call here
    try {
      const res = await axios.post("http://localhost:3000/auth/login", form, {
        withCredentials: true, // required for cookies
      });
      setMessage(res.data);
      console.log(res.data.user);

      dispatch(addUser(res.data.user));
      // Redirect or update state here
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  //   id, name, email, role, createdAt

  return (
    <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            label="Email"
            name="email"
            placeholder="enter your email"
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
            placeholder="password"
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
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
