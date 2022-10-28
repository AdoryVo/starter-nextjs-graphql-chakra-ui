import { Button, Container, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useEffect } from 'react'

import useUser from '../data/use-user'

export default function Profile() {
  const router = useRouter()
  const { user, loading, loggedOut } = useUser()

  useEffect(() => {
    if (loggedOut) {
      console.log('Logged out!')
      router.push('/login')
    }
  }, [loggedOut, router])

  if (loading) return 'loading...'
  if (loggedOut) return 'redirecting...'

  function handleLogOut() {
    signOut({redirect: false})
    fetch('/bapi/signout', {method: 'POST'})
    router.push('/login')
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
          {`${user.first_name} ${user.last_name}`}
        </Heading>
        School: {user.school}
        <br/>
        Biography: {user.biography}
        <br/>
        User since: {new Date(user.created_at).toDateString()}
        <br/>
        <Button colorScheme="red" onClick={handleLogOut} my={4}>Log Out</Button>
      </Container>
    </>
  )
}
