const emailInput = document.querySelector(".email-user");
const passwordInput = document.querySelector(".senha");
const submitButton = document.querySelector(".signin-btn");

// Função para validar os campos e habilitar/desabilitar o botão
function validateInputs() {
    const isEmailFilled = emailInput.value.trim() !== "";
    const isPasswordFilled = passwordInput.value.trim() !== "";

    // Habilita o botão apenas se ambos os campos estiverem preenchidos
    submitButton.disabled = !(isEmailFilled && isPasswordFilled);

    // Estiliza o botão com base no estado (opcional)
    submitButton.style.backgroundColor = submitButton.disabled ? "#e2e2e2" : "#ffffff";
    submitButton.style.cursor = submitButton.disabled ? "not-allowed" : "pointer";
}

// Adiciona eventos de input para validação em tempo real
emailInput.addEventListener("input", validateInputs);
passwordInput.addEventListener("input", validateInputs);

// Inicializa com o botão desativado
submitButton.disabled = true;
submitButton.style.cursor = "not-allowed";

// Lida com a submissão do formulário
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const username = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
        // Simula o salvamento de dados (a senha é ignorada por questões de segurança)
        localStorage.setItem("userName", username);

        // Redireciona para o index.html
        window.location.href = "/html/index.html";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// Exibir/ocultar senha
let inputEl = document.querySelector(".senha");
let showEl = document.querySelector(".bi-eye");
let hideEl = document.querySelector(".bi-eye-slash");

showEl.addEventListener("click", () => {
    inputEl.type = "text";
    hideEl.classList.remove("d-none");
    showEl.classList.add("d-none");
});

hideEl.addEventListener("click", () => {
    inputEl.type = "password";
    hideEl.classList.add("d-none");
    showEl.classList.remove("d-none");
});

//Script de salvar o usuário
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('email-user').value.trim();

    if (username) {
        // Salvar no localStorage
        console.log('Nome de usuário salvo:', username); // Debug
        localStorage.setItem('userName', username);

        // Redirecionar para o index.html
        window.location.href = '/html/index.html';
    } else {
        alert('Por favor, preencha o campo de nome de usuário.');
    }
});