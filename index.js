// Lista que armazenará os contatos temporariamente na memória enquanto o sistema está rodando
let listaContatos = [];

// Função que valida se um número de telefone tem a quantidade correta de dígitos
function validarTelefone(telefone) {
    // Verifica se o telefone tem 10 ou 11 dígitos, aceitando números fixos e celulares
    return telefone.length === 10 || telefone.length === 11;
}

// Função que adiciona um novo contato à lista e exibe na tela
function adicionarContato() {
    // Captura os campos de entrada do formulário
    const inputNome = document.getElementById('input_nome');
    const inputTelefoneP = document.getElementById('input_telefone_principal');
    const inputTelefoneS = document.getElementById('input_telefone_secundario');

    // Verifica se os campos foram preenchidos corretamente.
    if (!inputNome.value.trim()) {
        alert("Por favor, insira um nome.");
        return;
    }
    if (!inputTelefoneP.value.trim()) {
        alert("Por favor, insira o telefone principal.");
        return;
    }
    if (!inputTelefoneS.value.trim()) {
        alert("Por favor, insira o telefone secundário.");
        return;
    }

    // Valida se os números de telefone possuem a quantidade correta de dígitos
    if (!validarTelefone(inputTelefoneP.value)) {
        alert("O telefone principal deve ter 10 ou 11 dígitos.");
        return;
    }
    if (!validarTelefone(inputTelefoneS.value)) {
        alert("O telefone secundário deve ter 10 ou 11 dígitos.");
        return;
    }

    // Verifica se o telefone principal já está cadastrado
    for (const contato of listaContatos) {
        if (contato.telPrincipal === inputTelefoneP.value) {
            alert("O telefone principal já está cadastrado.");
            return;
        }
    }

    // Cria um objeto representando o contato com os valores inseridos
    const novoContato = {
        nome: inputNome.value,
        telPrincipal: inputTelefoneP.value,
        telSecundario: inputTelefoneS.value
    };

    // Adiciona o contato na lista e salva no localStorage
    listaContatos.push(novoContato);
    salvarContatos();

    // Exibe o contato na tabela da interface
    inserirNaTabela(novoContato);

    // Limpa os campos após adicionar o contato e foca no nome para facilitar novo cadastro
    inputNome.value = '';
    inputTelefoneP.value = '';
    inputTelefoneS.value = '';
    inputNome.focus();
}

// Função que salva a lista de contatos no localStorage
function salvarContatos() {
    localStorage.setItem('listaDeContatos', JSON.stringify(listaContatos));
}

// Função que carrega os contatos armazenados no localStorage e os exibe na tela
function carregarContatos() {
    const armazenamento = localStorage.getItem('listaDeContatos');
    listaContatos = armazenamento ? JSON.parse(armazenamento) : [];
    for (const contato of listaContatos) {
        inserirNaTabela(contato);
    }
}

// Função que insere um contato na tabela da interface
function inserirNaTabela(contato) {
    const tabela = document.querySelector('#tabela_contatos tbody');
    const linha = document.createElement('tr');

    linha.innerHTML =
        "<td>" + contato.nome + "</td>" +
        "<td>" + contato.telPrincipal + "</td>" +
        "<td>" + contato.telSecundario + "</td>";

    tabela.appendChild(linha);
}

// Função para navegar para o próximo elemento ao apertar Enter
function irParaProximo(event, proximoElemento) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita o submit padrão
        proximoElemento.focus();
    }
}

// Configura eventos ao carregar a página
function configurarEventos() {
    carregarContatos();

    const inputNome = document.getElementById('input_nome');
    const inputTelefoneP = document.getElementById('input_telefone_principal');
    const inputTelefoneS = document.getElementById('input_telefone_secundario');
    const botaoAdicionar = document.getElementById('botao_adicionar');

    // Navegação com Enter
    inputNome.addEventListener('keydown', e => irParaProximo(e, inputTelefoneP));
    inputTelefoneP.addEventListener('keydown', e => irParaProximo(e, inputTelefoneS));
    inputTelefoneS.addEventListener('keydown', e => irParaProximo(e, botaoAdicionar));

    // Botão adicionar contato
    botaoAdicionar.addEventListener('click', adicionarContato);
}

// Quando a página carregar, configura eventos
window.addEventListener('load', configurarEventos);
