import ky from 'ky'

import { Result } from '../pages/api/graphql'

interface Body {
  query: string
  operationName?: string
  variables?: object
}

const defaultOptions = { useAbsoluteUrl: false }

const fetcher = (body: Body, options = defaultOptions) => {
  let path = '/api/graphql'
  if (options.useAbsoluteUrl) {
    path = process.env.NEXTAUTH_URL + path
  }
  return ky.post(path, { json: body }).json<Result>().then((json) => json.data)
}

export default fetcher