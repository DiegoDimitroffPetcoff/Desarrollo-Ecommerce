const axios = require('axios').default;
const Controler = require ('../src/controller/controler')


class RouteAxios{
  contructor(){
  this.controler = new Controler()
  }

start(){
axios.get('/')
  .then(function (response) {
  
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });}

}

module.exports = RouteAxios