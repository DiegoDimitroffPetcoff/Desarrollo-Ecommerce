const mongoose = require("mongoose");
require('dotenv').config()
const configs = require('../config/globals')


const productosCollection = 'productos';


const ProductosSchema = new mongoose.Schema({
    title: {type:String,require:true,max:100},
    price: {type:Number,require:true}, 
    descripcion: {type:String,require:true,max:100}, 
    foto: {type:String,require:true,max:100}, 
    stock: {type:Number,require:true,max:100},
    id: {type:Number,require:true},
    date:{type:String,require:false},
    update:{type:String,require:false},
})

const productos = mongoose.model(productosCollection, ProductosSchema);

module.exports = productos