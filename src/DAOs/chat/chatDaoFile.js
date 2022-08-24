const fs = require("fs");
const Contenedor = require("../../container/contFile");

class ChatDAO extends Contenedor {
  constructor() {
    super("./chat.txt");
  }
}

module.exports = ChatDAO;
