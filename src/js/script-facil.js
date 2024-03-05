//VARIABLES
var historialRespuestas = [];
var numeroAleatorio1;
var numeroAleatorio2;
var h1Element;
let signo = null; // Declarar una variable para almacenar el valor del signo
let respuestasCorrectas = 0; // Variable para el seguimiento de respuestas correctas
/**--------------------------------------------------------------------------------------------------------- */
// Función para generar números aleatorios entre 0 y 99
function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 99) + 0; // Math.random() devuelve un número entre 0 (inclusive) y 1 (exclusivo)
}

// Función para mostrar el número aleatorio en un div específico
function mostrarNumeroEnDiv(numero, divId) {
  var divResultado = document.getElementById(divId);
  divResultado.innerHTML = numero;
}
//Función para actualizar los números aleatorios
function actualizarNumerosAleatorios() {
  numeroAleatorio1 = generarNumeroAleatorio();
  numeroAleatorio2 = generarNumeroAleatorio();

  mostrarNumeroEnDiv(numeroAleatorio1, "numero1");
  mostrarNumeroEnDiv(numeroAleatorio2, "numero2");
}

actualizarNumerosAleatorios();

// Función para permitir soltar la imagen
function allowDrop(event) {
  event.preventDefault();
}

// Función para el evento de arrastre de la imagen
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}
// Función para devolver la imagen al div padre
function devolverImagenAlSignos() {
  const signos = document.getElementById("signos");
  const signo = document.getElementById("signo");

  if (signo.childElementCount > 0) {
    // Obtener la primera imagen en "signo"
    const imagen = signo.firstElementChild;

    // Mover la imagen de "signo" a "signos"
    signos.appendChild(imagen);
  }
}
//Función que vuelve a mostrar "La respuesta es:"
function recargarMensaje() {
  var mensaje = "La respuesta es:";
  var mensajeDiv = document.getElementById("mensaje");

  // Verifica si el div con ID "mensaje" existe en el documento
  if (mensajeDiv) {
    mensajeDiv.innerHTML = mensaje;
  }
}
// Función para el evento de soltar la imagen en el div "signo"
function drop(event) {
  event.preventDefault();
  const imageId = event.dataTransfer.getData("text");
  const imageElement = document.getElementById(imageId);
  const signoDiv = document.getElementById("signo"); // Cambia el ID según tu estructura HTML

  if (signoDiv.contains(imageElement)) {
    // Evitar que se duplique la imagen si ya está en el div "signo"
    return;
  }
  signoDiv.appendChild(imageElement);

  // Asignar el valor del ID de la imagen a la variable signo
  signo = imageId;

  // Cambiar el texto del elemento h1 con el ID "selecciona"
  const h1Element = document.getElementById("mensaje");

  
  /**----------VERFICAR SI ES MAYOR, MENOR O IGUAL-------------*/
  //Verifica si es mayor
  if (numeroAleatorio1 > numeroAleatorio2) {
    if (signo === "mayor") {
      respuestasCorrectas++;
      h1Element.textContent = `¡Muy bien! es ${signo}`;
      updateProgressBar();
      // Si alcanzó 10 respuestas correctas y pasa al nivel intermedio
      if (respuestasCorrectas === 10) {
        alert("¡Has pasado al siguiente nivel!");
        setTimeout(function () {
          window.location.href = 'intermedio.html'
        }, 6000);
      } else {
        setTimeout(devolverImagenAlSignos, 3000);
        setTimeout(actualizarNumerosAleatorios, 3000);
        setTimeout(recargarMensaje, 3000);
      }
    } else {
      h1Element.textContent = `Erronea es menor`;
        setTimeout(devolverImagenAlSignos, 3000);
        setTimeout(actualizarNumerosAleatorios, 3000);
        setTimeout(recargarMensaje, 3000);
    } //Verifica si es igual
  } else if (numeroAleatorio1 === numeroAleatorio2) {
    if (signo === "igual") {
      h1Element.textContent = `¡Muy bien! es ${signo}`;
      updateProgressBar();
      // Si alcanzó 10 respuestas correctas y pasa al nivel intermedio
      if (respuestasCorrectas === 10) {
        alert("¡Has pasado al siguiente nivel!");
        setTimeout(function () {
          window.location.href = 'intermedio.html';
        }, 6000);
      } else {
        setTimeout(devolverImagenAlSignos, 3000);
        setTimeout(actualizarNumerosAleatorios, 3000);
        setTimeout(recargarMensaje, 3000);
      }
    } else {
      h1Element.textContent = `Erronea no es igual`;
      setTimeout(devolverImagenAlSignos, 3000);
      setTimeout(actualizarNumerosAleatorios, 3000);
      setTimeout(recargarMensaje, 3000);
    }
  } else if (numeroAleatorio1 < numeroAleatorio2) {
    //Verifica si es menor
    if (signo === "menor") {
      h1Element.textContent = `¡Muy bien! es ${signo}`;
      respuestasCorrectas++;
      updateProgressBar();
      // Si alcanzó 10 respuestas correctas y pasa al nivel intermedio
      if (respuestasCorrectas === 10) {
        alert("¡Has pasado al siguiente nivel!");
        setTimeout(function () {
        window.location.href = 'intermedio.html'
      }, 6000);
      } else {
        setTimeout(devolverImagenAlSignos, 3000);
        setTimeout(actualizarNumerosAleatorios, 3000);
        setTimeout(recargarMensaje, 3000);
      }
    } else {
      h1Element.textContent = `Erronea es mayor`;
      setTimeout(devolverImagenAlSignos, 3000);
      setTimeout(actualizarNumerosAleatorios, 3000);
      setTimeout(recargarMensaje, 3000);
    }
  }
  // Historial
  if (signo === "mayor" || signo === "igual" || signo === "menor") {
    const respuesta = {
      numeroAleatorio1,
      numeroAleatorio2,
      signo,
      correcta: (signo === "mayor" && numeroAleatorio1 > numeroAleatorio2) ||
                (signo === "igual" && numeroAleatorio1 === numeroAleatorio2) ||
                (signo === "menor" && numeroAleatorio1 < numeroAleatorio2),
    };
    historialRespuestas.push(respuesta);
  
    // Actualiza la lista de historial de respuestas en el HTML
    const historialList = document.getElementById("historialRespuestas");
    const listItem = document.createElement("li");
    listItem.textContent = `${respuesta.numeroAleatorio1} ${respuesta.signo} que ${respuesta.numeroAleatorio2}, Respuesta: ${respuesta.correcta ? "Correcta" : "Incorrecta"}`;
    historialList.appendChild(listItem);
  }
}
// Asignar los eventos de arrastre y soltar a las imágenes
const imagenes = document.querySelectorAll(".signos img");
imagenes.forEach((imagen) => {
  imagen.addEventListener("dragstart", drag);
});

// Asignar el evento de permitir soltar al signo div
const signoDiv = document.getElementById("signo"); // Cambia el ID según tu estructura HTML
signoDiv.addEventListener("dragover", allowDrop);
signoDiv.addEventListener("drop", drop);

// Función para actualizar la barra de progreso
function updateProgressBar() {
  progressBar = document.getElementById("progressBar");
  progressBar.value = respuestasCorrectas;
}
