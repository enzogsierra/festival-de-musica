const {series, src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require("dart-sass")); // IMPORTANTE: npm i --save-dev dart-sass
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const concat = require("gulp-concat");
//const notify = require("gulp-notify");


// Utilidades CSS
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");

// Utilidades JS
const terser = require("gulp-terser-js");
const rename = require("gulp-rename");



// Funciones
function css() // Compilar .SCSS a .CSS
{
    return src("./src/scss/app.scss")
        .pipe(sourcemaps.init()) // Iniciar maps
        .pipe(sass()) // Compilar SCSS a CSS
        .pipe(postcss([autoprefixer(), cssnano()])) // Post procesado
        .pipe(sourcemaps.write(".")) // Escribir maps
        .pipe(dest("./build/css")); // Carpeta de destino
}

function javascript()
{
    return src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("bundle.js"))
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(rename({suffix: ".min"}))
        .pipe(dest("./build/js"));
}

function imagenes() // Minificar (reducir el tamaño de) imágenes
{
    return src("src/img/**/*")
        .pipe(imagemin())
        .pipe(dest("./build/img"));
        //.pipe(notify({message: "Imagen minificada"}));
}

function versionWebp() // Convertir imágenes a archivos .webp
{
    return src("src/img/**/*")
        .pipe(webp())
        .pipe(dest("./build/img"));
}

function Watch() // Automatizar el compilado de archivos .SCSS
{
    watch("./src/scss/**/*.scss", css); // ** Todas las carpetas - * Todos los archivos
    watch("./src/js/**/*.js", javascript);
}

// Exportar
exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.Watch = Watch;
exports.default = series(css, javascript, imagenes, versionWebp, Watch);