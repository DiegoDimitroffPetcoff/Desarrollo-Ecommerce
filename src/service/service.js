const ContainerDaoMongo = require("../DAOs/productos/prodDaoMongo")

// LOGICA DEL NEGOCIO

class Api {
  constructor() {
    this.producto = new ContainerDaoMongo();
  }

  getLastId = async () => {
    let productosId = await this.producto.getLasId();
    let idMayor = productosId[productosId.length - 1];
    let lastId = idMayor.id + 1;
    return lastId;
  };
  save = async (content) => {
    content.id = await getLastId();
    let create = await this.producto.create(content);
    return content;
  };
  read = async () => {
    return this.producto.read();
  };
  getById = async (id) => {
    let product = "No encontrado";
    let content = await this.read();
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
