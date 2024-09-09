

import React from 'react'
import Box from '@mui/material/Box';
import ResponsiveDrawer from './Sidebar'
import NavbarDashboard from './NavbarDashboard';
import  DashHome from './DashHome';

import ChartOwner from './ChartOwner';





function Dashboard({handleLogout}) {
  return (
    
 <div>
   
     <NavbarDashboard handleLogout={handleLogout}/>
     <Box height= {30}/>
     <Box sx={{display: 'flex'  }}>
      <ResponsiveDrawer/> 
     <Box component="main"  sx={{flexGrow: 1,p:3}}>
       <DashHome/>
      
       <ChartOwner/>
      
       
     </Box>
     </Box>
  
  

 </div>

  );
}

export default Dashboard