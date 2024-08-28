import { Box, IconButton } from '@chakra-ui/react'
import React, { SetStateAction, useState } from 'react'
import { FaBell, FaLinesLeaning, FaRegBell } from 'react-icons/fa6'
import { RiMenuFold4Fill } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion'
import Notification from '../Notification';

type Props = {
    setShown: React.Dispatch<SetStateAction<boolean>>;
    notifications: { id: number, title: string, content: string }[];


}


const AnBox = motion(Box);
const Navbar: React.FC<Props> = ({ setShown, notifications }) => {

    const [showNotification, setShowNotifications] = useState<boolean>(false);
    return (
        <Box zIndex={20} alignItems={'center'} justifyContent={'space-between'} px={2} display={'flex'} w={'100%'} bg={'white'} h={"50px"} borderBottom={'solid 0.5px rgba(0,0,0,0.25)'}>
            <IconButton aria-label='' icon={<RiMenuFold4Fill />} colorScheme='primary' onClick={() => setShown(prev => !prev)} />
            <Box onClick={() => setShowNotifications(prev => !prev)} cursor={'pointer'} px={2} position={'relative'}>
                {showNotification ? <FaRegBell /> : <FaBell />}
                {notifications.length > 0 && <Box top={"-14px"} right={"0px"} pos={'absolute'} fontSize={8} display={'flex'} alignItems={'center'} justifyContent={'center'} color={'white'} fontWeight={'bold'} w={"15px"} h={'15px'} bg={'red'} rounded={'full'}>{notifications.length}</Box>}
            </Box>


            <AnimatePresence>
                {showNotification && <AnBox px={3} py={2} zIndex={2} key={1} initial={{ opacity: 0, y: "-100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "-100%" }} transition={{ duration: .2 }} border={'solid 1px rgba(0,0,0,0.25)'} rounded={'md'} overflowY={'auto'} pos={'absolute'} w={{ base: 300, md: 400, lg: 500 }} h={'calc(100vh * 2 / 3)'} bg={'white'} right={2} top={"65px"}>

                    {notifications.length > 0 ? (
                        notifications.map(noti => (<Notification key={noti.id} id={noti.id} title={noti.title} content={noti.content} />))
                    ) : <Box w={"100%"} h={"100%"} display={'flex'} alignItems={'center'} justifyContent={'center'} color={'GrayText'}>Empty</Box>}
                </AnBox>}
            </AnimatePresence>

        </Box>
    )
}

export default Navbar
