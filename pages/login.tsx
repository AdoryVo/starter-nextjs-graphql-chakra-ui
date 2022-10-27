import { Button, Container, Heading } from '@chakra-ui/react'
import { NextSeo } from 'next-seo';

export default function Login() {
  return (
    <>
      <NextSeo
        title="Login"
        description="Login to your account here."
      />
      <Container>
        <Heading my={5}>Login</Heading>
        <Button colorScheme="blue">Log In</Button>
      </Container>
    </>
  )
}
