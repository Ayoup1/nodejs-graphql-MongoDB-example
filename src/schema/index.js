import {makeExecutableSchema} from 'graphql-tools';
import Query from '../resolvers/Query';

// import{Product,Customer,Order,User}from'../resolvers/index'

import Mutation from '../resolvers/Mutation';
import ISODate from '../scalars/ISODate';



const typeDefs = `
  type Query {
    product(id:ID!): Product
    products(query: Pagination!): [Product]
    productCount(query: Pagination!):Int
    order(id:ID!): Order
    orders(query: Pagination!): [Order]
    orderCount(query: Pagination!):Int
    customers(query: Pagination!): [Customer]
    user(id: ID!): User
    users(query: Pagination!): [User]
    userCount(query: Pagination!): Int
    me: User
  }
  
  type Mutation {
    createProduct(input: ProductInput!): Product,
    updateProduct(id:ID!,input: ProductInput!): Product,
    createOrder(input: OrderInput!): Order,
    updateOrder(id:ID!,input: OrderInput!): Order,
    deleteOneOrder(id:ID!): Order,
    deleteManyOrder(ids:[ID]): Int,
    signup (username: String!, email: String!, password: String!,role: String,space:String): String,
    login (email: String!, password: String!): customUser,
    updateUser(id:ID,username: String!, email: String!, password: String,role: String,space:String): String,
  }

  type meta {
    createdAt:String
    updatedAt:String
  }

  type Order{
    _id: ID!,
    name: String,
    comment:String,
    status:String,
    service:String,
    billing:billing,
    products:[Product],
    customer:Customer,
    history:[Order]
    meta:meta
  }

  type Product{
    _id: ID!
    ref: String,
    name: String,
    cost: Float,
    price: Float,
    colors:[String],
    sizes:[String]
    inStock: Int,
    availability:Boolean,
    category:String,
    brand:String,
    quantity:Int
    meta:meta
  }
  type Customer{
    _id: ID!
    fristName: String,
    lastName: String,
    name:String,
    city:String,
    address:String,
    phone:String,
    email:String,
    orders_count:Float,
    total_spent:Float,
    last_order_id:Float,
    orders:[Order],
    meta:meta
  }

  type billing{
    cost:Float,
    revenue:Float,
    profit:Float,
  },

  type customUser{
    token:String,
    user:User
  },

  type User {
    _id: ID!
    username: String,
    email: String,
    fristName: String,
    lastName: String,
    role: String,
    orders:[Order],
  }

  input ProductInput{
    ref: String,
    name: String,
    cost: Float,
    price: Float,
    colors:[String],
    sizes:[String]
    inStock: Int,
    availability:Boolean,
    category:String,
    brand:String,
    quantity:Int
  }

  input billingInput{
    cost:Float,
    revenue:Float,
    profit:Float,
  },

  input OrderProductInput{
    _id:ID,
    product:ProductInput
  }

  input OrderInput{
    name: String,
    comment:String,
    status:String,
    service:String,
    billing:billingInput,
    products:[OrderProductInput],
    customer:CustomerInput,
  }
  
  input CustomerInput{
    _id: ID,
    fristName: String,
    lastName: String,
    name:String,
    city:String,
    address:String,
    phone:String,
    email:String,
  }

  input Pagination {
    query:String,
    argument:String
    offset: Int,
    limit: Int,
    sortBy:String,
    descending:Int,
    search:String
    dates:Dates
  }

  input Dates{
    gte:String,
    lt:String,
    bool:Boolean
  }

  
  scalar ISODate
`;

const resolvers = {Query, Mutation,ISODate};

export { typeDefs,resolvers }  