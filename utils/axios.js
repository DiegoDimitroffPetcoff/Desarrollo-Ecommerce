const axios = require("axios");

function axiosGET() {
  try {
    let response = axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        console.log(response.data[1]);
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = axiosGET;
