import { Button, Container, Heading } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'

import Loading from '../components/Loading'
import useProfile from '../data/use-profile'

export default function Profile() {
  const { profile, loading } = useProfile()
  const { status } = useSession({ required: true }) // Auth required on this page

  if (status === 'loading' || loading) return <Loading />
  if (!profile) {
    handleLogOut()
    return 'Redirecting...'
  }

  function handleLogOut() {
    signOut({ callbackUrl: '/login' })
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
        School: {profile.school}
        <br/>
        Biography: {profile.biography}
        <br/>
        User since: {new Date(profile.created_at).toDateString()}
        <br/>
        <Button colorScheme="red" onClick={handleLogOut} my={4}>Log Out</Button>
      </Container>
    </>
  )
}
