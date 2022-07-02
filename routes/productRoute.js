const express = require("express");
const route = express();
const session = require("express-session");
const MongoStore = require("connect-mongo");

const ChatContainer = require("../src/daos/file/chatContainer");
const ProductosContainer = require("../src/daos/file/productosContainer");

const util = require("util");
const { fakerCreate } = require("../utils/mocks");
const { normalization } = require("../utils/normalizr");

const compressionRatio = require("../utils/calculator");
const userLogged = require("../utils/sessions");

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const fs = require("fs");
const { response } = require("express");

const SERVER = new HttpServer(route);
const io = new IOServer(SERVER);

route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.use(express.static("./public"));

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const routes = require("../utils/controler");
const UserModel = require("../src/models/usuarios.js");
const validatePass = require("../utils/passValidatos");
const createHash = require("../utils/hashGenerator");
const { TIEMPO_EXPIRACION } = require("../src/config/globals");

route.use(session({
    secret: 'diego',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: parseInt(TIEMPO_EXPIRACION)
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
}))
route.use(express.json());
route.use(express.urlencoded({extended:true}));
route.use(passport.initialize());
route.use(passport.session());

// route.set('view engine', 'hbs');
route.set("views", "./views");
// route.use(express.static(__dirname + "/public"));

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    UserModel.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log("User not finded");
        return done(null, false);
      }
      if (!validatePass(user, password)) {
        console.log("password or user invalid");
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      UserModel.findOne({ username: username }, (err, user) => {
        if (err) {
          console.log(`some issue happened: ${err}`);
          return done(err);
        }
        if (user) {
          console.log(`This User already exist. Try with some other `);
          return done(null, false);
        }
        console.log(req.body);
        const newUser = {
          firstName: req.body.lastName,
          lastName: req.body.firstName,
          email: req.body.email,
          username: username,
          password: createHash(password),
        };

        console.log(`NewUser:
            ${newUser}`);

        UserModel.create(newUser, (err, userWithId) => {
          if (err) {
            console.log(`some issue happened: ${err}`);
            return done(err);
          }
          console.log(userWithId);
          console.log("user created Successfuly");
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});
passport.deserializeUser((id, callback) => {
  UserModel.findById(id, callback);
});

const productos = new ProductosContainer();

const chatContainer = new ChatContainer();

// INDEX
route.get("/", routes.getRoot);

// LOGIN
route.get("/login", routes.getLogin);
route.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/failLogin" }),
  routes.postLogin
);
route.get("/failLogin", routes.getFaillogin);

// SIGNUP
route.get("/signUp", routes.getSignup);
route.post(
  "/signUp",
  passport.authenticate("signup", { failureRedirect: "/failSingup" }),
  routes.postSignup
);
route.get("failSingup", routes.getFailsignup);

// LOGOUT
route.get("/logout", routes.getLogout);

let compression = null;
io.on("connection", (socket) => {
  console.log("Cliente en la Home de la web");
  let prueba = productos.read();
  socket.emit("messages", prueba);
  socket.on("new-message", (data1) => {
    productos.save(data1);
    prueba.push(data1);

    io.sockets.emit("messages", prueba);
  });
});

io.on("connection", (socket) => {
  const chat = chatContainer.read();
  const dataContainer = { id: 1, posts: [] };
  dataContainer.posts = chat;
  const chatNormalizado = normalization(dataContainer);
  console.log("Usuario conectado al Chat");
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
    console.log(error);
  }
});

// app.get("/login", (req, res) => {
//   res.render("login");
// });
// let name = "NO HAY NOMBRE";

// app.post("/login", (req, res) => {
//   req.session.user = req.body.nombre;

//   req.session.logged = true;
//   let data = req.body;
//   name = req.session.user;

//   res.render("main", { data, name });
// });

// app.get("/logout", (req, res) => {
//   req.session.destroy((error) => {
//     if (error) {
//       res.send({ status: "Logout Error", body: error });
//     }
//   });

//   res.render("logout", { name });
// });

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
    res.jsonp(productos.mocks(req.params.num));
  } catch (err) {
    console.log(err);
  }
});

// FAIL ROUTE
route.get("*", (req, res) => {
  res.status(404).render("error", {});
});

module.exports = { SERVER, route };
