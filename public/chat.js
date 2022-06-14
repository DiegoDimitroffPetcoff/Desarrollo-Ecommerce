
const socket = io.connect();

// --------------------
function renderCompression(data) {

  let compresion = data - data - data
  const html = `<h1>El porcentaje de compresion:</h1> <br>
  <h1> % ${compresion}</h1>`
  document.getElementById("compression").innerHTML = html;
}
function renderChat(data) {
  const html = data
  
    .map((elem, index) => {
      // console.log(elem);
      let fecha = new Date();

      let dia = fecha.getDate();
      let anio = fecha.getFullYear();
      let mes = fecha.getMonth() + 1;

      let hora = fecha.getHours() + ":";
      let minutos = fecha.getMinutes() + ":";
      let segundos = fecha.getSeconds();

      return `<div>
            <strong><h5>${elem.author.nombre} ${elem.author.apellido}:</h5></strong>
            <h6>Menssage sent on ${dia}/${mes}/${anio} Time: ${hora}${minutos}${segundos}</h6>
            <p><em>${elem.text.text}</em></p>
        </div>`;
    })
    .join(" ");

  document.getElementById("filaTexto").innerHTML = html;
}
function addMessagechat(e) {
  const mensaje = {
    author: {
      email: document.getElementById("email").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
     
    },
    text: { text: document.getElementById("texto").value },
    
  };

  socket.emit("newChat", mensaje);
  return false;
}

socket.on("chat", (data) => {
  console.log('---SI DESDE EL CLIENTE1');
  renderChat(data);
});

socket.on("compression", data => {
console.log('---SI DESDE EL CLIENTE');
renderCompression(data)
  });



