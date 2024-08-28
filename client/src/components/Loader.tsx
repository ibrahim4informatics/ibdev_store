import { Box, Spinner } from "@chakra-ui/react"

const Loader = () => {
  return (
    <Box w={"100%"} h={"calc(100vh - 50px)"} display={'flex'} alignItems={'center'} alignSelf={'center'} justifyContent={'center'}>


        <Spinner colorScheme="primary" size={'lg'} />
    </Box>
  )
}

export default Loader