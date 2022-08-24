// const log4js = require("log4js");
// const passport = require("passport");
// const route = require("../../routes/productRoute");


// const { Server: HttpServer } = require("http");
// const { Server: IOServer } = require("socket.io");

// // const {SERVER} = require('../routes/productRoute')
// const SERVER = new HttpServer(route);
// const io = new IOServer(SERVER);



// const { normalization } = require("../../utils/normalizr");
// const compressionRatio = require("../../utils/calculator");


// const service = require('../service/serviceMongo/serviceMongo')

// const PRUEBA = {
//   "title": "ESTO ES UNA PRUEBA NOMAS",
//   "price": 3386
// }


// // ROOT---------------------------
// async function  getRoot (req, res) {
//   // let productos = await service.read();
//   // let productosID = await service.addProduct(PRUEBA);

//   const logger = log4js.getLogger("info");
//   logger.info("Peticion recibida en la ruta /root");
//   res.render("root");
// }

// // LOGIN---------------------------
// function getLogin(req, res) {
//   const logger = log4js.getLogger("info");
//   logger.info("Peticion recibida en la ruta /getLogin");
//   "/login", res.render("login");
// }

// function postLogin(req, res) {
//   if (req.isAuthenticated()) {
//     const logger = log4js.getLogger("info");
//     logger.info(
//       "Peticion recibida en la ruta /login. Usuario Correctamente Logeado"
//     );
//     // console.log(req.user);
//     let user = req.user;
//     res.render("main", { user: user, isUser: true });
//   } else {
//     let logger = log4js.getLogger("error");
//     logger.error("Hubo un error en el Logeo");

//     res.redirect("login");
//   }
// }

// function chatLogin(req, res) {
//   if (req.isAuthenticated()) {
//     const logger = log4js.getLogger("info");
//     logger.info("Peticion recibida en la ruta /chat");
//     console.log(req.user);
//     let user = req.user;
//     res.render("about", { user: user, isUser: true });
//   } else {
//     console.error();
   
//     let logger = log4js.getLogger("error");
//     logger.error("Error en el CHAT");
//     res.redirect("login");
//   }
// }

// function getFaillogin(req, res) {
//   let logger = log4js.getLogger("error");
//   logger.error("Hubo un error en el Logeo");
//   console.log("error en login");
//   res.render("failLogin", {});
// }

// // SIGN UP---------------------------
// function getSignup(req, res) {
//   const logger = log4js.getLogger("info");
//   logger.info(
//     "Peticion recibida en la ruta /signup. Usuario Creado Correctamente"
//   );
//   res.render("signup");
// }
// function postSignup(req, res) {
//   if (passport.authenticate("signup")) {
//     const logger = log4js.getLogger("info");
//     logger.info(
//       "Peticion recibida en la ruta /signup. Usuario Creado Correctamente"
//     );
//     let user = req.user;
//     let isUser = true;
//     res.render("profile", { user, isUser });
//   } else {
//     let logger = log4js.getLogger("error");
//     logger.error("Hubo un error en el Sign up");
//     res.redirect("login");
//   }
// }
// function getFailsignup(req, res) {
//   let logger = log4js.getLogger("error");
//   logger.error("Hubo un error en el Sign up");
//   console.log("error en login");
//   res.render("failSignup", {});
// }

// // LOG OUT---------------------------
// function getLogout(req, res) {
//   const logger = log4js.getLogger("info");
//   logger.info(
//     "Peticion recibida en la ruta /getLogout. Usuario Deslogeado Correctamente"
//   );
//   req.logout((err) => {
//     if (!err) {
//       res.render("logout");
//     }
//   });
// }



// module.exports = {
//   getRoot,
//   getLogin,
//   postLogin,
//   getSignup,
//   postSignup,
//   getFaillogin,
//   getFailsignup,
//   getLogout,
//   chatLogin
// };
