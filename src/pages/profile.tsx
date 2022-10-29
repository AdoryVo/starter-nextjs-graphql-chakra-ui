import { Button, Container, Heading } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'

import Loading from '../components/Loading'
import useProfile from '../data/use-profile'

export default function Profile() {
  const { profile, error } = useProfile()
  const { status } = useSession({ required: true }) // Auth required on this page

  if (error) {
    handleSignOut()
    return <Loading />
  }
  if (status === 'loading' || !profile) return <Loading />

  function handleSignOut() {
    signOut({ callbackUrl: '/signin' })
  }

  return (
    <>
      <NextSeo
        title="Profile"
        description="Your profile."
      />
      <Container>
        <Heading my={5}>Profile</Heading>
        <Heading textTransform="capitalize" size="lg" mb={3}>
          {`${profile.first_name} ${profile.last_name}`}
        </Heading>
        <br/>
        User since: {new Date(profile.created_at).toDateString()}
        <br/>
        <Button colorScheme="red" onClick={handleSignOut} my={4}>Sign out</Button>
      </Container>
    </>
  )
}
