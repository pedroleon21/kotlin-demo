const restPath = "./empregado";
let editinRow;
const erroAlerta = function (mensagem){
    const elAlerta = document.getElementById("alerta");
    elAlerta.append(mensagem);
    elAlerta.hidden = false
    setTimeout(()=>elAlerta.hidden = true,5000)
}
const deleteRole = function (id){
    fetch(`${restPath}/${id}`,{
        method: "DELETE"
    })
        .then(res=>{
            const trDelete = document.getElementById(`role-${id}`)
            trDelete.parentElement.removeChild(trDelete);
        })
        .catch(()=>erroAlerta("Erro ao deletar item"))
}
const finishUpdate = function (){
    document.getElementById("btn").hidden=false;
    document.getElementById("btn-update").hidden=true
    document.getElementById("btn-cancelar").hidden=true
}
const editRow = function (id){
    editinRow = id
    fetch(`${restPath}/${id}`,{
        method: "GET"
    })
        .then(res=>res.json())
        .then(empregado=>{
            const nameInput=document.getElementsByName("nome")[0];
            const sobrenomeInput = document.getElementsByName("sobrenome")[0];
            const dataInput = document.getElementsByName("dtNacimento")[0];
            nameInput.value= empregado.nome;
            sobrenomeInput.value=empregado.sobrenome;
            dataInput.value = (function (){
                if(!!empregado.dtNacimento){
                    let date = new Date(empregado.dtNacimento);
                    return date.toJSON().split("T")[0]
                }
                return null
            })()
            document.getElementById("btn").hidden=true;
            document.getElementById("btn-update").hidden=false
            document.getElementById("btn-cancelar").hidden=false
        })
}
const clearForm = function (){
    const nameInput=document.getElementsByName("nome")[0];
    const sobrenomeInput = document.getElementsByName("sobrenome")[0];
    const dataInput = document.getElementsByName("dtNacimento")[0];
    nameInput.value = ""
    sobrenomeInput.value = ""
    dataInput.value = ""
}
document.getElementById("btn-update")
    .addEventListener("click",event=>{
        event.preventDefault();
        const nameInput=document.getElementsByName("nome")[0];
        const sobrenomeInput = document.getElementsByName("sobrenome")[0];
        const dataInput = document.getElementsByName("dtNacimento")[0];
        const body = JSON.stringify({
            id: editinRow,
            nome: nameInput.value,
            sobrenome: sobrenomeInput.value,
            dtNacimento: new Date(dataInput.value || "").toISOString() ,
        });
        fetch(restPath,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        })
            .then(res=> {
                getAll()
                finishUpdate()
                clearForm()
            })
    })
document.getElementById("btn-cancelar")
    .addEventListener("click",event=>{
        event.preventDefault();
        clearForm()
        finishUpdate();
    })
const render = function (empregados = []){
    const  divTable = document.getElementById("div-table");
    let elTable = document.createElement("table");
    elTable.insertAdjacentHTML("afterbegin","<tr><th style='display: none'>id</th><th>Nome</th><th>Sobrenome</th><th>Nascimento</th><th>Data Cadastro</th><th>Atualizar</th><th>Deletar</th></tr>")
    empregados.forEach(empregado =>{
        elTable.insertAdjacentHTML("beforeend",
            `<tr id="role-${empregado.id}"><td style="display:none">${empregado.id}</td><td>${empregado.nome}</td><td>${empregado.sobrenome}</td><td>${!!empregado.dtNacimento ? new Date(empregado.dtNacimento).toDateString() : empregado.dtNacimento}</td><td>${!!empregado.dthCriacao ? new Date(empregado.dthCriacao).toLocaleTimeString() : empregado.dthCriacao}</td><td><input type="submit" value="update" onclick="editRow(${empregado.id})"></td><td><input type="submit" value="delete" onclick="deleteRole(${empregado.id})"></td></tr>`)
    })
    divTable.innerHTML = ""
    divTable.appendChild(elTable)
}
const getAll = async function (){
    await fetch(restPath,{
        method: 'GET',
    })
        .then(res=>res.json())
        .then(render)
        .catch(()=>erroAlerta("Erro ao buscar itens"))
}
document.getElementById("btn")
    .addEventListener("click",(event)=>{
    event.preventDefault()
    const nameInput=document.getElementsByName("nome")[0];
    const sobrenomeInput = document.getElementsByName("sobrenome")[0];
    const dataInput = document.getElementsByName("dtNacimento")[0];
    const body = JSON.stringify({
        nome: nameInput.value,
        sobrenome: sobrenomeInput.value,
        dtNacimento: new Date(dataInput.value || "").toISOString() ,
    });
    fetch(restPath,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    })
        .then(res=> {
            getAll()
            clearForm()
        })
});
getAll();