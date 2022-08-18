const fs = require("fs");
const Contenedor = require("../../container/containerFile/container");

class ChatDAO extends Contenedor {
  constructor() {
    super("./chat.txt");
  }
}

module.exports = ChatDAO;
