const fs = require("fs");
const Contenedor = require("../../container/contFile");
const {MockProduct} = require("../../../utils/mocks");


class ProductosDAO extends Contenedor {
  constructor() {
    super("./productos.txt");
  }

  mocks(amount) {
    let mocksList = [];
    for (let index = 0; index < amount; index++) {
      let object = MockProduct()
      mocksList.push(object);
      console.log(object)
      this.create(object)
    }    
    return mocksList;
  }
}

module.exports = ProductosDAO;
