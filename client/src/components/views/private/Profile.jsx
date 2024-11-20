import {} from "react";
import { Box, Avatar, Typography, Grid, Button, Divider } from "@mui/material";
import LogoutButton from "./../../logoutButton/LogoutButton";
import { useUser } from "../../../context/UserContext";
import { Link, Navigate } from "react-router-dom";

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: "100%",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          margin: "auto",
          padding: 3,
          maxWidth: "600px",
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        {/* Profile Header */}
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={3} textAlign="center">
            <Avatar
              alt="User Avatar"
              src="https://source.unsplash.com/random/150x150"
              sx={{
                width: { xs: 80, sm: 100 },
                height: { xs: 80, sm: 100 },
                margin: "auto",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={9} textAlign={{ xs: "center", sm: "left" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.4rem", sm: "1.8rem" },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
            >
              {user.email}
            </Typography>
          </Grid>
        </Grid>

        {/* Edit Button */}
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              padding: "8px 16px",
              borderRadius: 3,
            }}
          >
            Edit Profile
          </Button>
        </Box>

        <Divider sx={{ marginY: 4 }} />

        {/* Profile Actions */}
        <Grid container spacing={2}>
          {user.role === "user" ? (
            <Grid item xs={12} sm={4}>
              <Button component={Link} to="/my-orders" color="inherit">
                My Orders
              </Button>
            </Grid>
          ) : null}
          {user.role === "admin" && (
            <Grid item xs={12} sm={4}>
              <Button
                component={Link}
                to="/orders"
                variant="text"
                color="secondary"
                fullWidth
                sx={{
                  textTransform: "none",
                  padding: "10px 20px",
                  borderRadius: 3,
                  fontSize: "1rem",
                }}
              >
                Manage Orders
              </Button>
              <Grid>
                {" "}
                <Button
                  component={Link}
                  to="/admin/add-product"
                  variant="text"
                  color="secondary"
                  fullWidth
                  sx={{
                    textTransform: "none",
                    padding: "10px 20px",
                    borderRadius: 3,
                    fontSize: "1rem",
                  }}
                >
                  Add Product
                </Button>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} sm={4}>
            <LogoutButton
              sx={{
                width: "100%",
                textTransform: "none",
                padding: "10px 20px",
                borderRadius: 3,
                fontSize: "1rem",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
