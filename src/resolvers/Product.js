
import mongoose from 'mongoose';
import { combineResolvers } from 'graphql-resolvers'
import { isAuthenticated,isAdmin } from './authorization';
import {Product} from '../models/index.js';
import {promisify} from '../helpers';


const resolvers = {

};

export default resolvers;


/************ */
export const mutation ={ 
    createProduct: combineResolvers(isAuthenticated,(_,args,context) => new Promise((resolve, reject) => {
        Product.create({...args.input}, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
    })),
    updateProduct :(_,args) => new Promise((resolve, reject) => {
        Product.findByIdAndUpdate(args.id,{$set:{...args.input,updatedAt:new Date()}},{ new: true},(err, result) => {
        if (err) reject(err);
        else resolve(result);
        });
    }),

}  