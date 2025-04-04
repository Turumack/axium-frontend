const socket = new WebSocket("wss://axium-backend.onrender.com");

let currentPlayer = {
  username: localStorage.getItem('username') || 'Jugador',
  position: 0
};

// Elementos DOM
const tablero = document.getElementById('tablero');
const lanzarBtn = document.getElementById('lanzarBtn');

// Crear tablero básico (40 casillas por ahora)
const casillasTotales = 40;
for (let i = 0; i < casillasTotales; i++) {
  const casilla = document.createElement('div');
  casilla.classList.add('casilla');
  casilla.textContent = i + 1;
  tablero.appendChild(casilla);
}

// Crear ficha del jugador
const ficha = document.createElement('div');
ficha.classList.add('ficha');
ficha.textContent = currentPlayer.username.charAt(0).toUpperCase(); // Inicial
tablero.children[0].appendChild(ficha);

// Función para lanzar dado
function lanzarDado() {
  const resultado = Math.floor(Math.random() * 24) + 1;
  alert(`${currentPlayer.username} lanzó un dado: 🎲 ${resultado}`);
  moverFicha(resultado);
}

// Mover la ficha en el tablero
function moverFicha(pasos) {
  // Eliminar ficha de casilla actual
  tablero.children[currentPlayer.position].removeChild(ficha);

  // Calcular nueva posición
  currentPlayer.position = (currentPlayer.position + pasos) % casillasTotales;

  // Colocar ficha en nueva casilla
  tablero.children[currentPlayer.position].appendChild(ficha);

  // Notificar al servidor (WebSocket)
  socket.send(JSON.stringify({
    type: 'movimiento',
    jugador: currentPlayer.username,
    posicion: currentPlayer.position
  }));
}

// Evento de clic en botón
lanzarBtn.addEventListener('click', lanzarDado);

// WebSocket abierto
socket.addEventListener('open', () => {
  console.log("🟢 Conectado al WebSocket");
});

// WebSocket recibe mensajes
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'movimiento') {
    console.log(`${data.jugador} se movió a la casilla ${data.posicion}`);
    // Aquí podrías actualizar otros jugadores en pantalla
  }
});
