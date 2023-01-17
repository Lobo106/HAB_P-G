"use strict"

//Elementos seleccionados del HTML
const button = document.querySelector("button");
const buttonDelete = document.getElementById("botonEliminar")
const [form] = document.forms
const listaMuyImportante = document.getElementById("listaTareasMuyImportante");
const listaImportante = document.getElementById("listaTareasImportante");
const listaNormal = document.getElementById("listaTareasNormal");
const muyImportanteRadio = document.getElementById("muyImportante")
const importanteRadio = document.getElementById("importante")
const normalRadio = document.getElementById("normal")
const fecha = document.getElementById("fecha")
const reloj = document.getElementById("hora")
var sonido = new Audio();
sonido.src = "sonido.mp3";

var sonido2 = new Audio();
sonido2.src = "sonido2.mp3";


//Variables para obtener la fecha

let today = new Date();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
options.timeZone = 'UTC';
let options2 = { year: 'numeric', month: 'numeric', day: 'numeric' }
let now = today.toLocaleString('es-ES', options);
let now2 = today.toLocaleString('es-ES', options2);


function actual() {


    let hora = today.getHours();
    let minuto = today.getMinutes();
    if (hora < 10) { hora = "0" + hora; }
    if (minuto < 10) { minuto = "0" + minuto; }
    let miReloj = `${hora}:${minuto}`;
    let miFecha = now2

    reloj.textContent = miReloj;
    fecha.textContent = miFecha;

}


setInterval(actual, 1000);




//Listas donde se guardan las nuevas tareas
let muyImportante = getListMuyImportante() ?? [];
let importante = getListImportante() ?? [];
let normal = getListNormal() ?? [];

let idMI = muyImportante.length - 1;
let idI = importante.length - 1;
let idN = normal.length - 1;

//Esto recorre todo lo que haya en las listas que esté guardado en el localStorage y lo pone en las tareas pendientes

//Funcion cargar lista
function cargarListaMuyImportante(data) {
    data.forEach(function (i) {
        generarLiMuyImportante(i.tarea, i.time, i.id, i.tic)
    })
}
cargarListaMuyImportante(muyImportante)

function cargarListaImportante(data) {
    data.forEach(function (i) {
        generarLiImportante(i.tarea, i.time, i.id, i.tic)
    })
}
cargarListaImportante(importante)

function cargarListaNormal(data) {
    data.forEach(function (i) {
        generarLiNormal(i.tarea, i.time, i.id, i.tic)
    })
}
cargarListaNormal(normal)



//Funcion que lee el form cuando damos click al boton "Añadir"
function submitForm(e) {
    //Cancelamos el comportamiento por defecto (recargar la pagina)
    e.preventDefault();

    //Leer el form
    let data = new FormData(form);

    //Convertir a objeto
    const dataObj = Object.fromEntries(data);

    let taskText = dataObj.taskText;
    let orden = dataObj.orden;
    if (!taskText) {
        alert("No has escito una nueva tarea");
        return;
    }
    if (taskText.length > 40) {
        alert("Superado el límite de caracteres");
        return;
    }
    if (!orden) {
        orden = "normal";
    }

    //Limpiar el formulario
    form.reset(); //Hace lo mismo que un button type="reset"

    sonido.play()

    let tic = "";

    if (orden === "muyImportante") {
        idMI++;
        //Y llama a la funcion que crea la tarea con la info que se ha metido en el form
        generarLiMuyImportante(taskText, now, idMI, tic)
        //Guardamos el array en localStorage
        muyImportante.push({
            tarea: taskText,
            time: now,
            id: idMI,
            tic: "",
        });;
        saveList();
    }
    else if (orden === "importante") {
        idI++
        //Y llama a la funcion que crea la tarea con la info que se ha metido en el form
        generarLiImportante(taskText, now, idI, tic);
        //Guardamos el array en localStorage
        importante.push({
            tarea: taskText,
            time: now,
            id: idI,
            tic: "",
        });;
        saveList();
    }
    else if (orden === "normal") {
        idN++
        //Y llama a la funcion que crea la tarea con la info que se ha metido en el form
        generarLiNormal(taskText, now, idN, tic);
        //Guardamos el array en localStorage
        normal.push({
            tarea: taskText,
            time: now,
            id: idN,
            tic: "",
        });;
        saveList();
    }
}



//Funcion para guardar los textos de las listas
function saveList() {
    //Convertir la lista a string
    let listaStringMuyImportante = JSON.stringify(muyImportante);
    localStorage.setItem("listaMuyImportante", listaStringMuyImportante);

    let listaStringImportante = JSON.stringify(importante);
    localStorage.setItem("listaImportante", listaStringImportante);

    let listaStringNormal = JSON.stringify(normal);
    localStorage.setItem("listaNormal", listaStringNormal);
}


//Funcion para leer los textos del localStorage
function getListMuyImportante() {
    let listStorage = localStorage.getItem("listaMuyImportante");

    let listArray = JSON.parse(listStorage);

    return listArray;
}
function getListImportante() {
    let listStorage = localStorage.getItem("listaImportante");

    let listArray = JSON.parse(listStorage);

    return listArray;
}
function getListNormal() {
    let listStorage = localStorage.getItem("listaNormal");

    let listArray = JSON.parse(listStorage);

    return listArray;
}


//Funciones que generan los Li y los checkbox

function generarLiMuyImportante(taskText, time, id, tic) {
    //Crear el li
    let clase = "";
    if (tic === "checked") { clase = "terminada" };

    let li = `<li id = "${id}" class = "${clase}">
                      <p class = "tarea">${taskText}</p>
                      <input type="checkbox" class = "checkbox" ${tic}>
                      <p class = "tiempo">Tarea añadida el ${time}</p></li> `;
    listaMuyImportante.insertAdjacentHTML("beforeend", li);
}

function generarLiImportante(taskText, time, id, tic) {
    //Crear el li
    let clase = "";
    if (tic === "checked") { clase = "terminada" };

    let li = `<li id = "${id}" class = "${clase}">
    <p class = "tarea">${taskText}</p>
    <input type="checkbox" class = "checkbox" ${tic}>
    <p class = "tiempo">Tarea añadida el ${time}</p></li> `;
    listaImportante.insertAdjacentHTML("beforeend", li);

}

function generarLiNormal(taskText, time, id, tic) {
    //Crear el li
    let clase = "";
    if (tic === "checked") { clase = "terminada" };

    let li = `<li id = "${id}" class = "${clase}">
    <p class = "tarea">${taskText}</p>
    <input type="checkbox" class = "checkbox" ${tic}>
    <p class = "tiempo">Tarea añadida el ${time}</p></li> `;;
    listaNormal.insertAdjacentHTML("beforeend", li);

}

//Función que elimina las tareas terminadas

function deleteTask() {


    try {
        [].forEach.call(document.querySelectorAll(".terminada"), function (regla) {
            regla.parentNode.removeChild(regla);
        });
    } catch (error) {
    }
    let sinTicMI = muyImportante.filter((muyImportante) => muyImportante.tic !== "checked")
    muyImportante = sinTicMI
    let sinTicI = importante.filter((importante) => importante.tic !== "checked")
    importante = sinTicI
    let sinTicN = normal.filter((normal) => normal.tic !== "checked")
    normal = sinTicN

    if (!document.querySelectorAll(".terminada")) {
        sonido2.play()
    };

    saveList();

}




form.addEventListener("submit", submitForm);

document.addEventListener("keyup", function (enter) {
    if (enter.key == "Enter") {
        submitForm
    }
});
buttonDelete.addEventListener("click", deleteTask);



listaMuyImportante.addEventListener("click", function (tarea) {
    let element = tarea.target
    if (element.checked) {
        element.parentNode.classList.add("terminada")

        for (let i in muyImportante) {
            if (muyImportante[i].id == element.parentNode.id) {
                console.log(i)
                muyImportante[i].tic = "checked";
            }
        }
        saveList();
    }
    else {
        element.parentNode.classList.remove("terminada")

        for (let i in muyImportante) {
            if (muyImportante[i].id == element.parentNode.id) {
                muyImportante[i].tic = "";
            }
        }
        saveList();
    }
});

listaImportante.addEventListener("click", function (tarea) {
    let element = tarea.target

    if (element.checked) {
        element.parentNode.classList.add("terminada")
        for (let i in importante) {
            if (importante[i].id == element.parentNode.id) {
                console.log(i)
                importante[i].tic = "checked";
            }
        }
        saveList();
    }
    else {
        element.parentNode.classList.remove("terminada")

        for (let i in importante) {
            if (importante[i].id == element.parentNode.id) {
                importante[i].tic = "";
            }
        }
        saveList();
    }
});



listaNormal.addEventListener("click", function (tarea) {
    let element = tarea.target
    if (element.checked) {
        element.parentNode.classList.add("terminada")
        for (let i in normal) {
            if (normal[i].id == element.parentNode.id) {
                normal[i].tic = "checked";
            }
        }
        saveList();
    }
    else {
        element.parentNode.classList.remove("terminada")

        for (let i in normal) {
            if (normal[i].id == element.parentNode.id) {
                normal[i].tic = "";
            }
        }
        saveList();
    }
});
