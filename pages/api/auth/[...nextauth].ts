import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
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
      // Add logic here to look up the user from the credentials supplied
        credentials = { email: 'jdoe@gmail.com', password: 'hunter2' }
  
        const body = new URLSearchParams()
        body.append('email', credentials.email)
        body.append('password', credentials.password)
  
        const user = await fetch('http://localhost:8000/signin', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body
        }).then((response) => {
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
          return { id: '1', email: credentials.email }
        } else {
        // If you return null then an error will be displayed advising the user to check their details.
          return null
  
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ]

  return await NextAuth(req, res, {
    providers
  })
}