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

    window.location.href = "tesks.html";
    
}

if(seccion=="notas"){
   
    window.location.href = "files.html";
}

if(seccion=="configuraciones"){
    
 
}
}

/* modo tiempo */
function cambiartiempo(modo,btn){
    activarGrupo(btn)
    modoTiempo = modo

}

/* base */

/* inicio */
cambiarSeccion("configuraciones", document.querySelector(".nav-btn.active"))