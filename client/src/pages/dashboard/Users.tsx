import React, { useEffect, useState } from 'react'
import {
    Box, Button, IconButton, Input, InputGroup, InputRightElement, Select, Table, Thead, Tbody, Tr, Th, TableContainer,
    Tfoot,
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { FaArrowLeft, FaArrowRight, FaFilter, FaPlus } from 'react-icons/fa6'
import User from '../../components/dashboard/User'
import Loader from '../../components/Loader'

type DataType = {
    users: {
        id: string,
        email: string,
        password: string | null,
        google_id: string | null,
        isAdmin: boolean,
        createdAt: string,
        profile: { id: string, family_name: string, given_name: string, nickname: string | null, phone: string, user_id: string, created_at: string }
    }[],
    current_page: number,
    total_pages: number,
}


const dummy: DataType = {
    "users": [
        {
            "id": "63e93fba-80ad-40ba-b1f8-947b66282303",
            "email": "mais@gmail.com",
            "password": "$2b$12$ylIV4ZDXHdKAHFnpFQLnLu6q.1xOVZrGgkZ/87zcAtLPW/fEeYJmy",
            "google_id": null,
            "isAdmin": false,
            "createdAt": "2024-08-27T21:31:14.004Z",
            "profile": {
                "id": "db39aada-c037-49e3-9b0f-70ff0d36ef2d",
                "family_name": "boumer",
                "given_name": "maissoun",
                "nickname": "douda",
                "phone": "0745894555",
                "user_id": "63e93fba-80ad-40ba-b1f8-947b66282303",
                "created_at": "2024-08-27T21:31:41.503Z"
            }
        },
        {
            "id": "bb66cbc9-8cb4-4aa1-9439-3ab686bef281",
            "email": "ibrahimelkhalilbenyahia2@gmail.com",
            "password": "$2b$12$ylIV4ZDXHdKAHFnpFQLnLu6q.1xOVZrGgkZ/87zcAtLPW/fEeYJmy",
            "google_id": null,
            "isAdmin": true,
            "createdAt": "2024-08-27T21:09:21.641Z",
            "profile": {
                "id": "7678b9aa-601e-4a7a-bfd7-b254462516d1",
                "family_name": "bink",
                "given_name": "Chakabala",
                "nickname": null,
                "phone": "0792017322",
                "user_id": "bb66cbc9-8cb4-4aa1-9439-3ab686bef281",
                "created_at": "2024-08-27T21:09:21.641Z"
            }
        }
    ],
    "current_page": 1,
    "total_pages": 1
}
const Users = () => {
    const [data, setData] = useState<DataType | null>(null);

    useEffect(() => {
        const id = setTimeout(() => {
            setData(dummy);
        }, 2000)

        return () => clearTimeout(id);
    }, [])
    return (
        !data ? <Loader /> : <Box w={"100%"}>

            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} flexWrap={'wrap'} w={"100%"} mt={4} mb={2} py={2} px={3}>
                <Box flex={1 / 2} display={'flex'} alignItems={'center'}>
                    <Select w={"180px"} placeholder='Search By'>
                        <option value="family_name">Family Name</option>
                        <option value="given_name">Given Name</option>
                        <option value="nickname">Nickname</option>
                        <option value="email">Email</option>
                    </Select>
                    <InputGroup>
                        <Input flex={1} placeholder='Search...' type='text' />
                        <InputRightElement><IconButton colorScheme={'primary'} aria-label='' icon={<FaSearch />} /></InputRightElement>
                    </InputGroup>
                </Box>

                <Box>
                    <Select w={"180px"} placeholder='Sort By'>
                        <option value="">Recent</option>
                        <option value="">Orders</option>
                        <option value="">Oldest</option>
                        <option value="">A-Z</option>
                        <option value="">Z-A</option>
                    </Select>
                </Box>

                <Button variant={'outline'} colorScheme='secondary' _hover={{ bg: 'secondary.800', color: "white" }} leftIcon={<FaFilter />}>Filters</Button>
            </Box>

            <Box w={"100%"}>
                <TableContainer bg={'white'}>
                    <Table colorScheme='primary' variant='simple'>
                        <Thead bg={'primary.300'} color={'white'}>
                            <Tr>
                                <Th>Email</Th>
                                <Th>Type</Th>
                                <Th>Role</Th>
                                <Th>Family Name</Th>
                                <Th>Given Name</Th>
                                <Th>Nickname</Th>
                                <Th>Phone</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.users.length > 0 ? data.users.map(user => <User
                                key={user.id} email={user.email} family_name={user.profile.family_name}
                                given_name={user.profile.given_name} id={user.id} nickname={user.profile.nickname || ''} phone={user.profile.phone}
                                role={user.isAdmin ? 'admin' : 'client'} type={user.password ? 'local' : 'google'}
                            />) : "no users"}

                        </Tbody>

                        <Tfoot>
                            <Box ml={1} my={2} display={'flex'} alignItems={'center'} gap={2}>
                                <Button colorScheme='secondary' leftIcon={<FaArrowLeft />}>Prev</Button>
                                <Button colorScheme='primary' rightIcon={<FaArrowRight />}>Next</Button>

                            </Box>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>

            <IconButton pos={'absolute'} right={2} bottom={4} aria-label='' colorScheme='primary' rounded={'full'} icon={<FaPlus />} />

        </Box>
    )
}

export default Users