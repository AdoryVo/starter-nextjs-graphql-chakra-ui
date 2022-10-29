import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import fetcher from '../../../data/fetcher'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      id: 'credentials',

      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',

      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jdoe@gmail.com' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const query = `
          {
            user(email: "${credentials.email}", password: "${credentials.password}") {
              email
            }
          }
        `

        const { user } = await fetcher({ query }, { useAbsoluteUrl: true })

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return { id: '_', email: credentials.email }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
  ]

  const pages = {
    signIn: '/signin'
  }

  return await NextAuth(req, res, {
    providers,
    pages
  })
}