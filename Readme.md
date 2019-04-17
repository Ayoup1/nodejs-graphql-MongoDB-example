### Simple example with Node, Express + graphql.

**How to use**

```
npm install 
npm start
```

**How to test**

Open the interactive explorer [http://localhost:3000/graphql](http://localhost:3000/graphql)

GraphQL query:

```graphql

query {
  users(query: { limit: 10 }) {
    _id
    username
    email
  }
}


```




**Stack**

* [Express](http://expressjs.com/) - Minimalist web framework for node
* [GraphQL](http://graphql.org/) - A query language for API
* [GraphQL Tools](http://dev.apollodata.com/tools/graphql-tools/index.html) - Some tools for GraphQL
* [Apollo Server Express](https://github.com/apollographql/apollo-server) - GraphQL server for Express
* [Body Parser](https://github.com/expressjs/body-parser) - Node.js body parsing middleware
* [Babel](https://babeljs.io/) - JavaScript compiler.