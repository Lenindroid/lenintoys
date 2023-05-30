const botonLenintoy = document.getElementById("boton-lenintoy");
const botonAgua = document.getElementById("boton-agua");
const botonFuego = document.getElementById("boton-fuego");
const botonPlanta = document.getElementById("boton-planta");
const botonReiniciar = document.getElementById("boton-reiniciar");

const hipodoge = document.getElementById("hipodoge");
const cucho = document.getElementById("cucho");
const jimi = document.getElementById("jimi");
const spanLenintoyJugador = document.getElementById("lenintoy-jugador");
const seccionAtaque = document.getElementById("seleccionar-ataque");
const mensajeEleccionLenintoy = document.getElementById("mensaje-eleccion-lenintoy");
const mensajeEleccionAtaque = document.getElementById("mensaje-eleccion-ataque");
const seccionLenintoy = document.getElementById("seleccionar-lenintoy");
const seccionVidas = document.getElementById("vidas");

const spanLenintoyEnemigo = document.getElementById("lenintoy-enemigo");

const secccionMensajes = document.getElementById("mensajes");
const secccionResultado = document.getElementById("resultado");
const secccionAtaquesJugador = document.getElementById("ataques-jugador");
const seccionAtaquesEnemigo = document.getElementById("ataques-enemigo");

const seccionReiniciar = document.getElementById("reiniciar");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

let ataqueJugador;
let ataqueEnemigo;
let vidasEnemigo = 3;
let vidasJugador = 3;

function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);

function iniciarJuego () {
    botonLenintoy.addEventListener("click", seleccionarLenintoyJugador);
    botonAgua.addEventListener("click", ataqueAgua);
    botonFuego.addEventListener("click", ataqueFuego);
    botonPlanta.addEventListener("click", ataquePlanta);
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarLenintoyJugador () {
    seccionLenintoy.classList.replace('body__seleccionar', 'oculto');
    mensajeEleccionLenintoy.classList.replace('body__h2', 'oculto');

    if (hipodoge.checked){
        alert("Haz seleccionado al tierno lenintoy agua Hipodoge.");
        spanLenintoyJugador.innerHTML = "Hipodoge";
    } else if (cucho.checked) {
        alert("Haz seleccionado al poderoso lenintoy tipo fuego Cucho.");
        spanLenintoyJugador.innerHTML = "Cucho";
    } else if (jimi.checked) {
        alert("Haz seleccionado al divertido lenintoy tipo planta Jimi.");
        spanLenintoyJugador.innerHTML = "Jimi";
    } else {
        alert("SELECCIONA UN LENINTOY, PENDEJO")
    }
    seleccionarLenintoyEnemigo ();
    seccionVidas.classList.replace('oculto', 'vidas');
    seccionAtaque.classList.replace('oculto', 'body__seleccionar');
    mensajeEleccionAtaque.classList.replace('oculto', 'body__h2');
}

function seleccionarLenintoyEnemigo() {
    let lenintoyEnemigo = aleatorio(1, 3);
    if (lenintoyEnemigo == 1) {
      spanLenintoyEnemigo.innerHTML = "Hipodoge";
    } else if (lenintoyEnemigo == 2) {
      spanLenintoyEnemigo.innerHTML = "Cucho";
    } else {
      spanLenintoyEnemigo.innerHTML = "Jimi";
    }
}
  
function ataqueAgua () {
    ataqueJugador = "Agua";
    atacaEnemigo();
}

function ataqueFuego () {
    ataqueJugador = "Fuego";
    atacaEnemigo();
}

function ataquePlanta () {
    ataqueJugador = "Planta";
    atacaEnemigo();
}

function atacaEnemigo () {
    let ataqueAleatorio = aleatorio(1, 3);
    if (ataqueAleatorio == 1){
        ataqueEnemigo = "Agua";
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = "Fuego"
    }else {
        ataqueEnemigo = "Planta"
    }
    combate();
}

function mensajes (resultado) {
    secccionMensajes.classList.replace('oculto', 'mensajes');
    secccionResultado.innerHTML = resultado;
    secccionAtaquesJugador.innerHTML = "Tu lenintoy usó " + ataqueJugador;
    seccionAtaquesEnemigo.innerHTML = "El lenintoy enemigo usó " + ataqueEnemigo;
}

function mensajeFinal (resultadoFinal) {
    let parrafo = document.createElement("p");
    parrafo.innerHTML = resultadoFinal;
    secccionMensajes.appendChild(parrafo);
    botonAgua.disabled = true;
    botonFuego.disabled = true;
    botonPlanta.disabled = true;
    seccionReiniciar.style.display = "block";
    botonReiniciar.classList.replace('oculto', 'boton--principal');
}

function revisarVidas (){
    if (vidasEnemigo == 0){
        mensajeFinal("Felcitaciones, tu lenintoy ha asesinado al lenintoy enemigo.");
    } else if (vidasJugador == 0) {
        mensajeFinal("Mis condolencias, tu lenintoy fue asesinado por el lenintoy enemigo.");
    }
}

function combate () {
    if (ataqueJugador == ataqueEnemigo) {
        mensajes ("No tienen ningún efecto.");
    } else if (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego" || ataqueJugador == "Fuego" && ataqueEnemigo == "Planta" || ataqueJugador == "Planta" && ataqueEnemigo == "Agua") {
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
        mensajes ("¡El lenintoy enemigo ha perdido una vida!");
    } else {
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
        mensajes ("¡Tu lenintoy ha perdido una vida!");
    }
    revisarVidas();
}

function reiniciarJuego (){
    location.reload();
}

