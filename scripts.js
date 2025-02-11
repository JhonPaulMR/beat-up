// Script para verificar usuário salvo no localStorage
window.onload = function () {
  const authButtons = document.getElementById("auth-buttons");
  const welcomeMessage = document.getElementById("welcome-message");
  const userNameSpan = welcomeMessage.querySelector("span");
  const logoutButton = document.getElementById("logout-button");
  const userName = localStorage.getItem("userName");

  if (userName) {
    // Esconder botões de login/inscrição
    authButtons.classList.add("d-none");

    // Mostrar mensagem de boas-vindas e botão de logout
    welcomeMessage.classList.remove("d-none");
    userNameSpan.textContent = `Seja bem-vindo(a), ${userName}!`;

    // Adicionar evento de logout
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("userName");
      location.reload(); // Recarrega a página
    });
  } else {
    // Mostrar botões de login/inscrição
    authButtons.classList.remove("d-none");
    welcomeMessage.classList.add("d-none");
  }
};
//Pop up Criar Playlist
document.addEventListener("DOMContentLoaded", () => {
  const plusButton = document.getElementById("plus-btn");
  const popupMenu = document.getElementById("popup-menu");

  plusButton.addEventListener("click", () => {
    popupMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!plusButton.contains(e.target) && !popupMenu.contains(e.target)) {
      popupMenu.classList.add("hidden");
    }
  });

  const createPlaylist = document.getElementById("create-playlist");
  const createFolder = document.getElementById("create-folder");

  createPlaylist.addEventListener("click", () => {
    alert("Nova playlist criada!");
  });

  createFolder.addEventListener("click", () => {
    alert("Nova pasta de playlists criada!");
  });
});

// Pop UP músicas

document.addEventListener("DOMContentLoaded", () => {
  let activePopup = null;

  // Bloqueia/desbloqueia o scroll do container principal
  const toggleScroll = (block) => {
    const mainContainer = document.querySelector(".main-container");
    if (block) {
      mainContainer.style.overflow = "hidden"; // Bloqueia o scroll
    } else {
      mainContainer.style.overflow = ""; // Restaura o scroll
    }
  };

  // Cria o pop-up dinâmico
  const createPopup = (options, x, y) => {
    // Remove o pop-up ativo anterior (se existir)
    if (activePopup) {
      activePopup.remove();
      toggleScroll(false); // Desbloqueia o scroll
      activePopup = null;
    }

    // Cria o novo pop-up
    const popup = document.createElement("div");
    popup.className = "context-popup";
    popup.style.top = `${y}px`;
    popup.style.left = `${x}px`;

    options.forEach((option) => {
      const optionElement = document.createElement("div");
      optionElement.className = "context-option d-flex align-items-center";
      optionElement.innerHTML = `<i class="${option.icon} me-2"></i>${option.label}`;
      optionElement.addEventListener("click", option.action);
      popup.appendChild(optionElement);
    });

    document.body.appendChild(popup);
    activePopup = popup;
    toggleScroll(true); // Bloqueia o scroll

    // Fecha o pop-up ao clicar fora
    const closePopup = () => {
      if (activePopup) {
        activePopup.remove();
        toggleScroll(false); // Desbloqueia o scroll
        activePopup = null;
      }
    };

    document.addEventListener("click", closePopup, { once: true });
  };

  // Adicionar evento de clique com botão direito às músicas
document.querySelectorAll('.music').forEach((musicElement) => { // ✅ Corrigido: "musicElement" como parâmetro
    musicElement.addEventListener("contextmenu", (e) => {
        // Verifica se o clique foi na imagem
        if (!e.target.closest('.musica-img')) return;

        e.preventDefault();

        const options = [
            { label: "Adicionar à biblioteca", icon: "bi bi-music-note-list", action: () => alert("Música adicionada à biblioteca!") },
            { label: "Adicionar à fila", icon: "bi bi-list", action: () => alert("Música adicionada à fila!") }
        ];

        createPopup(options, e.pageX, e.pageY);
    });
});
  
});

//Barra de Reprodução
const progressBar = document.getElementById("progress-bar");

function updateProgress() {
  const percent = (progressBar.value / progressBar.max) * 100;
  progressBar.style.setProperty("--progress", percent + "%");
}

progressBar.addEventListener("input", updateProgress);
updateProgress();

//Right Container
document.addEventListener("DOMContentLoaded", () => {
  const volumeRange = document.getElementById("volume-range");
  const semitoneRange = document.getElementById("semitone-range");
  const volumeIcon = document.querySelector(".volume-icon i");
  const semitoneResetButton = document.querySelector(".semitone-reset");

  // Função para atualizar o preenchimento do slider
  const updateRangeProgress = (rangeElement) => {
    const percent =
      ((rangeElement.value - rangeElement.min) /
        (rangeElement.max - rangeElement.min)) *
      100;
    rangeElement.style.setProperty("--progress", `${percent}%`);
  };

  // Controle de Volume
  volumeRange.addEventListener("input", () => {
    updateRangeProgress(volumeRange);

    // Alterar ícone de volume dinamicamente
    if (volumeRange.value == 0) {
      volumeIcon.className = "bi bi-volume-mute";
    } else if (volumeRange.value < 50) {
      volumeIcon.className = "bi bi-volume-down";
    } else {
      volumeIcon.className = "bi bi-volume-up";
    }

    console.log("Volume:", volumeRange.value / 100); // Valor entre 0 e 1
  });

  // Controle de Semitons
  semitoneRange.addEventListener("input", () => {
    updateRangeProgress(semitoneRange);
    console.log("Semitons:", semitoneRange.value); // Valor entre -12 e 12
  });

  // Reset dos Semitons
  semitoneResetButton.addEventListener("click", () => {
    semitoneRange.value = 0; // Reseta o valor para 0
    updateRangeProgress(semitoneRange); // Atualiza o preenchimento
    console.log("Semitons resetados para:", semitoneRange.value);
  });

  // Atualizar a barra ao carregar a página
  updateRangeProgress(volumeRange);
  updateRangeProgress(semitoneRange);
});

//Pop Up Velocimetro
document.addEventListener("DOMContentLoaded", () => {
  const speedButton = document.getElementById("speed-button");
  const speedMenu = document.querySelector(".speed-dropdown-menu");
  let currentSpeed = 1; // Valor inicial

  // Fechar dropdown ao selecionar opção
  function selectSpeed(e) {
    const speed = e.target.dataset.speed;
    currentSpeed = parseFloat(speed);

    // Remover seleção anterior
    document.querySelectorAll(".dropdown-item").forEach((item) => {
      item.classList.remove("selected");
    });

    // Adicionar seleção nova
    e.target.classList.add("selected");

    // Fechar dropdown
    speedMenu.classList.remove("show");

    console.log(`Velocidade alterada para: ${speed}x`);
    // Adicione aqui a lógica para alterar a velocidade de reprodução
  }

  // Event listeners
  speedButton.addEventListener("click", (e) => {
    e.stopPropagation();
    speedMenu.classList.toggle("show");
  });

  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", selectSpeed);
  });

  document.addEventListener("click", (e) => {
    if (!speedButton.contains(e.target) && !speedMenu.contains(e.target)) {
      speedMenu.classList.remove("show");
    }
  });
});

/*Music Player*/

// Configurações da API
const RAPIDAPI_KEY = "3b618d7fd6msh9d5cdaaae847ab2p11eb4djsn85d10b312c5f";
let currentAudio = null;

// Audio Element (adicione um link válido da música)
const audio = new Audio("/song/Bring Me To Life - Evanescence.mp3");
audio.volume = 0.5; // Volume inicial correspondente ao range

// Elementos do player
const playButton = document.querySelector(".bi-play-fill");
const progressBarPlayer = document.getElementById("progress-bar");
const currentTimeSpan = document.getElementById("current-time");
const totalTimeSpan = document.getElementById("total-time");
const repeatButton = document.querySelector(".bi-repeat").closest("button");
const repeatIcon = repeatButton.querySelector("i");
const speedItems = document.querySelectorAll(".speed-dropdown-menu .dropdown-item");
const playerImage = document.querySelector(".music-player-img img");
const playerTitle = document.querySelector(".music-info span");
const playerArtist = document.querySelector(".music-info p");

// Buscar URL de stream do SoundCloud
async function getStreamUrl(trackUrl) {
    try {
      const encodedUrl = encodeURIComponent(trackUrl);
      const response = await fetch(
        `https://soundcloud-scraper.p.rapidapi.com/v1/track/metadata?track=${encodedUrl}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "3b618d7fd6msh9d5cdaaae847ab2p11eb4djsn85d10b312c5f",
            "X-RapidAPI-Host": "soundcloud-scraper.p.rapidapi.com",
          },
        }
      );
  
      const data = await response.json();
      
      // Nova estrutura da resposta (verifique a documentação atualizada)
      if (data && data.audio && data.audio.length > 0) {
        return data.audio[0].url; // Acessa o primeiro item do array
      }
      
      throw new Error("URL de stream não encontrada na resposta");
  
    } catch (error) {
      console.error("Erro ao buscar música:", error);
      return null;
    }
  }

// Reproduzir música
async function playTrack(element) {
  const trackUrl = element.closest(".music").dataset.trackUrl;
  const title = element.closest(".music").dataset.trackTitle;
  const artist = element.closest(".music").dataset.trackArtist;
  const cover = element.closest(".music").querySelector('.musica-imagem').src;

  // Atualizar UI do player
  playerImage.src = cover;
  playerTitle.textContent = title;
  playerArtist.textContent = artist;

  // Buscar e reproduzir áudio
  const streamUrl = await getStreamUrl(trackUrl);

  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  if (streamUrl) {
    currentAudio = new Audio(streamUrl);
    setupAudioPlayer(currentAudio);
    currentAudio.play();
    updatePlayButton();
  }
}

// Configurar eventos de áudio
function setupAudioPlayer(audio) {
  audio.addEventListener("timeupdate", () => {
    progressBarPlayer.value = audio.currentTime;
    currentTimeSpan.textContent = formatTime(audio.currentTime);
    updateProgress();
  });

  audio.addEventListener("loadedmetadata", () => {
    progressBarPlayer.max = audio.duration;
    totalTimeSpan.textContent = formatTime(audio.duration);
  });
}

document.querySelectorAll('.music').forEach((musicItem) => {
    musicItem.addEventListener('click', (e) => {
        // Verifica se o clique foi na imagem OU no container da música
        const clickedElement = e.target.closest('.music-image, .musica-img, .music');
        if (clickedElement) {
            // Obtém o elemento pai `.music` que contém os dados
            const musicContainer = clickedElement.closest('.music');
            if (musicContainer) {
                playTrack(musicContainer); // Passa o container, não o alvo do clique
            }
        }
    });
});

// Controle de Volume
const volumeIconButton = document.querySelector(".volume-icon");
const volumeRange = document.getElementById("volume-range");
const volumeIcon = volumeIconButton.querySelector("i");
let isMuted = false;
let lastVolume = 50;

// Formatar tempo em MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Atualizar ícone play/pause
function updatePlayButton() {
  playButton.classList.toggle("bi-play-fill");
  playButton.classList.toggle("bi-pause-fill");
}

// Evento Play/Pause
playButton.closest("button").addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  updatePlayButton();
});

// Atualizar barra de progresso e tempo
audio.addEventListener("timeupdate", () => {
  progressBarPlayer.value = audio.currentTime;
  currentTimeSpan.textContent = formatTime(audio.currentTime);
  updateProgress(); // Atualiza a Barra de Progresso
});

// Carregar metadados da música
audio.addEventListener("loadedmetadata", () => {
  progressBarPlayer.max = audio.duration;
  totalTimeSpan.textContent = formatTime(audio.duration);
});

// Seek manual na barra de progresso
progressBarPlayer.addEventListener("input", () => {
  audio.currentTime = progressBarPlayer.value;
});

// Resetar ícone quando a música terminar
audio.addEventListener("ended", () => {
  updatePlayButton();
});

// Controle de repetição
repeatButton.addEventListener("click", () => {
  // Toggle da classe text-white-50 no ícone
  repeatIcon.classList.toggle("text-white-50");
});

// Modifique o evento ended para:
audio.addEventListener("ended", () => {
  updatePlayButton();
  // Verifica se a repetição está ativa (ícone sem text-white-50)
  if (!repeatIcon.classList.contains("text-white-50")) {
    audio.currentTime = 0;
    audio.play();
  }
});

// Controle de velocidade
speedItems.forEach((item) => {
  item.addEventListener("click", () => {
    const speed = parseFloat(item.dataset.speed);
    audio.playbackRate = speed;
    speedItems.forEach((speedItem) => speedItem.classList.remove("selected"));
    item.classList.add("selected");
  });
});

// Controle de Volume
volumeRange.addEventListener("input", () => {
  const volume = volumeRange.value / 100;
  audio.volume = volume;

  if (volume === 0) {
    volumeIcon.classList.replace("bi-volume-up", "bi-volume-mute");
    isMuted = true;
  } else {
    volumeIcon.classList.replace("bi-volume-mute", "bi-volume-up");
    isMuted = false;
    lastVolume = volumeRange.value;
  }
});

volumeIconButton.addEventListener("click", () => {
  if (isMuted) {
    // Restaurar volume
    audio.volume = lastVolume / 100;
    volumeRange.value = lastVolume;
    volumeRange.dispatchEvent(new Event("input")); // Disparar evento input
    volumeIcon.classList.replace("bi-volume-mute", "bi-volume-up");
    isMuted = false;
  } else {
    // Silenciar
    lastVolume = volumeRange.value;
    audio.volume = 0;
    volumeRange.value = 0;
    volumeRange.dispatchEvent(new Event("input")); // Disparar evento input
    volumeIcon.classList.replace("bi-volume-up", "bi-volume-mute");
    isMuted = true;
  }
});
