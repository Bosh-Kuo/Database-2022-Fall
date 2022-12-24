import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "../../axios";
import AuthContext from "../../AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const { setAuth, setProfile, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAlert = (alertType, message) => {
    setAlertType(alertType);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      // post request to backend
      const { data } = await axios.post("login/", {
        username: formData.get("username"),
        password: formData.get("password"),
      });

      // 更新 context
      setAuth(true);
      setToken(data.token);
      setProfile({ ...data.user_info });

      // 導向首頁
      navigate("/");
    } catch (error) {
      handleAlert("error", error.message);
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username" // 顯示於頁面輸入框上
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LogIn
          </Button>
          <Snackbar
            open={alertOpen}
            autoHideDuration={1500}
            onClose={() => {
              setAlertOpen(false);
            }}
          >
            <Alert severity={alertType} sx={{ width: "100%" }}>
              {alertMessage}
            </Alert>
          </Snackbar>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Login;
