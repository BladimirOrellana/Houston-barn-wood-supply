import { Button } from "@mui/material";
import { useUser } from "./../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./../../firebase/firebaseConfig"; // Import Firebase auth

const LogoutButton = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Ends Firebase session
      logout(); // Clear the user from context

      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <Button variant="text" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
