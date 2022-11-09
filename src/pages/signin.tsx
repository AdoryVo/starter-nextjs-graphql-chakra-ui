import {
  Button, Container, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useState } from 'react'

import Loading from '../components/Loading'

export default function SignIn() {
  const router = useRouter()
  const { status } = useSession()
  const [error, setError] = useState('')

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: () => {
      // Remove error alert on retry
      setError('')
      return {}
    },
    onSubmit: (values) => {
      const { email, password } = values
      signIn('credentials', {
        redirect: false, callbackUrl: '/profile', email, password,
      }).then((response) => {
        // Set `error` to display respective alerts
        if (response && response.error) {
          setError(response.error)
        }
      })
    },
  })

  if (status === 'loading') return <Loading />
  if (status === 'authenticated') router.push('/profile')

  return (
    <>
      <NextSeo
        title="Sign in"
        description="Sign in to your account here."
      />
      <Container>
        <Heading my={5}>Sign in</Heading>
        <form onSubmit={formik.handleSubmit}>
          <FormControl isInvalid={error === 'CredentialsSignin'} mb={3}>
            <FormLabel>Email Address</FormLabel>
            <Input
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              autoComplete="username email"
              required
            />
          </FormControl>

          <FormControl isInvalid={error === 'CredentialsSignin'}>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              autoComplete="current-password"
              required
            />
            <FormErrorMessage>Incorrect email or password.</FormErrorMessage>
          </FormControl>

          <Button colorScheme="blue" type="submit" mt={5}>Sign in</Button>
        </form>

        <Divider my={5} />

        <Text>Don&apos;t have an account? Sign up here!</Text>

        <Link href="/signup" passHref>
          <Button colorScheme="green" my={5}>
          Sign up
          </Button>
        </Link>

        <Text fontSize="sm">
          <Link href="/">← Return home</Link>
        </Text>
      </Container>
    </>
  )
}
