const log4js = require("log4js");
const passport = require("passport");
const route = require("../routes/productRoute");


const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

// const {SERVER} = require('../routes/productRoute')
const SERVER = new HttpServer(route);
const io = new IOServer(SERVER);



const { normalization } = require("./normalizr");
const compressionRatio = require("./calculator");


const service = require('../src/service/serviceMongo/serviceMongo')




// ROOT---------------------------
async function  getRoot (req, res) {
  let productos = await service.getContentFile();
  let productosID = await service.deleteById(25);

  const logger = log4js.getLogger("info");
  logger.info("Peticion recibida en la ruta /root");
  res.render("root");
}

// LOGIN---------------------------
function getLogin(req, res) {
  const logger = log4js.getLogger("info");
  logger.info("Peticion recibida en la ruta /getLogin");
  "/login", res.render("login");
}

function postLogin(req, res) {
  if (req.isAuthenticated()) {
    const logger = log4js.getLogger("info");
    logger.info(
      "Peticion recibida en la ruta /login. Usuario Correctamente Logeado"
    );
    // console.log(req.user);
    let user = req.user;
    res.render("main", { user: user, isUser: true });
  } else {
    let logger = log4js.getLogger("error");
    logger.error("Hubo un error en el Logeo");

    res.redirect("login");
  }
}

function chatLogin(req, res) {
  if (req.isAuthenticated()) {
    const logger = log4js.getLogger("info");
    logger.info("Peticion recibida en la ruta /chat");
    console.log(req.user);
    let user = req.user;
    res.render("about", { user: user, isUser: true });
  } else {
    console.error();
   
    let logger = log4js.getLogger("error");
    logger.error("Error en el CHAT");
    res.redirect("login");
  }
}

function getFaillogin(req, res) {
  let logger = log4js.getLogger("error");
  logger.error("Hubo un error en el Logeo");
  console.log("error en login");
  res.render("failLogin", {});
}

// SIGN UP---------------------------
function getSignup(req, res) {
  const logger = log4js.getLogger("info");
  logger.info(
    "Peticion recibida en la ruta /signup. Usuario Creado Correctamente"
  );
  res.render("signup");
}
function postSignup(req, res) {
  if (passport.authenticate("signup")) {
    const logger = log4js.getLogger("info");
    logger.info(
      "Peticion recibida en la ruta /signup. Usuario Creado Correctamente"
    );
    let user = req.user;
    let isUser = true;
    res.render("profile", { user, isUser });
  } else {
    let logger = log4js.getLogger("error");
    logger.error("Hubo un error en el Sign up");
    res.redirect("login");
  }
}
function getFailsignup(req, res) {
  let logger = log4js.getLogger("error");
  logger.error("Hubo un error en el Sign up");
  console.log("error en login");
  res.render("failSignup", {});
}

// LOG OUT---------------------------
function getLogout(req, res) {
  const logger = log4js.getLogger("info");
  logger.info(
    "Peticion recibida en la ruta /getLogout. Usuario Deslogeado Correctamente"
  );
  req.logout((err) => {
    if (!err) {
      res.render("logout");
    }
  });
}

const actiChat= ()=>{
let compression = null;

io.on("connection", (socket) => {
  try {
    console.log("controler.js");
    let prueba = productos.read();
    socket.emit("messages", prueba);
    socket.on("new-message", (data1) => {
      productos.save(data1);
      prueba.push(data1);

      io.sockets.emit("messages", prueba);
    });
  } catch (error) {
    let logger = log4js.getLogger("errorConsole");
    logger.error("PROBANDO EL LOG DE ERROR");
  }
});

// CHAT- ---------------------------------
io.on("connection", (socket) => {
  try {
    const chat = chatContainer.read();
    const dataContainer = { id: 1, posts: [] };
    dataContainer.posts = chat;
    const chatNormalizado = normalization(dataContainer);
    console.log("USUARIO CONECTADO AL CHAT");
    socket.emit("chat", chatNormalizado);

    socket.on("newChat", (data) => {
      data.author.avatar = "avatar";
      chatContainer.save(data);
      // CHAT: TODO EL HISTORIAL. DATA: NUEVO POST GUARDADO
      chat.push(data);
      // DATACONTAINER: SE LE DA EL FORMATO PARA QUE SEA NORMALIZADO
      dataContainer.posts = chat;
      let dataNocomprimida = JSON.stringify(dataContainer).length;
      let dataNormalized = normalization(dataContainer);
      let dataComprimida = JSON.stringify(dataNormalized).length;
      compression = compressionRatio(dataNocomprimida, dataComprimida);
    });

    try {
      socket.emit("compression", compression);
    } catch (error) {
      let logger = log4js.getLogger("error");

      logger.error("Error: En la Compresion del Chat");
      console.log(error);
    }
  } catch (error) {
    let logger = log4js.getLogger("error");

    logger.error("Error: Hubo un error en la ruta del Chat");
    console.log(error);
  }
});}

module.exports = {
  getRoot,
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  getFaillogin,
  getFailsignup,
  getLogout,
  chatLogin,
  actiChat
};
