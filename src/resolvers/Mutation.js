
import { mergeResolvers } from "merge-graphql-schemas";

import * as Product from './Product';
import * as Order   from './Order';
import * as User  from './User';


const resolvers = [Product.mutation,Order.mutation,User.mutation ];
export default mergeResolvers(resolvers);