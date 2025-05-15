
import { Box, Typography } from "@mui/material";
import { keyframes } from '@mui/system';
import SideDrawer from "./SideDrawer";

// import { Login } from "@mui/icons-material";

// import LoginPage from "./LoginForm";

const drawerWidth = 240;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function Home() {


  return (
    <>
    <Box sx={{ display: 'flex', height: '100vh', position: 'relative' }}>

      {/* Full background image */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `
            linear-gradient(135deg, rgba(17, 18, 18, .2) 0%, rgb(238, 242, 244) 69%, rgb(220, 230, 232) 78%),
              url("/WINDOWUIiMAGE.png")
            // // url("https://media.istockphoto.com/id/1082508340/photo/people-relation-and-organization-structure-social-media-business-and-communication-technology.jpg?s=2048x2048&w=is&k=20&c=n5W1SNY7wXdRtXmRA31LWUkH-cCdjFp-HjXiqj-1-W0=")
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
     
        }}
      >
     
      </Box>
      {/* Spacer for the Drawer */}
      <Box
        sx={{
          width: { xs: 0, sm: drawerWidth }, // No drawer on very small devices if you want
          flexShrink: 0,
        }}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 }, // Padding for smaller devices
          mx: { xs: '20px', sm: '20px' }, // 20px left and right margin always
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Center box */}
        {/* Centered Quote Box */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translate(-60%, -30%)',
            textAlign: 'center',
            zIndex: 1,
            maxWidth: '90%',
            width: { xs: '90%', sm: '80%', md: '70%' }, // Responsive width
          }}
        >
          <Box
            sx={{
              borderRadius: '2rem',
              backgroundColor: 'rgba(135, 206, 235, 0.6)',
              display: 'inline-block',
              p: 3,
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, .01)',
              fontStyle: 'italic',
              color: '#0d1b2a',
              animation: `${fadeIn} 2s ease-in-out`,

              '&:hover': {
                backgroundColor: 'rgba(0, 102, 99,0.85)',
                color: '#ffffff',
                transform: 'scale(1.05)',
                outline: '3px solid #ffffff',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem', } }}
            >
              "We are all in this together, and together we can make a difference."
            </Typography>
          </Box>
        </Box>


        {/* Left Quote */}
        <Box >

        <Typography
          variant="h6"
          sx={{
            mt:75,
            backgroundColor: 'rgba(13, 27, 42, 0.7)',
            borderRadius: '2rem',
            padding: '0.5rem 1rem',
            maxWidth: '90%',
            color: '#ffffff',
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: { xs: '1rem', md: '1.5rem' },
            animation: `${fadeIn} 2s ease-in-out`,
            marginBottom: 3,
            '&:hover': {
              backgroundColor: 'rgba(247, 240, 166, 0.85)',
              color: 'black',
              transform: 'scale(1.05)',
              outline: '3px solid #ffffff',
              transition: 'transform 0.3s ease, background-color 0.3s ease',

            },
            zIndex: 2,
          }}
        >
          "Service to others is the rent you pay for your room here on earth."
          — Muhammad Ali
        </Typography>
        </Box>
      
        {/* <Box > 

        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            backgroundColor: 'rgba(13, 27, 42, 0.7)',


            bottom: '25%',
            right: '1%',
            borderRadius: '2rem',
            padding: '0.5rem 1rem',
            maxWidth: '100%',

            color: '#ffffff',
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: { xs: '1rem', md: '1.5rem' },
            animation: `${fadeIn} 2s ease-in-out`,
            marginBottom: 3,
            '&:hover': {
              backgroundColor: 'rgba(253,1,1, 0.6)',
              color: '#ffffff',
              transform: 'scale(1.05)',
              outline: '3px solid #ffffff',
              transition: 'transform 0.3s ease, background-color 0.3s ease',
            },
            zIndex: 2,
          }}
        >
          "The best way to find yourself is to lose yourself in the service of others."
          — Mahatma Gandhi
        </Typography>
        </Box>
  */}
        



        {/* Footer */}
        <Box
          component="footer"
          sx={{
            ml: { sm: `${drawerWidth}px` }, // margin-left same as drawer on large screens
            px: 2, // padding left and right 20px
            py: 2, // padding top and bottom 20px
            width: { sm: `calc(100% - ${drawerWidth}px)` }, // shrink width when drawer is shown
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: '#ffffff',
            position: 'fixed',
            bottom: 0,
            left: 0,
            textAlign: 'center',
            zIndex: 1,
            marginBottom: .3,
          }}
        >

          {/* Footer content */}
          <Typography
            variant="body2"
            sx={{
              padding: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: 3,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            }}
          >
            © {new Date().getFullYear()} ECN Network. All rights reserved.
          </Typography>
        </Box>

      </Box>
      <SideDrawer />  
    </Box>
    </>
  );
}
 