import mongoose from 'mongoose';
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

import {Order,User} from '../models/index';
import {promisify} from '../helpers';
const ObjectId = mongoose.Types.ObjectId;


const resolvers = {
  orders: (user, args) => promisify(Order.find({_id: {$in: user.orders}}))


};

export default resolvers;


export const mutation ={ 
  signup:(_, { username, email, password,role},{me,secret}) => new Promise(async (resolve, reject) => {
  
      const user = await User.findOne({$or:[ { email},{username} ]})
      if (user)reject('user already exist');

      const newUser = await User.create({username,email,password: await bcrypt.hash(password, 10),role})
      createToken({ id: newUser.id,role:newUser.role,username:newUser.username},secret,'1')
      .then((result) => {
          resolve(result);
      })
  }),
  login:(_, { email, password },{ me, secret }) => new Promise(async (resolve, reject) => {

      const user = await User.findOne({email})
      if (!user)throw new Error('No user with that email')

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) throw new Error('Incorrect password')
      const token=await createToken({ id: user.id,email:user.email,role:user.role,username:user.username},secret,'1y')
      resolve({token,user});

  }),
  updateUser:(_, { id,username, email, password,role},{me,secret}) => new Promise(async (resolve, reject) => {
    try{
        let param ={username,email,role}
        if(password)param.password=await bcrypt.hash(password, 10)
        const user = await User.findByIdAndUpdate(id,{$set:{...param}})
    
        createToken({ id: user.id,role:user.role,username:user.username},secret,'1y')
        .then((result) => {
            resolve(result);
        })

    }catch(error){
        reject(error);
    }
  })
}
// _________  //

const createToken= async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jsonwebtoken.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};