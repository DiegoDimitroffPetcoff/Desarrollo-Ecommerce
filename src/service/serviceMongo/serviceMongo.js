const ProductosDaoMongo = require("../../daos/daoMongo/daoMongo");

const producto = new ProductosDaoMongo();

// function to get the last ID on Moongose
async function getLastId() {
  let productosId = await producto.getId();
  let idMayor = productosId[productosId.length - 1];
  let lastId = idMayor.id + 1;
  return lastId;
}
async function addProduct(content) {
  content.id = await getLastId();
  let create = await producto.addProduct(content);
  return content;
}
async function getContentFile() {
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




// async function edit(content, id) {
//   let contentAll = content;
//   contentAll.update = moment().format("DD-MM-YYYY HH:mm:ss");
//   let allProducts = await productos.updateOne(
//     { id: id },
//     {
//       $set: {
//         title: contentAll.title,
//         price: contentAll.price,
//         descripcion: contentAll.descripcion,
//         foto: contentAll.foto,
//         stock: contentAll.stock,
//         update: contentAll.update,
//       },
//     }
//   );

//   let productosId = await productos.find(
//     { id: id },
//     {
//       id: 1,
//       title: 1,
//       price: 1,
//       descripcion: 1,
//       foto: 1,
//       stock: 1,
//       date: 1,
//       update: 1,
//       _id: 0,
//     }
//   );
//   return productosId;
// }
// async function saveInFile(content) {
//   console.log(content);
//   let carritoSave = new this.model(content);
//   // let carritoSaved = await carritoSave.save();
//   console.log(carritoSaved);
// }
module.exports = {
  addProduct,
  getContentFile,
  edit,
  saveInFile,
  getById,
  deleteById,
};
