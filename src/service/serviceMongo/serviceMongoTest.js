const ContainerDaoMongo = require("../../daos/daoMongo/productosContainer");

// LOGICA DEL NEGOCIO

class Api {
  constructor() {
    this.producto = new ContainerDaoMongo();
  }

  getLastId = async () => {
    let productosId = await this.producto.getId();
    let idMayor = productosId[productosId.length - 1];
    let lastId = idMayor.id + 1;
    return lastId;
  };
  save = async (content) => {
    content.id = await getLastId();
    let create = await this.producto.addProduct(content);
    return content;
  };
  read = async () => {
    let A = {};
    let B = {
      stock: 1,
      id: 1,
      date: 1,
      products: 1,
      _id: 0,
      title: 1,
      price: 1,
      descripcion: 1,
      foto: 1,

      update: 1,
    };
    let C = { id: 1 };
    return this.producto.getContentFile(A, B, C);
  };
  getById = async (id) => {
    let product = "No encontrado";
    let content = await this.getContentFile();
    content.forEach((element) => {
      if (element.id == id) {
        product = element;
      }
    });
    return product;
  };
  deleteById = async (id) => {
    let element = await this.getById(id);
    if (element !== "No encontrado") {
      productoEliminado = await producto.delete(element);
      return productoEliminado;
    } else {
      console.log(`El producto que quiere eliminar no existe`);
      return `El producto que quiere eliminar no existe`;
    }
  };
}

module.exports = Api;
