const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    nameFirm:{type:String, required:true},
    unp:{type:String, required:true, unique:true},
    address:{type:String, required:true},
    bankAccount:{type:String, required:true},
    owner:{type:Types.ObjectId, ref:'User'}

})

module.exports = model('Customer', schema)