import { Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Text } from '@chakra-ui/react';
import { FaEnvelope, FaLock, FaEyeSlash, FaEye, FaGoogle } from 'react-icons/fa6'
import loginImage from '../assets/login.svg'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Validator from '../utils/validator';

type data = {
    email: string;
    password: string;
}
const Login = () => {
    const [show, setShow] = useState<boolean>(false);
    const [data, setData] = useState<data>({ email: "", password: "" });
    const [dataErrors, setDataErrors] = useState<data>({ email: '', password: '' })
    const hundleSubmite = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validator = new Validator();

        if (!validator.validatePasswrod(data.password) && !validator.validateEmail(data.email)) {
            return setDataErrors(prev => ({ ...prev, email: 'invalid email provided', password: 'password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character', }))
        }
        else if (!validator.validateEmail(data.email)) {
            return setDataErrors(prev => ({ ...prev, email: 'invalid email provided' }))
        }

        else if (!validator.validatePasswrod(data.password)) {
            return setDataErrors(prev => ({
                ...prev,
                password: 'password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            }))

        }

        console.log(data)

        //todo validation and setting values
    }
    const hundleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataErrors(prev => ({ ...prev, [event.target.name]: '' }));
        setData(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }
    const toggleShowPassword = () => setShow(prev => !prev);
    return (
        <Box width={"100%"} h={{ base: "100svh", lg: "100vh" }} bg={"secondary.300"} display={'flex'} alignItems={'center'} justifyContent={'center'}>

            <Box rounded={'md'} boxShadow={'0 0 12px rgba(0,0,0,.2), 4px 4px 10px #fff'} w={"90%"} maxW={"900px"} bg={'white'} display={'flex'}>
                <Box p={4} flex={1}>
                    <Heading as="h1" size="xl" mb={8} fontWeight="bold" color="secondary.900">
                        Login
                    </Heading>
                    <form onSubmit={hundleSubmite}>
                        <FormControl isInvalid={dataErrors.email ? true : false} my={2} isRequired>
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                                <Input onChange={hundleInputChange} value={data.email} placeholder='eg:jhonstones@hotmai.fr' name='email' type="email" variant={'outline'} />
                                <InputLeftElement>
                                    <FaEnvelope />
                                </InputLeftElement>
                            </InputGroup>
                            {dataErrors.email && <FormErrorMessage>{dataErrors.email}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={dataErrors.password ? true : false} my={2} isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input placeholder='you need to enter strong password' value={data.password} onChange={hundleInputChange} name='password' type={show ? "text" : "password"} variant={'outline'} />
                                <InputLeftElement>
                                    <FaLock />
                                </InputLeftElement>
                                <InputRightElement>
                                    <IconButton aria-label='hide' icon={show ? <FaEyeSlash /> : <FaEye />} onClick={toggleShowPassword} />
                                </InputRightElement>

                            </InputGroup>
                            {dataErrors.password && <FormErrorMessage>{dataErrors.password}</FormErrorMessage>}
                        </FormControl>
                        <Box ml={1} mt={1}>
                            <Link to={'/reset'}><Text color={'GrayText'}>forgot password?</Text></Link>
                        </Box>
                        <Box ml={1} mt={1}>
                            <Link to={'/register'}><Text color={'primary.600'}>you dont have account register here</Text></Link>
                        </Box>

                        <Box my={2}>
                            <Button type='submit' variant={'solid'} colorScheme={'primary'} size="lg" w={"full"}>Login</Button>
                        </Box>
                        <Divider my={4} />
                        <Text textAlign={'center'} fontWeight={'bold'} color={'secondary.900'}>OR</Text>
                        <Box my={2}>
                            <Button as={Link} to={'/google'} w={'full'} size={'lg'} variant={'solid'} colorScheme='accent' my={2} leftIcon={<FaGoogle />} >Continue With Google</Button>
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