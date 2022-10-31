import ky from 'ky'
import { useSession } from 'next-auth/react'
import useSWR, { Fetcher } from 'swr'

export default function useProfile() {
  interface Profile {
    email: string
    first_name: string
    last_name: string
    created_at: string
  }

  const { data: session } = useSession()
  const email = session && session.user ? session.user.email : 'jdoe@gmail.com'

  const fetcher: Fetcher<Profile, string> = (path: string) => ky.get(path).json()

  const { data, mutate, error } = useSWR(`/api/rest/user/${email}`, fetcher)

  return {
    profile: data,
    error,
    mutate,
  }
}