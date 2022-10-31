import {
  Button, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useState } from 'react'

import Loading from '../components/Loading'
import fetcher from '../data/fetcher'

const HIDDEN = 'arbitrary'

export default function SignUp() {
  const router = useRouter()
  const { status } = useSession()

  const [emailError, setEmailError] = useState(HIDDEN)

  const query = `
    mutation AddUser($input: SignUpInput!) {
      addUser(input: $input)
    }
  `

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
    },
    validate: () => {
      // Remove email error message on retry
      setEmailError(HIDDEN)
      return {}
    },
    onSubmit: (values) => {
      fetcher({ query, variables: { input: values } }).then((result) => {
        const message = result.addUser
        if (message && message !== 'Success!') {
          setEmailError(message)
        } else {
          signIn('credentials', {
            callbackUrl: '/profile',
            email: values.email,
            password: values.password,
          })
        }
      })
    },
  })

  if (status === 'loading') return <Loading />
  if (status === 'authenticated') router.push('/profile')

  return (
    <>
      <NextSeo
        title="Sign up"
        description="Sign up for an account here."
      />
      <Container>
        <Heading my={5}>Sign up</Heading>
        <form onSubmit={formik.handleSubmit}>
          <FormControl mb={3}>
            <FormLabel>First Name</FormLabel>
            <Input
              name="first_name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              required
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="last_name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              required
            />
          </FormControl>

          <FormControl isInvalid={emailError !== HIDDEN} mb={3}>
            <FormLabel>Email Address</FormLabel>
            <Input
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              autoComplete="username email"
              required
            />
            <FormErrorMessage>{emailError}</FormErrorMessage>
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              autoComplete="current-password"
              required
            />
            <FormHelperText>Your password will be securely encrypted & hashed.</FormHelperText>
          </FormControl>

          <Button colorScheme="green" type="submit" mt={5}>Sign up</Button>
        </form>
      </Container>
    </>
  )
}
