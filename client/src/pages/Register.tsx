import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Text, useSteps, } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaMobile } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Validator from '../utils/validator'
import registerPicture from '../assets/register.svg'

type data = {
    email: string,
    password: string,
    confirm: string,
    given_name: string,
    family_name: string,
    nickname: string | null,
    phone: string
}

const steps: { title: string, description: string }[] = [
    { title: 'credentials', description: "your credentials to authenticate" },
    { title: "personale informations", description: "your profile informations" }
]

const validator = new Validator()


const Register = () => {
    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 1,
        count: steps.length
    })

    const [show, setShow] = React.useState(false)
    const [data, setData] = useState<data>({ email: "", password: "", confirm: "", given_name: "", family_name: "", nickname: "", phone: "" });
    const [dataErrors, setDataErrors] = useState<data>({ email: "", password: "", confirm: "", given_name: "", family_name: "", nickname: "", phone: "" });


    const toggleShowPassword = () => setShow(prev => !prev)
    const hundleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (activeStep === 1) {

            const { email, password, confirm } = data;

            if (!validator.validateEmail(email)) {
                return setDataErrors({ ...dataErrors, email: "Invalid email format" });
            }
            if (!validator.validatePasswrod(password)) {
                return setDataErrors({ ...dataErrors, password: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
            }

            if (password !== confirm) {
                return setDataErrors({ ...dataErrors, confirm: "Passwords do not match" });
            }

            if (validator.validateEmail(email) && validator.validatePasswrod(password) && password === confirm) {
                goToNext();
            }
        }

        else {
            const { phone } = data;
            if (!validator.validatePhoneNumber(phone) || phone.length > 10) {
                setDataErrors({ ...dataErrors, phone: "Invalid phone number format" });
            }

            console.log(data)
        }
    }
    const hundleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataErrors({ ...dataErrors, [event.target.name]: "" });
        setData({ ...data, [event.target.name]: event.target.value });
    }
    return (
        <Box w={"100%"} h={{ base: "100svh", lg: "100vh" }} bg={'secondary.300'} display={'flex'} alignItems={'center'} justifyContent={'center'}>

            <Box rounded={'md'} display={'flex'} width={"90%"} maxW={"900px"} bg={"white"} boxShadow={"0 0 12px rgba(0,0,0,.2), 4px 4px 10px rgb(252,252,252)"}>

                <Box flex={1} p={4}>
                    <Heading my={2}>Register</Heading>
                    <Stepper mx={2} my={4} size={{ base: 'sm', md: "md" }} colorScheme='accent' index={activeStep}>

                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepIndicator>
                                    <StepStatus active={<StepNumber />} complete={<StepIcon />} incomplete={<StepNumber />} />
                                </StepIndicator>

                                <Box>
                                    <StepTitle>{step.title}</StepTitle>
                                </Box>
                                <StepSeparator />
                            </Step>
                        ))}

                    </Stepper>

                    {activeStep === 1 && (<>
                        <form onSubmit={hundleSubmit}>
                            <FormControl isInvalid={dataErrors.email ? true : false} my={2} isRequired >
                                <FormLabel>Email</FormLabel>
                                <InputGroup>
                                    <Input onChange={hundleInputChange} value={data.email} placeholder='eg:john@gmail.com' name='email' type='email' />
                                    <InputLeftElement><FaEnvelope /></InputLeftElement>
                                </InputGroup>
                                {dataErrors.email && <FormErrorMessage>{dataErrors.email}</FormErrorMessage>}
                            </FormControl>
                            <FormControl isInvalid={dataErrors.password ? true : false} my={2} isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input onChange={hundleInputChange} value={data.password} placeholder='you need to enter strong password' name='password' type={show ? "text" : "password"} variant={'outline'} />
                                    <InputLeftElement>
                                        <FaLock />
                                    </InputLeftElement>
                                    <InputRightElement>
                                        <IconButton aria-label='hide' icon={show ? <FaEyeSlash /> : <FaEye />} onClick={toggleShowPassword} />
                                    </InputRightElement>

                                </InputGroup>
                                {dataErrors.password && <FormErrorMessage>{dataErrors.password}</FormErrorMessage>}

                            </FormControl>

                            <FormControl isInvalid={dataErrors.confirm ? true : false} my={2} isRequired>
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                    <Input onChange={hundleInputChange} value={data.confirm} placeholder='you need to enter strong password' name='confirm' type={show ? "text" : "password"} variant={'outline'} />
                                    <InputLeftElement>
                                        <FaLock />
                                    </InputLeftElement>
                                    <InputRightElement>
                                        <IconButton aria-label='hide' icon={show ? <FaEyeSlash /> : <FaEye />} onClick={toggleShowPassword} />
                                    </InputRightElement>
                                </InputGroup>

                                {dataErrors.confirm && <FormErrorMessage>{dataErrors.confirm}</FormErrorMessage>}


                            </FormControl>
                            <Box my={2} ml={3}>
                                <Link to={'/login'}><Text color={'secondary.600'} fontWeight={'bold'}>you have an account? login here!</Text></Link>
                            </Box>
                            <Button type='submit' colorScheme='primary' w={'full'} size={'lg'} my={2}>Continue</Button>
                        </form>
                    </>)}

                    {activeStep === 2 && (<>
                        <form onSubmit={hundleSubmit}>
                            <FormControl  my={2} isRequired >
                                <FormLabel>Given Name</FormLabel>
                                <Input onChange={hundleInputChange} value={data.given_name} placeholder='eg:Jack' name='given_name' type='text' />
                            </FormControl>

                            <FormControl my={2} isRequired >
                                <FormLabel>Family Name</FormLabel>
                                <Input onChange={hundleInputChange} value={data.family_name} placeholder='eg:Smith' name='family_name' type='text' />
                            </FormControl>

                            <FormControl  my={2} isRequired={false} >
                                <FormLabel>Nickname</FormLabel>
                                <Input onChange={hundleInputChange} value={data.nickname || ''} placeholder='eg:jackoo' name='nickname' type='text' />
                            </FormControl>

                            <FormControl isInvalid={dataErrors.phone ? true : false} my={2} isRequired>
                                <FormLabel>Phone</FormLabel>
                                <InputGroup>
                                    <Input onChange={hundleInputChange} value={data.phone} placeholder='you need to enter your phone number' name='phone' type={'number'} maxLength={10} variant={'outline'} />
                                    <InputLeftElement>
                                        <FaMobile />
                                    </InputLeftElement>

                                </InputGroup>
                                {dataErrors.phone && <FormErrorMessage>{dataErrors.phone}</FormErrorMessage>}

                            </FormControl>

                            <Button type='submit' colorScheme='primary' w={'full'} size={'lg'} my={2}>Finish!</Button>
                        </form>
                    </>)
                    }



                </Box>
                <Box display={{ base: 'none', md: "flex" }} w={"50%"} bg={'secondary.600'}>
                    <Image src={registerPicture} alt='register' w={"100%"}/>
                </Box>

            </Box>
        </Box>
    )
}

export default Register