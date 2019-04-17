import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  fristName: String,
  lastName: String,
  name:String,
  city:String,
  address:String,
  phone:String,
  email:String,

  orders_count:Number,
  total_spent:Number,
  last_order_id:Number,
  orders:[Schema.Types.ObjectId],
  meta: {
    createAt: {type: Date,default: Date.now()},
    updateAt: {type: Date,default: Date.now()}
  }
}, {collection:'Customer'});

export default mongoose.model('Customer', customerSchema);