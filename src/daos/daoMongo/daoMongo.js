const ContenedorMongo = require("../../container/containerMongo/containerMongo");
const productoSchema = require("../../models/productos");
// const productos = require("../../models/productosSchema");
const moment = require("moment");

class ProductosDaoMongo extends ContenedorMongo {
  constructor() {
    super(productoSchema);
    this.model = productoSchema;
  }
  async addProduct(x) {
    // PRODUCTO CREADO CON ID AUTOINCREMENTAL SEGUN EL ULTIMO OBJETO GUARDADO EN COLECCION
    let productosId = await productos
      .find({}, { id: 1, title: 1, _id: 0 })
      .sort({ id: 1 });
    let idMayor = productosId[productosId.length - 1];
    let idAsignado = idMayor.id + 1;
    let producto = x;
    producto.id = idAsignado;
    producto.date = moment().format("DD-MM-YYYY HH:mm:ss");
    const createModel = new productos(producto);
    const create = await createModel.save();
    return create;
  }

  async edit(content, id) {
    let contentAll = content;
    contentAll.update = moment().format("DD-MM-YYYY HH:mm:ss");
    let allProducts = await productos.updateOne(
      { id: id },
      {
        $set: {
          title: contentAll.title,
          price: contentAll.price,
          descripcion: contentAll.descripcion,
          foto: contentAll.foto,
          stock: contentAll.stock,
          update: contentAll.update,
        },
      }
    );

    let productosId = await productos.find(
      { id: id },
      {
        id: 1,
        title: 1,
        price: 1,
        descripcion: 1,
        foto: 1,
        stock: 1,
        date: 1,
        update: 1,
        _id: 0,
      }
    );
    return productosId;
  }

  async saveInFile(content) {
    console.log(content);
    let carritoSave = new this.model(content);
    let carritoSaved = await carritoSave.save();
    console.log(carritoSaved);
  }

  async getContentFile(A, B, C) {    
    return await this.model.find(A, B).sort(C);;
  }

  async delete(element) {    
    return await this.model.deleteOne(element);;
  }
}

module.exports = ProductosDaoMongo;
