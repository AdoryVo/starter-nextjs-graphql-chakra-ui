import { Container, Heading } from '@chakra-ui/react'
import { NextSeo } from 'next-seo';

export default function Profile() {
  return (
    <>
      <NextSeo
        title="Profile"
        description="Your profile."
      />
      <Container>
        <Heading>Profile</Heading>
      </Container>
    </>
  )
}
