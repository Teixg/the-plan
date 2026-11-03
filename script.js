const botonesDias = document.querySelectorAll("button[data-dia]");
const seccionesDias = document.querySelectorAll("section.dias");
const bienvenida = document.querySelector(".bienvenida");
const mensajePrincipal = document.querySelector(".bocadillo-linea-principal");
const mensajeSecundario = document.querySelector(".bocadillo-linea-secundaria");

document.querySelectorAll(".dias li").forEach((ejercicio) => {
    const textoEjercicio = ejercicio.textContent.trim();
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
