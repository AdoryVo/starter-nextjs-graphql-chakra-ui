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

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Get data from your database
  users.map((user) => _.omit(user, 'password'))
  res.status(200).json(users)
}