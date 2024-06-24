// main.js

function loginUser() {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        mode: 'no-cors', // alterar para no cors, caso queira continuar sem configurar o cors no back
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciais inválidas');
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuário logado:', data);
        window.location.href = '/cadastro.html'; // Redirecionar após o login
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error.message);
        // Tratar erro de login aqui, como exibir uma mensagem de erro na tela
    });
}



