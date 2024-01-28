// Função para montar a tabela HTML
const spinner = document.getElementById('spinner')
const btns =  document.getElementById('btns')
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
            console.log(data);

            spinner.style = 'display:none;'
            btns.style = 'display:flex !important;'
            montarTabela(data);

        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
}

// Função para adicionar um item na planilha
function addRowToSheet() {
    // Implemente a lógica para adicionar um item na planilha
    // Isso pode envolver a abertura de um formulário ou uma caixa de diálogo para inserir novos dados
}

// Função para excluir um item da planilha
function deleteRowFromSheet() {
    // Implemente a lógica para excluir um item da planilha
}

// Event listeners para os botões
document.getElementById('add-row').addEventListener('click', addRowToSheet);
document.getElementById('delete-row').addEventListener('click', deleteRowFromSheet);

// Carrega os dados da planilha quando a página é carregada
window.addEventListener('load', loadSheetData);
