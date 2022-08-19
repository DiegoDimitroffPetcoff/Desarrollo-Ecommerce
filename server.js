const express = require("express");
const app = express();
const Factory = require("./utils/factory");

const PORT = parseInt(process.argv[2]) || 8080;

const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));

const route = require("./routes/productRoute");

const multer = require("multer");
const handlebars = require("express-handlebars");
const dotenv = require("dotenv").config();
const log4js = require("log4js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const UserModel = require("../CLASE12-master/src/models/usuarios.js");
const validatePass = require("../CLASE12-master/utils/passValidatos");
const createHash = require("../CLASE12-master/utils/hashGenerator");
const { TIEMPO_EXPIRACION } = require("../CLASE12-master/src/config/globals");

// SOLO PARA SOCKET-----------------------
const ChatContainer = require("./src/daos/daoFile/chatContainer");
const ProductosContainer = require("./src/daos/daoFile/productosContainer");
const { normalization } = require("./utils/normalizr");
const info = require("./utils/info");
const compressionRatio = require("./utils/calculator");
const compression = require("compression");
// SOLO PARA SOCKET-----------------------

app.use(
  session({
    secret: "diego",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: parseInt(TIEMPO_EXPIRACION),
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
passport.serializeUser((user, callback) => {
  callback(null, user._id);
});
passport.deserializeUser((id, callback) => {
  UserModel.findById(id, callback);
});

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

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

// conexion a base de datos
const DBSChosen = process.argv[2];
const DBS = Factory.getInstance(DBSChosen);
const DBS2 = Factory.getInstance(DBSChosen);

DBS.connection(DBSChosen);
//------------------------
// REALIZO TRIPLE INSTANCIACION PARA COMPROBAR CORRECTO FUNCIONAMIENTO DEL PATRON SINGLETON
DBS2.connection(DBSChosen)
DBS2.connection(DBSChosen)
DBS.connection(DBSChosen)
// funciona correctamente: Se corrobora la accion con el log "se activa factory". El cual se activa una sola vez independientemente de la cantidad de llamados que se haga a la misma


app.use(route);

const SERVER = httpServer.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
SERVER.on("Error", (error) => console.log("error en servidor ${error}"));

const productos = new ProductosContainer();
const chatContainer = new ChatContainer();

io.on("connection", (socket) => {
  let compression = null;
  try {
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
});
