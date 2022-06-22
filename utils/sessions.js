const express = require("express");

// function adm(req, res, next) {
//   if (req.session?.adm) {
//   }
//   return next();
// }

function usuario(req, res, next) {
  
  if (req.session?.logged == true) {
    console.log("LOGEADO");
    return next();
  }else{console.log("NO");}
}

module.exports = usuario;
