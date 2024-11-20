import { Box, Avatar, Typography, Grid, Button, Divider } from "@mui/material";
import LogoutButton from "./../../logoutButton/LogoutButton";
import { useUser } from "../../../context/UserContext";
import { Link, Navigate } from "react-router-dom";
const Profile = () => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  console.log("profile ", user);

  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "auto",
        padding: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        width: "100%", // Ensures full width on smaller screens
      }}
    >
      {/* Profile Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap", // Allows wrapping on smaller screens
          marginBottom: 3,
          gap: 2, // Adds spacing when items wrap
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            alt="User Avatar"
            src="https://source.unsplash.com/random/150x150"
            sx={{
              width: { xs: 80, sm: 100 }, // Smaller avatar on small screens
              height: { xs: 80, sm: 100 },
            }}
          />
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.2rem", sm: "1.5rem" }, // Adjust font size
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user ? user.email : null}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: { xs: "100%", sm: "auto" } }} // Full-width button on mobile
        >
          Edit Profile
        </Button>
      </Box>

      {/* Profile Stats */}
      <Grid container spacing={2} sx={{ textAlign: "center", marginBottom: 3 }}>
        <Grid item xs={4} sm={4}>
          <Button
            variant="text"
            color="primary"
            sx={{ width: { xs: "100%", sm: "auto" } }} // Full-width button on mobile
          >
            Active Orders
          </Button>
        </Grid>
        <Grid item xs={4} sm={4}>
          {user && user.role === "admin" ? (
            <Button
              LinkComponent={Link}
              to="/orders"
              variant="text"
              color="primary"
              sx={{ width: { xs: "100%", sm: "auto" } }} // Full-width button on mobile
            >
              Orders
            </Button>
          ) : null}
        </Grid>
        <Grid item xs={4} sm={4}>
          <LogoutButton />
        </Grid>
      </Grid>

      <Divider sx={{ marginBottom: 3 }} />
    </Box>
  );
};

export default Profile;
