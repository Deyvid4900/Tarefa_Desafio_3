// Função para montar a tabela HTML

const spinner = document.getElementById('spinner')
const btns = document.getElementById('btns')
let idAux=0;
function montarTabela(dados) {
    // Seleciona o elemento onde a tabela será inserida
    var tabela = document.getElementById('tabela-dados');

    // Cria o cabeçalho da tabela
    var cabecalho = '<tr><th>Nome</th><th>Email</th><th>Telefone</th></tr>';

    // Inicializa o conteúdo da tabela
    var conteudo = '';

    // Loop através dos dados e adiciona cada linha à tabela
    dados.forEach(function (item) {
        conteudo += '<tr>';
        conteudo += '<td>' + item.Nome + '</td>';
        conteudo += '<td>' + item.Email + '</td>';
        conteudo += '<td>' + item.Telefone + '</td>';
        conteudo += '</tr>';
    });

    // Define o HTML da tabela
    tabela.innerHTML = cabecalho + conteudo;
}



// Função para carregar os dados da planilha
function loadSheetData() {
    fetch('https://script.google.com/macros/s/AKfycbzHDAh7KzDwZbUJVCKI9CDblEB341ZWI9Lkdiu3bfBpo49UCVMDuL1qclkIlpXmnck-XA/exec')
        .then(response => response.json())
        .then(data => {

            // Faça algo com os dados recebidos
            const ultimoId = data.reduce((ultimo, atual) => {
                return Math.max(ultimo, atual.Id);
            }, -Infinity);
            console.log(data)
            console.log(ultimoId)

            idAux = ultimoId

            spinner.style = 'display:none;'
            btns.style = 'display:flex !important;'
            montarTabela(data);

        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
}

// Carrega os dados da planilha quando a página é carregada
window.addEventListener('load', loadSheetData);



// Função para adicionar um registro
function adicionarRegistro() {
    let id = idAux + 1;
    var nome = document.getElementById('nomeAdicionar').value;
    var email = document.getElementById('emailAdicionar').value;
    var telefone = document.getElementById('telefoneAdicionar').value;

    var url = 'https://script.google.com/macros/s/AKfycbyJklmJhunUz7iznsLJmfOlnH-6E4_awBG86Wwg_z8Sd8Eye4NrAoXRBDebvSb9LXAI/exec'; // Substitua pelo URL da sua API

    var parametros = {
        method: 'GET',
        action: 'add',
        identificacao:id,
        nome: nome,
        email: email,
        telefone: telefone
    };
    console.log(url + '?' + new URLSearchParams(parametros))
    fetch(url + '?' + new URLSearchParams(parametros))
        .then(response => response.text())
        .then(data => {
            alert(data); // Exibe a mensagem retornada pela API
            // reload()
            console.log(id)
        })
        .catch(error => console.error('Erro ao adicionar registro:', error));
}

// Função para remover um registro
function removerRegistro() {
    var nome = document.getElementById('nomeDeletar').value;

    var url = 'https://script.google.com/macros/s/AKfycbyJklmJhunUz7iznsLJmfOlnH-6E4_awBG86Wwg_z8Sd8Eye4NrAoXRBDebvSb9LXAI/exec'; // Substitua pelo URL da sua API

    var parametros = {
        method: 'GET',
        action: 'delete',
        nome: nome
    };

   
    fetch(url + '?' + new URLSearchParams(parametros))
        .then(response => response.text())
        .then(data => {
            alert(data); // Exibe a mensagem retornada pela API
            reload()
        })
        .catch(error => console.error('Erro ao remover registro:', error));
}
function reload(){
    location.reload()
}
// Função para atualizar um registro
function atualizarRegistro() {
    var nomeSelecionado = document.getElementById('nomeSelecionado').value;
    var nome = document.getElementById('nomeAtualizar').value;
    var novoEmail = document.getElementById('novoEmail').value;
    var novoTelefone = document.getElementById('novoTelefone').value;

    var url = 'https://script.google.com/macros/s/AKfycbyJklmJhunUz7iznsLJmfOlnH-6E4_awBG86Wwg_z8Sd8Eye4NrAoXRBDebvSb9LXAI/exec'; // Substitua pelo URL da sua API

    var parametros = {
        method: 'GET',
        action: 'update',
        nomeSelecionado:nomeSelecionado,
        nome: nome,
        email: novoEmail,
        telefone: novoTelefone
    };

    fetch(url + '?' + new URLSearchParams(parametros))
        .then(response => response.text())
        .then(data => {
            alert(data); // Exibe a mensagem retornada pela API
            reload()
        })
        .catch(error => console.error('Erro ao atualizar registro:', error));
}
