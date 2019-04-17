
import mongoose from 'mongoose';
import {promisify} from '../helpers';
import {Order, User,Customer,Product,History} from '../models/index.js';
const ObjectId = mongoose.Types.ObjectId;


const resolvers = {
    customer: order => promisify(Customer.findOne({phone:order.customer.phone})),
    products: order => promisify(Product.find({ _id: {$in: order.products}})),
};

export default resolvers;


const appendOrderToUser = (sellerId, orderId) => new Promise((resolve, reject) => {
    User.update({_id: sellerId}, {$push: {orders: orderId},'meta.updatedAt': new Date(), $setOnInsert: { 'meta.createdAt': new Date() }}, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
});

const appendOrderToCustomer = (customer,orderId) => new Promise((resolve, reject) => {
  delete customer.orders
  let param={}
  const updateObj = {$set: {...customer},$push: {orders: orderId},'meta.updatedAt': new Date(), $setOnInsert: { 'meta.createdAt': new Date() }};
  args.input.customer && args.input.customer._id?param={_id: args.input.customer._id}:param={phone:customer.phone}
   
  Customer.update(param,updateObj,{upsert: true },(err, result) => {
    if (err){reject(err);}
    else {resolve(result);}
  });
});
const billingHandler= (products) => new Promise((resolve, reject) => {
  let cost=0;let revenue=0;
  for(const item of products){
    revenue=revenue+item.price*item.quantity
    cost+=item.cost*item.quantity
  }
  profit=revenue-cost
  return {revenue,cost,profit}

});
// 
/************ */
export const mutation ={ 
    createOrder :(_,args,{me,secret}) => new Promise((resolve, reject) => {
        const sellerId = me.id
        const orderId = mongoose.Types.ObjectId();
        const customerId = mongoose.Types.ObjectId();
        const billing=billingHandler(args.input.products)
        return Promise.all([
            Order.create({_id:orderId,...args.input,billing,customerId,'meta.updatedAt': new Date(),'meta.createdAt': new Date()}),
            appendOrderToUser(sellerId,orderId),
            appendOrderToCustomer(args.input.customer,orderId,args.input.customer && args.input.customer._id?args.input.customer._id:null)
          ])
          .then(result => {resolve(result[0])} )//console.log("result[0]___",result[0]);
          .catch(err=>reject(err))
      
      }),
      updateOrder:(_,args) =>  new Promise(async (resolve, reject) => {
        const history= await Order.findOne(args.id)
        let UpdatedObject={...args.input}
        if(history){
          const historyId = mongoose.Types.ObjectId();
          await History.create({_id:historyId,...history,'meta.updatedAt': new Date(),'meta.createdAt': new Date()})
        }
        Order.findByIdAndUpdate(args.id,{$set:{UpdatedObject,'meta.updatedAt': new Date()},$push: {history: historyId}},{ new: true},(err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      }),
      deleteOneOrder:(_, args) => new Promise((resolve, reject) => {
        Order.findByIdAndRemove(args.id, function (err) {
          if (err) return next(err);
          res.send('Deleted successfully!');
        });
      }),
      deleteManyOrder:(_, args) => new Promise((resolve, reject) => {
        Order.deleteMany({ _id: { $in: args.ids } }, function(err, result) {
          if (err) reject(err);
          else resolve(result);
        });
      }),
} 