// Script para bloquear a tecla tab
document.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault(); // Bloquear o comportamento padrão da tecla Tab
  }
});

//Script Input Senha
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

//Script Input de Data
document.getElementById("date").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

//Validação de Inputs

// Função de validação de e-mail

const validateEmail = (email) => {
  const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
  return regex.test(email);
};

const firstBtn = document.querySelector("#first-btn");
const emailVer = document.querySelector("#email-input");

emailVer.addEventListener("input", function () {
  const email = emailVer.value;
  if (validateEmail(email)) {
    firstBtn.removeAttribute("disabled");
  } else {
    firstBtn.setAttribute("disabled", "true");
  }
});

// Validação adicional
firstBtn.addEventListener("click", function (event) {
  event.preventDefault();
});

// Validar Etapa 1

const senhaInput = document.querySelector(".senha");
const nextButton = document.querySelector(".next-1 button");
const letterCheck = document.querySelector(".letter-check i");
const charCheck = document.querySelector(".character-check i");
const lengthCheck = document.querySelector(".length-check i");

const validateSenha = (senha) => {
  const hasLetter = /[a-zA-Z]/.test(senha);
  const hasNumberOrSpecial = /[\d!@#$%^&*(),.?":{}|<>]/.test(senha);
  const hasLength = senha.length >= 10;

  letterCheck.className = hasLetter
    ? "bi bi-check-circle text-white"
    : "bi bi-circle text-white";
  charCheck.className = hasNumberOrSpecial
    ? "bi bi-check-circle text-white"
    : "bi bi-circle text-white";
  lengthCheck.className = hasLength
    ? "bi bi-check-circle text-white"
    : "bi bi-circle text-white";

  return hasLetter && hasNumberOrSpecial && hasLength;
};

senhaInput.addEventListener("input", () => {
  const senha = senhaInput.value;

  // Ativar/desativar botão
  if (validateSenha(senha)) {
    nextButton.removeAttribute("disabled");
  } else {
    nextButton.setAttribute("disabled", "true");
  }
});

// Ação do botão "Avançar"
nextButton.addEventListener("click", (event) => {
  const senha = senhaInput.value;

  // Se a senha for válida
  if (validateSenha(senha)) {
    slidePage.style.marginLeft = "-50%";
    hideFirstStep.classList.add("d-none");
    firstReturnBtn.classList.add("d-none");
    secReturnBtn.classList.remove("d-none");
    hideSecStep.classList.remove("d-none");
    changeProgress.style.width = "66%";
  } else {
    event.preventDefault();
    alert("A senha não atende aos critérios necessários!");
  }
});

// Validar Etapa 2

const nameInput = document.querySelector(".name");
const dayInput = document.querySelector(".input-day input");
const monthSelect = document.querySelector(".dropdown-month select");
const yearInput = document.querySelector(".input-year input");
const genderInputs = document.querySelectorAll(".input-gender input");
const nextStepButton = document.querySelector(".next-2 button");

// Função para verificar a data de nascimento
const isValidDate = (day, month, year) => {
  const dayNum = parseInt(day, 10);
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);

  if (!dayNum || !monthNum || !yearNum) return false;
  if (yearNum < 1900 || yearNum > new Date().getFullYear()) return false;

  // Verificar se o dia é válido
  const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
  return dayNum > 0 && dayNum <= daysInMonth;
};

// Função para verificar se todos os campos estão válidos
const validateStep2 = () => {
  const name = nameInput.value.trim();
  const day = dayInput.value.trim();
  const month = monthSelect.selectedIndex;
  const year = yearInput.value.trim();
  const genderSelected = Array.from(genderInputs).some(
    (input) => input.checked
  );

  const isNameValid = name.length > 0;

  const isDateValid = isValidDate(day, month, year);

  // Ativar ou desativar o botão "Avançar"
  if (isNameValid && isDateValid && genderSelected) {
    nextStepButton.removeAttribute("disabled");
  } else {
    nextStepButton.setAttribute("disabled", "true");
  }
};

//Validação em tempo real
nameInput.addEventListener("input", validateStep2);
dayInput.addEventListener("input", validateStep2);
monthSelect.addEventListener("change", validateStep2);
yearInput.addEventListener("input", validateStep2);
genderInputs.forEach((input) =>
  input.addEventListener("change", validateStep2)
);

// Inicializar validação no carregamento
validateStep2();

//Validação Etapa 3

// Referências ao checkbox de termos e ao botão "Inscrever-se"
const termsCheckbox = document.querySelector("#agree-terms");
const signupButton = document.querySelector(".signup-btn");

// Função para validar se o checkbox está marcado
const validateTerms = () => {
  if (termsCheckbox.checked) {
    signupButton.removeAttribute("disabled");
  } else {
    signupButton.setAttribute("disabled", "true");
  }
};

// Linkar para index.html
const signupLink = document.querySelector(".signup-btn");

signupLink.addEventListener("click", () => {
  window.location.href = "/index.html";
});

// Adicionando o evento de change no checkbox para validar em tempo real
termsCheckbox.addEventListener("change", validateTerms);

// Inicializar validação no carregamento
validateTerms();

//Script Botão de Avançar e Retornar
const slidePage = document.querySelector(".slide-page");
const firstNextBtn = document.querySelector(".nextBtn");
const secNextBtn = document.querySelector(".next-1");
const thirdNextBtn = document.querySelector(".next-2");
const firstReturnBtn = document.querySelector(".return-1");
const secReturnBtn = document.querySelector(".return-2");
const thirdReturnBtn = document.querySelector(".return-3");

const hideHeader = document.querySelector(".form-header span");
const hideFirstStep = document.querySelector(".step-1");
const hideSecStep = document.querySelector(".step-2");
const hideThirdStep = document.querySelector(".step-3");
const showProgress = document.querySelector(".header-container");
const changeProgress = document.querySelector(".real-progress");

// Avançar para a Etapa 1
firstNextBtn.addEventListener("click", function () {
  slidePage.style.marginLeft = "-25%";
  hideHeader.classList.add("d-none");
  showProgress.classList.remove("d-none");
});

// Avançar para a Etapa 2
secNextBtn.addEventListener("click", function () {
  slidePage.style.marginLeft = "-50%";
  hideFirstStep.classList.add("d-none");
  firstReturnBtn.classList.add("d-none");
  secReturnBtn.classList.remove("d-none");
  hideSecStep.classList.remove("d-none");
  changeProgress.style.width = "66%";
});

// Avançar para a Etapa 3
thirdNextBtn.addEventListener("click", function () {
  slidePage.style.marginLeft = "-75%";
  hideSecStep.classList.add("d-none");
  hideThirdStep.classList.remove("d-none");
  secReturnBtn.classList.add("d-none");
  thirdReturnBtn.classList.remove("d-none");
  changeProgress.style.width = "100%";
});

// Retornar para a Tela Inicial
firstReturnBtn.addEventListener("click", function () {
  slidePage.style.marginLeft = "0";
  hideHeader.classList.remove("d-none");
  showProgress.classList.add("d-none");
});

// Retornar para a Etapa 1
secReturnBtn.addEventListener("click", function () {
  slidePage.style.marginLeft = "-25%";
  hideFirstStep.classList.remove("d-none");
  hideSecStep.classList.add("d-none");
  firstReturnBtn.classList.remove("d-none");
  secReturnBtn.classList.add("d-none");
  changeProgress.style.width = "33%";
});

// Retornar para a Etapa 2
thirdReturnBtn.addEventListener("click", function () {
  slidePage.style.marginLeft = "-50%";
  hideSecStep.classList.remove("d-none");
  hideThirdStep.classList.add("d-none");
  secReturnBtn.classList.remove("d-none");
  thirdReturnBtn.classList.add("d-none");
  changeProgress.style.width = "66%";
});

//Script de salvar o usuário
document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();

  if (username) {
    // Salvar no localStorage
    console.log("Nome de usuário salvo:", username); // Debug
    localStorage.setItem("userName", username);

    // Redirecionar para o index.html
    window.location.href = "../index.html";
  } else {
    alert("Por favor, preencha o campo de nome de usuário.");
  }
});
