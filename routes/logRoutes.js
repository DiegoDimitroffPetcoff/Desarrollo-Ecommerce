// const express = require ('express');
// const session = require('express-session');
// const handlebars = require('express-handlebars');

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// const app = express();

// const routes= require('../utils/controler');
// const UserModel = require('../src/models/usuarios.js');
// const validatePass = require('../utils/passValidatos');
// const createHash = require('../utils/hashGenerator');
// const {TIEMPO_EXPIRACION}= require('../src/config/globals');


// app.use(session({
//     secret: 'diego',
//     cookie: {
//         httpOnly: false,
//         secure: false,
//         maxAge: parseInt(TIEMPO_EXPIRACION)
//     },
//     rolling: true,
//     resave: true,
//     saveUninitialized: true
// }))
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(passport.initialize());
// app.use(passport.session());




// app.engine(
//     "hbs",handlebars.engine({
//         extname:".hbs",
//         defaultLayout: 'index.hbs',
//         layoutsDir:__dirname + "/src/views/layouts",
//         partialsDir: __dirname + "/src/views/partials/",
//         runtimeOptions:{
//             allowProtoPropertiesByDefault: true,
//             allowProtoMethodsByDefault: true,
//         }
//     })
// );

// app.set('view engine', 'hbs');
// app.set('views', './src/views');
// app.use(express.static(__dirname + "/public"));


// passport.use('login',new LocalStrategy(
//     (username, password, done)=>{
//         UserModel.findOne({username:username},(err,user)=>{
//             if (err){
//                 return done(err)
//             }
//             if(!user) {
//                 console.log("User not finded");
//                 return done(null, false);
//             }
//             if(!validatePass(user,password)){
//                 console.log("password or user invalid");
//                 return done(null, false)
//             }
//             return done(null, user)
//         })
//     }
// ))

// passport.use('signup',new LocalStrategy(
//     {passReqToCallback:true},(req,username, password, done)=>{
//         UserModel.findOne({username:username},(err,user)=>{
//             if (err){
//                 console.log(`some issue happened: ${err}`);
//                 return done(err)
//             }
//             if(user) {
//                 console.log(`This User already exist. Try with some other `);
//                 return done(null, false);
//             }  
//             console.log(req.body);
//             const newUser={
//                 firstName: req.body.lastName,
//                 lastName: req.body.firstName ,
//                 email: req.body.email ,
//                 username: username,
//                 password: createHash(password)
//             }

//             console.log(`NewUser:
//             ${newUser}`);

//             UserModel.create(newUser, (err, userWithId)=>{
//                 if (err){
//                     console.log(`some issue happened: ${err}`);
//                     return done(err)
//                 }
//                 console.log(userWithId);
//                 console.log("user created Successfuly");
//                 return done(null, userWithId)
//             })
           
//         })
//     }
// ))

// passport.serializeUser((user,callback)=>{
//     callback(null,user._id)
// })
// passport.deserializeUser((id,callback)=>{
//     UserModel.findById(id,callback)
// });
// // INDEX
// app.get('/root',routes.getRoot);

// // LOGIN
// app.get('/login',routes.getLogin);
// app.post('/login',passport.authenticate('login',{failureRedirect: '/failLogin'}),routes.postLogin);
// app.get('/failLogin', routes.getFaillogin)

// // SIGNUP
// app.get('/signUp',routes.getSignup);
// app.post('/signUp',passport.authenticate('signup',{failureRedirect: '/failSingup'}),routes.postSignup);
// app.get('failSingup', routes.getFailsignup)

// // LOGOUT
// app.get('/logout', routes.getLogout);

// // FAIL ROUTE
// app.get('*', (req, res)=>{
//     res.status(404).render('error',{});
// });

// module.exports = app