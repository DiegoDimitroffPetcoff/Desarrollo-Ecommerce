const express = require("express");
const route = express()


route.use(express.static("./public"));
const log4js = require("log4js");
const ramdomsChild = require("../utils/ramdomsChild");
const { fork } = require("child_process");
const info = require("../utils/info");
const passport = require("passport");

const controler = require("../src/controller/controlerTest");
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




class Routes {
  constructor() {
    this.controler = new controler();
  }

  start() {
        route.get("/", this.controler.getRoot);

        route.get("/login", this.controler.getLogin);
        route.post(
        "/login",
        passport.authenticate("login", { failureRedirect: "/error" }),
        this.controler.postLogin
        );
        route.get("/failLogin", this.controler.getFaillogin);
        route.get("/signUp", this.controler.getSignup);
        route.post("/signUp", this.controler.postSignup);
        route.get("failSingup", this.controler.getFailsignup);

        route.get("/logout", this.controler.getLogout);
        route.get("/productos", this.controler.postLogin, (req, res) => {
        res.render("main");
        });
        route.post("/productos", this.controler.postLogin, (req, res) => {
        res.render("main", { isUser: true });
        });
        route.get("/chat", this.controler.chatLogin, (req, res) => {
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

        route.get("*", (req, res) => {
        res.status(404).render("error", {});
        });

    return route;
  }
}

module.exports = Routes;
