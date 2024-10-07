const baseURL = 'http://localhost:8080/login';
// let token = '';
// async function fetchUsers() {
//     try {
//         const response = await fetch(baseURL);
//         if (!response.ok) {
//             throw new Error('Erro ao buscar os dados');
//         }
//         const data = await response.json();
//         const userList = document.getElementById('userList');
//         data.forEach(data => {
//             const listItem = document.createElement('li');
//             listItem.textContent = `ID: ${data.id}, Login: ${data.login}`;
//             userList.appendChild(listItem);
//         });
//         console.log(data);
        
//         console.log("token do usuário", token);
        
//     } catch (error) {
//         console.error('Erro:', error);
//     }    
// }



// Chamar a função para buscar os dados apenas na página inicial

// if(window.location.pathname === './'){

//     fetchUsers();
// }


 async function cadastrarUser(event){

        
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
            const response = await fetch(baseURL, {
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
 }



//  // Função para realizar o login
// async function realizarLogin(event) {
//     event.preventDefault(); // Previne o envio padrão do formulário

//     // Captura os valores de login e senha
//     const login = document.getElementById('exampleInputEmail1').value;
//     const senha = document.getElementById('exampleInputPassword1').value;

//     // Cria o objeto com os dados a serem enviados
//     const data = {
//         login: login,
//         senha: senha
//     };

//     try {
//         var endPoint = baseURL + "/autenticar";
//         // Faz a requisição para o endpoint
//         const response = await fetch(endPoint, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });

//         // Se a resposta não for OK, dispara um erro
//         if (!response.ok) {
//             throw new Error('Erro ao fazer login');
            
//         } 

        
//         // Converte a resposta para JSON
//         const result = await response.json();
//         console.log("resposta", result);

//         let token = result.success;

//         // Supondo que o servidor retorna um campo "success" para verificar o login
//         if (result.success) {
//             // Se o login estiver correto, redireciona para a página de logado
//             window.location.href = 'logado.html';
//             console.log('Logado no banco');
            
//         } else {
//             // Exibe mensagem de erro se o login ou a senha estiverem errados
//             const errorMessage = document.getElementById('error-message');
//             errorMessage.innerText = 'Usuário ou senha incorretos';
//             errorMessage.style.display = 'block';
//         }

        
//     } catch (error) {
//         // Captura erros de conexão ou outras falhas
//         const errorMessage = document.getElementById('error-message');
//         // errorMessage.innerText = 'Erro ao fazer login. Tente novamente mais tarde.';
//         // errorMessage.style.display = 'block';
//         errorMessage.classList.remove('d-none');
//         // errorMessage.classList.add('d-block');
        
//     }
// }

// Adiciona um event listener ao botão de submit do formulário
if(window.location.pathname === './'){

    document.getElementById('loginForm').addEventListener('submit', realizarLogin);
}


// if(window.location.pathname === '/logado.html'){
//     fetchUsers();
// }




// const baseURL = 'http://localhost:8080'; // Defina sua base URL aqui

async function realizarLogin(event) {
    event.preventDefault();

    const login = document.getElementById('exampleInputEmail1').value;
    const senha = document.getElementById('exampleInputPassword1').value;

    const data = { login: login, senha: senha };

    try {
        const response = await fetch(baseURL + '/autenticar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token // Inclua o token na requisição, caso esteja presente
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }

        const result = await response.json();
        console.log("resposta", result);

        // Supondo que o servidor retorna um campo "token" no resultado
        let token = result.success;

        console.log(token)
        if (token) {
            // Armazenar o token para uso posterior
            localStorage.setItem('token', token);

            // Redirecionar para a página logada
            window.location.href = 'logado.html';
        } else {
            const errorMessage = document.getElementById('error-message');
            errorMessage.innerText = 'Usuário ou senha incorretos';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.classList.remove('d-none');
    }
}

async function fetchUsers() {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(baseURL, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar os dados');
        }

        const data = await response.json();
        const userList = document.getElementById('userList');
        data.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${user.id}, Login: ${user.login}`;
            userList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

if (window.location.pathname === '/logado.html') {
    fetchUsers();
}
