import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../config/axios';
import changePicture from '../assets/auth/change.svg';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Text, useToast } from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa6';
import Validator from '../utils/validator';

const ChangePassword: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [show, setShow] = useState<boolean>(false);
    const [dataErrors, setDataErrors] = useState({ password: "", confirm: "" });
    const [data, setData] = useState({ password: "", confirm: "" });
    const [token_Error, setTokenError] = useState<string>("");
    const toast = useToast({ position: "top" });

    const navigate = useNavigate()
    const isLoggedIn = useAuth();
    const valitdator = new Validator();

    const toggleShowPassword = () => setShow(prev => !prev);
    const hundleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataErrors(prev => ({ ...prev, [e.target.name]: "" }));
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        return;
    }
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!valitdator.validatePasswrod(data.password)) {
            setDataErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character' }));
            return;
        }

        if (data.password !== data.confirm) {
            setDataErrors(prev => ({ ...prev, confirm: 'Passwords do not match' }));
            return;
        }

        const req = axios.post(`/auth/reset/change?token=${searchParams.get('token')}`, data);
        req.then((res => {
            if (res.status === 200) {
                return navigate('/login');
            }
        }))
            .catch(err => {
                if (err.response.status === 400) {
                    if (err.response.data.message === "password do not match") return setDataErrors(prev => ({ ...prev, confirm: "password do not match" }));
                    else if (err.response.data.message === "invalid or expired token") return setTokenError("invalid or expired token");
                    else return setDataErrors(prev => ({ ...prev, password: err.response.data.message }));
                }
            });

        toast.promise(req, {
            success: { title: "Success", description: "Password changed successfully" },
            error: { title: "Fail", description: "Failed to change password" },
            loading: { title: "Please Wait!", description: "Changing Password..." },
        })
    }

    useEffect(() => {
        if (isLoggedIn) return navigate('/');
        if (!searchParams.has("token") || !searchParams.get("token")) return navigate("/reset");

        axios.get(`/auth/reset/check?token=${searchParams.get("token")}`).then(res => {
            if (res.status === 200) return;
        }).catch(err => {
            if (err.response.data.message === "invalid or expired token") return setTokenError(err.response.data.message);
            else {
                return navigate("/reset");
            }
        })

    }, [])
    return (
        <Box w={'100%'} h={{ base: "100svh", lg: "100vh" }} bg={'secondary.300'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Box rounded={'md'} boxShadow={'0 0 12px rgba(0,0,0,.4), 4px 4px 12px #fff'} w={"90%"} maxW={"900px"} bg={'white'} display={'flex'}>
                <Box p={4} flex={1}>
                    {
                        token_Error ? (<>
                            <Heading as="h1" size="xl" mb={8} fontWeight="bold" color="red.600">
                                Invalid Or Expired URL
                            </Heading>
                            <Text color={'GrayText'}>try to send another reset password request!</Text>
                        </>) : (
                            <>
                                <Heading as="h1" size="xl" mb={8} fontWeight="bold" color="secondary.900">
                                    Change Password
                                </Heading>

                                <form onSubmit={onSubmit}>
                                    <FormControl isRequired isInvalid={dataErrors.password ? true : false} my={2}>
                                        <FormLabel>New Password:</FormLabel>
                                        <InputGroup borderColor={'secondary.500'}>
                                            <Input placeholder='you need to enter strong password' value={data.password} onChange={hundleInputChange} name='password' type={show ? "text" : "password"} variant={'outline'} />
                                            <InputLeftElement>
                                                <FaLock />
                                            </InputLeftElement>
                                            <InputRightElement>
                                                <IconButton aria-label='hide' icon={show ? <FaEyeSlash /> : <FaEye />} onClick={toggleShowPassword} />
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage>{dataErrors.password}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isRequired isInvalid={dataErrors.confirm ? true : false} my={2}>
                                        <FormLabel>Confirm Password:</FormLabel>
                                        <InputGroup borderColor={'secondary.500'}>
                                            <Input placeholder='you need to enter strong password' value={data.confirm} onChange={hundleInputChange} name='confirm' type={show ? "text" : "password"} variant={'outline'} />
                                            <InputLeftElement>
                                                <FaLock />
                                            </InputLeftElement>
                                            <InputRightElement>
                                                <IconButton aria-label='hide' icon={show ? <FaEyeSlash /> : <FaEye />} onClick={toggleShowPassword} />
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage>{dataErrors.confirm}</FormErrorMessage>
                                    </FormControl>

                                    <Button w={'full'} type='submit' size={'lg'} colorScheme='accent' mt={4} mb={2}>Submit</Button>
                                </form>
                            </>
                        )
                    }
                </Box>
                <Box w={"50%"} display={{ base: "none", md: 'flex' }} bg={'accent.600'}>
                    <Image loading='lazy' src={changePicture} alt='change' w={"90%"} />
                </Box>
            </Box>
        </Box>
    )
}

export default ChangePassword;