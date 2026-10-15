/* ================================
   SOFTY CAKES - GALERÍA DE VIDEOS
================================ */

document.addEventListener("DOMContentLoaded", () => {

    const botonesVideo = document.querySelectorAll(".video-trigger");
    const modal = document.getElementById("modal-video");
    const botonCerrar = document.getElementById("cerrar-modal");
    const reproductor = document.getElementById("video-reproductor");

    if (!modal || !botonCerrar || !reproductor) {
        console.error("No se encontraron los elementos necesarios para reproducir los videos.");
        return;
    }

    let ultimoBotonActivo = null;

    // ABRIR VIDEO
    function abrirVideo(rutaVideo, boton) {

        if (!rutaVideo) return;

        ultimoBotonActivo = boton;

        reproductor.pause();
        reproductor.src = rutaVideo;
        reproductor.load();

        modal.classList.add("activo");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-abierto");

        const promesaReproduccion = reproductor.play();

        if (
            promesaReproduccion &&
            typeof promesaReproduccion.catch === "function"
        ) {
            promesaReproduccion.catch(() => {
                // Si el navegador no permite la reproducción automática,
                // el visitante puede pulsar Play en los controles del video.
            });
        }

        botonCerrar.focus();
    }

    // CERRAR VIDEO
    function cerrarVideo() {

        modal.classList.remove("activo");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-abierto");

        reproductor.pause();
        reproductor.removeAttribute("src");
        reproductor.load();

        if (ultimoBotonActivo) {
            ultimoBotonActivo.focus();
        }
    }

    // ASIGNAR CADA VIDEO A SU BOTÓN
    botonesVideo.forEach((boton) => {

        boton.addEventListener("click", () => {
            abrirVideo(boton.dataset.video, boton);
        });

    });

    // CERRAR CON LA X
    botonCerrar.addEventListener("click", cerrarVideo);

    // CERRAR AL PULSAR EL FONDO OSCURO
    modal.addEventListener("click", (evento) => {

        if (evento.target === modal) {
            cerrarVideo();
        }

    });

    // CERRAR CON LA TECLA ESCAPE
    document.addEventListener("keydown", (evento) => {

        if (
            evento.key === "Escape" &&
            modal.classList.contains("activo")
        ) {
            cerrarVideo();
        }

    });

    // ANIMACIÓN DE APARICIÓN DE LAS TARJETAS AL DESPLAZARSE
    const tarjetas = document.querySelectorAll(".video-card");

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver(
            (entradas, observer) => {

                entradas.forEach((entrada) => {

                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visible");
                        observer.unobserve(entrada.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        tarjetas.forEach((tarjeta) => {
            observador.observe(tarjeta);
        });

    } else {

        // Alternativa para navegadores antiguos
        tarjetas.forEach((tarjeta) => {
            tarjeta.classList.add("visible");
        });

    }

});