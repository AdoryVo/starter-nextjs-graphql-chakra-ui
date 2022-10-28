import useSWR, { Fetcher } from 'swr'

import client from './client'

export default function useProfile() {
  interface Profile {
    first_name: string
    last_name: string
    school: string
    biography: string
    created_at: string
  }

  const fetcher: Fetcher<Profile, string> = (path: string) => client.get(path).json()

  const { data, mutate, error } = useSWR('profile', fetcher)

  const loading = !data && !error

  return {
    loading,
    profile: data,
    mutate
  }
}