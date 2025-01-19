const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())


const jugadores = [];

class Jugador {
    constructor (id) {
        this.id = id;
        this.enemigo = '';
        this.turno = -1;
    }

    asignarLenintoy(lenintoy) {
        this.lenintoy = lenintoy;
    }

    actualizarPosicion (x, y) {
        this.x = x;
        this.y = y;
    }

    asignarAtaque(ataque) {
        this.ataque = ataque;
    }

    asignarEnemigo(enemigo) {
        this.enemigo = enemigo;
    }

    establecerTurno(turno) {
        this.turno = turno;
    }
}

class Lenintoy {
    constructor (nombre) {
        this.nombre = nombre;
    }
}

app.get('/unirse', (req, res)=>{
    const id = `${Math.random()}`;
    const jugador = new Jugador(id);
    jugadores.push(jugador);
    //res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(id);
});

app.post('/lenintoy/:jugadorId', (req, res)=>{
    const jugadorId = req.params.jugadorId || '';
    const nombre = req.body.lenintoy || '';
    const lenintoy = new Lenintoy(nombre);
    const jugadorIndex = jugadores.findIndex(jugador => jugadorId == jugador.id);

    if (jugadorIndex >= 0) jugadores[jugadorIndex].asignarLenintoy(lenintoy);
    res.end();
});

app.post('/lenintoy/:jugadorId/posicion', (req, res)=> {
    const jugadorId = req.params.jugadorId || '';
    const x = req.body.x || 0;
    const y = req.body.y || 0;
    const jugadorIndex = jugadores.findIndex(jugador => jugadorId == jugador.id);
    
    if (jugadorIndex >= 0) jugadores[jugadorIndex].actualizarPosicion(x, y);

    const enemigos = jugadores.filter(jugador=> jugadorId != jugador.id);
    res.send({
        enemigos
    })
    res.end();
})

/*
app.post('/lenintoy/:jugadorId/ataques', (req, res)=>{
    const jugadorId = req.params.jugadorId || '';
    const ataque = req.body.ataque || '';
    const jugadorIndex = jugadores.findIndex(jugador => jugadorId == jugador.id);
    if (jugadorIndex >= 0) jugadores[jugadorIndex].asignarAtaque(ataque);
    res.end();
});

app.get('/lenintoy/:jugadorId/ataques', (req, res)=> {
    const jugadorId = req.params.jugadorId || '';
    const jugador = jugadores.find(jugador => jugador.id == jugadorId);
    res.send({
        ataque: jugador.ataque || ''
    })
});
*/

app.post('/lenintoy/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || '';
    const enemigoId = req.body.enemigo || '';
    const ataque = req.body.ataque || '';
    const jugadorIndex = jugadores.findIndex(jugador => jugador.id == jugadorId);

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaque(ataque);
        jugadores[jugadorIndex].asignarEnemigo(enemigoId);
        jugadores[jugadorIndex].establecerTurno(ataque.length);
    }
    res.end();
});

app.get('/lenintoy/:jugadorId/ataques', (req, res) => {
    const jugadorId = req.params.jugadorId || '';
    const jugadorIndex = jugadores.findIndex(jugadorDelArray => jugadorDelArray.id == jugadorId);
    const jugador = jugadores[jugadorIndex];
    const enemigoIndex = jugadores.findIndex(jugadorDelArray => jugadorDelArray.id == jugador.enemigo);
    const enemigo = jugadores[enemigoIndex];
    //console.log(`Tu lt ${jugador.lenintoy.nombre} usa ${jugador.ataque} vs ${enemigo.lenintoy.nombre} usa ${enemigo.ataque}`);

    if (jugador) {
        res.send({
            ataques: jugador.ataque || [],
            listo: enemigo.turno == jugador.ataque.length // Verifica si ambos han enviado
        });
    } else {
        res.status(404).send({ error: 'Jugador no encontrado' });
    }
});


app.listen(3000, ()=> {
    console.log('Ya prendió tú');
});