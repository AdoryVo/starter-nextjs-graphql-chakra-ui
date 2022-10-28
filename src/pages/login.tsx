import { Button, Container, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'

import Loading from '../components/Loading'

export default function Login() {
  const router = useRouter()
  const { error } = router.query
  const { status } = useSession()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: () => {
      router.push('/login', undefined, { shallow: true })
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
        title="Login"
        description="Login to your account here."
      />
      <Container>
        <Heading my={5}>Login</Heading>
        <form onSubmit={formik.handleSubmit}>
          <FormControl isInvalid={Boolean(error)} mb={3}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              autoComplete="username email"
            />
          </FormControl>

          <FormControl isInvalid={Boolean(error)}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              autoComplete="current-password"
            />
            {error && <FormErrorMessage>Incorrect email or password.</FormErrorMessage>}
          </FormControl>

          <Button colorScheme="blue" type="submit" mt={5}>Log In</Button>
        </form>
      </Container>
    </>
  )
}
