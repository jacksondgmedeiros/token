const baseURL = 'http://localhost:8080/login';

async function fetchUsers() {
    try {
        const response = await fetch(baseURL);
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados');
        }
        const data = await response.json();
        const userList = document.getElementById('userList');
        data.forEach(data => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${data.id}, Login: ${data.login}`;
            userList.appendChild(listItem);
        });
        console.log(data);
    } catch (error) {
        console.error('Erro:', error);
    }
}



// Chamar a função para buscar os dados
 fetchUsers();

    document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os valores dos campos
    const login = document.getElementById('exampleInputEmail1').value;
    const senha = document.getElementById('exampleInputPassword1').value;

    // Cria o objeto com os dados a serem enviados
    const data = {
        login: login,
        senha: senha
    };

    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
        }

        // Verifica se a resposta tem conteúdo antes de tentar convertê-la em JSON
        const text = await response.text();
        const result = text ? JSON.parse(text) : {};
        console.log('Sucesso:', result);
    } catch (error) {
        console.error('Erro:', error);
    }
});



