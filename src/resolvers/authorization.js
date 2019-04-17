import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');



  export const isAdmin = (parent, args, { me }) =>{
      if(me && me.role==="admin"){
        return skip 
      }else{
        return new ForbiddenError('Not admin user.');
      }
  }