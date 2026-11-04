const botonesDias = document.querySelectorAll("button[data-dia]");
const seccionesDias = document.querySelectorAll("section.dias");
const bienvenida = document.querySelector(".bienvenida");
const mensajePrincipal = document.querySelector(".bocadillo-linea-principal");
const mensajeSecundario = document.querySelector(".bocadillo-linea-secundaria");
const contadorRacha = document.querySelector("#racha-contador");
const botonRacha = document.querySelector("#racha-boton");
const mensajeRacha = document.querySelector("#racha-mensaje");
const claveRacha = "the-plan-dias-completados";
const enlacesEjercicios = {
    "Curl de bíceps": "https://www.youtube.com/results?search_query=curl+biceps+mancuernas+tecnica",
    "Curl martillo": "https://www.youtube.com/results?search_query=curl+martillo+mancuernas+tecnica",
    "Press de hombros": "https://www.youtube.com/results?search_query=press+de+hombros+mancuernas+tecnica",
    "Elevaciones laterales": "https://www.youtube.com/results?search_query=elevaciones+laterales+mancuernas+tecnica",
    "Extensión de tríceps sobre cabeza": "https://www.youtube.com/results?search_query=extension+triceps+por+encima+cabeza+mancuerna",
    "Flexiones cerradas": "https://www.youtube.com/results?search_query=flexiones+cerradas+triceps+tecnica",
    "Remo a una mano": "https://www.youtube.com/results?search_query=remo+mancuerna+una+mano+tecnica",
    "Sentadilla goblet": "https://www.youtube.com/results?search_query=sentadilla+goblet+mancuerna+tecnica",
    "Peso muerto rumano": "https://www.youtube.com/results?search_query=peso+muerto+rumano+mancuernas+tecnica",
    "Hip thrust": "https://www.youtube.com/results?search_query=hip+thrust+mancuerna+en+casa",
    "Zancadas atrás": "https://www.youtube.com/results?search_query=zancadas+hacia+atras+tecnica",
    "Curl femoral con banda": "https://www.youtube.com/results?search_query=curl+femoral+banda+elastica+en+casa",
    "Abducción con banda": "https://www.youtube.com/results?search_query=abduccion+cadera+banda+elastica+tecnica",
    "Elevación de gemelos": "https://www.youtube.com/results?search_query=elevacion+gemelos+mancuernas+tecnica",
    "Plancha frontal": "https://www.youtube.com/results?search_query=plancha+abdominal+tecnica+correcta",
    "Dead bug": "https://www.youtube.com/results?search_query=dead+bug+ejercicio+abdominal+tecnica",
    "Crunch inverso": "https://www.youtube.com/results?search_query=crunch+inverso+tecnica",
    "Plancha lateral": "https://www.youtube.com/results?search_query=plancha+lateral+tecnica",
    "Curl concentrado": "https://www.youtube.com/results?search_query=curl+concentrado+mancuerna+tecnica",
    "Curl con banda": "https://www.youtube.com/results?search_query=curl+biceps+banda+elastica",
    "Puente con banda": "https://www.youtube.com/results?search_query=puente+gluteos+banda+elastica",
    "Patada de glúteo con banda": "https://www.youtube.com/results?search_query=patada+gluteo+banda+elastica+tecnica",
    "Pallof press": "https://www.youtube.com/results?search_query=pallof+press+banda+elastica+tecnica",
    "Press de pecho en suelo": "https://www.youtube.com/results?search_query=dumbbell+floor+press+espanol+tecnica",
    "Patada de tríceps": "https://www.youtube.com/results?search_query=patada+triceps+mancuerna+tecnica",
    "Extensión de tríceps con banda": "https://www.youtube.com/results?search_query=extension+triceps+banda+elastica",
};

function esFechaValida(fecha) {
    if (typeof fecha !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        return false;
    }

    const [anyo, mes, dia] = fecha.split("-").map(Number);
    const fechaUtc = new Date(Date.UTC(anyo, mes - 1, dia));
    return fechaUtc.getUTCFullYear() === anyo
        && fechaUtc.getUTCMonth() === mes - 1
        && fechaUtc.getUTCDate() === dia;
}

function cargarDiasCompletados() {
    const guardado = localStorage.getItem(claveRacha);
    if (guardado === null) {
        return new Set();
    }

    const fechas = JSON.parse(guardado);
    if (!Array.isArray(fechas) || !fechas.every(esFechaValida)) {
        throw new Error("Los datos guardados de la racha no tienen un formato válido.");
    }

    return new Set(fechas);
}

let diasCompletados = new Set();
let almacenamientoDisponible = true;
try {
    diasCompletados = cargarDiasCompletados();
} catch {
    almacenamientoDisponible = false;
    botonRacha.disabled = true;
    mensajeRacha.textContent = "No se pudo leer la racha guardada en este navegador.";
}

function obtenerFechaLocal(fecha) {
    const anyo = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${anyo}-${mes}-${dia}`;
}

function esDiaEntrenable(fecha) {
    const diaSemana = fecha.getDay();
    return diaSemana !== 0 && diaSemana !== 4;
}

function diaEntrenableAnterior(fecha) {
    const anterior = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - 1, 12);
    while (!esDiaEntrenable(anterior)) {
        anterior.setDate(anterior.getDate() - 1);
    }
    return anterior;
}

function calcularRacha() {
    const hoy = new Date();
    let fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 12);

    if (!esDiaEntrenable(fecha) || !diasCompletados.has(obtenerFechaLocal(fecha))) {
        fecha = diaEntrenableAnterior(fecha);
    }

    let racha = 0;
    while (diasCompletados.has(obtenerFechaLocal(fecha))) {
        racha += 1;
        fecha = diaEntrenableAnterior(fecha);
    }
    return racha;
}

function actualizarRacha(mensaje) {
    const hoy = new Date();
    const claveHoy = obtenerFechaLocal(hoy);
    const esDescanso = !esDiaEntrenable(hoy);
    const completadaHoy = diasCompletados.has(claveHoy);

    contadorRacha.textContent = String(calcularRacha());
    botonRacha.disabled = !almacenamientoDisponible || esDescanso;
    botonRacha.textContent = esDescanso
        ? "Hoy toca descansar"
        : completadaHoy
            ? "Deshacer marca de hoy"
            : "Marcar rutina de hoy";

    if (mensaje) {
        mensajeRacha.textContent = mensaje;
    } else if (!almacenamientoDisponible) {
        mensajeRacha.textContent = "No se pudo leer la racha guardada en este navegador.";
    } else if (esDescanso) {
        mensajeRacha.textContent = "Jueves y domingos no cuentan para la racha.";
    } else if (completadaHoy) {
        mensajeRacha.textContent = "¡Rutina de hoy completada!";
    } else {
        mensajeRacha.textContent = "Cuando termines, marca la rutina de hoy.";
    }
}

botonRacha.addEventListener("click", () => {
    const hoy = new Date();
    if (!esDiaEntrenable(hoy)) {
        actualizarRacha();
        return;
    }

    const claveHoy = obtenerFechaLocal(hoy);
    const nuevasFechas = new Set(diasCompletados);
    const quitarMarca = nuevasFechas.has(claveHoy);

    if (quitarMarca) {
        nuevasFechas.delete(claveHoy);
    } else {
        nuevasFechas.add(claveHoy);
    }

    try {
        localStorage.setItem(claveRacha, JSON.stringify([...nuevasFechas]));
        diasCompletados = nuevasFechas;
        actualizarRacha(quitarMarca ? "Se quitó la marca de hoy." : "¡Día guardado en tu racha!");
    } catch {
        almacenamientoDisponible = false;
        botonRacha.disabled = true;
        mensajeRacha.textContent = "No se pudo guardar la racha en este navegador.";
    }
});

actualizarRacha();

document.querySelectorAll(".dias li").forEach((ejercicio) => {
    const textoEjercicio = ejercicio.textContent.trim();
    const nombreEjercicio = textoEjercicio.split(" — ")[0];
    const etiqueta = document.createElement("label");
    const casilla = document.createElement("input");
    const texto = document.createElement("span");

    etiqueta.className = "ejercicio";
    casilla.type = "checkbox";
    casilla.className = "ejercicio-checkbox";
    texto.className = "ejercicio-texto";
    texto.textContent = textoEjercicio;

    etiqueta.append(casilla, texto);
    ejercicio.replaceChildren(etiqueta);

    const url = enlacesEjercicios[nombreEjercicio];
    if (url) {
        const enlace = document.createElement("a");
        enlace.className = "ejercicio-enlace";
        enlace.href = url;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
        enlace.setAttribute("aria-label", `Ver técnica: ${textoEjercicio}`);
        enlace.textContent = "Ver técnica";
        ejercicio.append(enlace);
    }
});

botonesDias.forEach((boton) => {
    boton.addEventListener("click", () => {
        const diaSeleccionado = boton.dataset.dia;
        const seccionActiva = [...seccionesDias].find((seccion) => !seccion.hidden);
        const cerrarDia = seccionActiva?.id === diaSeleccionado;

        seccionesDias.forEach((seccion) => {
            seccion.hidden = cerrarDia || seccion.id !== diaSeleccionado;
        });
        bienvenida.hidden = false;
        mensajePrincipal.textContent = cerrarDia
            ? "¿Lista para empezar?"
            : "Recuerda mínimo 20-30";
        mensajeSecundario.textContent = cerrarDia
            ? "¡Selecciona un día!"
            : "minutos de caminar!";

        botonesDias.forEach((botonDia) => {
            botonDia.setAttribute(
                "aria-pressed",
                String(!cerrarDia && botonDia.dataset.dia === diaSeleccionado)
            );
        });
    });
});
