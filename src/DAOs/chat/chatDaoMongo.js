const Contenedor = require("../../container/containerMongo/container");
const Schema = require("../../models/productos");
// CAMBIAR ESQUEMA!!!
class ChatDao extends Contenedor {
  constructor() {
    super(Schema);
    this.model = Schema;
  }

}

module.exports = ChatDao;