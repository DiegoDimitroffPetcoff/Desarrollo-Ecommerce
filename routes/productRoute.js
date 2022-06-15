const express = require("express");
const app = express();
const Contenedor = require("../src/container/container");
const util = require("util");
// const normalize = require("../utils/normalizr");
const {normalization} = require("../utils/normalizr");

const compressionRatio = require("../utils/calculator");

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const fs = require("fs");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));

// SE LEE EL CHAT ORIGINAL. SE LO SETEA CON ID Y POST. SE LO NORMALIZA Y SE LO ENVIA NORMALIZADO AL FRONT
const contenedor = new Contenedor();
const prueba = contenedor.read();


let compression = null;
io.on("connection", (socket) => {
  console.log("Cliente en la Home de la web");

  socket.emit("messages", prueba);
  socket.on("new-message", (data1) => {
    contenedor.save(data1);
    prueba.push(data1);

    io.sockets.emit("messages", prueba);
  });
});

io.on("connection", (socket) => {

const chat = contenedor.readChat();
const dataContainer = { id: 1, posts: [] };
dataContainer.posts = chat;
const chatNormalizado = normalization(dataContainer)
  console.log("Usuario conectado al Chat");
  socket.emit("chat", chatNormalizado);

                   socket.on("newChat", (data) => {
                    data.author.avatar = "avatar";
                    contenedor.saveChat(data);
                    // CHAT: TODO EL HISTORIAL. DATA: NUEVO POST GUARDADO
                    chat.push(data);
                    // DATACONTAINER: SE LE DA EL FORMATO PARA QUE SEA NORMALIZADO
                    dataContainer.posts = chat;
                    
                    let dataNocomprimida = JSON.stringify(dataContainer).length;
                    let dataNormalized =  normalization(dataContainer);
                    let dataComprimida = JSON.stringify(dataNormalized).length;
                    compression = compressionRatio(dataNocomprimida, dataComprimida);


                  });

               

                  try {
                    socket.emit("compression", compression);
                
                  } catch (error) {
                    console.log(error);
                  }
});
// EXPORTAR DATACONTAINER PARA NORMALIZARLO Y DESP AGRAGAR ESO EN EL FRONT
app.get("/", function (req, res) {
  res.render("main", { root: __dirname });
});
app.get("/about", function (req, res) {
  res.render("about", { root: __dirname });
});

module.exports = { httpServer, app };
