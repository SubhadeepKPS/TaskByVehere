import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
} from "@mui/material";
import { useEffect } from "react";

export default function Dashboard() {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      createdAt: "2025-08-01T12:30:00Z",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "User",
      createdAt: "2025-07-25T09:15:00Z",
    },
    // Add more dummy records if needed
  ]);

  useEffect(() => {
    async function getUsers() {
      if (user) {
        try {
          const res = await axios.get("http://localhost:3000/viewusers", {
            withCredentials: true,
          });
          setData(res.data?.userList);
          console.log(res.data?.userList);
        } catch (err) {
          setData(err);
        }
      }
    }

    getUsers(); // Call the async function

    return () => {
      // Cleanup code if needed (e.g., cancel tokens, timers)
      console.log("Cleanup if necessary");
    };
  }, [user]);

  if (!user) return null;
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography sx={{ color: "white" }} variant="h5" gutterBottom>
        Dashboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell>
                <strong>Created At</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
