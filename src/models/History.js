import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const historySchema = new Schema({
  name: String,
  products: [{
    _id: Schema.Types.ObjectId,
  }],
  customer:{
    _id:Schema.Types.ObjectId,
    phone:String,
  },
  service:String,
  website:String,
  status: String,
  comment:String,
  billing:{
    total:Number,
    cost:Number,
    revenue:Number,
    profit:Number,
    discount:Number,
    total_discount:Number,
  },
  sellerId: Schema.Types.ObjectId,
  history:[{_id:Schema.Types.ObjectId}],
  meta: {
    createAt: {type: Date,default: Date.now()},
    updateAt: {type: Date,default: Date.now()}
  }
}, {collection:'History'});

export default (mongoose.models && mongoose.models.History
  ? mongoose.models.History
  : mongoose.model('History', historySchema))