
const socket = io.connect();

// --------------------

function renderChat(data) {
  const html = data
  
    .map((elem, index) => {
      console.log(elem);
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

// document.getElementById("filaTexto2").innerHTML =contenedor.read("./chat.js");
// console.log(filaTexto2);


function addMessagechat(e) {
  const mensaje = {
    author: {
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

  renderChat(data);
});
