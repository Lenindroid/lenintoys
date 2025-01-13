const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())


const jugadores = [];

class Jugador {
    constructor (id) {
        this.id = id;
    }

    asignarLenintoy(lenintoy) {
        this.lenintoy = lenintoy;
    }

    actualizarPosicion (x, y) {
        this.x = x;
        this.y = y;
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
    console.log(jugadores);
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

app.listen(3000, ()=> {
    console.log('Ya prendió tú');
});