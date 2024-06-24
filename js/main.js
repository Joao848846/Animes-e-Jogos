// main.js

function loginUser() {
    const username = document.querySelector('input[name="username"]').value; // Alterado para username
    const password = document.querySelector('input[name="password"]').value;

    fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        mode: 'cors', // Alterado para cors se o servidor estiver configurado para CORS
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Alterado para username
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciais inválidas');
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuário logado:', data);
        // Redirecionar para a página desejada após o login
        window.location.href = '/cadastro.html'; // Exemplo: redireciona para a página de dashboard
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error.message);
        // Tratar erro de login aqui, como exibir uma mensagem de erro na tela
    });
}

