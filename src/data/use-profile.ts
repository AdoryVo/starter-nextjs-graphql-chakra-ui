import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import fetcher from './fetcher'

export default function useProfile() {
  const { data: session } = useSession()
  const email = session && session.user ? session.user.email : 'jdoe@gmail.com'

  const query = `
    {
      user(email: "${email}") {
        first_name
        last_name
        created_at
      }
    }
  `

  const { data, mutate, error } = useSWR({ query }, fetcher)

  const profile = data ? data.user : null

  if (data && data.user === null) {
    // Internal server error - backend returned null user
    return {
      profile,
      error: true,
      mutate
    }
  }

  return {
    profile,
    error,
    mutate
  }
}