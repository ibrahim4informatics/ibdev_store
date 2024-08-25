import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Image, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaArrowLeft, FaEnvelope, FaPaperPlane } from 'react-icons/fa6';
import forgotPicture from '../assets/auth/forgot.svg'
import Validator from '../utils/validator';
import { NavigateFunction, useNavigate } from 'react-router-dom';



const Reset: React.FC = () => {
    const [data, setData] = useState<{ email: string }>({ email: "" });
    const [dataErrors, setDataErrors] = useState<{ email: string }>({ email: "" });
    const validator = new Validator();
    const navigate: NavigateFunction = useNavigate();

    const inputChangeHundler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataErrors(prev => ({ ...prev, [event.target.name]: "" }));
        setData(prev => ({ ...prev, [event.target.name]: event.target.value }));

    }

    const hundleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //todo validation and sending password reset link
        if (!validator.validateEmail(data.email)) {
            setDataErrors(prev => ({ ...prev, email: 'Invalid email provided' }))
            return;
        }
        try {

        }

        catch (error) {
            console.error(error);
        }
    }
    return (
        <Box width={"100%"} h={{ base: "100svh", lg: "100vh" }} bg={'secondary.300'} display={'flex'} alignItems={'center'} justifyContent={'center'}>

            <Box display={'flex'} boxShadow={'0 0 12px rgba(0,0,0,.4), 4px 4px 12px #fff'} bg={'#fff'} w={"90%"} maxW={"900px"} >
                <Box alignSelf={'center'} p={4} flex={1}>
                    <Heading my={2}>Reset Password</Heading>
                    <form onSubmit={hundleSubmit}>

                        <FormControl isInvalid={dataErrors.email ? true : false} my={2} isRequired>
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                                <Input borderColor={'secondary.400'} onChange={inputChangeHundler} value={data.email} type='email' name='email' />
                                <InputLeftElement><FaEnvelope /></InputLeftElement>
                            </InputGroup>

                            {dataErrors.email ? <FormErrorMessage> {dataErrors.email} </FormErrorMessage> : <FormHelperText color={'GrayText'}>you need to provide the email in wich your account is linked to it!</FormHelperText>}


                        </FormControl>

                        <Button type='submit' mt={4} w={'full'} colorScheme={'primary'} leftIcon={<FaPaperPlane />} size={'lg'}>Send</Button>
                        <Button onClick={() => navigate(-1)} mt={2} w={'full'} colorScheme={'secondary'} leftIcon={<FaArrowLeft />} size={'lg'}>Cancel</Button>

                    </form>
                </Box>
                <Box bg={'primary.500'} display={{ base: "none", md: 'flex' }} w={"50%"} alignItems={'center'} justifyContent={'center'}>
                    <Image w={"90%"} m={"10px"} loading='lazy' src={forgotPicture} alt='forgot' />
                </Box>
            </Box>

        </Box>
    )
}

export default Reset