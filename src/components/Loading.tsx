import { Center, Heading, Spinner } from '@chakra-ui/react'

export default function Loading() {

  return (
    <Center mt={5}>
      <Spinner />
      <Heading mx={3}>Loading...</Heading>
    </Center>
  )
}