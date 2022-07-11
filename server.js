const cluster = require("cluster");
const { fork } = require("child_process");
const { app } = require("./app");
const numCPUs = require("os").cpus().length;
// const path = require("path");
const { SERVER, route } = require("./routes/productRoute");

const dotenv = require("dotenv");
const { appendFile } = require("fs/promises");

const PORT = process.env.PORT || 8080;
const MODO = process.argv[2] || fork;

if (MODO == fork) {
  console.log("MODO= fork");
  const computo = fork("./app.js");

  computo.send("message", (msg) => {
    for (let index = 0; index < numCPUs; index++) {
      app.on(PORT, () => {
        console.log(`Server on ${PORT}`);
      });
    }
    SERVER.on("Error", (error) => console.log("error en servidor ${error}"));
  });
} else {
  console.log("MODO= cluster");
  if (cluster.isMaster) {
    for (let index = 0; index < numCPUs; index++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {});
  } else {
    app.listen(PORT, () => {
      console.log(`Server on ${PORT}`);
    });
    SERVER.on("Error", (error) => console.log("error en servidor ${error}"));
  }
}

// app.listen(PORT, () => {
//   console.log(`Server on ${PORT}`);
// })
// SERVER.on("Error", (error) => console.log("error en servidor ${error}"));
