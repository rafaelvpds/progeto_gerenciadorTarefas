
var bancoTask = [];
var addTask = document.getElementById("btnTask");
var modal = document.getElementById("modalTask");
var cancModal = document.getElementById("btnCancelar");
var salvarModal = document.getElementById("btnSalvar");
addTask.onclick = function () {
    modal.style.display = "block";
}

cancModal.onclick = function () {
    modal.style.display = "none";
}

var i = 0
salvarModal.onclick = function () {
    var status
    i = i+1;
   
    var numeroTask = document.getElementById("numberTask").value;
    document.getElementById("numberTask").value = i
    
    var descricaoTask = document.getElementById("descriptionTask").value;
    var dataTarefa = document.getElementById("dateTask").value;

    // Capturando o Select
    var select = document.querySelector('#options');
    // var statusTask = select.options[select.selectedIndex].text;
    var valueTask =select.value;
 
    if(valueTask === "Concluida"){
        status= "green"
    }else if(valueTask === "Em Andamento"){
        status ="yellow"
    }else if(valueTask ==="Parado"){
        status = "red"
    }
    

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

 
 









