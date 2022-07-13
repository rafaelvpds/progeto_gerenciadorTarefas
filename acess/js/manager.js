
var addTask = document.getElementById("btnTask");
var modal = document.getElementById("modalTask");
var cancModal = document.getElementById("btnCancelar");
var salvarModal = document.getElementById("btnSalvar");


// Dispara a ação para abrir o modal
addTask.onclick = function () {
    modal.style.display = "block";
}
// Dispara a ação no botão Cancelar para fechar o modal sem trazer nenhum resultado
cancModal.onclick = function () {
    modal.style.display = "none";
}


// Função de Carregamento de Tela

function loadingScreen() {
    window.setTimeout(() => {
        document.getElementById("loadingTasck").style.display = "none"
    }, 5000)
}

window.addEventListener("load", (event) => {
    loadingScreen();
})

document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("loadingTasck").style.display = "block";
})



// Criei uma Variavel para iniciar as tarefas a apartir do numero 0
var i = 0
salvarModal.onclick = function () {



    i = i + 1;
    // o input NUMERO recebe o valor de i que inicialmelte e 0
    var numeroTask = document.getElementById("numberTask").value;
    document.getElementById("numberTask").value = i
    // recebe o valor da DESCRIÇÃO da tarefa que vai ser realizada
    var descricaoTask = document.getElementById("descriptionTask").value;
    // recebe o valor da DATA que vai entregue a tarefa
    var dataTarefa = document.getElementById("dateTask").value;

    // Capturando o Select
    var select = document.querySelector('#options');
    var valueTask = select.value;
    // Fazendo uma condição para validar qual condição STATUS do select
    //Criei uma variavel "status" para receber o valor ou a Cor na qual vai ser passada quando estivermos jogando 
    //o  resultado da condição
    var status
    if (valueTask === "Concluida") {
        status = "green"
    } else if (valueTask === "Em Andamento") {
        status = "yellow"
    } else if (valueTask === "Parado") {
        status = "red"
    }

    //ESTOU PASSANDO OS VALORE RECEBIDOS PELO USUARIO E IMPRIMINDO NA TABELA

    document.getElementById('tbody').innerHTML = document.getElementById('tbody').innerHTML +
        `
           <tr>
                <td>${numeroTask} </td>
                <td>${descricaoTask} </td>
                <td>${dataTarefa} </td>
                <td class="${status}">${valueTask} </td>
                
                <td><img src="../acess/imagem/icones/editar.png">
                <img src="../acess/imagem/icones/excluir.png">  </td>
           </tr>

     `
    modal.style.display = 'none';
}












