
document.addEventListener("DOMContentLoaded", () => {


    // ********** index.html **********//


    const historias = [
        {
            nombre: "Diego Barrantes",
            texto: "Desde que comencé a entrenar con Esteban, he notado un gran cambio físico, pero lo más importante es cómo he mejorado mis hábitos y mi bienestar en general. He aprendido la importancia de la movilidad diaria y, cada día, me siento mejor conmigo mismo. Este proceso ha sido más que solo un cambio en mi cuerpo; ha sido un crecimiento personal que me llena de orgullo. ¡Estoy disfrutando cada paso del camino! 💪🔥"
        },
        {
            nombre: "Maria Cortes",
            texto: "En mi caso, he logrado ir moldeando mi cuerpo, estoy más fuerte y he mejorado la calidad de mis movimientos. Continúo en el proceso, estoy muy contenta con los resultados y sigo adelante con mis objetivos gracias al coach Esteban."
        },
        {
            nombre: "Dylana Rojas",
            texto: "Pensé que, por mi edad, era más difícil alcanzar mejores objetivos; sin embargo, con mi entrenador Esteban, he logrado bajar 6 kilos. Me ha motivado muchísimo; no solo me ha proporcionado un excelente entrenamiento físico, sino que también me ha ayudado con técnicas de relajación, a mejorar la respiración (súper importante) y a llevar una nutrición adecuada. Me siento súper contenta porque este plan ha superado mis expectativas."
        },
        {
            nombre: "Carlos Matarrita",
            texto: "Desde que inicié con el coach Esteban, me gustó su simplicidad. Me agradó que realizara una evaluación integral, considerando el estrés, el estilo de vida y las mediciones corporales. El plan me ha hecho sentir una persona más fuerte, y me encanta mi cambio físico. Tengo más masa muscular, me veo más grande y he podido transformar mi cuerpo; por ende, mi mentalidad ahora es más positiva. Seguimos avanzando por más logros."
        },
        {
            nombre: "Lainer Granados",
            texto: "Durante el tiempo que he seguido el plan de entrenamiento, he notado un cambio progresivo en mi fuerza, lo que me ha permitido ejecutar los ejercicios con mayor facilidad y eficiencia. Este aumento de fuerza también ha contribuido al desarrollo de mi masa muscular, logrando una mejora notable en mi físico y rendimiento."
        },
        {
            nombre: "Mario Vázquez",
            texto: "Me ha parecido un programa muy completo y me he sentido muy bien. He tenido cambios notables en poco tiempo."
        },
        {
            nombre: "Sol Barrantes",
            texto: "El coach Esteban brinda un servicio excelente, donde procura el bienestar de sus clientes cuidando la postura de cada uno para evitar lesiones, procura mantenernos motivados en cada rutina y proporcionarnos claves para una adecuada respiración para llevarnos a dar el máximo que nuestro cuerpo nos permita! Lo recomiendo al 100%."
        }
    ];

    const testimonio = document.getElementById("testimonio");
    const nombreCliente = document.getElementById("nombre-cliente");
    const botonAnteriorHistoria = document.getElementById("anterior");
    const botonSiguienteHistoria = document.getElementById("siguiente");

    if (
        testimonio &&
        nombreCliente &&
        botonAnteriorHistoria &&
        botonSiguienteHistoria
    ) {
        let indiceHistoria = 0;

        function mostrarHistoria() {
            testimonio.textContent =
                `"${historias[indiceHistoria].texto}"`;

            nombreCliente.textContent =
                historias[indiceHistoria].nombre;
        }

        botonAnteriorHistoria.addEventListener("click", () => {
            indiceHistoria =
                (indiceHistoria - 1 + historias.length) % historias.length;

            mostrarHistoria();
        });

        botonSiguienteHistoria.addEventListener("click", () => {
            indiceHistoria =
                (indiceHistoria + 1) % historias.length;

            mostrarHistoria();
        });

        mostrarHistoria();
    }


    // ********** sobre-mi.html **********//

    const pistaCarrusel = document.querySelector(
        ".carrusel-fade-container"
    );

    if (pistaCarrusel) {
        const imagenes = pistaCarrusel.querySelectorAll(".slide");

        const botonAnterior = document.querySelector(
            ".carrusel-btn.anterior"
        );

        const botonSiguiente = document.querySelector(
            ".carrusel-btn.siguiente"
        );

        if (
            imagenes.length > 0 &&
            botonAnterior &&
            botonSiguiente
        ) {
            let indiceCarrusel = 0;
            let intervaloCarrusel = null;

            function imagenesVisibles() {
                return window.innerWidth <= 600 ? 2 : 3;
            }

            function obtenerMaxIndice() {
                return Math.max(
                    0,
                    imagenes.length - imagenesVisibles()
                );
            }

            function moverCarrusel() {
                const maxIndice = obtenerMaxIndice();

                indiceCarrusel = Math.max(
                    0,
                    Math.min(indiceCarrusel, maxIndice)
                );

                const anchoImagen =
                    imagenes[0].getBoundingClientRect().width;

                const estilos = getComputedStyle(pistaCarrusel);
                const espacio = parseFloat(estilos.gap) || 0;

                const desplazamiento =
                    indiceCarrusel * (anchoImagen + espacio);

                pistaCarrusel.style.transform =
                    `translateX(-${desplazamiento}px)`;
            }

            function siguienteImagen() {
                const maxIndice = obtenerMaxIndice();

                indiceCarrusel =
                    indiceCarrusel >= maxIndice
                        ? 0
                        : indiceCarrusel + 1;

                moverCarrusel();
            }

            function anteriorImagen() {
                const maxIndice = obtenerMaxIndice();

                indiceCarrusel =
                    indiceCarrusel <= 0
                        ? maxIndice
                        : indiceCarrusel - 1;

                moverCarrusel();
            }

            function iniciarAutomatico() {
                clearInterval(intervaloCarrusel);

                intervaloCarrusel = setInterval(
                    siguienteImagen,
                    5000
                );
            }

            botonSiguiente.addEventListener("click", () => {
                siguienteImagen();
                iniciarAutomatico();
            });

            botonAnterior.addEventListener("click", () => {
                anteriorImagen();
                iniciarAutomatico();
            });

            window.addEventListener("resize", moverCarrusel);
            
            const promesasImagenes = Array.from(imagenes).map(
                (imagen) => {
                    if (imagen.complete) {
                        return Promise.resolve();
                    }
                    return new Promise((resolve) => {
                        imagen.addEventListener("load", resolve, {
                            once: true
                        });
                        imagen.addEventListener("error", resolve, {
                            once: true
                        });
                    });
                }
            );

            Promise.all(promesasImagenes).then(() => {
                indiceCarrusel = 0;
                moverCarrusel();
                iniciarAutomatico();
            });
        }
    }
});