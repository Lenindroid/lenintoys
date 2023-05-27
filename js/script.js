let ataqueJugador;
let ataqueEnemigo;
let vidasEnemigo = 3;
let vidasJugador = 3;

function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function iniciarJuego () {
    let botonLenintoy = document.getElementById("boton-lenintoy");
    botonLenintoy.addEventListener("click", seleccionarLenintoyJugador);
    let botonAgua = document.getElementById("boton-agua");
    botonAgua.addEventListener("click", ataqueAgua);
    let botonFuego = document.getElementById("boton-fuego");
    botonFuego.addEventListener("click", ataqueFuego);
    let botonPlanta = document.getElementById("boton-planta");
    botonPlanta.addEventListener("click", ataquePlanta);
    let botonReiniciar = document.getElementById("boton-reiniciar");
    botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarLenintoyJugador () {
    let hipodoge = document.getElementById("hipodoge");
    let cucho = document.getElementById("cucho");
    let jimi = document.getElementById("jimi");
    let spanLenintoyJugador = document.getElementById("lenintoy-jugador");
    let seccionAtaque = document.getElementById("seleccionar-ataque");
    let mensajeEleccionLenintoy = document.getElementById("mensaje-eleccion-lenintoy");
    let mensajeEleccionAtaque = document.getElementById("mensaje-eleccion-ataque");
    let seccionLenintoy = document.getElementById("seleccionar-lenintoy");
    let seccionVidas = document.getElementById("vidas");
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
    let spanLenintoyEnemigo = document.getElementById("lenintoy-enemigo");
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
    let secccionMensajes = document.getElementById("mensajes");
    let parrafo = document.createElement("p");
    parrafo.innerHTML = "Tu lenintoy atacó con "+ ataqueJugador + ", mientras que la Lenintoy del enemigo atacó con " + ataqueEnemigo + resultado;
    secccionMensajes.appendChild(parrafo);
}

function mensajeFinal (resultadoFinal) {
    let secccionMensajes = document.getElementById("mensajes");
    let parrafo = document.createElement("p");
    parrafo.innerHTML = resultadoFinal;
    secccionMensajes.appendChild(parrafo);
    let botonAgua = document.getElementById("boton-agua");
    botonAgua.disabled = true;
    let botonFuego = document.getElementById("boton-fuego");
    botonFuego.disabled = true;
    let botonPlanta = document.getElementById("boton-planta");
    botonPlanta.disabled = true;
    let seccionReiniciar = document.getElementById("reiniciar");
    let botonReiniciar = document.getElementById("boton-reiniciar");
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
    let spanVidasJugador = document.getElementById("vidas-jugador");
    let spanVidasEnemigo = document.getElementById("vidas-enemigo");
    if (ataqueJugador == ataqueEnemigo) {
        mensajes (" ¡Ha sido un empate!");
    } else if (ataqueJugador == "Agua" && ataqueEnemigo == "Fuego" || ataqueJugador == "Fuego" && ataqueEnemigo == "Planta" || ataqueJugador == "Planta" && ataqueEnemigo == "Agua") {
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
        mensajes (" ¡Tu lenintoy ha ganado el combate!");
    } else {
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
        mensajes (" ¡El lenintoy enemigo es el ganador!");
    }
    revisarVidas();
}

function reiniciarJuego (){
    location.reload();
}
window.addEventListener("load", iniciarJuego);
