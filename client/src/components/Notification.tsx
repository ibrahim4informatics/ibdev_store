import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { FiAlertTriangle } from 'react-icons/fi'

type Props = {
    id: number,
    title: string,
    content: string,
}

const Notification: React.FC<Props> = ({ title, content }) => {
    return (
        <Box cursor={'pointer'} mx={1} px={2} rounded={'md'} display={'flex'} alignItems={'center'} gap={4} my={2} bg={"primary.100"} border={'solid 1px rgba(0,0,0,0.25)'} py={2}>

            <Box rounded={'full'} display={'flex'} alignItems={'center'} justifyContent={'center'} color={'primary.600'} fontSize={"35px"} w={"60px"} h={"60px"} bg={"#C9C9C9"}>
                <FiAlertTriangle />
            </Box>
            <Box>
                <Heading size={'md'}>{title}</Heading>
                <Text color={'GrayText'}>{content}</Text>
            </Box>
        </Box>
    )
}

export default Notification