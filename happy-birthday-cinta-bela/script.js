const openGalleryButtons = document.querySelectorAll("[data-open-gallery]");
const gallery = document.querySelector("[data-gallery]");
const closeGalleryButton = document.querySelector("[data-close-gallery]");
const polaroidRow = document.querySelector("[data-polaroid-row]");
const memoryDetail = document.querySelector("[data-memory-detail]");
const detailPhoto = document.querySelector("[data-detail-photo]");
const detailDate = document.querySelector("[data-detail-date]");
const detailMessage = document.querySelector("[data-detail-message]");
const backGalleryButton = document.querySelector("[data-back-gallery]");

const bgMusic = document.querySelector("#bgMusic");
const startScreen = document.querySelector("#startScreen");
const startButton = document.querySelector("#startButton");
const lyricsPanel = document.querySelector("#lyricsPanel");

const LYRICS = [
  { time: 0, text: "jatuh cinta memang manis" },
  { time: 6, text: "apalagi ada kamu disini" },
  { time: 11, text: "genggam tanganku sayang" },
  { time: 17, text: "kota ini tak sama tanpamu" },
  { time: 22, text: "masih rasa ingin lagi" },
  { time: 25, text: "habiskan waktu disini" },
  { time: 28, text: "mungkin tiga atau empat hari lagi" },
];

let activeLyricIndex = -1;
let lyricAnimationId = null;
let activePolaroidIndex = 0;

function showLyric(text) {
  if (!lyricsPanel) return;

  lyricsPanel.innerHTML = "";

  const lyricLine = document.createElement("span");
  lyricLine.className = "lyrics-line";
  lyricLine.textContent = text;

  lyricsPanel.appendChild(lyricLine);
}

function startLyrics() {
  if (!bgMusic || !lyricsPanel) return;

  cancelAnimationFrame(lyricAnimationId);
  activeLyricIndex = -1;

  function updateLyrics() {
    const currentTime = bgMusic.currentTime;
    let lyricIndex = -1;

    for (let i = 0; i < LYRICS.length; i++) {
      if (currentTime >= LYRICS[i].time) {
        lyricIndex = i;
      }
    }

    if (lyricIndex !== activeLyricIndex && lyricIndex !== -1) {
      activeLyricIndex = lyricIndex;
      showLyric(LYRICS[lyricIndex].text);
    }

    lyricAnimationId = requestAnimationFrame(updateLyrics);
  }

  updateLyrics();
}

function startWebsiteMusic() {
  startScreen?.classList.add("is-hidden");

  if (!bgMusic) return;

  bgMusic.volume = 0.45;
  bgMusic.currentTime = 0;

  bgMusic.play()
    .then(() => {
      startLyrics();
    })
    .catch(() => {
      console.log("Musik belum bisa diputar oleh browser.");
    });
}

startButton?.addEventListener("click", startWebsiteMusic);

// Ganti data di bawah ini saat foto, tanggal, dan pesan asli sudah siap.
// Isi `image` dengan lokasi file, contoh: "assets/photos/foto-1.jpg".
const POLAROIDS = [
  {
    title: "Foto 1",
    date: "28 Desember 2025",
    image: "assets/photos/foto1.jpeg",
    message: "je mapelle widya cinta bella.\nnama ku bella, aku sangat suka eeq, aku bisa eeq 5x seminggu."
  },
  {
    title: "Foto 2",
    date: "21 Februari 2026",
    image: "assets/photos/foto2.jpeg",
    message: "hai aku masih bella.\nhai aku sangat suka pentol, tapi aku gasuka bakso."
  },
  {
    title: "Foto 3",
    date: "29 Maret 2026",
    image: "assets/photos/foto3.jpeg",
    message: "hai aku masih bella lagi.\naku sangat suka matcha dan seblak."
  }
];

function createPhotoContent(item, options = {}) {
  const { imageClass = "polaroid__image", titleClass = "polaroid__title" } = options;
  const fragment = document.createDocumentFragment();

  if (item.image) {
    const image = document.createElement("img");
    image.className = imageClass;
    image.src = item.image;
    image.alt = item.title;
    fragment.appendChild(image);
  } else {
    const title = document.createElement("span");
    title.className = titleClass;
    title.textContent = item.title;
    fragment.appendChild(title);
  }

  return fragment;
}

function createPolaroidCard(item, index) {
  const card = document.createElement("button");
  card.className = "polaroid-card";
  card.type = "button";
  card.dataset.cardIndex = String(index);
  card.setAttribute("aria-label", `${item.title}, tanggal ${item.date}. Klik untuk membuka pesan.`);

  const photo = document.createElement("div");
  photo.className = "polaroid__photo";
  photo.appendChild(createPhotoContent(item));

  const date = document.createElement("span");
  date.className = "polaroid__date";
  date.textContent = item.date;

  card.append(photo, date);

  card.addEventListener("click", () => {
    openMemoryDetail(index);
  });

  return card;
}

function renderPolaroids() {
  if (!polaroidRow) return;
  polaroidRow.replaceChildren(...POLAROIDS.map(createPolaroidCard));
}

function renderMemoryDetail(index) {
  const item = POLAROIDS[index];
  if (!item || !detailPhoto || !detailDate || !detailMessage) return;

  activePolaroidIndex = index;

  detailPhoto.replaceChildren(
    createPhotoContent(item, {
      imageClass: "memory-detail__image",
      titleClass: "memory-detail__photo-title"
    })
  );

  detailDate.textContent = item.date;
  detailMessage.textContent = item.message;
}

function setExpandedState(isOpen) {
  openGalleryButtons.forEach((button) => {
    button.setAttribute("aria-expanded", String(isOpen));
  });

  if (gallery) {
    gallery.setAttribute("aria-hidden", String(!isOpen));
  }
}

function setMemoryState(isOpen) {
  document.body.classList.toggle("is-memory-open", isOpen);

  if (memoryDetail) {
    memoryDetail.setAttribute("aria-hidden", String(!isOpen));
  }
}

function openGallery({ focusFirstCard = true } = {}) {
  document.body.classList.add("is-opening");
  document.body.classList.add("is-gallery-open");
  setExpandedState(true);
  setMemoryState(false);

  window.setTimeout(() => {
    document.body.classList.remove("is-opening");
  }, 520);

  if (focusFirstCard) {
    window.setTimeout(() => {
      document.querySelector(".polaroid-card")?.focus();
    }, 180);
  }
}

function closeGallery() {
  document.body.classList.remove("is-gallery-open", "is-memory-open");
  setExpandedState(false);
  setMemoryState(false);

  document.activeElement?.blur();

  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });

  requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

function openMemoryDetail(index, { focusBackButton = true } = {}) {
  renderMemoryDetail(index);
  setMemoryState(true);

  if (focusBackButton) {
    window.setTimeout(() => {
      backGalleryButton?.focus();
    }, 140);
  }
}

function backToPolaroids() {
  setMemoryState(false);

  window.setTimeout(() => {
    document.querySelector(`[data-card-index="${activePolaroidIndex}"]`)?.focus();
  }, 120);
}

renderPolaroids();
setExpandedState(false);
setMemoryState(false);

openGalleryButtons.forEach((button) => {
  button.addEventListener("click", () => openGallery());
});

closeGalleryButton?.addEventListener("click", closeGallery);
backGalleryButton?.addEventListener("click", backToPolaroids);

gallery?.addEventListener("click", (event) => {
  if (event.target === gallery && !document.body.classList.contains("is-memory-open")) {
    closeGallery();
  }
});

document.addEventListener("keydown", (event) => {
  if (!document.body.classList.contains("is-gallery-open")) return;

  if (event.key === "Escape") {
    if (document.body.classList.contains("is-memory-open")) {
      backToPolaroids();
    } else {
      closeGallery();
    }
  }
});

// Mode preview untuk testing:
// - index.html#gallery atau index.html?preview=gallery
// - index.html#detail-1, #detail-2, #detail-3 atau index.html?preview=detail-3
const params = new URLSearchParams(window.location.search);
const previewMode = params.get("preview") || window.location.hash.replace("#", "");

if (previewMode === "gallery") {
  openGallery({ focusFirstCard: false });
}

const detailPreviewMatch = previewMode.match(/^detail-(\d)$/);

if (detailPreviewMatch) {
  const detailIndex = Number(detailPreviewMatch[1]) - 1;

  if (detailIndex >= 0 && detailIndex < POLAROIDS.length) {
    openGallery({ focusFirstCard: false });

    window.setTimeout(() => {
      openMemoryDetail(detailIndex, { focusBackButton: false });
    }, 80);
  }
}