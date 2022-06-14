const { schema, normalize, denormalize } = require("normalizr");
const util = require("util");
const Data = require("..//routes/productRoute");

// const data= Data.dataContainer
// console.log(data);

function normalization(params) {
  const authorSchema = new schema.Entity(
    "E-mail",
    {},
    { idAttribute: "email" }
  );
  const postSchema = new schema.Entity("POST", {
    author: authorSchema,
  });
  const dataSchema = new schema.Entity("DATA", {
    posts: [postSchema],
  });

  const normalicedBlog = normalize(params, dataSchema);
  // console.log(util.inspect(normalicedBlog, false, 12, true));
  // console.log("antes");
  // console.log(JSON.stringify(params).length);
  // console.log("despues");
  // console.log(JSON.stringify(normalicedBlog).length);
  return normalicedBlog;
}

// console.log("------");

// const desnormalization = denormalize(
//   normalicedBlog.result,

//   normalicedBlog.entities
// );
// console.log(desnormalization);

module.exports = normalization;
