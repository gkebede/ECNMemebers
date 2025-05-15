import { Container, CssBaseline } from '@mui/material';
import NavBar from '../../../component/NavBar';
import './style.css';
 
 
//import { Outlet} from 'react-router-dom';//
//import Home from '../../../component/Home';
import { Outlet } from 'react-router-dom';
 
function App() {

  return (
    <>
  
      <NavBar  />



       {/* {location.pathname === '/' ? <Home /> : (    // )}*/}
        <>  
          <Container >
          <CssBaseline />
          <Outlet />  
          </Container>
          </>

 

     
 
    </>
  );
}


export default App
