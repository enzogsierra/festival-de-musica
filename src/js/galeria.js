document.addEventListener("DOMContentLoaded", function() // Es llamado cuando todo el documento se carga
{
    crearGaleria();
})

function crearGaleria()
{
    const galeria = document.querySelector(".galeria-img"); // Seleccionar el elemento
    for(let i = 1; i <= 12; i++)
    {
        const imagen = document.createElement("IMG"); // Crear nuevo elemento
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i; // Asignamos una ID a la imagen
        imagen.classList.add("galeria-everyimg");

        const lista = document.createElement("LI");
        lista.appendChild(imagen);
        galeria.appendChild(lista);

        // Añadir evento de mostrarImagen
        imagen.onclick = mostrarImagen;
    }
}

function mostrarImagen(e) // Es llamado cuando se presiona sobre una imagen
{   
    const id = parseInt(e.target.dataset.imagenId); // Obtenemos la ID de la imagen en un entero

    // Generar imagen
    const imagen = document.createElement("img");
    imagen.src = `build/img/grande/${id}.webp`;
    document.querySelector(".header").style.zIndex = 0; // Ocultar el header

    const overlay = document.createElement("div"); // Añadir el overlay
    overlay.appendChild(imagen);
    overlay.classList.add("galeria-overlay");

    // Boton de cerrar imagen
    const button = document.createElement("p");
    button.textContent = "X";
    button.classList.add("galeria-overlay__button");
    overlay.appendChild(button);

    // Cerrar la imagen
    overlay.onclick = function() // Al presionar en el overlay (afuera de la imagen)
    {
        document.querySelector(".header").style.zIndex = 2; // Poner el header en su zindex original
        overlay.remove(); // Elimina todo "overlay" y sus elementos (<div>, <p>)
        body.classList.remove("fijarbody"); // Para que se pueda hacer scroll
    }

    button.onclick = function() // Al presionar en el botton
    {
        document.querySelector(".header").style.zIndex = 2; // Poner el header en su zindex original
        overlay.remove(); 
        body.classList.remove("fijarbody");
    }

    // Mostrar en el HTML
    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijarbody"); // Añadimos la clase "fijarbody" al <body>
}
