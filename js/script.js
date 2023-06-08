const botonLenintoy = document.getElementById('boton-lenintoy');
const botonReiniciar = document.getElementById('boton-reiniciar');
const spanLenintoyJugador = document.getElementById('lenintoy-jugador');
const seccionAtaque = document.getElementById('seleccionar-ataque');
const mensajeEleccionLenintoy = document.getElementById('mensaje-eleccion-lenintoy');
const mensajeEleccionAtaque = document.getElementById('mensaje-eleccion-ataque');
const seccionLenintoy = document.getElementById('seleccionar-lenintoy');
const seccionVidas = document.getElementById('vidas');

const spanLenintoyEnemigo = document.getElementById('lenintoy-enemigo');

const secccionMensajes = document.getElementById('mensajes');
const secccionResultado = document.getElementById('resultado');
const secccionAtaquesJugador = document.getElementById('ataques-jugador');
const seccionAtaquesEnemigo = document.getElementById('ataques-enemigo');

const seccionReiniciar = document.getElementById('reiniciar');

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const contenedorTarjetas = document.getElementById('contenedor-tarjetas');

let lenintoys = [];
let ataqueJugador = [];
let ataqueEnemigo;
let ataquesEnemigo;
let vidasEnemigo = 3;
let vidasJugador = 3;
let opcionDeLenintoys;
let opcionDeAtaques;
let lenintoyJugador;
let hipodogeInput;
let cuchoInput;
let jimiInput;
let botonAgua;
let botonFuego;
let botonPlanta;
let botones = [];

class Lenintoy {
    constructor(nombre, foto, vida) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
    }
}

let hipodoge = new Lenintoy('Hipodoge', './assets/hipodoge.svg', 5);
let cucho = new Lenintoy('Cucho', './assets/cucho.svg', 5);
let jimi = new Lenintoy('Jimi', './assets/jimi.svg', 5);

hipodoge.ataques.push(
    { emoji: '💧', id: 'boton-agua', nombre: 'agua' },
    { emoji:'💧', id: 'boton-agua', nombre: 'agua' },
    { emoji:'💧', id: 'boton-agua', nombre: 'agua' },
    { emoji:'🔥', id: 'boton-fuego', nombre: 'fuego' },
    { emoji:'🌱', id: 'boton-planta', nombre: 'planta' }
)

cucho.ataques.push(
    { emoji: '💧', id: 'boton-agua', nombre: 'agua' },
    { emoji:'🔥', id: 'boton-fuego', nombre: 'fuego' },
    { emoji:'🔥', id: 'boton-fuego', nombre: 'fuego' },
    { emoji:'🔥', id: 'boton-fuego', nombre: 'fuego' },
    { emoji:'🌱', id: 'boton-planta', nombre: 'planta' }
)

jimi.ataques.push(
    { emoji:'💧', id: 'boton-agua', nombre: 'agua' },
    { emoji:'🔥', id: 'boton-fuego', nombre: 'fuego' },
    { emoji:'🌱', id: 'boton-planta', nombre: 'planta' },
    { emoji:'🌱', id: 'boton-planta', nombre: 'planta' },
    { emoji:'🌱', id: 'boton-planta', nombre: 'planta' }
)

lenintoys.push(hipodoge, cucho, jimi);

function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);

function iniciarJuego () {
    lenintoys.forEach((lenintoy) => {
        opcionDeLenintoys =  `
            <input type="radio" id=${lenintoy.nombre} name="lenintoys-opciones"/>
            <label for=${lenintoy.nombre} class="tarjetas__label">
                <p>${lenintoy.nombre}</p> 
                <img src=${lenintoy.foto} alt=${lenintoy.nombre}/>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeLenintoys;
        hipodogeInput = document.getElementById('Hipodoge');
        cuchoInput = document.getElementById('Cucho');
        jimiInput = document.getElementById('Jimi');
    });
    botonLenintoy.addEventListener('click', seleccionarLenintoyJugador);
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarLenintoyJugador () {
    seccionLenintoy.classList.replace('body__seleccionar', 'oculto');
    mensajeEleccionLenintoy.classList.replace('body__h2', 'oculto');

    if (hipodogeInput.checked){
        alert('Haz seleccionado al tierno lenintoy agua Hipodoge.');
        spanLenintoyJugador.innerHTML = hipodogeInput.id;
        lenintoyJugador = hipodogeInput.id;
    } else if (cuchoInput.checked) {
        alert('Haz seleccionado al poderoso lenintoy tipo fuego Cucho.');
        spanLenintoyJugador.innerHTML = cuchoInput.id;
        lenintoyJugador = cuchoInput.id;
    } else if (jimiInput.checked) {
        alert('Haz seleccionado al divertido lenintoy tipo planta Jimi.');
        spanLenintoyJugador.innerHTML = jimiInput.id;
        lenintoyJugador = jimiInput.id;
    } else {
        alert('SELECCIONA UN LENINTOY, PENDEJO')
    }
    seccionVidas.classList.replace('oculto', 'vidas');
    seccionAtaque.classList.replace('oculto', 'body__seleccionar');
    mensajeEleccionAtaque.classList.replace('oculto', 'body__h2');
    seccionAtaque.style.flexDirection = "row";
    extraerAtaques(lenintoyJugador);
    seleccionarLenintoyEnemigo ();
}

function extraerAtaques (lenintoyJugador) {
    let ataques;
    for (let i = 0; i < lenintoys.length; i++) {
        if (lenintoyJugador == lenintoys[i].nombre){
            ataques = lenintoys[i].ataques;
        }
        
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques (ataques) {
    ataques.forEach((ataques) => {
        opcionDeAtaques =  `
                <button id=${ataques.id} class="p__boton bAtaque" title="Ataca con ${ataques.nombre}">${ataques.emoji}</button>
        `
        seccionAtaque.innerHTML += opcionDeAtaques;
    });
    botonAgua = document.getElementById('boton-agua');
    botonFuego = document.getElementById('boton-fuego');
    botonPlanta = document.getElementById('boton-planta');
    botones= document.querySelectorAll('.bAtaque');
}

function secuenciaAtaque (){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) =>{ //e es el evento mismo 
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO');
                console.log(ataqueJugador);
                boton.disabled = true;
            }
            else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA');
                console.log(ataqueJugador);
                boton.disabled = true;
            } else {
                ataqueJugador.push('TIERRA');
                console.log(ataqueJugador);
                boton.disabled = true;
            }
        })
        atacaEnemigo();
    }) 
    
}

function seleccionarLenintoyEnemigo() {
    let lenintoyEnemigo = aleatorio(0, lenintoys.length - 1);
    spanLenintoyEnemigo.innerHTML = lenintoys[lenintoyEnemigo].nombre;
    ataqueEnemigo = lenintoys[lenintoyEnemigo].ataques;
    secuenciaAtaque();
}

function atacaEnemigo () {
    let ataqueAleatorio = aleatorio(0, lenintoys.length - 1);
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push('Agua');
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('Fuego');
    }else {
        ataqueEnemigo.push('Planta');
    }
    combate();
}

function mensajes (resultado) {
    secccionMensajes.classList.replace('oculto', 'mensajes');
    secccionResultado.innerHTML = resultado;
    secccionAtaquesJugador.innerHTML = 'Tu lenintoy usó ' + ataqueJugador;
    seccionAtaquesEnemigo.innerHTML = 'El lenintoy enemigo usó ' + ataqueEnemigo;
}

function mensajeFinal (resultadoFinal) {
    let parrafo = document.createElement('p');
    parrafo.innerHTML = resultadoFinal;
    secccionMensajes.appendChild(parrafo);
    botonAgua.disabled = true;
    botonFuego.disabled = true;
    botonPlanta.disabled = true;
    seccionReiniciar.style.display = 'block';
    botonReiniciar.classList.replace('oculto', 'boton--principal');
}

function revisarVidas (){
    if (vidasEnemigo == 0){
        mensajeFinal('Felcitaciones, tu lenintoy ha asesinado al lenintoy enemigo.');
    } else if (vidasJugador == 0) {
        mensajeFinal('Mis condolencias, tu lenintoy fue asesinado por el lenintoy enemigo.');
    }
}

function combate () {
    if (ataqueJugador == ataqueEnemigo) {
        mensajes ('No tienen ningún efecto.');
    } else if (ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego' || ataqueJugador == 'Fuego' && ataqueEnemigo == 'Planta' || ataqueJugador == 'Planta' && ataqueEnemigo == 'Agua') {
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
        mensajes ('¡El lenintoy enemigo ha perdido una vida!');
    } else {
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
        mensajes ('¡Tu lenintoy ha perdido una vida!');
    }
    revisarVidas();
}

function reiniciarJuego (){
    location.reload();
}

