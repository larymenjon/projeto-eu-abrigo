import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkWKSBIQhOAi8EktUCbDKpO03ER7OPqSg",
  authDomain: "eu-abrigo.firebaseapp.com",
  projectId: "eu-abrigo",
  storageBucket: "eu-abrigo.firebasestorage.app",
  messagingSenderId: "514259137702",
  appId: "1:514259137702:web:68dc26ae8ab639af6fb067",
  measurementId: "G-F4XLNDB2N7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const links = document.querySelectorAll(".nav-link");
const path = location.pathname.split("/").pop() || "index.html";

links.forEach((link) => {
  const href = link.getAttribute("href");
  if (href === path) {
    link.classList.add("is-active");
  } else {
    link.classList.remove("is-active");
  }
});

const searchInput = document.querySelector("#petSearch");
const searchBtn = document.querySelector("#searchBtn");
const filterLocal = document.querySelector("#filterLocal");
const filterGenero = document.querySelector("#filterGenero");
const filterEspecie = document.querySelector("#filterEspecie");
const filterIdade = document.querySelector("#filterIdade");
let petCards = document.querySelectorAll(".pet-card");
const noResults = document.querySelector("#noResults");
const petsGrid = document.querySelector(".cards-grid");
const animalTitle = document.querySelector("#animalTitle");
const animalDesc = document.querySelector("#animalDesc");
const animalImage = document.querySelector("#animalImage");
const animalThumbs = document.querySelector("#animalThumbs");

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeKey(value) {
  return normalizeText(value || "");
}

function refreshPetCards() {
  petCards = document.querySelectorAll(".pet-card");
}

function applyFilters() {
  if (!searchInput || petCards.length === 0) return;

  const term = normalizeText(searchInput.value.trim());
  const localValue = filterLocal?.value || "";
  const generoValue = filterGenero?.value || "";
  const especieValue = filterEspecie?.value || "";
  const idadeValue = filterIdade?.value || "";

  let visibleCount = 0;

  petCards.forEach((card) => {
    const name = normalizeText(card.querySelector("h3")?.textContent || "");
    const local = card.dataset.local || "";
    const genero = card.dataset.genero || "";
    const especie = card.dataset.especie || "";
    const idade = card.dataset.idade || "";

    const matchesTerm = term === "" || name.includes(term);
    const matchesLocal = localValue === "" || localValue === local;
    const matchesGenero = generoValue === "" || generoValue === genero;
    const matchesEspecie = especieValue === "" || especieValue === especie;
    const matchesIdade = idadeValue === "" || idadeValue === idade;

    const isVisible =
      matchesTerm && matchesLocal && matchesGenero && matchesEspecie && matchesIdade;

    card.style.display = isVisible ? "" : "none";
    if (isVisible) visibleCount += 1;
  });

  if (noResults) {
    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }
}

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
}
if (searchBtn) {
  searchBtn.addEventListener("click", applyFilters);
}
if (filterLocal) filterLocal.addEventListener("change", applyFilters);
if (filterGenero) filterGenero.addEventListener("change", applyFilters);
if (filterEspecie) filterEspecie.addEventListener("change", applyFilters);
if (filterIdade) filterIdade.addEventListener("change", applyFilters);

const adotanteForm = document.querySelector("#adotanteForm");
const formFeedback = document.querySelector("#formFeedback");
const cadastrosList = document.querySelector("#cadastrosList");
const animalForm = document.querySelector("#animalForm");
const animalFeedback = document.querySelector("#animalFeedback");
const visitaForm = document.querySelector("#visitaForm");
const visitaFeedback = document.querySelector("#visitaFeedback");
const visitaAnimal = document.querySelector("#visitaAnimal");
const visitaNome = document.querySelector("#visitaNome");
const visitProfile = document.querySelector("#visitProfile");
const visitProfileText = document.querySelector("#visitProfileText");
const whatsappActions = document.querySelector("#whatsappActions");
const whatsUser = document.querySelector("#whatsUser");
const whatsAdmin = document.querySelector("#whatsAdmin");
const visitasCount = document.querySelector("#visitasCount");
const agendarLink = document.querySelector("#agendarLink");

function getFormData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function saveLocalCadastro(data, source) {
  const list = JSON.parse(localStorage.getItem("adotantes") || "[]");
  list.unshift({ ...data, source, createdAt: new Date().toISOString() });
  localStorage.setItem("adotantes", JSON.stringify(list));
}

function renderCadastros() {
  if (!cadastrosList) return;
  const list = JSON.parse(localStorage.getItem("adotantes") || "[]");
  if (list.length === 0) {
    cadastrosList.innerHTML = "<li>Nenhum cadastro enviado ainda.</li>";
    return;
  }

  cadastrosList.innerHTML = list
    .slice(0, 10)
    .map((item) => {
      const nome = item.nome || "Sem nome";
      const cidade = item.cidade || "-";
      const estado = item.estado || "-";
      const origem = item.source === "firebase" ? "Firebase" : "Local";
      return `<li><strong>${nome}</strong> — ${cidade}/${estado} <span>(${origem})</span></li>`;
    })
    .join("");
}

if (adotanteForm) {
  adotanteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!adotanteForm.checkValidity()) {
      formFeedback.textContent = "Preencha todos os campos obrigatórios.";
      formFeedback.style.color = "#b33a3a";
      return;
    }

    const data = getFormData(adotanteForm);
    try {
      await addDoc(collection(db, "adotantes"), {
        ...data,
        createdAt: new Date().toISOString()
      });
      saveLocalCadastro(data, "firebase");
      formFeedback.textContent = "Cadastro enviado com sucesso!";
      formFeedback.style.color = "#2b6c2b";
      adotanteForm.reset();
    } catch (error) {
      console.error(error);
      saveLocalCadastro(data, "local");
      formFeedback.textContent =
        "Não foi possível enviar. Tente novamente em instantes.";
      formFeedback.style.color = "#b33a3a";
      adotanteForm.reset();
    }
    renderCadastros();
  });
}

function saveLocalAnimal(data, source) {
  const list = JSON.parse(localStorage.getItem("animais") || "[]");
  list.unshift({ ...data, source, createdAt: new Date().toISOString() });
  localStorage.setItem("animais", JSON.stringify(list));
}

function capitalize(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function renderLocalAnimais() {
  if (!petsGrid) return;
  const list = JSON.parse(localStorage.getItem("animais") || "[]");
  petsGrid.querySelectorAll("[data-generated='true']").forEach((item) => item.remove());

  list.forEach((animal) => {
    const nome = animal.nome || "Novo";
    const idade = animal.idade || "adulto";
    const raca = animal.raca || "SRD";
    const genero = animal.genero || "";
    const especie = animal.tipo || "cachorro";
    const foto =
      animal.foto ||
      (especie === "gato"
        ? "img/buscadeanimais/Rectangle 3 (3).png"
        : "img/buscadeanimais/Rectangle 1.png");

    const link = document.createElement("a");
    link.className = "pet-link";
    link.href = `animal.html?nome=${encodeURIComponent(nome)}`;

    const card = document.createElement("article");
    card.className = "pet-card";
    card.dataset.generated = "true";
    card.dataset.local = "cadastro";
    card.dataset.genero = genero;
    card.dataset.especie = especie;
    card.dataset.idade = idade;
    card.dataset.nome = nome;
    card.dataset.raca = raca;
    card.dataset.descricao =
      animal.descricao || "Animal cadastrado pela plataforma.";
    card.dataset.imagem = foto;

    card.innerHTML = `
      <img src="${foto}" alt="${nome}" />
      <h3>${nome} - ${capitalize(idade)}</h3>
      <p>${raca}</p>
      <p>Cadastro online</p>
    `;

    link.appendChild(card);
    petsGrid.prepend(link);
  });

  refreshPetCards();
  applyFilters();
  attachCardHandlers();
}

function extractAnimalFromCard(card) {
  return {
    nome: card.dataset.nome || card.querySelector("h3")?.textContent || "",
    raca: card.dataset.raca || "SRD",
    descricao:
      card.dataset.descricao ||
      "Este animal está aguardando uma família cheia de amor.",
    idade: card.dataset.idade || "adulto",
    especie: card.dataset.especie || "cachorro",
    imagem: card.dataset.imagem || card.querySelector("img")?.getAttribute("src")
  };
}

function attachCardHandlers() {
  document.querySelectorAll(".pet-link").forEach((link) => {
    const card = link.querySelector(".pet-card");
    if (card?.dataset?.nome) {
      link.href = `animal.html?nome=${encodeURIComponent(card.dataset.nome)}`;
    }
    link.addEventListener("click", () => {
      const card = link.querySelector(".pet-card");
      if (!card) return;
      const data = extractAnimalFromCard(card);
      localStorage.setItem("animalSelecionado", JSON.stringify(data));
    });
  });
}

const staticAnimals = [
  {
    nome: "Caramelo",
    raca: "Labrador",
    descricao: "Caramelo é um cão dócil, brincalhão e muito sociável.",
    idade: "adulto",
    especie: "cachorro",
    imagem: "img/buscadeanimais/Rectangle 1.png"
  },
  {
    nome: "Cappuccino",
    raca: "SRD",
    descricao: "Cappuccino é curioso, carinhoso e adora brincar.",
    idade: "filhote",
    especie: "cachorro",
    imagem: "img/buscadeanimais/Rectangle 2 (3).png"
  },
  {
    nome: "Estudante",
    raca: "SRD",
    descricao: "Estudante é alegre, inteligente e cheio de energia.",
    idade: "filhote",
    especie: "cachorro",
    imagem: "img/buscadeanimais/Rectangle 3.png"
  },
  {
    nome: "Bidu",
    raca: "SRD",
    descricao: "Bidu é companheiro, calmo e muito fiel.",
    idade: "adulto",
    especie: "cachorro",
    imagem: "img/buscadeanimais/Rectangle 22.png"
  },
  {
    nome: "Bomdog",
    raca: "Bulldog",
    descricao: "Bomdog é tranquilo, adora carinho e sonecas.",
    idade: "adulto",
    especie: "cachorro",
    imagem: "img/buscadeanimais/Rectangle 2.png"
  },
  {
    nome: "Lady",
    raca: "SRD",
    descricao: "Lady é doce, obediente e adora companhia.",
    idade: "adulto",
    especie: "cachorro",
    imagem: "img/buscadeanimais/Rectangle 1 (1).png"
  },
  {
    nome: "Mel",
    raca: "SRD",
    descricao: "Mel é delicada, ama colo e tranquilidade.",
    idade: "adulto",
    especie: "gato",
    imagem: "img/buscadeanimais/Rectangle 1 (2).png"
  },
  {
    nome: "Biscoito",
    raca: "SRD",
    descricao: "Biscoito é um filhote curioso e brincalhão.",
    idade: "filhote",
    especie: "gato",
    imagem: "img/buscadeanimais/Rectangle 2 (2).png"
  },
  {
    nome: "Filósofo",
    raca: "Pug",
    descricao: "Filósofo é divertido, ama atenção e fotos.",
    idade: "adulto",
    especie: "cachorro",
    imagem: "img/buscadeanimais/Rectangle 3 (2).png"
  },
  {
    nome: "Garfield",
    raca: "SRD",
    descricao: "Garfield é tranquilo, ama cochilos e carinho.",
    idade: "adulto",
    especie: "gato",
    imagem: "img/buscadeanimais/Rectangle 3 (3).png"
  }
];

function findAnimalByName(name) {
  if (!name) return null;
  const localList = JSON.parse(localStorage.getItem("animais") || "[]");
  const localMatch = localList.find(
    (item) => normalizeKey(item.nome) === normalizeKey(name)
  );
  if (localMatch) {
    return {
      nome: localMatch.nome,
      raca: localMatch.raca || "SRD",
      descricao:
        localMatch.descricao ||
        "Animal cadastrado pela plataforma.",
      idade: localMatch.idade || "adulto",
      especie: localMatch.tipo || "cachorro",
      imagem:
        localMatch.foto ||
        (localMatch.tipo === "gato"
          ? "img/buscadeanimais/Rectangle 3 (3).png"
          : "img/buscadeanimais/Rectangle 1.png")
    };
  }

  return staticAnimals.find(
    (item) => normalizeKey(item.nome) === normalizeKey(name)
  );
}

function buildAnimalOptions() {
  if (!visitaAnimal) return;
  const localList = JSON.parse(localStorage.getItem("animais") || "[]").map((item) => ({
    nome: item.nome,
    tipo: item.tipo
  }));
  const all = [...staticAnimals.map((item) => ({ nome: item.nome })), ...localList]
    .filter((item) => item.nome)
    .filter((item, index, arr) =>
      arr.findIndex((other) => normalizeKey(other.nome) === normalizeKey(item.nome)) === index
    );

  visitaAnimal.innerHTML = '<option value="">Selecione</option>' + all
    .map((item) => `<option value="${item.nome}">${item.nome}</option>`)
    .join("");
}

function findAdotanteByName(name) {
  if (!name) return null;
  const list = JSON.parse(localStorage.getItem("adotantes") || "[]");
  return list.find((item) => normalizeKey(item.nome) === normalizeKey(name)) || null;
}

function renderAnimalDetail() {
  if (window.__animalLoaded) return;
  if (!animalTitle || !animalDesc || !animalImage) return;

  const params = new URLSearchParams(window.location.search);
  const nameFromQuery = params.get("nome");
  const stored = JSON.parse(localStorage.getItem("animalSelecionado") || "null");
  const data =
    (nameFromQuery && findAnimalByName(nameFromQuery)) ||
    (stored && findAnimalByName(stored.nome)) ||
    stored ||
    staticAnimals[0];

  animalTitle.textContent = `Sobre o(a) ${data.nome}...`;
  animalDesc.textContent = data.descricao;
  animalImage.src = data.imagem;
  animalImage.alt = data.nome;

  if (animalThumbs) {
    const thumbs = [data.imagem, ...staticAnimals.map((item) => item.imagem)]
      .filter((value, index, arr) => arr.indexOf(value) === index)
      .slice(0, 4);
    animalThumbs.innerHTML = thumbs
      .map((src) => `<img src="${src}" alt="${data.nome}" />`)
      .join("");
  }

  if (agendarLink) {
    agendarLink.href = `agendar-visita.html?animal=${encodeURIComponent(data.nome)}`;
  }

  if (visitasCount) {
    const list = JSON.parse(localStorage.getItem("visitas") || "[]");
    const total = list.filter(
      (item) => normalizeKey(item.animal) === normalizeKey(data.nome)
    ).length;
    visitasCount.textContent = `Visitas agendadas: ${total}`;
  }
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

if (animalForm) {
  animalForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!animalForm.checkValidity()) {
      if (animalFeedback) {
        animalFeedback.textContent = "Preencha todos os campos obrigatórios.";
        animalFeedback.style.color = "#b33a3a";
      }
      return;
    }

    const formData = new FormData(animalForm);
    const data = Object.fromEntries(formData.entries());
    const file = animalForm.querySelector("input[type='file']")?.files?.[0];
    if (file) {
      data.foto = await readFileAsDataURL(file);
    }

    try {
      await addDoc(collection(db, "animais"), {
        ...data,
        createdAt: new Date().toISOString()
      });
      saveLocalAnimal(data, "firebase");
      if (animalFeedback) {
        animalFeedback.textContent = "Animal cadastrado com sucesso!";
        animalFeedback.style.color = "#2b6c2b";
      }
      animalForm.reset();
    } catch (error) {
      console.error(error);
      saveLocalAnimal(data, "local");
      if (animalFeedback) {
        animalFeedback.textContent =
          "Não foi possível enviar. Salvamos localmente.";
        animalFeedback.style.color = "#b33a3a";
      }
      animalForm.reset();
    }

    renderLocalAnimais();
    window.location.href = "busca-animais.html";
  });
}

if (visitaForm) {
  const params = new URLSearchParams(window.location.search);
  const animalParam = params.get("animal");
  buildAnimalOptions();
  if (visitaAnimal && animalParam) {
    visitaAnimal.value = animalParam;
  }

  if (visitaNome) {
    visitaNome.addEventListener("input", () => {
      const adotante = findAdotanteByName(visitaNome.value);
      if (adotante && visitProfile && visitProfileText) {
        visitProfileText.textContent =
          `${adotante.nome || "-"} • ${adotante.email || "-"} • ` +
          `${adotante.telefone || "-"} • ${adotante.cidade || "-"} / ${adotante.estado || "-"}`;
        visitProfile.hidden = false;

        const celularField = visitaForm.querySelector("input[name='celular']");
        if (celularField && !celularField.value) {
          celularField.value = (adotante.telefone || "").replace(/\D/g, "");
        }
      } else if (visitProfile) {
        visitProfile.hidden = true;
      }
    });
  }

  visitaForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!visitaForm.checkValidity()) {
      if (visitaFeedback) {
        visitaFeedback.textContent = "Preencha todos os campos obrigatórios.";
        visitaFeedback.style.color = "#b33a3a";
      }
      return;
    }

    const data = getFormData(visitaForm);
    const list = JSON.parse(localStorage.getItem("visitas") || "[]");
    list.unshift({ ...data, createdAt: new Date().toISOString() });
    localStorage.setItem("visitas", JSON.stringify(list));

    if (visitaFeedback) {
      visitaFeedback.textContent = "Visita agendada com sucesso!";
      visitaFeedback.style.color = "#2b6c2b";
    }

    const animalName = data.animal || "animal";
    const when = `${data.data} às ${data.horario}`;
    const userMsg =
      `Olá ${data.nome || ""}! Sua visita ao ${animalName} foi agendada para ${when}.` +
      `\nObrigado por querer adotar.`;
    const adminMsg =
      `Nova visita agendada para ${animalName} em ${when}.` +
      `\nNome: ${data.nome || "-"} | Contato: ${data.celular}.`;

    const userPhone = (data.celular || "").replace(/\D/g, "");
    const adminPhone = "47991133591";

    if (whatsUser && userPhone) {
      whatsUser.href = `https://wa.me/${userPhone}?text=${encodeURIComponent(userMsg)}`;
    }
    if (whatsAdmin) {
      whatsAdmin.href = `https://wa.me/${adminPhone}?text=${encodeURIComponent(adminMsg)}`;
    }
    if (whatsappActions) {
      whatsappActions.hidden = false;
    }

    localStorage.setItem(
      "ultimaVisita",
      JSON.stringify({
        animal: animalName,
        when,
        userLink: userPhone
          ? `https://wa.me/${userPhone}?text=${encodeURIComponent(userMsg)}`
          : "",
        adminLink: `https://wa.me/${adminPhone}?text=${encodeURIComponent(adminMsg)}`
      })
    );

    visitaForm.reset();
    window.location.href = "agendamento-confirmado.html";
  });
}

renderCadastros();
renderLocalAnimais();
attachCardHandlers();
renderAnimalDetail();

