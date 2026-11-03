const botonesDias = document.querySelectorAll("button[data-dia]");
const seccionesDias = document.querySelectorAll("section.dias");
const bienvenida = document.querySelector(".bienvenida");
const mensajePrincipal = document.querySelector(".bocadillo-linea-principal");
const mensajeSecundario = document.querySelector(".bocadillo-linea-secundaria");
const enlacesEjercicios = {
    "Curl de bíceps": "https://www.youtube.com/results?search_query=curl+de+biceps+mancuernas+tecnica",
    "Curl martillo": "https://www.youtube.com/results?search_query=curl+martillo+mancuernas+tecnica",
    "Press de hombros": "https://www.youtube.com/results?search_query=press+de+hombros+mancuernas+tecnica",
    "Elevaciones laterales": "https://www.youtube.com/results?search_query=elevaciones+laterales+mancuernas+tecnica",
    "Extensión de tríceps sobre cabeza": "https://www.youtube.com/results?search_query=extension+triceps+por+encima+cabeza+mancuerna",
    "Flexiones cerradas": "https://www.youtube.com/results?search_query=flexiones+cerradas+triceps+tecnica",
    "Remo a una mano": "https://www.youtube.com/results?search_query=remo+mancuerna+una+mano+tecnica",
};

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
