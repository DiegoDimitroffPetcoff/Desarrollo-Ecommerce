const fs = require("fs");

class Contenedor {
  constructor() {
    this.route = "./productos.txt";
    this.id = 1;
  }
  save(x) {
    let array = [];
    let object = x;

    try {
      let data = fs.readFileSync("./productos.txt", "utf-8");
      array = JSON.parse(data);
      console.log("Ingreso por TRY");

      // aca el array deberia estar completo
      // con los objetos parseados del archivo
    } catch {
      console.log("catch error");
    }

    object.id = array.length + 1;
    array.push(object);

    let lastId = array.length + 1;
    fs.writeFileSync("./productos.txt", JSON.stringify(array));

    this.id = lastId++;
  }

  saveChat(x) {
    let array = [];
    let object = x;

    try {
      let data = fs.readFileSync("./historial.txt", "utf-8");
      array = JSON.parse(data);
      console.log("Ingreso por TRY");
    } catch {
      console.log("catch error");
    }

    object.id = array.length + 1;
    array.push(object);

    let lastId = array.length + 1;
    fs.writeFileSync("./historial.txt", JSON.stringify(array));

    this.id = lastId++;
  }

  // -----------------------------------------------------------------------------

  getById(x) {
    let array = [];
    let y = x;
    try {
      let data = fs.readFileSync(this.route, "utf-8");
      array = JSON.parse(data);
    } catch {
      console.log("catch error");
    }
    let object = null;

    array.forEach((element) => {
      if (element.id == y) {
        object = element;
      }
    });

    if (object == null || object == undefined || object == false) {
      object = "Error, producto no encontrado";
    }
    return object;
  }

  deleteById(x) {
    let array = [];
    let y = x;
    try {
      let data = fs.readFileSync(this.route, "utf-8");
      array = JSON.parse(data);
      console.log("Ingreso por TRY");
    } catch {
      console.log("catch error");
    }

    array.forEach((element) => {
      if (element.id == y) {
        let id = element.id - 1;
        let removed = array.splice(id, 1);
        console.log("ELEMENTO ELIMINADO: " + JSON.stringify(removed));
        fs.writeFileSync(this.route, JSON.stringify(array));
        console.log(array);
      }
    });
  }

  edit(id, nombre, price) {
    let y = id;
    let readFinal = fs.readFileSync(this.route, "utf-8");
    let allProducts = JSON.parse(readFinal);

    console.log(allProducts);

    allProducts.forEach((element) => {
      if (element.id == y) {
        element.title = nombre;
        element.price = price;
      }
    });
    console.log(allProducts);
    fs.writeFileSync(this.route, JSON.stringify(allProducts));
    return allProducts;
  }

  read() {
    let readFinal = fs.readFileSync(this.route, "utf-8");

    let allProducts = JSON.parse(readFinal);

    return allProducts;
  }
}

module.exports = Contenedor;
