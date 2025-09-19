import {
  Avatar,
  Box,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Checkbox,
  Button,
  // Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
// import { Link as RouterLink } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    alert(`Logging in with username: ${username}, password: ${password}`);
  };

  return (
    <Container  maxWidth='xl' sx={{margin: '2rem auto', backgroundColor:'lightgray', borderRadius:'2rem'}}>
    <Paper
      elevation={10}
      sx={{
 
        
        padding: 4,
        width: "100%",
        maxWidth: "400px",
      
        backgroundColor: "#fff",
      }}
    >
      <Avatar
        sx={{ mx: "auto", bgcolor: "secondary.main", mb: 2, }}
      >
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" textAlign="center">
        Sign In
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          label="Username"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          fullWidth
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Sign In
        </Button>
      </Box>
    </Paper>
    </Container>
  );
};


export default LoginPage;
