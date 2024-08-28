import { Box, Button, Link, Switch, Text } from '@chakra-ui/react'
import React from 'react'
import { FaBox, FaGear, FaLeftLong, FaUser, FaWeightHanging } from 'react-icons/fa6'
import '../../index.css'
import { BiSolidCategory } from 'react-icons/bi'
import { FiPackage } from 'react-icons/fi'
import { MdDarkMode, MdDashboard } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { CgDarkMode } from 'react-icons/cg'
import { CiLogout } from 'react-icons/ci'

type Props = {


}

const Sidebar: React.FC<Props> = () => {
    return (
        <Box display={'flex'} flexDir={'column'} pt={4} px={2} pb={2} w={{ base: '50px', md: 300 }} h={'100%'} bg={'white'} borderRight={'solid 0.5px rgba(0,0,0,.3)'}>
            <Box display={{base:'none',md:'block'}} borderBottom={'solid 0.5px rgba(0,0,0,.3)'} p={4} textAlign={'center'} fontSize={20} color={'primary.500'} fontWeight={'bold'}>
                IBDEV-ADMIN
            </Box>
            <Box my={'auto'}>
                <NavLink to={'/dashboard'} end>
                    <Box my={2} fontSize={16} fontWeight={'bold'} color={'secondary.500'} display={'flex'} alignItems={'center'} gap={2} w={'full'} p={2} rounded={'md'}>
                        <MdDashboard />
                        <Text display={{ base: 'none', md: 'block' }}>Dashboard</Text>
                    </Box>

                </NavLink>
                <NavLink to={'/dashboard/users'}>
                    <Box my={2} fontSize={16} fontWeight={'bold'} color={'secondary.500'} display={'flex'} alignItems={'center'} gap={2} w={'full'} p={2} rounded={'md'}>
                        <FaUser />
                        <Text display={{ base: 'none', md: 'block' }}>Users</Text>
                    </Box>
                </NavLink>

                <NavLink to={'/dashboard/products'}>
                    <Box my={2} fontSize={16} fontWeight={'bold'} color={'secondary.500'} display={'flex'} alignItems={'center'} gap={2} w={'full'} p={2} rounded={'md'}>
                        <FaWeightHanging />
                        <Text display={{ base: 'none', md: 'block' }}>Products</Text>
                    </Box>
                </NavLink>


                <NavLink to={'/dashboard/categories'}>
                    <Box my={2} fontSize={16} fontWeight={'bold'} color={'secondary.500'} display={'flex'} alignItems={'center'} gap={2} w={'full'} p={2} rounded={'md'}>
                        <BiSolidCategory />
                        <Text display={{ base: 'none', md: 'block' }}>Categories</Text>
                    </Box>
                </NavLink>


                <NavLink to={'/dashboard/orders'}>
                    <Box my={2} fontSize={16} fontWeight={'bold'} color={'secondary.500'} display={'flex'} alignItems={'center'} gap={2} w={'full'} p={2} rounded={'md'}>
                        <FiPackage />
                        <Text display={{ base: 'none', md: 'block' }}>Orders</Text>
                    </Box>
                </NavLink>

                <NavLink to={'/dashboard/suppliers'}> <Box my={2} fontSize={16} fontWeight={'bold'} color={'secondary.500'} display={'flex'} alignItems={'center'} gap={2} w={'full'} p={2} rounded={'md'}>
                    <FaBox />
                    <Text display={{ base: 'none', md: 'block' }}>Suppliers</Text>
                </Box>
                </NavLink>
            </Box>


            <Box mt={'auto'}>

                <NavLink to={'/dashboard/settings'}> <Box my={2} fontSize={16} fontWeight={'bold'} color={'secondary.500'} display={'flex'} alignItems={'center'} gap={2} w={'full'} p={2} rounded={'md'}>
                    <FaGear />
                    <Text display={{ base: 'none', md: 'block' }}>settings</Text>
                </Box>
                </NavLink>
                <Box my={2} fontSize={16} fontWeight={'bold'} color={'secondary.500'} display={'flex'} alignItems={'center'} gap={2} w={'full'} p={2} rounded={'md'}>
                    <Text display={{ base: 'none', md: 'block' }} >Dark-Mode:</Text>
            
                    <Switch  size={{base:'sm', md:'md'}} colorScheme='primary' checked={false} />
                </Box>
                <Box as={Link} href='#' my={2} fontSize={16} fontWeight={'bold'} color={'red'} display={'flex'} alignItems={'center'} gap={2} w={'full'} p={2} rounded={'md'}>
                    <CiLogout />
                    <Text display={{base:'none', md:'block'}}>Log-out</Text>
                </Box>




            </Box>
        </Box>
    )
}

export default Sidebar