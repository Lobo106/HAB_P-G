"use strict"

//Elementos seleccionados del HTML
const button = document.querySelector("button");
const buttonDelete = document.getElementById("botonEliminar")
const buttonOrder = document.getElementById("botonOrden")
const [form] = document.forms
const listaMuyImportante = document.getElementById("listaTareasMuyImportante");
const listaImportante = document.getElementById("listaTareasImportante");
const listaNormal = document.getElementById("listaTareasNormal");
const muyImportanteRadio = document.getElementById("muyImportante")
const importanteRadio = document.getElementById("importante")
const normalRadio = document.getElementById("normal")
const todosLi = document.querySelectorAll("li")

//Variables para obtener la fecha

let today = new Date();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
options.timeZone = 'UTC';
let now = today.toLocaleString('es-ES', options);
console.log(now);


//Listas donde se guardan las nuevas tareas
let muyImportante = getListMuyImportante() ?? [];
let importante = getListImportante() ?? [];
let normal = getListNormal() ?? [];

//Esto recorre todo lo que haya en las listas que esté guardado en el localStorage y lo pone en las tareas pendientes
for (const taskText of muyImportante) {
    generarLiMuyImportante(taskText, now);
}
for (const taskText of importante) {
    generarLiImportante(taskText, now);
}
for (const taskText of normal) {
    generarLiNormal(taskText, now);
}


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


    if (orden === "muyImportante") {
        //Y llama a la funcion que crea la tarea con la info que se ha metido en el form
        generarLiMuyImportante(taskText,now)
        //Guardamos el array en localStorage
        muyImportante.push(taskText, now);
        saveList();
    }
    else if (orden === "importante") {
        //Y llama a la funcion que crea la tarea con la info que se ha metido en el form
        generarLiImportante(taskText,now);
        //Guardamos el array en localStorage
        importante.push(taskText,now);
        saveList();
    }
    else if (orden === "normal") {
        //Y llama a la funcion que crea la tarea con la info que se ha metido en el form
        generarLiNormal(taskText,now);
        //Guardamos el array en localStorage
        normal.push(taskText, now,);
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

function generarLiMuyImportante(taskText,time) {
    //Crear el li
    let li = document.createElement("li");

    //establecer el texto del li con el contenido de input anterior
    li.textContent = taskText;
    //Crear el checkbox
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    //añadir ambas cosas
    listaMuyImportante.append(li, check, "Tarea añadida el ", time);
}

function generarLiImportante(taskText, time) {
    //Crear el li
    let li = document.createElement("li");

    //establecer el texto del li con el contenido de input anterior
    li.textContent = taskText;
    //Crear el checkbox
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    //añadir ambas cosas
    listaImportante.append(li, check,"Tarea añadida el ", time);

}

function generarLiNormal(taskText, time) {
    //Crear el li
    let li = document.createElement("li");

    //establecer el texto del li con el contenido de input anterior
    li.textContent = taskText;
    //Crear el checkbox
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    //añadir ambas cosas
    listaNormal.append(li,check, "Tarea añadida el ", time);

}



function deleteTask(array) {

 let checkMI = array.filter(tarea => tarea.hasAttribute("checked"))
 console.log(checkMI);

    }



//Funcion para habilitar y deshabilitar los botones de "Orden de importáncia"
function disableRadio() {
    let inactivo = normalRadio.hasAttribute("disabled");

    if (inactivo) {
        normalRadio.removeAttribute("disabled");
        importanteRadio.removeAttribute("disabled");
        muyImportanteRadio.removeAttribute("disabled");
    } else {
        normalRadio.setAttribute("disabled", true);
        importanteRadio.setAttribute("disabled", true);
        muyImportanteRadio.setAttribute("disabled", true);
    }
}



form.addEventListener("submit", submitForm);
buttonOrder.addEventListener("click", disableRadio)
// buttonDelete.addEventListener("click", deleteTask);
document.addEventListener("keyup", function(enter){
    if(enter.key =="Enter"){
        submitForm
    }
});