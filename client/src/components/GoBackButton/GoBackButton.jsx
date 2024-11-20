import {} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GoBackButton = ({ label = "Go Back", sx = {} }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
      sx={{
        marginBottom: 2,
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: "8px",
        padding: "8px 16px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        ...sx, // Allow custom styles via props
      }}
    >
      {label}
    </Button>
  );
};

// PropTypes validation
GoBackButton.propTypes = {
  label: PropTypes.string, // Optional string for button label
  sx: PropTypes.object, // Optional styles passed as an object
};

export default GoBackButton;
