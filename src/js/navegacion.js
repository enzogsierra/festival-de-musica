document.addEventListener("DOMContentLoaded", function()
{
    scrollNav();
    navegacionFija();
})

function navegacionFija()
{
    const header = document.querySelector(".header"); // Seleccionamos el header (elmemento que queremos mostrar fijo)
    const observer = new IntersectionObserver(function(entries) // Función
    {
        if(entries[0].isIntersecting) 
        {
            document.querySelector(".video").style.marginTop = "0";

            header.classList.remove("header-fijar");  
        }
        else 
        {
            document.querySelector(".video").style.marginTop = document.querySelector(".header").offsetHeight + "px"; // Rellenar la parte vacía que dejaría el nav
            
            header.classList.add("header-fijar");
        }
    })
    observer.observe(document.querySelector(".element-observer")); // Seleccionamos el elemento que queremos observar si está visible o no
}

function scrollNav()
{
    const links = document.querySelectorAll(".navegacion-principal a"); // Seleccionamos todos los enlaces del nav
    //links.addEventListener("click", function()) // No se puede usar addeventlistener a un listado de multiples elementos (".navegacion princial a"), solo se puede a 1
    links.forEach(function(link) // Se tiene que iterar en cada uno de los elementos (botones)
    {
        link.addEventListener("click", function(e)
        {
            e.preventDefault(); // Previene el scroll por default del navegador

            const section = document.querySelector(e.target.attributes.href.value);
            section.scrollIntoView({behavior: "smooth"});
        })
    })

    // Header
    document.querySelector("#header").addEventListener("click", function(e) // Seleccionamos al elemento que queremos escuchar cuando haga click
    {
        document.querySelector(".video").style.marginTop = "0"; // Eliminamos el margin del div.video (evitar bug)
        document.querySelector("body").scrollIntoView({behavior: "smooth"}); // Buscamos el <body> y nos movemos hacia ahí
    })
}