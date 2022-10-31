This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).  

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install # My personal choice!
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing pages by modifying `src/pages/[page_name].tsx`. Pages auto-update as you edit them.

### API Functionality

[Authentication logic via NextAuth.js](https://next-auth.js.org/getting-started/example) can be edited in `src/pages/api/auth/[...nextauth].ts`.
- To attach cookie/session functionality that your backend may rely on, you may use `res` in the `auth()` function to manage cookies & headers (more [here](https://next-auth.js.org/configuration/initialization)).

[GraphQL API routing](https://www.the-guild.dev/graphql/yoga-server/v3) can be accessed on [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql). This endpoint can be edited in `src/pages/api/graphql`.  

Alternatively, [REST API routing](https://nextjs.org/docs/api-routes/introduction) can be edited in `src/pages/api/rest`.  

The `src/pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

***Note*: The given routing sample code is hard-coded - this stack is best used with an external backend or database ORM like Prisma.**
- If you plan to integrate with an external backend, you may set up a proxy with [Next.js rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites#rewriting-to-an-external-url), use the installed [Ky HTTP client](https://github.com/sindresorhus/ky), and delete the hardcoded examples in `src/pages/api`.
- If you plan to use Prisma, you may want to refer to Prisma's full stack example [here](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes-auth).

### Data Fetching

[SWR](https://swr.vercel.app/) is used to fetch data used for pages and components.
- This logic is editable in `src/data`. Includes usage of [Ky](https://github.com/sindresorhus/ky) as an HTTP client.
- The main example involves coordination between `src/data/use-profile.ts` and `src/pages/profile.tsx`.

### Linting

ESLint is integrated into the project to enforce consistent styling.  
- Works well with the VS Code ESLint extension, it should fix styling in your file upon saving.
- `.eslintrc.json` is editable to change styling rules to your preference

## Learn More

### Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Chakra UI

- [Style Props System](https://chakra-ui.com/docs/styled-system/style-props)
- [Components](https://chakra-ui.com/docs/components)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
