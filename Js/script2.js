let sidebar = document.getElementById("sidebar")
let overlay = document.getElementById("overlay")



document.getElementById("toggleBtn").onclick = () =>
{
    sidebar.classList.toggle("oculta")
    overlay.classList.toggle("activo")
}

overlay.onclick = () =>
{
    sidebar.classList.add("oculta")
    overlay.classList.remove("activo")
}

/* activar grupo */
function activarGrupo(btn){
    let cont = btn.parentElement
    cont.querySelectorAll(".nav-btn")
    .forEach(b=>b.classList.remove("active"))
    btn.classList.add("active")
}

/* cambiar seccion */
function cambiarSeccion(seccion,btn){

activarGrupo(btn)

let barra = document.getElementById("barra-tiempo")
let cal = document.getElementById("contenido")
let sec = document.getElementById("contenido-secundario")

if(seccion=="calendario"){
    
    window.location.href = "index.html";
    return
}



if(seccion=="tareas"){

    
    barra.classList.remove("oculto")
    cal.classList.remove("oculto")
    sec.classList.add("oculto")
}

if(seccion=="notas"){
    sec.innerHTML="<h2>Registros</h2>"
    barra.classList.add("oculto")
    cal.classList.add("oculto")
    sec.classList.remove("oculto")
}

if(seccion=="configuraciones"){
    sec.innerHTML="<h2>Configuraciones</h2>"
    barra.classList.add("oculto")
    cal.classList.add("oculto")
    sec.classList.remove("oculto")
}
}

/* modo tiempo */
function cambiartiempo(modo,btn){
    activarGrupo(btn)
    modoTiempo = modo

}

/* base */

/* inicio */
cambiarSeccion("tareas", document.querySelector(".nav-btn.active"))