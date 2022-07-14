// // Função de Carregamento de Tela

function loadingScreen() {
    window.setTimeout(() => {
        document.getElementById("loadingTask").style.display = "none"
    }, 1000)
}

window.addEventListener("load", (event) => {
    loadingScreen();
})

document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("loadingTask").style.display = "block";
})
// ----------------------------------------------------------------------------

let bancoTask =[];
let addTask = document.getElementById("btnTask");
let modal = document.getElementById("modalTask");
let cancModal = document.getElementById("btnCancelar");

let salvarModal = document.getElementById("btnSalvar");




salvarModal.onclick = () =>{

let inptNumberTask = document.getElementById("numberTask").value;
let inptDescriptionTask = document.getElementById("descriptionTask").value;
let inptDateTask = document.getElementById("dateTask").value;
let select = document.querySelector('#options');
let inptstatusTask = select.value;


validateInput(inptDescriptionTask, document.getElementById("descricao-obrigatorio").innerHTML ="Preencha o Campo Descrção")
validateInput(inptDateTask, document.getElementById("campo-data").innerHTML ="Preencha Data")

validateInput(inptstatusTask, document.getElementById("status-obrigatotio").innerHTML ="Preencha o Campo Status")


if(inptNumberTask !=='' && inptDescriptionTask !==''&& inptDateTask!==''&inptstatusTask!==''){

    let task ={
            numberTask: inptNumberTask,
            descriptionTask: inptDescriptionTask,
            dateTask: inptDateTask,
            statusTask: inptstatusTask,  
        }
        bancoTask.push(task)
        // console.log(task)
        printTask()

    }
}

let printTask = ()=>{

    let lista =''
    console.log(bancoTask)
    bancoTask.forEach((task)=>{

        let status

        if (task.statusTask === "Concluida") {
            status = "green"
        } else if (task.statusTask === "Em Andamento") {
            status = "yellow"
        } else if (task.statusTask === "Parado") {
            status = "red"
        }
           lista = lista +
                    `
                   <tr>
                        <td>${task.numberTask} </td>
                        <td>${task.descriptionTask} </td>
                        <td>${task.dateTask} </td>
                        <td class="${status}">${task.statusTask} </td>
                        
                        <td>
                        
                            <img src="../acess/imagem/icones/editar.png">
                            <img src="../acess/imagem/icones/excluir.png">  
                        
                        </td>
                   </tr>
        
            `
    })
    document.getElementById('tbody').innerHTML = lista

    // console.log("fora",lista)
}
let validateInput = (valorInput, msgObrigatorio) =>{
 
    if(valorInput===''){
        // console.log("vazio")
        msgObrigatorio = ""
        console.log(msgObrigatorio)
      
    }else{
        msgObrigatorio= ""
    }
}






// Dispara a ação para abrir o modal
addTask.onclick = function () {
    modal.style.display = "block";
}
// Dispara a ação no botão Cancelar para fechar o modal sem trazer nenhum resultado
cancModal.onclick = function () {
    modal.style.display = "none";
}

// Dispara a ação para abrir o modal
addTask.onclick = function () {
    modal.style.display = "block";
}
// Dispara a ação no botão Cancelar para fechar o modal sem trazer nenhum resultado
cancModal.onclick = function () {
    modal.style.display = "none";
}

//     function cadastradoComSucesso() {
//         let sucesso = document.getElementById("alerta");

//         sucesso.innerHTML = 'Cadastrado com sucesso.';

//         sucesso.classList.add("alert-success", "animate__fadeInUp"); //CSS do bootstrap
//         sucesso.classList.remove("d-none");


//         window.setTimeout(() => {

//             sucesso.document.getElementById("alerta").classList.remove("animate__fadeInUp");
//             // sucesso.document.getElementById("alerta").classList.add("animate__fadeOutDown")

//         },

//             2000);

//         window.setTimeout(() => {
            
//             sucesso.classList.add("animate__fadeOutDown");
//             sucesso.classList.remove("d-none");
//         },

//             1000);

//         window.setTimeout(() => {
//             sucesso.classList.add("d-none");
//             sucesso.classList.remove("animate__fadeOut");
//         })
//     }


// }
