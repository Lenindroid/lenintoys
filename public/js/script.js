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

const contenedorLenintoys = document.querySelector('#mostrar-lenintoy');
const lenintoyAliado = document.querySelector('#lenintoy-aliado');
const LenintoyEnemigo = document.querySelector('#Lenintoy-enemigo');

const contenedorBarras = document.querySelector('#contenedor-barras');
const barraAliado = document.querySelector('#barra-aliado');
const barraEnemigo = document.querySelector('#barra-enemigo');

const seccionMapa = document.querySelector('#ver-mapa');
const mapa = document.querySelector('#mapa');
const lienzo = mapa.getContext('2d');

let jugadorId = null;
let enemigoId = null;
let lenintoys = [];
let ataques = [];
let lenintoysEnemigos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let ataquesEnemigo;
let vidasEnemigo = 3;
let vidasJugador = 3;
let movimientos = 5;
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
let intervalo;
let mapaBackground = new Image()
mapaBackground.src = './assets/mapa-bueno.jpg'
let miLenintoy;
let alturaMapa;
let anchoMapa = window.innerWidth - 20;
alturaMapa = (anchoMapa * 600) / 800;
mapa.width = anchoMapa;
mapa.height = alturaMapa;

const anchoMaximo = 800;
if (anchoMapa > anchoMaximo) {
    anchoMapa = anchoMaximo - 20;
    mapa.width = anchoMapa;
    alturaMapa = (anchoMapa * 600) / 800;
    mapa.height = alturaMapa;
}

class Lenintoy {
    constructor(nombre, foto, vida, fotoCara, id = null) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.x = aleatorio(0, 300);
        this.y = aleatorio(0, 200);
        this.ataques = [];
        this.ancho = 80;
        this.alto = 80;
        this.fotoMapa = new Image();
        this.fotoMapa.src = fotoCara;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    renderizar() {
        lienzo.drawImage(
            this.fotoMapa, 
            this.x, 
            this.y, 
            this.alto,
            this.ancho
        );
    }
}

let hipodoge = new Lenintoy('Hipodoge', './assets/hipodoge.svg', 5, './assets/hipodoge-cara.svg');
let cucho = new Lenintoy('Cucho', './assets/cucho.svg', 5, './assets/cucho-cara.svg');
let jimi = new Lenintoy('Jimi', './assets/jimi.svg', 5, './assets/jimi-cara.svg');

const HIPODOGE_ATAQUES = [
    { emoji: '💧', id: 'boton-agua', nombre: 'Agua', color: '#269', gastado: false },
    { emoji:'💧', id: 'boton-agua', nombre: 'Agua', color: '#269', gastado: false },
    { emoji:'💧', id: 'boton-agua', nombre: 'Agua', color: '#269', gastado: false },
    { emoji:'🔥', id: 'boton-fuego', nombre: 'Fuego', color: '#ff1f00', gastado: false },
    { emoji:'🌱', id: 'boton-planta', nombre: 'Planta', color: '#466832', gastado: false }
];

const CUCHO_ATAQUES = [
    { emoji: '💧', id: 'boton-agua', nombre: 'Agua', color: '#269', gastado: false },
    { emoji:'🔥', id: 'boton-fuego', nombre: 'Fuego', color: '#ff1f00', gastado: false },
    { emoji:'🔥', id: 'boton-fuego', nombre: 'Fuego', color: '#ff1f00', gastado: false },
    { emoji:'🔥', id: 'boton-fuego', nombre: 'Fuego', color: '#ff1f00', gastado: false },
    { emoji:'🌱', id: 'boton-planta', nombre: 'Planta', color: '#466832', gastado: false }
];

const JIMI_ATAQUES = [
    { emoji:'💧', id: 'boton-agua', nombre: 'Agua', color: '#269', gastado: false },
    { emoji:'🔥', id: 'boton-fuego', nombre: 'Fuego', color: '#ff1f00', gastado: false },
    { emoji:'🌱', id: 'boton-planta', nombre: 'Planta', color: '#466832', gastado: false },
    { emoji:'🌱', id: 'boton-planta', nombre: 'Planta', color: '#466832', gastado: false },
    { emoji:'🌱', id: 'boton-planta', nombre: 'Planta', color: '#466832', gastado: false }
];

hipodoge.ataques.push(...HIPODOGE_ATAQUES);
cucho.ataques.push(...CUCHO_ATAQUES);
jimi.ataques.push(...JIMI_ATAQUES);

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
    unirseAlJuego();
}

function unirseAlJuego() {
    fetch('http://192.168.100.102:3000/unirse')
        .then((res)=>{ 
            if(res.ok) {
                res.text()
                    .then((respuesta)=> {
                        jugadorId = respuesta;
                        console.log(jugadorId);
                    });
            }
        })
}

function teclaPresionada(event) {
    switch (event.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            moverArriba();
            break;
        case 'D':
        case 'd':
        case 'ArrowRight':
            moverDerecha();
            break;
        case 'A':
        case 'a':
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'S':
        case 's':
        case 'ArrowDown':
            moverAbajo();
    }
}

function seleccionarLenintoyJugador () {
    if (hipodogeInput.checked){
        console.log('Haz seleccionado al tierno lenintoy agua Hipodoge.');
        spanLenintoyJugador.innerHTML = hipodogeInput.id;
        lenintoyJugador = hipodogeInput.id;
        lenintoyAliado.src = hipodoge.foto;
    } else if (cuchoInput.checked) {
        console.log('Haz seleccionado al poderoso lenintoy tipo fuego Cucho.');
        spanLenintoyJugador.innerHTML = cuchoInput.id;
        lenintoyJugador = cuchoInput.id;
        lenintoyAliado.src = cucho.foto;
    } else if (jimiInput.checked) {
        console.log('Haz seleccionado al divertido lenintoy tipo planta Jimi.');
        spanLenintoyJugador.innerHTML = jimiInput.id;
        lenintoyJugador = jimiInput.id;
        lenintoyAliado.src = jimi.foto;
    } else {
        alert('SELECCIONA UN LENINTOY EN PRIMER LUGAR.');
        return;
    }
    seleccionarLenintoy(lenintoyJugador);
    seccionLenintoy.classList.replace('body__seleccionar', 'oculto');
    mensajeEleccionLenintoy.classList.replace('body__h2', 'oculto');
    iniciarMapa();
    seccionMapa.classList.replace('oculto', 'seccion-mapa');
    intervalo = setInterval(renderizar, 50);
    seccionAtaque.style.flexDirection = "row";
    extraerAtaques(lenintoyJugador);
}

function seleccionarLenintoy(lenintoyJugador) {
    fetch(`http://192.168.100.102:3000/lenintoy/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            lenintoy: lenintoyJugador
        })
    });
}

function seleccionarLenintoyEnemigo(enemigo) {
    spanLenintoyEnemigo.innerHTML = enemigo.nombre;
    ataquesEnemigo = enemigo.ataques;
    LenintoyEnemigo.src = enemigo.foto;
    secuenciaAtaque();
}

function extraerAtaques (lenintoyJugador) {
    ataques;
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
                <button id=${ataques.id} style="background-color: ${ataques.color};" class="p__boton bAtaque" title="Ataca con ${ataques.nombre}">${ataques.emoji}</button>
        `
        seccionAtaque.innerHTML += opcionDeAtaques;
    });
    botonAgua = document.getElementById('boton-agua');
    botonFuego = document.getElementById('boton-fuego');
    botonPlanta = document.getElementById('boton-planta');
    botones = document.querySelectorAll('.bAtaque');
}

function secuenciaAtaque (){
    botones.forEach((boton, index) => {
        boton.addEventListener('click', (e) =>{ //e es el evento mismo 
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('Fuego');
                movimientos--;
                miLenintoy.ataques[index].gastado = true;
                enviarAtaques();
            }
            else if (e.target.textContent === '💧') {
                ataqueJugador.push('Agua');
                movimientos--;
                ataques[index].gastado = true;
                miLenintoy.ataques[index].gastado = true;
                enviarAtaques();
            } else {
                ataqueJugador.push('Planta');
                movimientos--;
                ataques[index].gastado = true;
                miLenintoy.ataques[index].gastado = true;
                enviarAtaques();
            }
        })
    }) 
}


const enviarAtaques = async () => {
    botones.forEach(boton => {
        boton.disabled = true;
    });
    mensajeEsperaRival();

    // Envía el ataque al servidor
    await fetch(`http://192.168.100.102:3000/lenintoy/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataque: ataqueJugador,
            enemigo: enemigoId
        })
    });

    // Espera los ataques del enemigo
    await esperarAtaques();
};

const esperarAtaques = async () => {
    let listo = false;

    while (!listo) {
        try {
            const res = await fetch(`http://192.168.100.102:3000/lenintoy/${enemigoId}/ataques`);
            if (res.ok) {
                const { ataques, listo: ambosListos } = await res.json();
                if (ambosListos) {
                    ataqueEnemigo = ataques;
                    listo = true;
                    combate(); // Procede al combate
                }
            }
        } catch (error) {
            console.error("Error al obtener los ataques:", error);
        }

        // Espera un momento antes de reintentar
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
};

function mensajes (resultado) {
    secccionResultado.innerHTML = resultado;
    secccionAtaquesJugador.innerHTML = 'Tu lenintoy usó ' + ataqueJugador[ataqueJugador.length - 1];
    seccionAtaquesEnemigo.innerHTML = 'El lenintoy enemigo usó ' + ataqueEnemigo[ataqueEnemigo.length - 1];
}

function mensajeEsperaRival () {
    secccionResultado.innerHTML = 'Esperando el ataque del rival';
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
        botones.forEach(boton => {
            boton.disabled = true;
        });
    } else if (vidasJugador == 0) {
        mensajeFinal('Mis condolencias, tu lenintoy fue asesinado por el lenintoy enemigo.');
        botones.forEach(boton => {
            boton.disabled = true;
        });
    } else if (movimientos == 0) {
        if (vidasEnemigo == vidasJugador) mensajeFinal('Los lenintoys se han cansado de pelear. Es un empate.');
        else if (vidasJugador > vidasEnemigo) mensajeFinal('El lenintoy enemigo se ha cansado. Tu lenintoy ganó el combate.');
        else mensajeFinal('Tu lenintoy es un cobarde y se retiró de la partida. El lenintoy enemigo ganó la partida.');
        botones.forEach(boton => {
            boton.disabled = true;
        });
    } else {
        botones.forEach((boton, i) => {
            if(!(miLenintoy.ataques[i].gastado)) boton.disabled = false;
        });
        secuenciaAtaque();
    }
}

function combate () {
    clearInterval();
    if (ataqueJugador[ataqueJugador.length - 1] == ataqueEnemigo[ataqueEnemigo.length - 1]) {
        mensajes ('No tienen ningún efecto.');
    } else if (ataqueJugador[ataqueJugador.length - 1] == 'Agua' && ataqueEnemigo[ataqueEnemigo.length - 1] == 'Fuego' || ataqueJugador[ataqueJugador.length - 1] == 'Fuego' && ataqueEnemigo[ataqueEnemigo.length - 1] == 'Planta' || ataqueJugador[ataqueJugador.length - 1] == 'Planta' && ataqueEnemigo[ataqueEnemigo.length - 1] == 'Agua') {
        vidasEnemigo--;
        barraEnemigo.value = ''+ vidasEnemigo + '';
        spanVidasEnemigo.innerHTML = vidasEnemigo;
        mensajes ('¡El lenintoy enemigo ha perdido una vida!');
    } else {
        vidasJugador--;
        barraAliado.value = ''+ vidasJugador + '';
        spanVidasJugador.innerHTML = vidasJugador;
        mensajes ('¡Tu lenintoy ha perdido una vida!');
    }
    revisarVidas();
}

function reiniciarJuego (){
    location.reload();
}

function renderizar() {
    miLenintoy.x += miLenintoy.velocidadX;
    miLenintoy.y += miLenintoy.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(
        mapaBackground, 
        0,
        0,
        mapa.width,
        mapa.height
    );
    miLenintoy.renderizar();

    enviarPosicion(miLenintoy.x, miLenintoy.y);
    lenintoysEnemigos.forEach(lenintoy => {
        lenintoy.renderizar();
        revisarColision(lenintoy);
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.100.102:3000/lenintoy/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            x, //Así no pones x: x
            y
        })
    })
    .then(res => {
        if (res.ok) {
            res.json()
                .then(({ enemigos }) => {
                    lenintoysEnemigos = enemigos.map(enemigo => {
                        const lenintoyNombre = enemigo.lenintoy.nombre || '';
                        let lenintoyObjeto = null;
                        if (lenintoyNombre == 'Hipodoge') {
                            lenintoyObjeto = new Lenintoy('Hipodoge', './assets/hipodoge.svg', 5, './assets/hipodoge-cara.svg', enemigo.id);
                        } else if (lenintoyNombre == 'Cucho') {
                            lenintoyObjeto = new Lenintoy('Cucho', './assets/cucho.svg', 5, './assets/cucho-cara.svg', enemigo.id);
                        } else if (lenintoyNombre == 'Jimi') {
                            lenintoyObjeto = new Lenintoy('Jimi', './assets/jimi.svg', 5, './assets/jimi-cara.svg', enemigo.id);
                        }
                        lenintoyObjeto.x = enemigo.x;
                        lenintoyObjeto.y = enemigo.y;
                        return lenintoyObjeto;
                    });
                    
                })
        }
    })
}

function moverArriba() {
    miLenintoy.velocidadY = -5;
}

function moverIzquierda() {
    miLenintoy.velocidadX = -5;
}

function moverAbajo() {
    miLenintoy.velocidadY = 5;
}

function moverDerecha() {
    miLenintoy.velocidadX = 5;
}

function detenerMovimiento() {
    miLenintoy.velocidadX = 0;
    miLenintoy.velocidadY = 0;
}

function iniciarMapa() {
    miLenintoy = obtenerObjetoLenintoy();
    window.addEventListener('keydown', teclaPresionada);
    window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoLenintoy () {
    for (let i = 0; i < lenintoys.length; i++) {
        if (lenintoyJugador == lenintoys[i].nombre){
            return lenintoys[i];
        }
    }
}

function revisarColision(enemigo) {
    const arribaLenintoyEnemigo = enemigo.y;
    const abajoLenintoyEnemigo = enemigo.y + enemigo.alto;
    const derechaLenintoyEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaLenintoyEnemigo = enemigo.x;
    const arribaLenintoy = miLenintoy.y;
    const abajoLenintoy = miLenintoy.y + miLenintoy.alto;
    const derechaLenintoy = miLenintoy.x + miLenintoy.ancho;
    const izquierdaLenintoy = miLenintoy.x;

    if (
        abajoLenintoy < arribaLenintoyEnemigo ||
        arribaLenintoy > abajoLenintoyEnemigo ||
        derechaLenintoy < izquierdaLenintoyEnemigo ||
        izquierdaLenintoy > derechaLenintoyEnemigo
    ) {
        return;
    } else {
        detenerMovimiento();
        clearInterval(intervalo);
        enemigoId = enemigo.id;
        seccionMapa.classList.replace('seccion-mapa', 'oculto');
        seccionVidas.classList.replace('oculto', 'vidas');
        contenedorBarras.classList.replace('oculto', 'vidas');
        seccionAtaque.classList.replace('oculto', 'body__seleccionar');
        mensajeEleccionAtaque.classList.replace('oculto', 'body__h2');
        contenedorLenintoys.classList.replace('oculto', 'batalla');
        secccionMensajes.classList.replace('oculto', 'mensajes');
        seleccionarLenintoyEnemigo(enemigo);
    }
}