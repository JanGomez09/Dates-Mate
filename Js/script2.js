let sidebar = document.getElementById("sidebar")
let overlay = document.getElementById("overlay")

let mode = "Hoy";

let tasklist = [];

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

    

}

if(seccion=="notas"){
    window.location.href = "files.html";
   
}

if(seccion=="configuraciones"){
    sec.innerHTML="<h2>Configuraciones</h2>"
    window.location.href = "settings.html";

}
}

/* modo tiempo */
function cambiartiempo(modo,btn){
    activarGrupo(btn)
    mode = modo
    
     let contenedor = document.getElementById("contenido");

    // limpiar contenido anterior (opcional)
    
    

    switch (modo){
        case "Completadas":
            contenedor.innerHTML = "";
            console.log("Yesterday");
        break;

        case "Hoy":
            contenedor.innerHTML = "";
            today_task();
        break;

        case "Proximamente":
            contenedor.innerHTML = "";
            console.log("Keep it coming back");
        break;

        case "Add":
            contenedor.innerHTML = "";
            console.log("Another brick");   
            
        break;
    }
}

function creatTaskpanel(){

}
function today_task(){

    let contenedor = document.getElementById("contenido");

    
    if (tasklist.length === 0){

        let img = document.createElement("img");
        img.src = "clipbeard.png";
        img.alt = "Sin tareas";
        img.style.width = "450px"; // opcional
        img.style.display = "block";
        img.style.margin = "30px auto";

        contenedor.appendChild(img);

        let title = document.createElement("p");
        title.textContent = "Felicidades, estas al dia";
        title.style.fontSize = "2.5em";
        title.style.fontWeight = "bold"
        title.style.textAlign = "center";

        contenedor.appendChild(title);

    } else {
        creatTaskpanel();
    }

}



/* base */

/* inicio */
cambiarSeccion("tareas", document.querySelector(".nav-btn.active"))