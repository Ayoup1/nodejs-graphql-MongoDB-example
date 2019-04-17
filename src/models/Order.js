import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: String,
  products: [Schema.Types.ObjectId],
  customerID:Schema.Types.ObjectId,
  service:String,
  status: String,
  comment:String,
  billing:{
    cost:Number,
    revenue:Number,
    profit:Number,
  },
  history:[Schema.Types.ObjectId],
  meta: {
    createAt: {type: Date,default: Date.now()},
    updateAt: {type: Date,default: Date.now()}
  }
}, {collection:'Order'});

export default (mongoose.models && mongoose.models.Order
  ? mongoose.models.Order
  : mongoose.model('Order', orderSchema))