import { Box, Button, Divider, FormControl, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Text } from '@chakra-ui/react';
import { FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa6'
import loginImage from '../assets/login1.svg'
import googleLogo from '../assets/google.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import React from 'react'

const Login = () => {
    const [show, setShow] = useState<boolean>(false);
    return (
        <Box width={"100%"} h={{ base: "100svh", lg: "100vh" }} bg={"secondary.300"} display={'flex'} alignItems={'center'} justifyContent={'center'}>

            <Box rounded={'md'} boxShadow={'0 0 12px rgba(0,0,0,.2), 4px 4px 10px #fff'} w={"90%"} maxW={"900px"} bg={'white'} display={'flex'}>
                <Box flex={1} p={4} >
                    <Heading as="h1" size="xl" mb={8} fontWeight="bold" color="secondary.900">
                        Login
                    </Heading>
                    <form>
                        <FormControl my={2} isRequired>
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                                <Input type="email" variant={'outline'} />
                                <InputLeftElement>
                                    <FaEnvelope />
                                </InputLeftElement>
                            </InputGroup>
                        </FormControl>

                        <FormControl my={2} isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={show ? "text" : "password"} variant={'outline'} />
                                <InputLeftElement>
                                    <FaLock />
                                </InputLeftElement>
                            </InputGroup>
                        </FormControl>
                        <Box ml={1} mt={1}>
                            <Link to={'/reset'}><Text color={'secondary.400'}>forgot password?</Text></Link>
                        </Box>
                        <Box ml={1} mt={1}>
                            <Link to={'/register'}><Text color={'primary.600'}>you dont have account register here</Text></Link>
                        </Box>

                        <Box my={2}>
                            <Button variant={'solid'} colorScheme={'primary'} size="lg" w={"full"}>Login</Button>
                        </Box>
                        <Divider my={4} />
                        <Text textAlign={'center'} fontWeight={'bold'} color={'secondary.900'}>OR</Text>
                        <Box my={2}>
                            <Button as={Link} to={'/google'} w={'full'} size={'lg'} variant={'outline'}  colorScheme='gray' ><Image src={googleLogo} w={"80px"} /></Button>
                        </Box>



                    </form>
                </Box>
                <Box w={"50%"} bg={'primary.600'} display={{ base: 'none', md: 'flex' }} alignItems={'center'} justifyContent={'center'}>

                    <Image w={"90%"} m={"10px"} loading='lazy' src={loginImage} alt='store' />

                </Box>


            </Box>


        </Box>
    )
}

export default Login