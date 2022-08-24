const Contenedor = require("../../container/contMongo");
const Schema = require("../../models/productos");

class ProductosDao extends Contenedor {
  constructor() {
    super(Schema);
    this.model = Schema;
  }
}

module.exports = ProductosDao;