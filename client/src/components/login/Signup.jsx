import { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../firebase/firebaseConfig";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "./../../context/UserContext";
import userApi from "../../apis/userApi";
const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, user } = useUser();
  const [message, setMessage] = useState("");
  if (user) {
    return <Navigate to="/profile" />;
  }
  const handleSignup = async () => {
    if (firstName === "") {
      setMessage("Please Enter Your first name");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userFromFirebase = userCredential.user;
      // setUser(user); // Set the logged-in user globally

      const createNewUser = {
        firstName,
        lastName,
        email,
        password,
        uid: userFromFirebase.uid,
      };
      userApi
        .create(createNewUser)
        .then((response) => {
          const dbUser = response.data.user;
          console.log("Fetched users:", dbUser);

          setUser(dbUser);
          navigate("/profile");
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5", // Optional background color
      }}
    >
      <Container
        sx={{
          textAlign: "center",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        maxWidth="sm"
      >
        <Box>{message}</Box>
        <Typography variant="h4" gutterBottom>
          Signup
        </Typography>
        <TextField
          type="text"
          label="Firs Name"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          type="text"
          label="Last Name"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleSignup}
        >
          Signup
        </Button>
        <Button variant="text" component={Link} to="/Login">
          Login
        </Button>
      </Container>
    </Box>
  );
};

export default Signup;
