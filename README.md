# GraphQL API with NestJS

This project demonstrates how to build a GraphQL API using NestJS.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Nest CLI](https://docs.nestjs.com/cli/overview)

## Getting Started

### Cloning the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/jayymeson/graphql-api.git
cd graphql-api
```

## Installing Dependencies

Install the project dependencies:

```bash
npm install
```

## Start the application in development mode:

Start the application in development mode:

```bash
npm run start:dev
```

The application will be running at http://localhost:3000.

## Testing the GraphQL API

Open your browser and go to http://localhost:3000/graphql to access the GraphQL Playground interface. Here, you can test your queries and mutations.

Example Query:

```graphql
query {
  cats {
    id
    name
    age
    breed
  }
}
```

Example Mutation:

```graphql
mutation {
  createCat(createCatInput: {name: "Tom", age: 3, breed: "Siamese"}) {
    id
    name
    age
    breed
  }
}
```

## Project Structure

```plaintext
.
├── src
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── cats
│   │   ├── cats.module.ts
│   │   ├── cats.resolver.ts
│   │   ├── cats.service.ts
│   │   ├── models
│   │   │   └── cat.model.ts
│   │   └── dto
│   │       └── create-cat.input.ts
├── tsconfig.json
├── tsconfig.build.json
├── package.json
├── package-lock.json
└── README.md
```

## Additional Information

For more details on how to use NestJS and GraphQL, [visit the NestJS documentation](https://docs.nestjs.com/).
