const Contenedor = require("../../container/containerMongo/container");
const Schema = require("../../models/productos");

class ProductosDao extends Contenedor {
  constructor() {
    super(Schema);
    this.model = Schema;
  }
}

module.exports = ProductosDao;