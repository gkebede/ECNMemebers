import {
    AppBar,
    Box,
    Button,
    Container,
    CssBaseline,
    Dialog,
    MenuItem,
    Toolbar,
    Typography,
  } from "@mui/material";
 

  import { Group } from "@mui/icons-material";
  import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./LoginForm";


  
  export default function NavBar() {
       const [show, setSwhow] = useState(false);
       const [editMode, setEditMode] = useState(false);
      // const [user, setUser] = useState<{ name: string; password: string } | null>(null);
      const SignIn = () => {
        setSwhow(!show);
        //setUser({ name: "John Doe", password: "123456" });
 
      };

    return (
      <>
        <CssBaseline />
  
        <Box sx={{ flexGrow: 1, mb: 10 }}>
          <AppBar
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "4rem",
              backgroundColor: "#ffffffcc",
              backgroundImage:
                "linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
            }}
          >
            <Container maxWidth="xl">
              <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Logo/Title */}
                <Box>
                  <MenuItem>
                    <Group sx={{ fontSize: "large", color: "white", mr: 1 }} />
                    <Typography variant="h4" fontWeight={700} >
                      <RouterLink
                        to="/home"
                        style={{
                          color: "white",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                        // onClick={() => <Link  to="/"  />}
                      >
                        ECN Network
                      </RouterLink>

                    </Typography>
                   
                  </MenuItem>
                </Box>
  
                {/* Navigation Links */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  {["Contact",  "memberList","Accout", "SignIn"].map((label) => (
                    <MenuItem
                      key={label}
                      onClick={label === "SignIn" ? SignIn : undefined}
                      sx={{
                        cursor: "pointer",
                        fontSize: "1rem",
                        textTransform: "uppercase",
                         
                              textDecoration: "none",
                        
                        color: "#fff",
                      }}
                      {...(label !== "SignIn" && {
                        component: RouterLink,
                        to: `/${label.toLowerCase()}`,
                      })}
                    >
                      <Typography variant="h6"   fontWeight={700} >
                    
                          {label}

                    </Typography>
                  
                    </MenuItem>
                  ))}
                </Box>

                 <Button component={RouterLink} to="/create" size="large" variant="contained" color="warning">Create Member</Button>  
             
              </Toolbar>
            </Container>
          </AppBar>

<Dialog  open={show} onClose={SignIn}>
  <LoginPage  />
</Dialog>
            
        </Box>
    
      </>
    );
  }
  