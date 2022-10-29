// https://the-guild.dev/graphql/yoga-server/v3
import { createSchema, createYoga } from 'graphql-yoga'

export interface Result {
  data: { user?: User, addUser?: string }
}

interface User {
  email: string
  password: string
  first_name: string
  last_name: string
  created_at: string
}

const typeDefs = /* GraphQL */ `
  type Query {
    user(email: ID!, password: String): User
  }

  type Mutation {
    addUser(input: SignUpInput!): String
  }
  input SignUpInput {
    email: String!
    password: String!
    first_name: String!
    last_name: String
  }
  
  type User {
    email: ID!
    password: String
    first_name: String
    last_name: String
    created_at: String
  }
`

const users: User[] = [
  { email: 'jdoe@gmail.com', password: 'hunter2', first_name: 'John', last_name: 'Doe', created_at: '2022-07-15T02:51:17.618150Z' },
]

const resolvers = {
  Query: {
    user(_parent: object, args: { email: string, password: string }) {
      // Returns null if a user is not found
      const user = users.find((user) => user.email === args.email)
      if (user && args.password && user.password !== args.password) {
        return null
      }
      return user
    }
  },
  Mutation: {
    addUser(_parent: object, { input }: { input: User }) {
      const created_at = new Date().toISOString()
      const newUser = { ...input, created_at }

      if (users.some((user) => user.email === newUser.email)) {
        return 'Email is already in use!'
      }

      users.push(newUser)

      return 'Success!'
    }
  }
}

const schema = createSchema({
  typeDefs,
  resolvers
})

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql'
})