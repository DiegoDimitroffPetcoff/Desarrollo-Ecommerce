
const {app }= require('./app')
// const path = require("path");
const { SERVER, route } = require("./routes/productRoute");

const dotenv = require("dotenv");




const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
})
SERVER.on("Error", (error) => console.log("error en servidor ${error}"));


