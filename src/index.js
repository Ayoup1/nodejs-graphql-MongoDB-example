import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import {ApolloServer,AuthenticationError,graphiqlExpress,graphqlExpress} from 'apollo-server-express';
const jwt = require('jsonwebtoken')
import {typeDefs,resolvers} from './schema';

mongoose.connect('mongodb://localhost:27017/local');
require('dotenv').config()


const app = express();
app.use(cors());
app.use(bodyParser.json())


const Authorization = async req => {
    let token = req.headers['accesstoken']
    if(token)token=token.split(" ")[1];// console.log("___token",token)
    console.log("___token",req.headers['accesstoken'])
    if (token || token=='null') {
        try {
            if(req.body.operationName=="login")return
            console.log("___token",await jwt.verify(token, process.env.JWT_SECRET))
            return await jwt.verify(token, process.env.JWT_SECRET);// 
        } catch (e) {
            throw new AuthenticationError(
                'Your session expired. Sign in again.',
            );
        }
    }
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: `http://localhost:3000/graphql`
    },
    context: async ({req}) => {
        const me = await Authorization(req);
        return {
            me,
            secret:process.env.JWT_SECRET,
        };
    },
});

server.applyMiddleware({app});

app.listen(3000, () => console.log('Application started on port 3000'));