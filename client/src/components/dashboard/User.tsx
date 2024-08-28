import { Box, IconButton, Td, Tr } from '@chakra-ui/react'
import React from 'react'
import { FaPen, FaRegEye, FaTrash } from 'react-icons/fa6'

type Props = {
    id: string,
    email: string,
    family_name: string,
    given_name: string,
    phone: string,
    nickname: string,
    type: 'local' | 'google',
    role: 'admin' | 'client'
}


const User: React.FC<Props> = ({ email, role, id, type, family_name, given_name, nickname, phone }) => {
    return (
        <Tr bg={role === 'admin' ? 'accent.100' : 'white'}>
            <Td>{email}</Td>
            <Td>{type}</Td>
            <Td>{role}</Td>
            <Td>{family_name}</Td>
            <Td>{given_name}</Td>
            <Td>{nickname}</Td>
            <Td>{phone}</Td>
            <Td>
                <Box display={'flex'} gap={2} alignItems={'center'}>
                    <IconButton aria-label='' colorScheme='accent' icon={<FaRegEye />} />
                    <IconButton aria-label='' colorScheme='primary' icon={<FaPen />} />
                    <IconButton aria-label='' colorScheme={'red'} icon={<FaTrash />} />
                </Box>
            </Td>
        </Tr>
    )
}

export default User