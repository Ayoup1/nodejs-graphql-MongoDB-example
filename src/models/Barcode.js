import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BarcodeSchema = new Schema({
    COUNT:Number,
    orderId:String,
    value:String,
    status:String,
    service:String,
}, {collection:'Barcode'});

export default mongoose.model('Barcode', BarcodeSchema);