import {promisify} from '../helpers';
import Order from '../models/Order';


const resolvers = {
    orders:async  Customer => {
       return await Order.find({_id:Customer.orders}).sort({createdAt: -1})
    }

};

export default resolvers;