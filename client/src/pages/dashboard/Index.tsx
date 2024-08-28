import React, { useState } from 'react'
import { Outlet, useLocation, NavLink } from 'react-router-dom'
import Sidebar from '../../components/dashboard/Sidebar'
import { Box } from '@chakra-ui/react'
import Navbar from '../../components/dashboard/Navbar'

const Index = () => {
  const { pathname } = useLocation();
  const [isShowenSidebar, setIsShownSidebar] = useState<boolean>(true);
  return (
    <Box w={"100%"} h={{ base: "100svh", lg: "100vh" }} display={'flex'} bg={'secondary.200'}>
      {isShowenSidebar && <Sidebar />}


      <Box w={isShowenSidebar ? {base: 'calc(100% - 50px)', md:"calc(100%  - 300px)"}: "100%"}>
        <Navbar setShown={setIsShownSidebar} notifications={[{ id: 1, title: "Order", content: "new order have refunded" }]} />
        {pathname === "/dashboard" ? <Box>dashboard initial widgets</Box> : <Outlet />}
      </Box>

    </Box>
  )
}

export default Index