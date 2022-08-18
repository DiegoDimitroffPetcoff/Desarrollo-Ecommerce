const express = require("express");
const route = express();

route.use(express.static("./public"));
const log4js = require("log4js");
const ramdomsChild = require("../utils/ramdomsChild");
const { fork } = require("child_process");
const info = require("../utils/info");
const passport = require("passport");
const routes = require("../src/controller/controler");
route.set("views", "./views");
log4js.configure({
  appenders: {
    Console: { type: "console" },
    // errorFile: { type: "file", filename:'loggerError.log' },
    warnFile: { type: "file", filename: "warn.log" },
    errorFile: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["warnFile", "Console"], level: "warn" },
    info: { appenders: ["Console"], level: "info" },
    error: { appenders: ["errorFile", "Console"], level: "error" },
  },
});

// INDEX--------------------------------
route.get("/", routes.getRoot);
// LOGIN--------------------------------
route.get("/login", routes.getLogin);
route.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/error" }),
  routes.postLogin
);
route.get("/failLogin", routes.getFaillogin);
// SIGNUP--------------------------------
route.get("/signUp", routes.getSignup);
route.post("/signUp", routes.postSignup);
route.get("failSingup", routes.getFailsignup);
// LOGOUT--------------------------------
route.get("/logout", routes.getLogout);
route.get("/productos", routes.postLogin, (req, res) => {
  res.render("main");
});
route.post("/productos", routes.postLogin, (req, res) => {
  res.render("main", { isUser: true });
});
route.get("/chat", routes.chatLogin, (req, res) => {
  res.render("about", { isUser: true });
});
route.get("/test/:num", (req, res) => {
  try {
    res.json(productos.mocks(req.params.num));
  } catch (err) {
    console.log(err);
  }
});
route.get("/info", info);
route.get("/api/randoms", (req, res) => {
  try {
    let num = null;
    if (req.query.cant == undefined) {
      num = 100000000;
    } else {
      num = req.query.cant;
    }
    const child = fork("utils/ramdomsChild.js");
    child.send(num);
    child.on("message", (data) => {
      try {
        let mensaje = `Se han calculado en total, ${num} numeros:`;
        let result = JSON.parse(data);
        res.render("calculator", { mensaje, result });
      } catch (error) {
        console.log("ERROR");
        console.log(error);
      }
    });
  } catch (error) {
    let logger = log4js.getLogger("errorConsole");

    logger.error("Log Error");
    console.log(error);
  }
});
// FAIL ROUTE--------------------------------
route.get("*", (req, res) => {
  res.status(404).render("error", {});
});

module.exports = route;
