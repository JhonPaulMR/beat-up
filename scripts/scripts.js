// Script para verificar usuário salvo no localStorage
window.onload = function () {
  const authButtons = document.getElementById("auth-buttons");
  const welcomeMessage = document.getElementById("welcome-message");
  const userNameSpan = welcomeMessage.querySelector("span");
  const logoutButton = document.getElementById("logout-button");
  const userName = localStorage.getItem("userName");

  if (userName) {
    authButtons.classList.add("d-none");
    welcomeMessage.classList.remove("d-none");
    userNameSpan.textContent = `Seja bem-vindo(a), ${userName}!`;

    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("userName");
      location.reload();
    });
  } else {
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

  const toggleScroll = (block) => {
    const mainContainer = document.querySelector(".main-container");
    mainContainer.style.overflow = block ? "hidden" : "";
  };

  const createPopup = (options, x, y) => {
    if (activePopup) {
      activePopup.remove();
      toggleScroll(false);
    }

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
    toggleScroll(true);

    const closePopup = () => {
      if (activePopup) {
        activePopup.remove();
        toggleScroll(false);
        activePopup = null;
      }
    };

    document.addEventListener("click", closePopup, { once: true });
  };

  document.querySelectorAll(".music").forEach((musicElement) => {
    musicElement.addEventListener("contextmenu", (e) => {
      if (!e.target.closest(".musica-img")) return;
      e.preventDefault();

      const options = [
        {
          label: "Adicionar à biblioteca",
          icon: "bi bi-music-note-list",
          action: () => alert("Música adicionada à biblioteca!"),
        },
        {
          label: "Adicionar à fila",
          icon: "bi bi-list",
          action: () => alert("Música adicionada à fila!"),
        },
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
  const volumeIcon = document.querySelector(".volume-icon i");

  const updateRangeProgress = (rangeElement) => {
    const percent =
      ((rangeElement.value - rangeElement.min) /
        (rangeElement.max - rangeElement.min)) *
      100;
    rangeElement.style.setProperty("--progress", `${percent}%`);
  };

  volumeRange.addEventListener("input", () => {
    updateRangeProgress(volumeRange);
    if (volumeRange.value == 0) {
      volumeIcon.className = "bi bi-volume-mute";
    } else if (volumeRange.value < 50) {
      volumeIcon.className = "bi bi-volume-down";
    } else {
      volumeIcon.className = "bi bi-volume-up";
    }
  });

  updateRangeProgress(volumeRange);
});

//Pop Up Velocimetro
document.addEventListener("DOMContentLoaded", () => {
  const speedButton = document.getElementById("speed-button");
  const speedMenu = document.querySelector(".speed-dropdown-menu");
  let currentSpeed = 1;

  function selectSpeed(e) {
    const speed = e.target.dataset.speed;
    currentSpeed = parseFloat(speed);
    document.querySelectorAll(".dropdown-item").forEach((item) => {
      item.classList.remove("selected");
    });
    e.target.classList.add("selected");
    speedMenu.classList.remove("show");
  }

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
const RAPIDAPI_KEY = "3b618d7fd6msh9d5cdaaae847ab2p11eb4djsn85d10b312c5f";
let currentAudio = null;

// Elementos do player
const playButton = document.querySelector(".bi-play-fill");
const progressBarPlayer = document.getElementById("progress-bar");
const currentTimeSpan = document.getElementById("current-time");
const totalTimeSpan = document.getElementById("total-time");
const repeatButton = document.querySelector(".bi-repeat").closest("button");
let isRepeating = false;
const repeatIcon = repeatButton.querySelector("i");
const speedItems = document.querySelectorAll(
  ".speed-dropdown-menu .dropdown-item"
);
const playerImage = document.querySelector(".music-player-img img");
const playerTitle = document.querySelector(".music-info span");
const playerArtist = document.querySelector(".music-info p");

async function getStreamUrl(trackUrl) {
    try {
        // Verifica se é um arquivo local
        if (trackUrl.startsWith('/') || trackUrl.startsWith('./')) {
            // Verifica se o arquivo existe
            const response = await fetch(trackUrl, { method: 'HEAD' });
            if (!response.ok) throw new Error('Arquivo local não encontrado');
            return trackUrl;
        }

        // Configura timeout para requisições da API
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos

        const encodedUrl = encodeURIComponent(trackUrl);
        const response = await fetch(
            `https://soundcloud-scraper.p.rapidapi.com/v1/track/metadata?track=${encodedUrl}`,
            {
                headers: {
                    "X-RapidAPI-Key": "7d4a62e8d3msh1e9fce1ee8bdb2fp181b95jsn2f83327750fa",
                    "X-RapidAPI-Host": "soundcloud-scraper.p.rapidapi.com"
                },
                signal: controller.signal
            }
        );
        
        clearTimeout(timeoutId);
        const data = await response.json();

        // Verificação em profundidade da resposta
        const streamUrl = data?.audio?.[0]?.url || 
                         data?.downloadUrl || 
                         data?.media?.transcodings?.[0]?.url;

        if (!streamUrl) {
            console.error('Resposta da API:', data);
            throw new Error('Formato de resposta inesperado da API');
        }

        return streamUrl;

    } catch (error) {
        console.error("Erro ao buscar stream:", error);
        throw new Error(`Falha ao carregar: ${error.message}`);
    }
}

async function playTrack(element) {
  const trackElement = element.closest(".music");
  const trackUrl = trackElement.dataset.trackUrl;
  const spinner = trackElement.querySelector('.loading-spinner');

  try {
    // Mostrar spinner
    spinner.style.display = 'block';

    // Resetar player
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }

    // Atualizar UI primeiro
    playerImage.src = trackElement.querySelector('.musica-imagem').src;
    playerTitle.textContent = trackElement.dataset.trackTitle;
    playerArtist.textContent = trackElement.dataset.trackArtist;

    // Obter URL de stream
    const streamUrl = await getStreamUrl(trackUrl);
    
    if (!streamUrl) {
      throw new Error('URL de stream não encontrada');
    }

    // Criar instância de áudio
    currentAudio = new Audio(streamUrl);
    
    // Forçar tipo MIME para MP3
    currentAudio.type = 'audio/mpeg';
    
    // Configurar evento para esconder o spinner quando começar a tocar
    currentAudio.addEventListener('play', () => {
      spinner.style.display = 'none';
    });

    // Configurar evento de erro
    currentAudio.addEventListener('error', (e) => {
      console.error('Erro no áudio:', e.target.error);
      spinner.style.display = 'none';
      alert('Formato de áudio não suportado');
    });

    // Configurar eventos
    currentAudio.preload = 'auto';
    currentAudio.volume = volumeRange.value / 100;
    
    currentAudio.addEventListener('error', (e) => {
      console.error('Erro no áudio:', e.target.error);
      alert('Formato de áudio não suportado');
    });

    setupAudioPlayer(currentAudio);
    
    // Iniciar reprodução
    await currentAudio.play();
    updatePlayButton();

  }  catch (error) {
    console.error('Erro na reprodução:', error);
    spinner.style.display = 'none';
    alert(`Erro: ${error.message}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Configura o player com a música padrão
  const defaultTrack = document.querySelector('[data-track-title="Bring Me To Life"]');
  if (defaultTrack) {
    playerImage.src = defaultTrack.querySelector('.musica-imagem').src;
    playerTitle.textContent = "Bring Me To Life";
    playerArtist.textContent = "Evanescence";
    
    // Carrega o áudio mas não inicia a reprodução automaticamente
    currentAudio = new Audio(defaultTrack.dataset.trackUrl);
    currentAudio.volume = volumeRange.value / 100;
    setupAudioPlayer(currentAudio);
  }
});


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

  audio.addEventListener("ended", () => {
    // Altere apenas esta parte
    if (isRepeating) {
      audio.currentTime = 0;
      audio.play();
    } else {
      updatePlayButton(true);
    }
  });
}

document.querySelectorAll(".music").forEach((musicItem) => {
  musicItem.addEventListener("click", (e) => {
    const clickedElement = e.target.closest(
      ".music-image, .musica-img, .music"
    );
    if (clickedElement) {
      const musicContainer = clickedElement.closest(".music");
      if (musicContainer) {
        playTrack(musicContainer);
      }
    }
  });
});

// Funções auxiliares
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function updatePlayButton(reset = false) {
  if (reset || (currentAudio && currentAudio.paused)) {
    playButton.classList.remove("bi-pause-fill");
    playButton.classList.add("bi-play-fill");
  } else {
    playButton.classList.remove("bi-play-fill");
    playButton.classList.add("bi-pause-fill");
  }
}

// Controles do player
playButton.closest("button").addEventListener("click", () => {
  if (!currentAudio) return;
  
  if (currentAudio.paused) {
    currentAudio.play();
  } else {
    currentAudio.pause();
  }
  updatePlayButton();
});

progressBarPlayer.addEventListener("input", () => {
  if (currentAudio) {
    currentAudio.currentTime = progressBarPlayer.value;
  }
});

repeatButton.addEventListener("click", () => {
  isRepeating = !isRepeating;
  repeatIcon.classList.toggle("text-white-50", !isRepeating); // Inverte o estado visual
});

if (currentAudio) {
  currentAudio.addEventListener("ended", () => {
    updatePlayButton();
    if (!repeatIcon.classList.contains("text-white-50")) {
      currentAudio.currentTime = 0;
      currentAudio.play();
    }
  });
}

speedItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!currentAudio) return;
    const speed = parseFloat(item.dataset.speed);
    currentAudio.playbackRate = speed;
    speedItems.forEach((speedItem) => speedItem.classList.remove("selected"));
    item.classList.add("selected");
  });
});

// Controle de Volume
const volumeIconButton = document.querySelector(".volume-icon");
const volumeRange = document.getElementById("volume-range");
const volumeIcon = volumeIconButton.querySelector("i");
let isMuted = false;
let lastVolume = 50;

volumeRange.addEventListener("input", () => {
  if (!currentAudio) return;
  const volume = volumeRange.value / 100;
  currentAudio.volume = volume;

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
  if (!currentAudio) return;

  if (isMuted) {
    currentAudio.volume = lastVolume / 100;
    volumeRange.value = lastVolume;
    volumeRange.dispatchEvent(new Event("input"));
    volumeIcon.classList.replace("bi-volume-mute", "bi-volume-up");
    isMuted = false;
  } else {
    lastVolume = volumeRange.value;
    currentAudio.volume = 0;
    volumeRange.value = 0;
    volumeRange.dispatchEvent(new Event("input"));
    volumeIcon.classList.replace("bi-volume-up", "bi-volume-mute");
    isMuted = true;
  }
});
