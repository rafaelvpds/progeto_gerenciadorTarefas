// // Função de Carregamento de Tela

function loadingScreen() {
    window.setTimeout(() => {
        document.getElementById("loadingTask").style.display = "none"

    }, 1000)
}

window.addEventListener("load", (event) => {
    loadingScreen();
    carregarTask();

})

document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("loadingTask").style.display = "block";

})

// ----------------------------------------------------------------------------
let addTask = document.getElementById("btnTask");
let modal = document.getElementById("modalTask");


async function adicionarTarefas() {

    let inptNumberTask = document.getElementById("numberTask").value;
    let inptDescriptionTask = document.getElementById("descriptionTask").value;
    let inptDateTask = document.getElementById("dateTask").value;
    let inptstatusTask = document.getElementById("options").value;

    validadeInput(document.getElementById("numberTask").value, document.getElementById("numero-obrigatorio").innerHTML = "Número tarefa não preenchida");

    validadeInput(document.getElementById("descriptionTask").value, document.getElementById("descricao-obrigatorio").innerHTML = "Descrição tarefa não preenchida");

    validadeInput(document.getElementById("dateTask").value, document.getElementById("campo-data").innerHTML = "Data tarefa não preenchida");

    validadeInput(document.getElementById("options").value, document.getElementById("status-obrigatotio").innerHTML = "Status tarefa não preenchida");

    if (inptNumberTask !== '' && inptDescriptionTask !== '' && inptDateTask !== '' & inptstatusTask !== '') {

        task = {
            numberTask: inptNumberTask,
            descriptionTask: inptDescriptionTask,
            dateTask: inptDateTask,
            statusTask: inptstatusTask,
        }

        const cadastrarTask = await fetch('http://localhost:3000/atividades', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(task)
        })

        await carregarTask();
        cleanIput();
        fecharModal()

    }

}

let excluir = async (idTarefas) => {
    console.log(idTarefas)
    let response = await fetch(`http://localhost:3000/atividades/${idTarefas}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },

    })
    await carregarTask();

}

let editar = async (idTarefas) => {

    modal.style.display = "block";
    console.log(idTarefas)
    let response = await fetch(`http://localhost:3000/atividades/${idTarefas}`)
    let editarTask = await response.json()



    document.getElementById("dateTask").value = editarTask.dateTask
    document.getElementById("descriptionTask").value = editarTask.descriptionTask
    document.getElementById("numberTask").value = editarTask.numberTask
    document.getElementById("options").value = editarTask.statusTask

    document.getElementById('cancelEdit').onclick = function () { btnCancelar() }
    document.getElementById('btnSalvar').onclick = function () { salvarEd(idTarefas) }
}

const salvarEd = async (idTarefas) => {
    let inptNumberTask = document.getElementById("numberTask").value;
    let inptDescriptionTask = document.getElementById("descriptionTask").value;
    let inptDateTask = document.getElementById("dateTask").value;
    let inptstatusTask = document.getElementById("options").value;

    validadeInput(document.getElementById("numberTask").value, document.getElementById("numero-obrigatorio").innerHTML = "Número tarefa não preenchida");

    validadeInput(document.getElementById("descriptionTask").value, document.getElementById("descricao-obrigatorio").innerHTML = "Descrição tarefa não preenchida");

    validadeInput(document.getElementById("dateTask").value, document.getElementById("campo-data").innerHTML = "Data tarefa não preenchida");

    validadeInput(document.getElementById("options").value, document.getElementById("status-obrigatotio").innerHTML = "Status tarefa não preenchida");

    // if(inptDescriptionTask ==""){
    //     document.getElementById("descricao-obrigatorio").innerHTML ="Preencha o Campo Descrção"

    // }else{
    //     document.getElementById("descricao-obrigatorio").innerHTML =""
    // }
    // if(inptDateTask===""){
    //    document.getElementById("campo-data").innerHTML ="Preencha Data"

    // }else{
    //     document.getElementById("campo-data").innerHTML =""
    // }
    // if(inptstatusTask===""){
    //     document.getElementById("status-obrigatotio").innerHTML ="Preencha o Campo Status"

    // }else{
    //     document.getElementById("status-obrigatotio").innerHTML =""
    // }

    if (inptNumberTask !== '' && inptDescriptionTask !== '' && inptDateTask !== '' & inptstatusTask !== '') {

        task = {

            numberTask: inptNumberTask,
            descriptionTask: inptDescriptionTask,
            dateTask: inptDateTask,
            statusTask: inptstatusTask,
        }

        const cadastrarTask = await fetch(`http://localhost:3000/atividades/${idTarefas}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(task)
        })

        await carregarTask();

        cleanIput();
        fecharModal();

    }
}

function orderDescDecre() {
    printOrderDescr()
}
function orderDescAsc() {
    printOrderDescrAsc()
}
// ------------------------------------------------------------------------
function orderDate() {
    printOrderDate();
}
function orderDateAsc() {
    printOrderDateAce();
}
// -----------------------------------------------------------------------
function orderStatus() {
    printOrderStatus()
}
function orderStatusAsc() {

    printOrderAcenStatus()
}
// --------------------------------------------------------------------
function orderNumDecre() {
    printOrderNumDesc();

    // document.getElementById('orderAsc').onclick = function(){ printOrderNumAsc();}

}
function orderNumAsc() {
    printOrderNumAsc()
}
// -------------------------------------------------------------------
let buscarStatusDecres = async () => {
    let response = await fetch(
        'http://localhost:3000/atividades/?_sort=statusTask&_order=desc')
    let descOrder = await response.json();
    console.log(descOrder)
    return descOrder
}
let buscarStatusAsc = async () => {
    let response = await fetch(
        ' http://localhost:3000/atividades/?_sort=statusTask&_order=asc')
    let statusOrdeAcs = await response.json();

    console.log(statusOrdeAcs)

    return statusOrdeAcs
}
// --------------------------------------------------------------------
let buscarDescDecres = async () => {
    let response = await fetch(
        'http://localhost:3000/atividades/?_sort=dateTask&_order=desc')
    let descOrder = await response.json();
    console.log(descOrder)
    return descOrder
}

let buscarDescAcen = async () => {
    let response = await fetch(
        'http://localhost:3000/atividades/?_sort=dateTask&_order=asc')
    let descOrderAcen = await response.json();
    console.log(descOrderAcen)
    return descOrderAcen
}
// ----------------------------------------------------------------------------
let buscarDateDesc = async () => {
    let response = await fetch(
        'http://localhost:3000/atividades/?_sort=dateTask&_order=desc')
    let dateOrder = await response.json();
    console.log(dateOrder)
    return dateOrder
}

let buscarDateAc = async () => {
    let response = await fetch(
        ' http://localhost:3000/atividades/?_sort=dateTaskk&_order=asc')
    let numOrderAsc = await response.json();

    console.log(numOrderAsc)

    return numOrderAsc
}
// -----------------------------------------------------------------------------
let buscarNumAsc = async () => {
    let response = await fetch(
        ' http://localhost:3000/atividades/?_sort=numberTask&_order=asc')
    let numOrderAsc = await response.json();

    console.log(numOrderAsc)

    return numOrderAsc
}
let buscarNumDesc = async () => {
    let response = await fetch(
        'http://localhost:3000/atividades/?_sort=numberTask&_order=desc')
    let numOrder = await response.json();
    console.log(numOrder)
    return numOrder
}


// --------------------------------------------------------------------

let printOrderStatus = async () => {
    let lista = ""

    const listTaskOrder = await buscarStatusDecres()

    listTaskOrder.forEach((task) => {
        let status

        if (task.statusTask === "Concluida") {
            status = "statusConcluid"
        } else if (task.statusTask === "Em Andamento") {
            status = "statusInProgress"
        } else if (task.statusTask === "Parado") {
            status = "statusStop"
        }
        lista = lista +
            `
                   <tr>
                        <td>${task.numberTask} </td>
                        <td>${task.descriptionTask} </td>
                        <td>${task.dateTask} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `

    });

    document.getElementById('tbody').innerHTML = lista
}
let printOrderAcenStatus = async () => {
    let lista = ""

    const listTaskOrder = await buscarStatusAsc()

    listTaskOrder.forEach((task) => {
        let status

        if (task.statusTask === "Concluida") {
            status = "statusConcluid"
        } else if (task.statusTask === "Em Andamento") {
            status = "statusInProgress"
        } else if (task.statusTask === "Parado") {
            status = "statusStop"
        }
        lista = lista +
            `
                   <tr>
                        <td>${task.numberTask} </td>
                        <td>${task.descriptionTask} </td>
                        <td>${task.dateTask} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `

    });

    document.getElementById('tbody').innerHTML = lista
}
// --------------------------------------------------------------------------------------------

let printOrderDescr = async () => {
    let lista = ""

    const listTaskOrder = await buscarDescDecres()

    listTaskOrder.forEach((task) => {
        let status

        if (task.statusTask === "Concluida") {
            status = "statusConcluid"
        } else if (task.statusTask === "Em Andamento") {
            status = "statusInProgress"
        } else if (task.statusTask === "Parado") {
            status = "statusStop"
        }
        lista = lista +
            `
                   <tr>
                        <td>${task.numberTask} </td>
                        <td>${task.descriptionTask} </td>
                        <td>${task.dateTask} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `

    });

    document.getElementById('tbody').innerHTML = lista
}
let printOrderDescrAsc = async () => {
    let lista = ""

    const listTaskOrder = await buscarDescAcen()

    listTaskOrder.forEach((task) => {
        let status

        if (task.statusTask === "Concluida") {
            status = "statusConcluid"
        } else if (task.statusTask === "Em Andamento") {
            status = "statusInProgress"
        } else if (task.statusTask === "Parado") {
            status = "statusStop"
        }
        lista = lista +
            `
                   <tr>
                        <td>${task.numberTask} </td>
                        <td>${task.descriptionTask} </td>
                        <td>${task.dateTask} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `

    });

    document.getElementById('tbody').innerHTML = lista
}
// ----------------------------------------------------------

let printOrderDate = async () => {
    let lista = ""

    const listTaskOrder = await buscarDateDesc()

    listTaskOrder.forEach((task) => {
        let status

        if (task.statusTask === "Concluida") {
            status = "statusConcluid"
        } else if (task.statusTask === "Em Andamento") {
            status = "statusInProgress"
        } else if (task.statusTask === "Parado") {
            status = "statusStop"
        }
        lista = lista +
            `
                   <tr>
                        <td>${task.numberTask} </td>
                        <td>${task.descriptionTask} </td>
                        <td>${task.dateTask} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `

    });

    document.getElementById('tbody').innerHTML = lista
}
let printOrderDateAce = async () => {
    let lista = ""

    const listTaskOrder = await buscarDateAc()

    listTaskOrder.forEach((task) => {
        let status

        if (task.statusTask === "Concluida") {
            status = "statusConcluid"
        } else if (task.statusTask === "Em Andamento") {
            status = "statusInProgress"
        } else if (task.statusTask === "Parado") {
            status = "statusStop"
        }
        lista = lista +
            `
                   <tr>
                        <td>${task.numberTask} </td>
                        <td>${task.descriptionTask} </td>
                        <td>${task.dateTask} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `

    });

    document.getElementById('tbody').innerHTML = lista
}

// ---------------------------------
let printOrderNumDesc = async () => {
    let lista = ""

    const listTaskOrder = await buscarNumDesc()

    listTaskOrder.forEach((task) => {


        let status

        if (task.statusTask === "Concluida") {
            status = "statusConcluid"
        } else if (task.statusTask === "Em Andamento") {
            status = "statusInProgress"
        } else if (task.statusTask === "Parado") {
            status = "statusStop"
        }
        lista = lista +
            `
                   <tr>
                        <td>${task.numberTask} </td>
                        <td>${task.descriptionTask} </td>
                        <td>${task.dateTask} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `

    });

    document.getElementById('tbody').innerHTML = lista
}
let printOrderNumAsc = async () => {
    let lista = ""

    const listTaskOrder = await buscarNumAsc()

    listTaskOrder.forEach((task) => {


        let status

        if (task.statusTask === "Concluida") {
            status = "statusConcluid"
        } else if (task.statusTask === "Em Andamento") {
            status = "statusInProgress"
        } else if (task.statusTask === "Parado") {
            status = "statusStop"
        }
        lista = lista +
            `
                   <tr>
                        <td>${task.numberTask} </td>
                        <td>${task.descriptionTask} </td>
                        <td>${task.dateTask} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `

    });

    document.getElementById('tbody').innerHTML = lista
}


let buscarTask = async () => {
    const response = await fetch("http://localhost:3000/atividades");
    const tarefa = await response.json()
    return tarefa
}

let carregarTask = async () => {
    let lista = ""

    const listTask = await buscarTask()

    listTask.forEach((task) => {


        let status

        if (task.statusTask === "Concluida") {
            status = "statusConcluid"
        } else if (task.statusTask === "Em Andamento") {
            status = "statusInProgress"
        } else if (task.statusTask === "Parado") {
            status = "statusStop"
        }
        lista = lista +
            `
                   <tr>
                        <td>${task.numberTask} </td>
                        <td>${task.descriptionTask} </td>
                        <td>${task.dateTask} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `

    });

    document.getElementById('tbody').innerHTML = lista
}

// Dispara a ação para abrir o modal
addTask.onclick = function () {
    modal.style.display = "block";
}
// Dispara a ação no botão Cancelar para fechar o modal sem trazer nenhum resultado
function btnCancelar() {
    cleanIput()
    modal.style.display = "none";
}

function fecharModal() {
    modal.style.display = "none"
    cleanIput()


}

// Dispara a ação para abrir o modal
addTask.onclick = function () {
    document.getElementById('btnSalvar').onclick =
        function () { adicionarTarefas() }
    modal.style.display = "block"

}
// Dispara a ação no botão Cancelar para fechar o modal sem trazer nenhum resultado

//Validar Campos

function validadeInput(campo, mensagem) {
    if (campo = "") {
        mensagem = "Campo Obrigatorio não informado"
    } else {
        mensagem = ''
    }
}

// Limpando Campos
function cleanIput() {
    document.getElementById("numberTask").value = ""
    document.getElementById("descriptionTask").value = ""
    document.getElementById("dateTask").value = ""
    document.getElementById("options").value = ""
}
function cadastradoComSucesso() {
    let sucesso = document.getElementById("alerta");

    sucesso.innerHTML = 'Cadastrado com sucesso.';

    sucesso.classList.add("alert-success", "animate__fadeInUp"); //CSS do bootstrap
    sucesso.classList.remove("d-none");


    window.setTimeout(() => {

        sucesso.classList.add("animate__fadeOutDown");
        sucesso.classList.remove("d-none");
    },

        2000);
}

// /tarefas?_sort=VAR1&_order=VAR2

// VAR1 =  atributo do objeto

// VAR2 = asc/desc

// VAR1 e VAR2 = parametros

// funcaoOrdenar(var1, var2)


