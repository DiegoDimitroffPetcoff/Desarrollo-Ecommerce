const express = require("express");

// function adm(req, res, next) {
//   if (req.session?.adm) {
//   }
//   return next();
// }

function userLogged(req, res, next) {
  
  if (req.session?.logged == true) {
    console.log("LOGEADO");
    return next();
  }else{console.log("NO");}
}


function renderName(params) {
  let name = `<h1>Bienvenido ${params}</h1>
  <form onsubmit="logOut(this)">    
  <a href="./logout"><input type="button" value="Log Out"></a>
</form>`
return name
  // document.getElementById("filaTexto").innerHTML = name;
}

function logOut(params) {
  // document.getElementById("filaTexto").innerHTML = "deslogeado"
}

module.exports = {userLogged, renderName, logOut}
