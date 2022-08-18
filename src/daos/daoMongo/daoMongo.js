const Contenedor = require("../../container/containerMongo/container");
const productoSchema = require("../../models/productos");

class ProductosDaoMongo extends Contenedor {
  constructor() {
    super(productoSchema);
    this.model = productoSchema;
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

  // -------
  // async edit(content, id) {
  //   let contentAll = content;
  //   contentAll.update = moment().format("DD-MM-YYYY HH:mm:ss");
  //   let allProducts = await productos.updateOne(
  //     { id: id },
  //     {
  //       $set: {
  //         title: contentAll.title,
  //         price: contentAll.price,
  //         descripcion: contentAll.descripcion,
  //         foto: contentAll.foto,
  //         stock: contentAll.stock,
  //         update: contentAll.update,
  //       },
  //     }
  //   );

  //   let productosId = await productos.find(
  //     { id: id },
  //     {
  //       id: 1,
  //       title: 1,
  //       price: 1,
  //       descripcion: 1,
  //       foto: 1,
  //       stock: 1,
  //       date: 1,
  //       update: 1,
  //       _id: 0,
  //     }
  //   );
  //   return productosId;
  // }
  // async saveInFile(content) {
  //   console.log(content);
  //   let carritoSave = new this.model(content);
  //   let carritoSaved = await carritoSave.save();
  //   console.log(carritoSaved);
  // }
}

module.exports = ProductosDaoMongo;
