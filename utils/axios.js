const axios = require("axios");
const fs = require("fs");
const Productos = require("../src/DAOs/productos/prodDaoFile");
const productos = new Productos();
function axiosGET() {
  try {
    let response = axios
      .post("http://localhost:8080/login")
      .then(function (response) {
        console.log(response.data);
      });
  } catch (error) {
    console.log(error);
  }
}

function axiosLoginPOST() {
  try {
    let response = axios
      .post("http://localhost:8080/login", {
        username: "Rodrigo",
        password: "123",
      })
      .then(function (response) {
        //  console.log(response.data);
      });
  } catch (error) {
    console.log(error);
  }
}

function readProductos() {
  try {
    console.log("readProductos");
    let response = axios
      .get("http://localhost:8080/login")
      .then(function (response) {
        console.log("Productos:");
        let prueba = productos.read();
        console.log(prueba);
      });
  } catch (error) {
    console.log("error en readProductos:");
    console.log(error);
  }
}

Promise.all([axiosLoginPOST(), readProductos()]).then(function (result) {
  const Login = result[0];
  const read = result[1];
  console.log("Login");
  console.log(Login);
  console.log("read");
  console.log(read);
});

module.exports = { axiosGET, axiosLoginPOST, readProductos };
