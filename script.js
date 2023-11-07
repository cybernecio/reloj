// Comentario que indica que fue hecho por "Cybernecio"
// Tu código JavaScript aquí
// Comentario que indica que fue hecho por "Cybernecio"

// Variables
let sessionLength = 25; // Duración de la sesión en minutos
let breakLength = 5;   // Duración de la pausa en minutos
let isSession = true;   // Variable para rastrear si está en sesión o pausa
let isRunning = false;  // Variable para rastrear si el temporizador está en funcionamiento
let timerInterval;      // Variable para almacenar el intervalo del temporizador

// Función para actualizar la visualización del temporizador
function updateDisplay() {
    let minutes = isSession ? sessionLength : breakLength;
    let seconds = 0;

    document.getElementById("timer-label").textContent = isSession ? "Session" : "Break";

    if (isRunning) {
        const timeLeft = document.getElementById("time-left").textContent.split(":");
        minutes = parseInt(timeLeft[0]);
        seconds = parseInt(timeLeft[1]);
    }

    document.getElementById("time-left").textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Función para cambiar la duración de la sesión o la pausa
function changeDuration(id, value) {
    if (!isRunning) {
        if (id === "session-length") {
            sessionLength += value;
            if (sessionLength < 1) sessionLength = 1;
            if (sessionLength > 60) sessionLength = 60;
        } else if (id === "break-length") {
            breakLength += value;
            if (breakLength < 1) breakLength = 1;
            if (breakLength > 60) breakLength = 60;
        }
        updateDisplay();
    }
}

// Función para iniciar o detener el temporizador
function startStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    } else {
        isRunning = true;
        timerInterval = setInterval(updateTimer, 1000);
    }
}

// Función para actualizar el temporizador
function updateTimer() {
    let timeLeft = document.getElementById("time-left").textContent.split(":");
    let minutes = parseInt(timeLeft[0]);
    let seconds = parseInt(timeLeft[1]);

    if (minutes === 0 && seconds === 0) {
        document.getElementById("beep").play();
        if (isSession) {
            isSession = false;
            minutes = breakLength;
        } else {
            isSession = true;
            minutes = sessionLength;
        }
    } else {
        if (seconds === 0) {
            seconds = 59;
            minutes--;
        } else {
            seconds--;
        }
    }

    document.getElementById("time-left").textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Función para reiniciar el temporizador
function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    sessionLength = 25;
    breakLength = 5;
    isSession = true;
    isRunning = false;
    updateDisplay();
}

// Asignar eventos a los elementos
document.getElementById("break-decrement").addEventListener("click", () => changeDuration("break-length", -1));
document.getElementById("break-increment").addEventListener("click", () => changeDuration("break-length", 1));
document.getElementById("session-decrement").addEventListener("click", () => changeDuration("session-length", -1));
document.getElementById("session-increment").addEventListener("click", () => changeDuration("session-length", 1));
document.getElementById("start_stop").addEventListener("click", startStop);
document.getElementById("reset").addEventListener("click", resetTimer);

// Inicializar la visualización
updateDisplay();
