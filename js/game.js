let posicion = 0;
let dinero = 1500;
let turno = 1;
let miJugador = 1;

// WebSocket al backend
const socket = new WebSocket("wss://axium-backend.onrender.com");

socket.addEventListener("open", () => {
  console.log("🟢 Conectado al WebSocket");
  socket.send(JSON.stringify({ type: "join", playerId: miJugador }));
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "move" && data.playerId !== miJugador) {
    moverFicha(data.playerId, data.position);
  }

  if (data.type === "turn") {
    turno = data.nextTurn;
    document.getElementById("turno-info").innerText = `Turno del jugador ${turno}`;
  }

  if (data.type === "system") {
    console.log(data.message);
  }
});

const tablero = document.getElementById("tablero");
const botonDado = document.getElementById("lanzarDado");
const dineroInfo = document.getElementById("dinero-info");

for (let i = 0; i < 20; i++) {
  const casilla = document.createElement("div");
  casilla.classList.add("casilla");
  casilla.innerText = i;
  casilla.id = `casilla-${i}`;
  tablero.appendChild(casilla);
}

function moverFicha(jugador, nuevaPosicion) {
  const fichaId = `ficha-${jugador}`;
  let ficha = document.getElementById(fichaId);

  if (!ficha) {
    ficha = document.createElement("div");
    ficha.id = fichaId;
    ficha.classList.add("ficha");
    ficha.innerText = jugador;
    tablero.appendChild(ficha);
  }

  const casillaDestino = document.getElementById(`casilla-${nuevaPosicion}`);
  if (casillaDestino) {
    ficha.style.left = casillaDestino.offsetLeft + "px";
    ficha.style.top = casillaDestino.offsetTop + "px";
  }
}

botonDado.addEventListener("click", () => {
  if (turno !== miJugador) {
    alert("No es tu turno");
    return;
  }

  const dado = Math.floor(Math.random() * 6) + 1;
  posicion = (posicion + dado) % 20;

  if (posicion < dado) {
    dinero += 200; // pasó por la salida
    dineroInfo.innerText = `Dinero: $${dinero}`;
  }

  moverFicha(miJugador, posicion);

  socket.send(JSON.stringify({
    type: "move",
    playerId: miJugador,
    position: posicion,
    money: dinero
  }));

  const siguiente = miJugador === 1 ? 2 : 1;
  socket.send(JSON.stringify({ type: "turn", nextTurn: siguiente }));
});
