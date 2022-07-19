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
let cancModal = document.getElementById("btnCancelar");





async function adicionarTarefas(){

let inptNumberTask = document.getElementById("numberTask").value;
let inptDescriptionTask = document.getElementById("descriptionTask").value;
let inptDateTask = document.getElementById("dateTask").value;
let inptstatusTask = document.getElementById("options").value;
// let inptstatusTask = select.value;

if(inptDescriptionTask ==""){
    document.getElementById("descricao-obrigatorio").innerHTML ="Preencha o Campo Descrção"

}else{
    document.getElementById("descricao-obrigatorio").innerHTML =""
}
if(inptDateTask===""){
   document.getElementById("campo-data").innerHTML ="Preencha Data"
 
}else{
    document.getElementById("campo-data").innerHTML =""
}
if(inptstatusTask===""){
    document.getElementById("status-obrigatotio").innerHTML ="Preencha o Campo Status"
   
}else{
    document.getElementById("status-obrigatotio").innerHTML =""
}

if(inptNumberTask !=='' && inptDescriptionTask !==''&& inptDateTask!==''&inptstatusTask!==''){
   
                task ={
                        numberTask: inptNumberTask,
                        descriptionTask: inptDescriptionTask,
                        dateTask: inptDateTask,
                        statusTask: inptstatusTask,  
                    }
                    
                const cadastrarTask = await fetch('http://localhost:3000/atividades',{
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(task)
                })
                
                    await carregarTask();
                    document.getElementById("numberTask").value = ""
                    document.getElementById("descriptionTask").value =""
                    document.getElementById("dateTask").value = ""
                    document.getElementById("options").value = ""
                    fecharModal()
     
    } 
    
}

let excluir = async(idTarefas) =>{
    console.log(idTarefas)
    let response = await fetch (`http://localhost:3000/atividades/${idTarefas}`,{
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        },
    
    })
             await carregarTask();

}



let editar = async (idTarefas) =>{

    modal.style.display = "block";
    console.log(idTarefas)
    let response = await fetch(`http://localhost:3000/atividades/${idTarefas}`)
    let editarTask = await response.json()

 
    
    document.getElementById("dateTask").value = editarTask.dateTask
    document.getElementById("descriptionTask").value = editarTask.descriptionTask           
    document.getElementById("numberTask").value = editarTask.numberTask            
    document.getElementById("options").value = editarTask.statusTask 
    document.getElementById("tarefa").value = idTarefas

    document.getElementById('btnSalvar').onclick =function (){
    salvarEd(idTarefas)} 
}

const salvarEd = async (idTarefas) =>{ // async function editarTask(){
    // let inputTarefa = document.getElementById("tarefa").value
    let inptNumberTask = document.getElementById("numberTask").value;
    let inptDescriptionTask = document.getElementById("descriptionTask").value;
    let inptDateTask = document.getElementById("dateTask").value;
    let inptstatusTask = document.getElementById("options").value;
   
    
    if(inptDescriptionTask ==""){
        document.getElementById("descricao-obrigatorio").innerHTML ="Preencha o Campo Descrção"
    
    }else{
        document.getElementById("descricao-obrigatorio").innerHTML =""
    }
    if(inptDateTask===""){
       document.getElementById("campo-data").innerHTML ="Preencha Data"
     
    }else{
        document.getElementById("campo-data").innerHTML =""
    }
    if(inptstatusTask===""){
        document.getElementById("status-obrigatotio").innerHTML ="Preencha o Campo Status"
       
    }else{
        document.getElementById("status-obrigatotio").innerHTML =""
    }
    
    if(inptNumberTask !=='' && inptDescriptionTask !==''&& inptDateTask!==''&inptstatusTask!==''){
       
                    task ={

                            numberTask: inptNumberTask,
                            descriptionTask: inptDescriptionTask,
                            dateTask: inptDateTask,
                            statusTask: inptstatusTask,  
                        }
                        
                    const cadastrarTask = await fetch(`http://localhost:3000/atividades/${idTarefas}`,{
                        method: 'PUT',
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(task)
                    })
                    
                    await carregarTask();
                    document.getElementById("numberTask").value = ""

                    document.getElementById("descriptionTask").value =""

                    document.getElementById("dateTask").value = ""

                    document.getElementById("options").value = ""

                    fecharModal()
         
        } 
}

let buscarTask = async () => {
    const response = await fetch("http://localhost:3000/atividades");
    const tarefa = await response.json()
    return tarefa
}

let carregarTask = async()=>{
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

// ---------------------------------------------------------------

// Dispara a ação para abrir o modal
addTask.onclick = function () {
    modal.style.display = "block";
}
// Dispara a ação no botão Cancelar para fechar o modal sem trazer nenhum resultado
cancModal.onclick = function () {
    modal.style.display = "none";
}
function fecharModal(){
    modal.style.display = "none"
}

// Dispara a ação para abrir o modal
addTask.onclick = function () {
    modal.style.display = "block"
    document.getElementById('btnSalvar').onclick =
    function (){
    adicionarTarefas()
} 
}
// Dispara a ação no botão Cancelar para fechar o modal sem trazer nenhum resultado
cancModal.onclick = function () {
    modal.style.display = "none";
}

    // Verificar apos a conclusao das funcionalidades

    // function cadastradoComSucesso() {
    //     let sucesso = document.getElementById("alerta");

    //     sucesso.innerHTML = 'Cadastrado com sucesso.';

    //     sucesso.classList.add("alert-success", "animate__fadeInUp"); //CSS do bootstrap
    //     sucesso.classList.remove("d-none");


    //     window.setTimeout(() => {
            
    //         sucesso.classList.add("animate__fadeOutDown");
    //         sucesso.classList.remove("d-none");
    //     },

    //         2000);
    // }

    // function validadTask(){
    //     let erroTask = document.getElementById('alertaErro')

    //     erroTask.innerHTML = "Campos Obrigatorios não Preenchidos"

    //     erroTask.classList.add("animate__fadeInUp");
    //     erroTask.classList.remove('d-none');

    //     window.setTimeout(()=>{
    //         erroTask.classList.add('animate__fadeOutDown');
    //         erroTask.classList.remove('d-none');
    //     },
    //     2000);
    // }


