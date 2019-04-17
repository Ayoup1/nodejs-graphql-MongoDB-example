import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  fristName: String,
  lastName: String,
  password:String,
  role: String,
  orders:[Schema.Types.ObjectId],
}, {collection:'User'});

export default mongoose.model('User', userSchema);