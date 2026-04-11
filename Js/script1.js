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



/* ACTIVAR BOTONES SIN AFECTAR OTRA BARRA */

function activarGrupo(btn)
{
    let contenedor = btn.parentElement

    contenedor.querySelectorAll(".nav-btn")
    .forEach(b=>b.classList.remove("active"))

    btn.classList.add("active")
}



/* CAMBIAR SECCIONES */

function cambiarSeccion(seccion,btn)
{

activarGrupo(btn)

if(seccion=="calendario")
{
crearCalendario()
}

if(seccion=="tareas")
{

document.getElementById("contenido").innerHTML=`

<h2>Tareas</h2>
<p>Aquí aparecerán tus tareas.</p>

`

}

if(seccion=="notas")
{

document.getElementById("contenido").innerHTML=`

<h2>Registros</h2>
<p>Escribe o consulta tus registros.</p>

`

}

if(seccion=="configuraciones")
{

document.getElementById("contenido").innerHTML=`

<h2>Configuraciones</h2>

`

}

}



/* CAMBIAR MODO DE TIEMPO */

function cambiartiempo(modo,btn)
{

activarGrupo(btn)

modoTiempo = modo

crearCalendario()

}



/* CREAR CALENDARIO */
function crearCalendario()
{

if(!window.fechaBase)
window.fechaBase = new Date()

window.mesActual = fechaBase.getMonth()
window.añoActual = fechaBase.getFullYear()
window.diaActual = fechaBase.getDate()


if(modoTiempo=="Mes")
renderMes()

if(modoTiempo=="Semana")
renderSemana()

if(modoTiempo=="Año")
renderAño()

}



/* ===== VISTA MES ===== */

function renderMes()
{

document.getElementById("contenido").innerHTML=`

<div class="calendar">

<div class="calendar-header">

<button onclick="cambiarMes(-1)">◀</button>

<h3 id="mesTitulo"></h3>

<button onclick="cambiarMes(1)">▶</button>

</div>

<div class="days" id="dias"></div>

</div>

`

renderCalendarioMes()

}



function cambiarMes(valor)
{

mesActual += valor

if(mesActual<0)
{
mesActual=11
añoActual--
}

if(mesActual>11)
{
mesActual=0
añoActual++
}

renderCalendarioMes()

}



function renderCalendarioMes()
{

let primerDia = new Date(añoActual,mesActual,1).getDay()

let diasMes = new Date(añoActual,mesActual+1,0).getDate()

let meses=[
"Enero","Febrero","Marzo","Abril","Mayo","Junio",
"Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
]

document.getElementById("mesTitulo").innerHTML=
meses[mesActual]+" "+añoActual

let html=""

for(let i=0;i<primerDia;i++)
{
html+="<div></div>"
}

for(let d=1; d<=diasMes; d++)
{

let hoy = new Date()

let clase=""

if(
d==hoy.getDate() &&
mesActual==hoy.getMonth() &&
añoActual==hoy.getFullYear()
)
{
clase="today"
}

html+=`<div class="day ${clase}">${d}</div>`

}

document.getElementById("dias").innerHTML=html

}



/* ===== VISTA SEMANA ===== */
function renderSemana()
{

document.getElementById("contenido").innerHTML=`

<div class="calendar">

<div class="calendar-header">

<button onclick="cambiarSemana(-1)">◀</button>

<h3 id="semanaTitulo"></h3>

<button onclick="cambiarSemana(1)">▶</button>

</div>

<div class="days" id="dias"></div>

</div>

`

renderCalendarioSemana()

}


function cambiarSemana(valor)
{

fechaBase.setDate(
fechaBase.getDate() + (7*valor)
)

crearCalendario()

}



function renderCalendarioSemana()
{

let hoy = new Date()

let inicio = fechaBase.getDate() - fechaBase.getDay()

let html=""

let inicioSemana = new Date(fechaBase)

inicioSemana.setDate(inicio)

let finSemana = new Date(inicioSemana)

finSemana.setDate(inicioSemana.getDate()+6)

document.getElementById("semanaTitulo").innerHTML=
inicioSemana.toLocaleDateString("es")+" - "+
finSemana.toLocaleDateString("es")


for(let i=0;i<7;i++)
{

let fecha = new Date(inicioSemana)

fecha.setDate(inicioSemana.getDate()+i)

let clase=""

if(
fecha.getDate()==hoy.getDate() &&
fecha.getMonth()==hoy.getMonth() &&
fecha.getFullYear()==hoy.getFullYear()
)
{
clase="today"
}

html+=`

<div class="day ${clase}">

${fecha.getDate()}<br>

${fecha.toLocaleString('es',{weekday:'short'})}

</div>

`

}

document.getElementById("dias").innerHTML=html

}


function renderAño()
{

document.getElementById("contenido").innerHTML=`

<div class="calendar">

<div class="calendar-header">

<button onclick="cambiarAño(-1)">◀</button>

<h3 id="añoTitulo"></h3>

<button onclick="cambiarAño(1)">▶</button>

</div>

<div id="vistaAño" class="year-grid"></div>

</div>

`

renderCalendarioAño()

}



function renderCalendarioAño()
{

let meses=[
"January","February","March","April","May","June",
"July","August","September","October","November","December"
]

document.getElementById("añoTitulo").innerHTML=
fechaBase.getFullYear()

let html=""

for(let m=0;m<12;m++)
{

let primerDia = new Date(fechaBase.getFullYear(),m,1).getDay()

let diasMes = new Date(fechaBase.getFullYear(),m+1,0).getDate()

html+=`

<div class="mini-mes">

<div class="mini-titulo">${meses[m]}</div>

<div class="mini-grid">

`

for(let i=0;i<primerDia;i++)
html+="<div></div>"


for(let d=1; d<=diasMes; d++)
{

let hoy = new Date()

let clase=""

if(
d==hoy.getDate() &&
m==hoy.getMonth() &&
fechaBase.getFullYear()==hoy.getFullYear()
)
{
clase="mini-hoy"
}

html+=`<div class="${clase}">${d}</div>`

}

html+=`
</div>
</div>
`

}

document.getElementById("vistaAño").innerHTML=html

}

/* cargar por defecto */

cambiarSeccion(
"calendario",
document.querySelector(".nav-container .nav-btn")
)   