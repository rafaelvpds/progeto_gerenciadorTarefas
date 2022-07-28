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

// Função de Adionar Tarefa
async function adicionarTarefas() {

    // Pegando os dados do Input de cada campo.

    let inptNumberTask = document.getElementById("numberTask").value;
    let inptDescriptionTask = document.getElementById("descriptionTask").value;
    let inptDateTask = document.getElementById("dateTask").value;
    let inptstatusTask = document.getElementById("options").value;

// Fazendo a verificação se tem algum campo vazio.

    if (inptNumberTask == "") {
        document.getElementById("numero-obrigatorio").innerHTML = "Preencha o Campo Descrção"

    } else {
        document.getElementById("numero-obrigatorio").innerHTML = ""
    }

    if (inptDescriptionTask == "") {
        document.getElementById("descricao-obrigatorio").innerHTML = "Preencha o Campo Descrção"

    } else {
        document.getElementById("descricao-obrigatorio").innerHTML = ""
    }
    if (inptDateTask === "") {
        document.getElementById("campo-data").innerHTML = "Preencha Data"

    } else {
        document.getElementById("campo-data").innerHTML = ""
    }
    if (inptstatusTask === "") {
        document.getElementById("status-obrigatotio").innerHTML = "Preencha o Campo Status"

    } else {
        document.getElementById("status-obrigatotio").innerHTML = ""
    }

    if (inptNumberTask !== '' && inptDescriptionTask !== '' && inptDateTask !== '' & inptstatusTask !== '') {
//Se todos os campos estiverem diferente de Vazio, ele vai passar todos os dados recebidos para objeto
        task = {
            numberTask:parseInt(inptNumberTask),
            descriptionTask: inptDescriptionTask,
            dateTask: inptDateTask,
            statusTask: inptstatusTask,
        }
//Acionando a API json para savar os dados colocados dentro da mesma
        const cadastrarTask = await fetch('http://52.72.248.104:8000/atividades', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(task)
        })
        //chama a função carregar tabela para mostrar os dados salvos dentro da API
        await carregarTask();
        //Chama a Função Limpar dados, Limpa os campos da 
        cleanIput();
        fecharModal()

    }

}
let buscarTask = async () => {
    const response = await fetch("http://52.72.248.104:8000/atividades");
    const tarefa = await response.json()
    return tarefa
}
let carregarTask = async () => {
    let lista = ""
    let totalRegistro = 0;

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
                        <td>${new Date(task.dateTask).toLocaleDateString('pt-BR')} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `
            totalRegistro = totalRegistro+1
    });

    document.getElementById('fullRecord').innerHTML="Total de Tarefas é: "+ totalRegistro;

    document.getElementById('tbody').innerHTML = lista
   
}
let excluir = async (idTarefas) => {
    console.log(idTarefas)
    let response = await fetch(`http://52.72.248.104:8000/atividades/${idTarefas}`, {
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
    let response = await fetch(`http://52.72.248.104:8000/atividades/${idTarefas}`)
    let editarTask = await response.json()


    document.getElementById("numberTask").value = editarTask.numberTask
    document.getElementById("descriptionTask").value = editarTask.descriptionTask
    document.getElementById("dateTask").value = editarTask.dateTask
    document.getElementById("options").value = editarTask.statusTask

    document.getElementById('cancelEdit').onclick = function () { btnCancelar() }
    document.getElementById('btnSalvar').onclick = function () { salvarEd(idTarefas) }
}

const salvarEd = async (idTarefas) => {
    let inptNumberTask = document.getElementById("numberTask").value;
    let inptDescriptionTask = document.getElementById("descriptionTask").value;
    let inptDateTask = document.getElementById("dateTask").value;
    let inptstatusTask = document.getElementById("options").value;

    if (inptNumberTask == "") {
        document.getElementById("numero-obrigatorio").innerHTML = "Preencha o Campo Descrção"

    } else {
        document.getElementById("numero-obrigatorio").innerHTML = ""
    }

    if (inptDescriptionTask == "") {
        document.getElementById("descricao-obrigatorio").innerHTML = "Preencha o Campo Descrção"

    } else {
        document.getElementById("descricao-obrigatorio").innerHTML = ""
    }
    if (inptDateTask === "") {
        document.getElementById("campo-data").innerHTML = "Preencha Data"

    } else {
        document.getElementById("campo-data").innerHTML = ""
    }
    if (inptstatusTask === "") {
        document.getElementById("status-obrigatotio").innerHTML = "Preencha o Campo Status"

    } else {
        document.getElementById("status-obrigatotio").innerHTML = ""
    }

    if (inptNumberTask !== '' && inptDescriptionTask !== '' && inptDateTask !== '' & inptstatusTask !== '') {

        task = {

            numberTask:parseInt(inptNumberTask),
            descriptionTask: inptDescriptionTask,
            dateTask: inptDateTask,
            statusTask: inptstatusTask,
        }

        const cadastrarTask = await fetch(`http://52.72.248.104:8000/atividades/${idTarefas}`, {
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
// ----------Função de Ordenação de Descrição
function orderDescDecre() {
    printOrderDescr()
}
function orderDescAsc() {
    printOrderDescrAsc()
}
let buscarDescDecres = async () => {
    let response = await fetch(
        'http://52.72.248.104:8000/atividades/?_sort=descriptionTask&_order=desc')
    let dados = await response.json();
    console.log(dados)
    return dados
}
let buscarDescAcen = async () => {
    let response = await fetch(
        ' http://52.72.248.104:8000/atividades/?_sort=descriptionTask&_order=asc')
    let dados = await response.json();

    console.log(dados)

    return dados
}
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
                        <td>${new Date(task.dateTask).toLocaleDateString('pt-BR')} </td>
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
                        <td>${new Date(task.dateTask).toLocaleDateString('pt-BR')} </td>
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

// ----------Função de Ordenação de data -----------------------------------------------

// ----------Chama a função imprimir para mostrar os dados ja ordenado 
function orderDate() {
    printOrderDate();
}
// ----------Chama a função imprimir para mostrar os dados ja ordenado Ascendente
function orderDateAsc() {
    printOrderDateAce();
}
// ------------- Chama a Api Jason passando a ardem de como vai aparecer no caso: Decrescente
let buscarDateDesc = async () => {
    let response = await fetch(
        'http://52.72.248.104:8000/atividades/?_sort=dateTask&_order=desc')
    let dados = await response.json();
    console.log(dados)
    return dados
}
// ------------- Chama a Api Jason passando a ardem de como vai aparecer no caso: Ascendente
let buscarDateAc = async () => {
    let response = await fetch(
        ' http://52.72.248.104:8000/atividades/?_sort=dateTaskk&_order=asc')
    let dados = await response.json();

    console.log(dados)

    return dados
}
// Dentro desta função eu chamo a função de busca na API Json e mando ele imprimir os dados: Decrescente
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
                        <td>${new Date(task.dateTask).toLocaleDateString('pt-BR')} </td>
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
// Dentro desta função eu chamo a função de busca na API Json e mando ele imprimir os dados: Ascendente
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
                        <td>${new Date(task.dateTask).toLocaleDateString('pt-BR')} </td>
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
// -------------Função de Ordenação por Status-----------------------------------------------

// ----------Chama a função imprimir para mostrar os dados ja ordenado 
function orderStatus() {
    printOrderStatus()
}
// ----------Chama a função imprimir para mostrar os dados ja ordenado 

function orderStatusAsc() {

    printOrderAcenStatus()
}
// ------------- Chama a Api Jason passando a ardem de como vai aparecer no caso: Decrescente
let buscarStatusDecres = async () => {
    let response = await fetch(
        'http://52.72.248.104:8000/atividades/?_sort=statusTask&_order=desc')
    let dados = await response.json();
    console.log(dados)
    return dados
}
// ------------- Chama a Api Jason passando a ardem de como vai aparecer no caso: Ascendente
let buscarStatusAsc = async () => {
    let response = await fetch(
        ' http://52.72.248.104:8000/atividades/?_sort=statusTask&_order=asc')
    let dados = await response.json();

    console.log(dados)

    return dados
}
// ------------- Chama a Api Jason passando a ardem de como vai aparecer no caso: Decrescente
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
                        <td>${new Date(task.dateTask).toLocaleDateString('pt-BR')} </td>
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
// Dentro desta função eu chamo a função de busca na API Json e mando ele imprimir os dados: Ascendente
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
                        <td>${new Date(task.dateTask).toLocaleDateString('pt-BR')} </td>
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
// --------------Função de Ordenação por Numero 
function orderNumDecre() {
    printOrderNumDesc();

    // document.getElementById('orderAsc').onclick = function(){ printOrderNumAsc();}

}
function orderNumAsc() {
    printOrderNumAsc()
}
let buscarNumAsc = async () => {
    let response = await fetch(
        ' http://52.72.248.104:8000/atividades/?_sort=numberTask&_order=asc')
    let dados = await response.json();

    console.log(dados)

    return dados
}
let buscarNumDesc = async () => {
    let response = await fetch(
        'http://52.72.248.104:8000/atividades/?_sort=numberTask&_order=desc')
    let dados = await response.json();
    console.log(dados)
    return dados
}
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
                        <td>${new Date(task.dateTask).toLocaleDateString('pt-BR')} </td>
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
                        <td>${new Date(task.dateTask).toLocaleDateString('pt-BR')} </td>
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

function concluid() {
    prinFiltroStatusConcl();
}
let filtrarStatusConcl = async () => {
    let response = await fetch(
        'http://52.72.248.104:8000/atividades/?statusTask=Concluida')
    //posts?title=json-server&author=typicode
    let statsCon = await response.json();
    console.log(statsCon)
    return statsCon
}
let prinFiltroStatusConcl = async () => {
    let lista = ""
    let totalRegistro =0
    const listTaskOrder = await filtrarStatusConcl()

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
                        <td>${new Date(task.dateTask).toLocaleDateString('pt-BR')} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `
            totalRegistro = totalRegistro +1
    });


    document.getElementById('fullRecord').innerHTML ="Tarefas Concluidas são: " +totalRegistro

    document.getElementById('tbody').innerHTML = lista
}
function inProsse(){
    prinFiltroStatusInProc()
}
let filtrarStatusInProc = async () => {
    let response = await fetch(
        'http://52.72.248.104:8000/atividades/?statusTask=Em Andamento')
    let dados = await response.json();
    console.log(dados)
    return dados
}
let prinFiltroStatusInProc = async() =>{
    let lista = ""
    totalRegistro =0
    const listTaskOrder = await filtrarStatusInProc()

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
                        <td>${new Date(task.dateTask).toLocaleDateString('pt-BR')} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `
            totalRegistro = totalRegistro +1
    });
    document.getElementById('fullRecord').innerHTML ="Tarefas em Processo são: " +totalRegistro
    document.getElementById('tbody').innerHTML = lista
}
function stoped(){
 prinFiltroStatusStop()
}
let filtrarStatusStope = async () => {
    let response = await fetch(
        'http://52.72.248.104:8000/atividades/?statusTask=Parado')
    let dados = await response.json();
    console.log(dados)
    return dados
}
let prinFiltroStatusStop = async() =>{
    let lista = ""
    totalRegistro = 0
    const listTaskOrder = await filtrarStatusStope()

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
                        <td>${new Date(task.dateTask).toLocaleDateString('pt-BR')} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `
            totalRegistro = totalRegistro +1
    });

    document.getElementById('fullRecord').innerHTML ="Tarefas Paradas são: "+ totalRegistro

    document.getElementById('tbody').innerHTML = lista
}
function todosDados(){
    carregarTask()
}
function btnSearch(){
    prinFiltroDescri()
}
let filtrarDescr = async ()=>{
    let inputPesquisas = document.getElementById('pesquisaTarefas').value;
    
    let response = await fetch(
      `http://52.72.248.104:8000/atividades?descriptionTask=${inputPesquisas}`)
      console.log(inputPesquisas)
    let dados = await response.json();
    console.log(dados)
    return dados
}
let prinFiltroDescri = async() =>{
    let lista = ""
    totalRegistro = 0
    const listTaskOrder = await filtrarDescr()

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
                        <td>${new Date(task.dateTask).toLocaleDateString('pt-BR')} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="./acess/imagem/icones/editar.png" onclick ="editar(${task.id})">

                            <img src="./acess/imagem/icones/excluir.png" onclick ="excluir(${task.id})">  
                        
                        </td>
                   </tr>
        
            `
        totalRegistro = totalRegistro +1
    });
    document.getElementById('fullRecord').innerHTML ="Tarefas Encontradas: "+ totalRegistro

    document.getElementById('tbody').innerHTML = lista
}
// Dispara a ação no botão Cancelar para fechar o modal sem trazer nenhum resultado
function btnCancelar() {


    modal.style.display = "none";
    cleanIput()
    cleanMsg()
}
// Dispara a ação no botão Cancelar para fechar o modal sem trazer nenhum resultado
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
// Limpando Campos
function cleanIput() {
    document.getElementById("numberTask").value = ""
    document.getElementById("descriptionTask").value = ""
    document.getElementById("dateTask").value = ""
    document.getElementById("options").value = ""
}
//Limpar mensagens
function cleanMsg(){

    document.getElementById("numero-obrigatorio").innerHTML = ""
    document.getElementById("descricao-obrigatorio").innerHTML = ""
    document.getElementById("campo-data").innerHTML = ""
    document.getElementById("status-obrigatotio").innerHTML = ""

}




// function cadastradoComSucesso() {
//     let sucesso = document.getElementById("alerta");

//     sucesso.innerHTML = 'Cadastrado com sucesso.';

//     sucesso.classList.add("alert-success", "animate__fadeInUp"); //CSS do bootstrap
//     sucesso.classList.remove("d-none");


//     window.setTimeout(() => {

//         sucesso.classList.add("animate__fadeOutDown");
//         sucesso.classList.remove("d-none");
//     },

//         3000);
// }