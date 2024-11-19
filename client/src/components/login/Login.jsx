import { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../firebase/firebaseConfig";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "./../../context/UserContext";
import userApi from "../../apis/userApi";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { setUser, user } = useUser(); // Access setUser from context
  const navigate = useNavigate();
  if (user) {
    return <Navigate to="/profile" />;
  }
  const handleLogin = async () => {
    if (email === "") {
      setMessage("Please Enter Your Email");
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userFromFirebase = userCredential.user;
      // setUser(user); // Set the logged-in user globally

      if (userFromFirebase) {
        const loginUser = {
          email,
          password,
        };
        userApi
          .loginByemail(loginUser)
          .then((response) => {
            const dbUser = response.data;
            console.log("Fetched users:", dbUser);

            setUser(dbUser);
            navigate("/profile");
          })
          .catch((error) => {
            console.error("Error fetching users:", error);
          });
      } else {
        setMessage("error");
      }
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
          Login
        </Typography>
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
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button variant="text" component={Link} to="/signup">
          Signup
        </Button>
      </Container>
    </Box>
  );
};

export default Login;
