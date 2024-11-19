import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const OrderHistory = () => {
  // Mock order data
  const orders = [
    {
      id: "001",
      date: "2024-01-01",
      items: "Reclaimed Cedar Plank",
      total: "$75",
      status: "Delivered",
    },
    {
      id: "002",
      date: "2024-01-15",
      items: "Vintage Barn Wood Panel",
      total: "$120",
      status: "In Transit",
    },
    {
      id: "003",
      date: "2024-02-05",
      items: "Rustic Cedar Beams",
      total: "$300",
      status: "Processing",
    },
  ];

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 },
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        Order History
      </Typography>

      {/* Order Table */}
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "900px",
          margin: "0 auto",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Order ID
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Items
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Total
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell align="left">{order.id}</TableCell>
                <TableCell align="left">{order.date}</TableCell>
                <TableCell align="left">{order.items}</TableCell>
                <TableCell align="left">{order.total}</TableCell>
                <TableCell align="left">
                  <Typography
                    sx={{
                      color:
                        order.status === "Delivered"
                          ? "green"
                          : order.status === "In Transit"
                          ? "orange"
                          : "blue",
                      fontWeight: "bold",
                    }}
                  >
                    {order.status}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ textTransform: "none" }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderHistory;
