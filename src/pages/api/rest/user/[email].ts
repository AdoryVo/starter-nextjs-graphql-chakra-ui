import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'

interface User {
  email: string
  password: string
  first_name: string
  last_name: string
  created_at: string
}

// Fake users data
const users: User[] = [
  {
	  email: 'jdoe@gmail.com',
	  password: '$2a$10$VXJmZqq.AXbflRMRCu5byue95XkThXSRlpTXmGptMXU2eS7NABUAO',
	  first_name: 'John',
    last_name: 'Doe',
    created_at: '2022-07-15T02:51:17.618150Z',
  },
  {
	  email: 'jdoe1@gmail.com',
	  password: '$2a$10$VXJmZqq.AXbflRMRCu5byue95XkThXSRlpTXmGptMXU2eS7NABUAO',
	  first_name: 'jane',
    last_name: 'Doe',
    created_at: '2022-07-15T02:51:17.618150Z',
  },
]

export default function userHandler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: {
      email, password, first_name, last_name,
    },
    method,
  } = req

  switch (method) {
    case 'GET': {
      // Get data from your database
	    const user = users.find((user) => user.email === email)
      res.status(200).json(_.omit(user, 'password'))
      break
    }
    case 'POST': {
      // Validate
      if (!email || !password || !first_name || !last_name) {
        res.status(500)
        break
      }

      // Create data in your database
      const created_at = new Date().toISOString()
      const newUser: User = {
        email: email.toString(),
        password: password.toString(),
        first_name: first_name.toString(),
        last_name: last_name.toString(),
        created_at,
      }
      users.push(newUser)

      res.status(200)
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}