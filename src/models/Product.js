import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  ref: String,
  cost: Schema.Types.Decimal128,
  price: Schema.Types.Decimal128,
  colors: [String],
  sizes: [String],
  availability: Boolean,
  category: String,
  brand: String,
  inStock: {type: Number,default: 0},
  meta: {
    createAt: {type: Date,default: Date.now()},
    updateAt: {type: Date,default: Date.now()}
  }
}, {collection: 'Product'});

export default (mongoose.models && mongoose.models.Product ?
  mongoose.models.Product :
  mongoose.model('Product', productSchema))