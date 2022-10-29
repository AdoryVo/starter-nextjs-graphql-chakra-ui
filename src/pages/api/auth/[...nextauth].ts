import ky from 'ky'
import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const client = ky.create({ prefixUrl: 'http://localhost:8000' })

  const providers = [
    CredentialsProvider({
      id: 'credentials',

      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',

      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jdoe@gmail.com' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const body = new URLSearchParams()
        body.append('email', credentials.email)
        body.append('password', credentials.password)

        const user = await client.post('signin', { body: body })
          .then((response) => {
            const cookie = response.headers.get('set-cookie')
            if (cookie) {
              res.setHeader('Set-Cookie', cookie)
            }
            return true
          }).catch(() => {
            return null
          })

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return { id: credentials.email }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
  ]

  const callbacks = {
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      // If signing out, remove cookies
      if (url.startsWith('/signin')) {
        await client.post('signout').then(() => {
          res.setHeader('Set-Cookie', 'id=; Path=/; Max-Age=0;')
        })
      }

      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }

  const pages = {
    signIn: '/signin'
  }

  return await NextAuth(req, res, {
    providers,
    callbacks,
    pages
  })
}