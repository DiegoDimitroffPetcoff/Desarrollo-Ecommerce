class Contenedor {
  constructor(schema) {
    this.schema = schema;
  }
  async getLasId() {
    return await this.model
      .find({}, { id: 1, title: 1, _id: 0 })
      .sort({ id: 1 });
  }
  async create(content) {
    let createModel = await new this.model(content);
    return await createModel.save(content);
  }
  async read() {
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
    return await this.model.find(A, B).sort(C);
  }
  async delete(element) {
    return await this.model.deleteOne(element);
  }
}

module.exports = Contenedor;
