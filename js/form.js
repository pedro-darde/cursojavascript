var botao = document.querySelector("#adicionar-paciente");

botao.addEventListener("click", function(event){
    event.preventDefault();
    var form = document.querySelector("#form-adiciona");
   
    var paciente = obtemPacienteDoFormulario(form);
    if (!validaPaciente(paciente)) {
        console.log("Paciente inválido");
    }
    
   
    var erros = validaPaciente(paciente);

    if (erros.length > 0) {
        exibeMensagensDeErro(erros);
        return;
    }

    //adicionando o paciente na tabela
   
    
    adionaPacienteNaTabela(paciente);
    form.reset();
    form.nome.focus();
    var ul = document.querySelector("#mensagem-erro");
    ul.innerHTML = "";
});

function adionaPacienteNaTabela(paciente){
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function exibeMensagensDeErro(erros){
    var ul = document.querySelector("#mensagem-erro");
    ul.innerHTML = "";
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}


//Função criada para obter dados de um paciente e inserir no formulário
function obtemPacienteDoFormulario(form){
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value,form.altura.value)
    }

    return paciente;
}

//Funcao que recebe os dados e monta a tabela
function montaTr(paciente){
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
    
    pacienteTr.appendChild(montaTd(paciente.nome,"info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso,"info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura,"info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura,"info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc,"info-imc"));

    return pacienteTr;
}

function montaTd(dado,classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}
function validaPaciente(paciente) {

    var erros = [];

    if (!validaPeso(paciente.peso)) erros.push("Peso é inválido");

    if (!validaAltura(paciente.altura)) erros.push("Altura é inválida");

    if(paciente.nome.length == 0) erros.push("Nome não pode ser em branco");

    if(paciente.gordura.length ==0) erros.push("A gordura deve ser preenchida");

    if(paciente.peso.length == 0) erros.push("O peso deve ser preenchido");

    if(paciente.altura.length == 0) erros.push("A altura deve ser preenchida");

    return erros;
}


