const mongoose = require('mongoose');
const productosSchema = require('../../models/productos')



class ContenedorMongo {
  constructor(schema) {
    const url = "mongodb://localhost:27017/ecommerceDB";
    mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log("containerMongo.js")
    );
  }

}

module.exports = ContenedorMongo;
