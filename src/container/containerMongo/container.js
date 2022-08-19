const mongoose = require("mongoose");
const Factory = require('../../../utils/factory')
// const productosSchema = require("../../models/productos");

class Contenedor extends Factory {
  constructor(schema) {
    super(schema);
    this.schema = schema;
  
    // const url = "mongodb://localhost:27017/ecommerceDB";
    // mongoose.connect(
    //   url,
    //   {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   },
    //   () => console.log("containerMongo.js")
    // );
  }

  async getId() {
    return await this.model
      .find({}, { id: 1, title: 1, _id: 0 })
      .sort({ id: 1 });
  }
  async addProduct(content) {
    let createModel = await new this.model(content);
    return await createModel.save(content);
  }
  async getContentFile(A, B, C) {
    return await this.model.find(A, B).sort(C);
  }
  async delete(element) {
    return await this.model.deleteOne(element);
  }
}

module.exports = Contenedor;
