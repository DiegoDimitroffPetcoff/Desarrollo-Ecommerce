const ProductosDaoMongo = require("../../daos/daoMongo/productosContainer");

const producto = new ProductosDaoMongo();

// function to get the last ID on Moongose
async function getLastId() {
  let productosId = await producto.getId();
  let idMayor = productosId[productosId.length - 1];
  let lastId = idMayor.id + 1;
  return lastId;
}
async function save(content) {
  content.id = await getLastId();
  let create = await producto.addProduct(content);
  return content;
}
async function read() {
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
  return producto.getContentFile(A, B, C);
}
async function getById(id) {
  let product = "No encontrado";
  let content = await getContentFile();
  content.forEach((element) => {
    if (element.id == id) {
      product = element;
    }
  });
  return product;
}
async function deleteById(id) {
  let element = await getById(id);
  if (element !== "No encontrado") {
    productoEliminado = await producto.delete(element);
    return productoEliminado;
  } else {
    console.log(`El producto que quiere eliminar no existe`);
    return `El producto que quiere eliminar no existe`;
  }
}

module.exports = {
  save,
  read,
  getById,
  deleteById,
};
