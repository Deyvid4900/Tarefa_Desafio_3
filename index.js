// ID da planilha do Google Sheets
const sheetID = '1l5XP_PJ3hIqCEEvYgK0m4aE8Rbks_g0nHmfAI4UtMxw';

// ID da página da planilha
const sheetPage = 'Página1';

// Função para carregar os dados da planilha
function loadSheetData() {
    fetch(`https://spreadsheets.google.com/feeds/list/${sheetID}/${sheetPage}/public/values?alt=json`)
        .then(response => response.json())
        .then(data => {
            const entries = data.feed.entry;
            const table = document.getElementById('data-table');
            table.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados
            entries.forEach(entry => {
                const row = table.insertRow();
                row.insertCell(0).textContent = entry.gsx$column1.$t;
                row.insertCell(1).textContent = entry.gsx$column2.$t;
                // Adicione mais células conforme o número de colunas na sua planilha
            });
        })
        .catch(error => console.error('Erro ao carregar os dados da planilha:', error));
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
