// Função assíncrona para buscar municípios
async function fetchMunicipios() {
    // Obtém o valor do campo de entrada e converte para maiúsculas
    const uf = document.getElementById('ufInput').value.toUpperCase();
    // Obtém o contêiner dos municípios
    const container = document.getElementById('municipiosContainer');
    // Limpa o contêiner
    container.innerHTML = '';

    // Verifica se o valor da UF tem exatamente 2 caracteres
    if (uf.length === 2) {
        try {
            // Faz a requisição à API usando o valor da UF
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`);
            // Verifica se a resposta não é válida
            if (!response.ok) throw new Error('Erro na rede');
            // Converte a resposta para JSON
            const data = await response.json();

            // Itera sobre os dados recebidos e cria um div para cada município
            data.forEach(distrito => {
                const municipioDiv = document.createElement('div');
                municipioDiv.className = 'municipio';
                municipioDiv.textContent = distrito.nome;
                container.appendChild(municipioDiv);
            });
        } catch (error) {
            // Exibe uma mensagem de erro no console e no contêiner
            console.error('Erro ao buscar municípios:', error);
            container.innerHTML = '<div class="municipio">Erro ao carregar municípios</div>';
        }
    }
}
