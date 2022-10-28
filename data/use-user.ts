import useSWR from 'swr'

export default function useUser() {
  const fetcher = (url: string) => fetch(url, {
    method: 'GET',
    credentials: 'include'
  }).then(res => res.json())

  const { data, mutate, error } = useSWR('/bapi/profile', fetcher)

  const loading = !data && !error
  const loggedOut = error

  return {
    loading,
    loggedOut,
    user: data,
    mutate
  }
}