let sidebar = document.getElementById("sidebar")
let overlay = document.getElementById("overlay")

let modoTiempo = "Mes"

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
    barra.classList.remove("oculto")
    cal.classList.remove("oculto")
    sec.classList.add("oculto")
    crearCalendario()
    return
}



if(seccion=="tareas"){
    sec.innerHTML="<h2>Tareas</h2>"
    window.location.href = "tesks.html";
}

if(seccion=="notas"){
    sec.innerHTML="<h2>Registros</h2>"
}

if(seccion=="configuraciones"){
    sec.innerHTML="<h2>Configuraciones</h2>"
}
}

/* modo tiempo */
function cambiartiempo(modo,btn){
    activarGrupo(btn)
    modoTiempo = modo
    crearCalendario()
}

/* base */
function crearCalendario(){

if(!window.fechaBase)
window.fechaBase = new Date()

if(modoTiempo=="Mes") renderMes()
if(modoTiempo=="Semana") renderSemana()
if(modoTiempo=="Año") renderAño()
}

/* ===== MES ===== */
function renderMes(){
document.getElementById("contenido").innerHTML=`
<div class="calendar">
<div class="calendar-header">
<button onclick="cambiarMes(-1)">◀</button>
<h3 id="mesTitulo"></h3>
<button onclick="cambiarMes(1)">▶</button>
</div>
<div class="days" id="dias"></div>
</div>`
renderCalendarioMes()
}

function cambiarMes(v){
fechaBase.setMonth(fechaBase.getMonth()+v)
crearCalendario()
}

function renderCalendarioMes(){
let año=fechaBase.getFullYear()
let mes=fechaBase.getMonth()

let primerDia=new Date(año,mes,1).getDay()
let diasMes=new Date(año,mes+1,0).getDate()

let meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio",
"Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

document.getElementById("mesTitulo").innerHTML=meses[mes]+" "+año

let html=""

for(let i=0;i<primerDia;i++) html+="<div></div>"

for(let d=1;d<=diasMes;d++){
let hoy=new Date()
let clase=(d==hoy.getDate() && mes==hoy.getMonth() && año==hoy.getFullYear())?"today":""
html+=`<div class="day ${clase}">${d}</div>`
}

document.getElementById("dias").innerHTML=html
}

/* ===== SEMANA ===== */
function renderSemana(){
document.getElementById("contenido").innerHTML=`
<div class="calendar">
<div class="calendar-header">
<button onclick="cambiarSemana(-1)">◀</button>
<h3 id="semanaTitulo"></h3>
<button onclick="cambiarSemana(1)">▶</button>
</div>
<div class="days" id="dias"></div>
</div>`
renderCalendarioSemana()
}

function cambiarSemana(v){
fechaBase.setDate(fechaBase.getDate()+7*v)
crearCalendario()
}

function renderCalendarioSemana(){
let hoy=new Date()
let inicio=new Date(fechaBase)
inicio.setDate(inicio.getDate()-inicio.getDay())

let fin=new Date(inicio)
fin.setDate(inicio.getDate()+6)

document.getElementById("semanaTitulo").innerHTML=
inicio.toLocaleDateString()+" - "+fin.toLocaleDateString()

let html=""

for(let i=0;i<7;i++){
let f=new Date(inicio)
f.setDate(inicio.getDate()+i)

let clase=(f.toDateString()==hoy.toDateString())?"today":""

html+=`<div class="day ${clase}">
${f.getDate()}<br>${f.toLocaleString('es',{weekday:'short'})}
</div>`
}

document.getElementById("dias").innerHTML=html
}

/* ===== AÑO ===== */
function renderAño(){
document.getElementById("contenido").innerHTML=`
<div class="calendar">
<div class="calendar-header">
<button onclick="cambiarAño(-1)">◀</button>
<h3 id="añoTitulo"></h3>
<button onclick="cambiarAño(1)">▶</button>
</div>
<div id="vistaAño" class="year-grid"></div>
</div>`
renderCalendarioAño()
}

function cambiarAño(v){
fechaBase.setFullYear(fechaBase.getFullYear()+v)
crearCalendario()
}

function renderCalendarioAño(){

let año=fechaBase.getFullYear()

let meses=["January","February","March","April","May","June",
"July","August","September","October","November","December"]

document.getElementById("añoTitulo").innerHTML=año

let html=""

for(let m=0;m<12;m++){

let primerDia=new Date(año,m,1).getDay()
let diasMes=new Date(año,m+1,0).getDate()

html+=`<div class="mini-mes">
<div class="mini-titulo">${meses[m]}</div>
<div class="mini-grid">`

for(let i=0;i<primerDia;i++) html+="<div></div>"

for(let d=1;d<=diasMes;d++){
let hoy=new Date()
let clase=(d==hoy.getDate() && m==hoy.getMonth() && año==hoy.getFullYear())?"mini-hoy":""
html+=`<div class="${clase}">${d}</div>`
}

html+=`</div></div>`
}

document.getElementById("vistaAño").innerHTML=html
}

/* inicio */
cambiarSeccion("calendario", document.querySelector(".nav-btn"))