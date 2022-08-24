const log4js = require("log4js");
const passport = require("passport");
const ApiService = require("../service/serviceMongo/serviceMongoTest");

class Controler {
  constructor() {
    this.api = new ApiService();
  }

  getRoot = async (req, res) => {
    // let productos = await service.read();
    // let productosID = await service.addProduct(PRUEBA);

    const logger = log4js.getLogger("info");
    logger.info("Peticion recibida en la ruta /root");
    res.render("root");
  };

  getLogin = async (req, res) => {
    const logger = log4js.getLogger("info");
    logger.info("Peticion recibida en la ruta /getLogin");
    "/login", res.render("login");
  };

  postLogin = async (req, res) => {
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
  };

  chatLogin = async (req, res) => {
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
  };

  getFaillogin = async (req, res) => {
    let logger = log4js.getLogger("error");
    logger.error("Hubo un error en el Logeo");
    console.log("error en login");
    res.render("failLogin", {});
  };

  getSignup = async (req, res) => {
    const logger = log4js.getLogger("info");
    logger.info(
      "Peticion recibida en la ruta /signup. Usuario Creado Correctamente"
    );
    res.render("signup");
  };
  postSignup = async (req, res) => {
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
  };
  getFailsignup = async (req, res) => {
    let logger = log4js.getLogger("error");
    logger.error("Hubo un error en el Sign up");
    console.log("error en login");
    res.render("failSignup", {});
  };

  getLogout = async (req, res) => {
    const logger = log4js.getLogger("info");
    logger.info(
      "Peticion recibida en la ruta /getLogout. Usuario Deslogeado Correctamente"
    );
    req.logout((err) => {
      if (!err) {
        res.render("logout");
      }
    });
  };
}

module.exports = Controler;
