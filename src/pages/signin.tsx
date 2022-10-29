import { Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'

import Loading from '../components/Loading'

export default function SignIn() {
  const router = useRouter()
  const { error } = router.query
  const { status } = useSession()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: () => {
      // Refresh URL on retry
      router.push('/signin', undefined, { shallow: true })
      return {}
    },
    onSubmit: (values) => {
      const { email, password } = values
      signIn('credentials', { callbackUrl: '/profile', email, password })
    }
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

          <Button colorScheme="blue" type="submit" my={5}>Sign In</Button>
        </form>

        <hr />
        Don&apos;t have an account? Sign up here!
        <br />
        <Button colorScheme="green" type="submit" mt={5}>
          <Link href="/signup">Sign up</Link>
        </Button>
      </Container>
    </>
  )
}
