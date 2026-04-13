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
const animalHealthList = document.querySelector("#animalHealthList");

function ensureAmbientBackground() {
  if (!document.body) return;
  if (document.querySelector(".home-ambient")) return;

  const ambient = document.createElement("div");
  ambient.className = "home-ambient";
  ambient.setAttribute("aria-hidden", "true");
  ambient.innerHTML = `
    <span class="ambient-blob blob-a"></span>
    <span class="ambient-blob blob-b"></span>
    <span class="ambient-blob blob-c"></span>
    <span class="ambient-paw paw-a"></span>
    <span class="ambient-paw paw-b"></span>
    <span class="ambient-paw paw-c"></span>
    <span class="ambient-paw paw-d"></span>
  `;

  document.body.prepend(ambient);
}

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
const tipoCadastroInputs = document.querySelectorAll("input[name='tipoCadastro']");
const abrigoSection = document.querySelector("#abrigoSection");
const cpfField = document.querySelector("#cpfField");
const cnpjField = document.querySelector("#cnpjField");
const generoFieldWrapper = document.querySelector("#generoField");
const dataNascimentoLabel = document.querySelector("#dataNascimentoLabel");
const fotoPessoaField = document.querySelector("#fotoPessoaField");
const origemTipo = document.querySelector("#origemTipo");
const abrigoOrigemField = document.querySelector("#abrigoOrigemField");
const abrigoOrigemSelect = document.querySelector("#abrigoOrigem");
const origemIndividualField = document.querySelector("#origemIndividualField");
const tipoAnimalSelect = document.querySelector("#animalForm select[name='tipo']");
const idadeAnimalSelect = document.querySelector("#animalForm select[name='idade']");
const vacinasCachorro = document.querySelector("#vacinasCachorro");
const vacinasGato = document.querySelector("#vacinasGato");
const vacinasCalendarNote = document.querySelector("#vacinasCalendarNote");
const originBlock = document.querySelector("#animalOrigin");
const originText = document.querySelector("#animalOriginText");
const openAbrigoModalBtn = document.querySelector("#openAbrigoModal");
const abrigoModal = document.querySelector("#abrigoModal");
const closeAbrigoModalBtn = document.querySelector("#closeAbrigoModal");
const openEnderecoModalBtn = document.querySelector("#openEnderecoModal");
const enderecoModal = document.querySelector("#enderecoModal");
const closeEnderecoModalBtn = document.querySelector("#closeEnderecoModal");
const enderecoModalTexto = document.querySelector("#enderecoModalTexto");
const enderecoModalTelefone = document.querySelector("#enderecoModalTelefone");
const abrigoModalNome = document.querySelector("#abrigoModalNome");
const abrigoModalCidade = document.querySelector("#abrigoModalCidade");
const abrigoModalDescricao = document.querySelector("#abrigoModalDescricao");
const abrigoModalLogo = document.querySelector("#abrigoModalLogo");
const abrigoModalInfo = document.querySelector("#abrigoModalInfo");
const abrigoModalFotos = document.querySelector("#abrigoModalFotos");
const visitaForm = document.querySelector("#visitaForm");
const visitaFeedback = document.querySelector("#visitaFeedback");
const visitaAnimal = document.querySelector("#visitaAnimal");
const visitaNome = document.querySelector("#visitaNome");
const visitProfile = document.querySelector("#visitProfile");
const visitProfileText = document.querySelector("#visitProfileText");
const visitResponsavelNome = document.querySelector("#visitResponsavelNome");
const visitResponsavelEndereco = document.querySelector("#visitResponsavelEndereco");
const visitResponsavelTelefone = document.querySelector("#visitResponsavelTelefone");
const whatsappActions = document.querySelector("#whatsappActions");
const whatsUser = document.querySelector("#whatsUser");
const whatsAdmin = document.querySelector("#whatsAdmin");
const visitasCount = document.querySelector("#visitasCount");
const agendarLink = document.querySelector("#agendarLink");
const animalResponsavelNome = document.querySelector("#animalResponsavelNome");
const animalResponsavelEndereco = document.querySelector("#animalResponsavelEndereco");
const animalResponsavelTelefone = document.querySelector("#animalResponsavelTelefone");

function getFormData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function setFieldState(fieldWrapper, isVisible, isRequired) {
  if (!fieldWrapper) return;
  fieldWrapper.hidden = !isVisible;
  const field = fieldWrapper.querySelector("input, select, textarea");
  if (!field) return;
  field.required = Boolean(isRequired);
  field.disabled = !isVisible;
  if (!isVisible) {
    if (field.type === "file") {
      field.value = "";
    } else {
      field.value = "";
    }
  }
}

function getCadastrosList() {
  return JSON.parse(localStorage.getItem("adotantes") || "[]");
}

function getAbrigosList() {
  return getCadastrosList().filter((item) => item.tipoCadastro === "abrigo");
}

function getSelectedTipoCadastro() {
  return document.querySelector("input[name='tipoCadastro']:checked")?.value || "individual";
}

function toggleCadastroFields() {
  if (!adotanteForm) return;
  const tipo = getSelectedTipoCadastro();
  const isAbrigo = tipo === "abrigo";
  const generoField = adotanteForm.querySelector("select[name='genero']");
  const nascimentoField = adotanteForm.querySelector("input[name='nascimento']");
  const responsavelField = adotanteForm.querySelector(".campo-responsavel");

  setFieldState(cpfField, !isAbrigo, !isAbrigo);
  setFieldState(cnpjField, isAbrigo, isAbrigo);
  setFieldState(fotoPessoaField, !isAbrigo, false);
  if (abrigoSection) abrigoSection.hidden = !isAbrigo;
  if (responsavelField) {
    responsavelField.hidden = !isAbrigo;
    const input = responsavelField.querySelector("input[name='responsavel']");
    if (input) {
      input.required = isAbrigo;
      input.disabled = !isAbrigo;
      if (!isAbrigo) input.value = "";
    }
  }

  if (generoField) {
    generoField.required = !isAbrigo;
    generoField.disabled = isAbrigo;
    if (isAbrigo) generoField.value = "";
    if (generoFieldWrapper) generoFieldWrapper.hidden = isAbrigo;
  }
  if (nascimentoField) {
    nascimentoField.required = true;
    nascimentoField.disabled = false;
    if (dataNascimentoLabel) {
      dataNascimentoLabel.textContent = isAbrigo ? "Data de fundação *" : "Data de nascimento *";
    }
  }

  const abrigoRequiredFields = ["razaoSocial", "nomeFantasia", "tipoInstituicao", "descricaoAbrigo"];
  abrigoRequiredFields.forEach((name) => {
    const field = adotanteForm.querySelector(`[name='${name}']`);
    if (!field) return;
    field.required = isAbrigo;
    field.disabled = !isAbrigo;
    if (!isAbrigo) field.value = "";
  });

  ["capacidade", "site", "licenca", "logoAbrigo", "fotosAbrigo"].forEach((name) => {
    const field = adotanteForm.querySelector(`[name='${name}']`);
    if (!field) return;
    field.disabled = !isAbrigo;
    if (!isAbrigo && field.type !== "file") field.value = "";
    if (!isAbrigo && field.type === "file") field.value = "";
  });
}

function populateAbrigoOptions() {
  if (!abrigoOrigemSelect) return;
  const abrigos = getAbrigosList();
  abrigoOrigemSelect.innerHTML = '<option value="">Selecione um abrigo</option>' + abrigos
    .map((abrigo) => {
      const nome = abrigo.nomeFantasia || abrigo.nome || "Abrigo sem nome";
      return `<option value="${nome}">${nome}</option>`;
    })
    .join("");
}

function toggleAnimalOriginFields() {
  if (!animalForm) return;
  const value = origemTipo?.value || "";
  const isAbrigo = value === "abrigo";
  setFieldState(abrigoOrigemField, isAbrigo, isAbrigo);
  setFieldState(origemIndividualField, value === "individual", value === "individual");
}

const vaccineOptionsByTypeAndAge = {
  cachorro: {
    filhote: [
      "V8/V10 - 1ª dose",
      "V8/V10 - 2ª dose",
      "V8/V10 - 3ª dose",
      "Antirrabica"
    ],
    adulto: [
      "V8/V10 - reforço anual",
      "Antirrabica"
    ],
    senior: [
      "V8/V10 - reforço anual",
      "Antirrabica"
    ]
  },
  gato: {
    filhote: [
      "V3/V4/V5 - 1ª dose",
      "V3/V4/V5 - 2ª dose",
      "V3/V4/V5 - reforço",
      "Antirrabica"
    ],
    adulto: [
      "V3/V4/V5 - reforço",
      "Antirrabica"
    ],
    senior: [
      "V3/V4/V5 - reforço",
      "Antirrabica"
    ]
  }
};

function buildVaccineCheckboxes(options) {
  return options
    .map(
      (value) =>
        `<label class="checkbox-item">
          <input type="checkbox" name="vacinas" value="${value}" />
          <span>${value}</span>
        </label>`
    )
    .join("");
}

function getVaccineOptions(tipo, idade) {
  if (!tipo) return [];
  const optionsByAge = vaccineOptionsByTypeAndAge[tipo] || {};
  return optionsByAge[idade] || [];
}

function setVaccineNote(tipo, idade) {
  if (!vacinasCalendarNote) return;
  if (!tipo) {
    vacinasCalendarNote.textContent = "Escolha o tipo de animal para ver as vacinas do calendário.";
    return;
  }
  if (!idade) {
    vacinasCalendarNote.textContent =
      `Selecione a idade do ${tipo} para carregar as vacinas do calendário.`;
    return;
  }
  vacinasCalendarNote.textContent =
    `Selecione as vacinas de ${tipo} (${idade}) que já foram aplicadas conforme o calendário.`;
}

function toggleVaccineFields() {
  if (!animalForm) return;
  const tipo = tipoAnimalSelect?.value || "";
  const idade = idadeAnimalSelect?.value || "";
  const showCachorro = tipo === "cachorro";
  const showGato = tipo === "gato";

  if (vacinasCachorro) {
    vacinasCachorro.hidden = !showCachorro;
    vacinasCachorro.innerHTML = showCachorro ? buildVaccineCheckboxes(getVaccineOptions("cachorro", idade)) : "";
  }
  if (vacinasGato) {
    vacinasGato.hidden = !showGato;
    vacinasGato.innerHTML = showGato ? buildVaccineCheckboxes(getVaccineOptions("gato", idade)) : "";
  }

  setVaccineNote(tipo, idade);

  const cachorroChecks = vacinasCachorro?.querySelectorAll("input[name='vacinas']") || [];
  const gatoChecks = vacinasGato?.querySelectorAll("input[name='vacinas']") || [];

  cachorroChecks.forEach((input) => {
    if (!showCachorro) input.checked = false;
    input.disabled = !showCachorro || !idade;
  });
  gatoChecks.forEach((input) => {
    if (!showGato) input.checked = false;
    input.disabled = !showGato || !idade;
  });
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
      const tipo = item.tipoCadastro === "abrigo" ? "Abrigo/ONG" : "Pessoa física";
      const nome =
        item.tipoCadastro === "abrigo"
          ? (item.nomeFantasia || item.nome || "Abrigo sem nome")
          : (item.nome || "Sem nome");
      const cidade = item.cidade || "-";
      const estado = item.estado || "-";
      const origem = item.source === "firebase" ? "Firebase" : "Local";
      return `<li><strong>${nome}</strong> — ${cidade}/${estado} <span>(${tipo} • ${origem})</span></li>`;
    })
    .join("");
}

if (adotanteForm) {
  tipoCadastroInputs.forEach((input) => {
    input.addEventListener("change", toggleCadastroFields);
  });
  toggleCadastroFields();

  adotanteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!adotanteForm.checkValidity()) {
      formFeedback.textContent = "Preencha todos os campos obrigatórios.";
      formFeedback.style.color = "#b33a3a";
      return;
    }

    const data = getFormData(adotanteForm);
    data.tipoCadastro = getSelectedTipoCadastro();

    const fotoPessoaInput = adotanteForm.querySelector("input[name='fotoPessoa']");
    const logoField = adotanteForm.querySelector("input[name='logoAbrigo']");
    const fotosField = adotanteForm.querySelector("input[name='fotosAbrigo']");
    if (data.tipoCadastro === "abrigo") {
      if (logoField?.files?.[0]) {
        data.logoAbrigo = await readFileAsDataURL(logoField.files[0]);
      }
      if (fotosField?.files?.length) {
        data.fotosAbrigo = await readFilesAsDataURLs(fotosField.files);
      } else {
        data.fotosAbrigo = [];
      }
      delete data.fotoPessoa;
    } else {
      if (fotoPessoaInput?.files?.[0]) {
        data.fotoPessoa = await readFileAsDataURL(fotoPessoaInput.files[0]);
      }
      delete data.cnpj;
      delete data.razaoSocial;
      delete data.nomeFantasia;
      delete data.tipoInstituicao;
      delete data.capacidade;
      delete data.site;
      delete data.licenca;
      delete data.descricaoAbrigo;
      delete data.logoAbrigo;
      delete data.fotosAbrigo;
      delete data.responsavel;
    }

    try {
      await addDoc(collection(db, "adotantes"), {
        ...data,
        createdAt: new Date().toISOString()
      });
      saveLocalCadastro(data, "firebase");
      formFeedback.textContent = "Cadastro enviado com sucesso!";
      formFeedback.style.color = "#2b6c2b";
      adotanteForm.reset();
      toggleCadastroFields();
    } catch (error) {
      console.error(error);
      saveLocalCadastro(data, "local");
      formFeedback.textContent =
        "Não foi possível enviar. Tente novamente em instantes.";
      formFeedback.style.color = "#b33a3a";
      adotanteForm.reset();
      toggleCadastroFields();
    }
    renderCadastros();
    populateAbrigoOptions();
  });
}

if (animalForm) {
  populateAbrigoOptions();
  if (origemTipo) {
    origemTipo.addEventListener("change", toggleAnimalOriginFields);
  }
  if (tipoAnimalSelect) {
    tipoAnimalSelect.addEventListener("change", toggleVaccineFields);
  }
  if (idadeAnimalSelect) {
    idadeAnimalSelect.addEventListener("change", toggleVaccineFields);
  }
  toggleAnimalOriginFields();
  toggleVaccineFields();
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
    const origemTipoAnimal = animal.origemTipo || "individual";
    const origemNomeAnimal =
      origemTipoAnimal === "abrigo"
        ? (animal.origemNome || animal.abrigoOrigem || "Abrigo cadastrado")
        : (animal.origemNome || "Cadastro online");
    const origemLabel =
      origemTipoAnimal === "abrigo"
        ? `Abrigo: ${origemNomeAnimal}`
        : `Origem: ${origemNomeAnimal}`;
    const foto =
      animal.foto ||
      (especie === "gato"
        ? "img/Rectangle 3 (3).png"
        : "img/Rectangle 1.png");

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
    card.dataset.galeria = Array.isArray(animal.galeria) ? animal.galeria.join(" | ") : "";
    card.dataset.origemTipo = origemTipoAnimal;
    card.dataset.origemNome = origemNomeAnimal;
    card.dataset.microchip = animal.microchip || "Não informado";
    card.dataset.vacinas = Array.isArray(animal.vacinas) ? animal.vacinas.join(" | ") : "";
    card.dataset.antipulgasVermes = animal.antipulgasVermes || "Não informado";
    card.dataset.doencas = animal.doencas || "Nenhuma doença informada";

    card.innerHTML = `
      <img src="${foto}" alt="${nome}" />
      <h3>${nome} - ${capitalize(idade)}</h3>
      <p>${raca}</p>
      <p>${origemLabel}</p>
      <span class="btn btn-teal pet-more-btn">Saber mais</span>
    `;

    link.appendChild(card);
    petsGrid.prepend(link);
  });

  refreshPetCards();
  applyFilters();
  attachCardHandlers();
}

function extractAnimalFromCard(card) {
  const metaText = card.querySelectorAll("p")?.[1]?.textContent || "";
  const origemTipo = card.dataset.origemTipo || (metaText ? "abrigo" : "");
  const origemNome = card.dataset.origemNome || metaText
    .replace(/^Abrigo:\s*/i, "")
    .replace(/^Origem:\s*/i, "")
    .trim();
  const vacinas = (card.dataset.vacinas || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
  const galeria = (card.dataset.galeria || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    nome: card.dataset.nome || card.querySelector("h3")?.textContent || "",
    raca: card.dataset.raca || "SRD",
    descricao:
      card.dataset.descricao ||
      "Este animal está aguardando uma família cheia de amor.",
    idade: card.dataset.idade || "adulto",
    especie: card.dataset.especie || "cachorro",
    imagem: card.dataset.imagem || card.querySelector("img")?.getAttribute("src"),
    galeria,
    origemTipo,
    origemNome,
    microchip: card.dataset.microchip || "Não informado",
    vacinas,
    antipulgasVermes: card.dataset.antipulgasVermes || "Não informado",
    doencas: card.dataset.doencas || "Nenhuma doença informada"
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
    imagem: "img/Rectangle 1.png"
  },
  {
    nome: "Cappuccino",
    raca: "SRD",
    descricao: "Cappuccino é curioso, carinhoso e adora brincar.",
    idade: "filhote",
    especie: "cachorro",
    imagem: "img/Rectangle 2 (3).png"
  },
  {
    nome: "Estudante",
    raca: "SRD",
    descricao: "Estudante é alegre, inteligente e cheio de energia.",
    idade: "filhote",
    especie: "cachorro",
    imagem: "img/Rectangle 3.png"
  },
  {
    nome: "Bidu",
    raca: "SRD",
    descricao: "Bidu é companheiro, calmo e muito fiel.",
    idade: "adulto",
    especie: "cachorro",
    imagem: "img/Rectangle 22.png"
  },
  {
    nome: "Bomdog",
    raca: "Bulldog",
    descricao: "Bomdog é tranquilo, adora carinho e sonecas.",
    idade: "adulto",
    especie: "cachorro",
    imagem: "img/Rectangle 2.png"
  },
  {
    nome: "Lady",
    raca: "SRD",
    descricao: "Lady é doce, obediente e adora companhia.",
    idade: "adulto",
    especie: "cachorro",
    imagem: "img/Rectangle 1 (1).png"
  },
  {
    nome: "Mel",
    raca: "SRD",
    descricao: "Mel é delicada, ama colo e tranquilidade.",
    idade: "adulto",
    especie: "gato",
    imagem: "img/Rectangle 1 (2).png"
  },
  {
    nome: "Biscoito",
    raca: "SRD",
    descricao: "Biscoito é um filhote curioso e brincalhão.",
    idade: "filhote",
    especie: "gato",
    imagem: "img/Rectangle 2 (2).png"
  },
  {
    nome: "Filósofo",
    raca: "Pug",
    descricao: "Filósofo é divertido, ama atenção e fotos.",
    idade: "adulto",
    especie: "cachorro",
    imagem: "img/Rectangle 3 (2).png"
  },
  {
    nome: "Garfield",
    raca: "SRD",
    descricao: "Garfield é tranquilo, ama cochilos e carinho.",
    idade: "adulto",
    especie: "gato",
    imagem: "img/Rectangle 3 (3).png"
  }
];

const staticAnimalHealth = {
  caramelo: {
    microchip: "Sim",
    vacinas: ["V8/V10 - 1ª dose", "V8/V10 - 2ª dose", "V8/V10 - 3ª dose", "Antirrabica"],
    antipulgasVermes: "Sim, última dose em março/2026",
    doencas: "Nenhuma doença diagnosticada"
  },
  cappuccino: {
    microchip: "Não",
    vacinas: ["V8/V10 - 1ª dose", "V8/V10 - 2ª dose"],
    antipulgasVermes: "Aguardando próxima aplicação",
    doencas: "Sem doenças; em observação por ser filhote"
  },
  estudante: {
    microchip: "Não",
    vacinas: ["V8/V10 - 1ª dose", "Antirrabica"],
    antipulgasVermes: "Sim, feito no resgate",
    doencas: "Dermatite leve em tratamento"
  },
  bidu: {
    microchip: "Sim",
    vacinas: ["V8/V10 - reforço anual", "Antirrabica"],
    antipulgasVermes: "Sim, protocolo regular",
    doencas: "Nenhuma doença atual"
  },
  bomdog: {
    microchip: "Sim",
    vacinas: ["V8/V10 - reforço anual", "Antirrabica"],
    antipulgasVermes: "Sim, comprimido mensal",
    doencas: "Alergia alimentar controlada"
  },
  lady: {
    microchip: "Não",
    vacinas: ["V8/V10 - 1ª dose", "V8/V10 - 2ª dose", "Antirrabica"],
    antipulgasVermes: "Sim, última vermifugação em fevereiro/2026",
    doencas: "Sem histórico de doença"
  },
  filosofo: {
    microchip: "Sim",
    vacinas: ["V8/V10 - reforço anual", "Antirrabica"],
    antipulgasVermes: "Sim, em dia",
    doencas: "Problema respiratório leve típico da raça"
  },
  mel: {
    microchip: "Sim",
    vacinas: ["V3/V4/V5 - reforço", "Antirrabica"],
    antipulgasVermes: "Sim, pipeta mensal",
    doencas: "Nenhuma"
  },
  biscoito: {
    microchip: "Não",
    vacinas: ["V3/V4/V5 - 1ª dose"],
    antipulgasVermes: "Vermífugo aplicado; antipulgas pendente",
    doencas: "Sem doenças"
  },
  garfield: {
    microchip: "Não",
    vacinas: ["V3/V4/V5 - 1ª dose", "V3/V4/V5 - 2ª dose", "Antirrabica"],
    antipulgasVermes: "Sim, protocolo completo",
    doencas: "Gengivite em acompanhamento veterinário"
  }
};

function getStaticAnimalHealth(name) {
  return staticAnimalHealth[normalizeKey(name || "")] || null;
}

const staticAnimalGallery = {
  cappuccino: ["img/Rectangle 2 (3).png", "img/cappuccino-2.png"]
};

function getStaticAnimalGallery(name) {
  return staticAnimalGallery[normalizeKey(name || "")] || [];
}

const staticAnimalContacts = {
  "caramelo:cachorro": {
    nome: "Abrigo Patas da Serra",
    endereco: "Rua das Hortensias, 145 - Costa e Silva, Joinville/SC",
    telefone: "(47) 98811-2201"
  },
  "cappuccino:cachorro": {
    nome: "Cuidadora Ana Lemos",
    endereco: "Servidao Sol Nascente, 58 - Vila Nova, Joinville/SC",
    telefone: "(47) 99124-5508"
  },
  "estudante:cachorro": {
    nome: "Lar Temporario Quatro Patas",
    endereco: "Rua Augusto Schulz, 310 - America, Joinville/SC",
    telefone: "(47) 99633-7402"
  },
  "bidu:cachorro": {
    nome: "Abrigo Amigos do Bidu",
    endereco: "Rua das Acacias, 72 - Bom Retiro, Joinville/SC",
    telefone: "(47) 98901-3344"
  },
  "bomdog:cachorro": {
    nome: "Instituto Focinho Feliz",
    endereco: "Rua Miguel de Souza, 920 - Iririu, Joinville/SC",
    telefone: "(47) 99770-1188"
  },
  "lady:cachorro": {
    nome: "Cuidadora Bia Nogueira",
    endereco: "Rua Pioneiros, 44 - Aventureiro, Joinville/SC",
    telefone: "(47) 99218-6605"
  },
  "biscoito:cachorro": {
    nome: "Casa de Passagem Novo Latido",
    endereco: "Rua Professor Almeida, 201 - Saguaçu, Joinville/SC",
    telefone: "(47) 99510-4426"
  },
  "filosofo:cachorro": {
    nome: "ONG Patinhas Urbanas",
    endereco: "Rua Dona Francisca, 1800 - Santo Antonio, Joinville/SC",
    telefone: "(47) 99347-7700"
  },
  "mel:gato": {
    nome: "Gatil Lua Clara",
    endereco: "Rua dos Lirios, 87 - Anita Garibaldi, Joinville/SC",
    telefone: "(47) 99826-1190"
  },
  "biscoito:gato": {
    nome: "Cuidador Rafael Pinto",
    endereco: "Rua das Palmeiras, 63 - Floresta, Joinville/SC",
    telefone: "(47) 99177-2055"
  },
  "garfield:gato": {
    nome: "Abrigo Miau e Cia",
    endereco: "Rua Rio do Sul, 501 - Bucarein, Joinville/SC",
    telefone: "(47) 99482-3311"
  }
};

function getAnimalContactKey(name, especie) {
  return `${normalizeKey(name || "")}:${normalizeKey(especie || "")}`;
}

function getStaticAnimalContact(name, especie) {
  return staticAnimalContacts[getAnimalContactKey(name, especie)] || null;
}

function buildAnimalContact(data) {
  const fallback = getStaticAnimalContact(data?.nome, data?.especie);
  const nomeOrigem = data?.origemNome || "";

  return {
    nome: nomeOrigem || fallback?.nome || "Cuidador Independente (ficticio)",
    endereco:
      data?.localResgate ||
      fallback?.endereco ||
      "Endereco ficticio nao informado",
    telefone:
      data?.telefoneContato ||
      fallback?.telefone ||
      "(47) 90000-0000"
  };
}

function findAnimalByName(name) {
  if (!name) return null;
  const localList = JSON.parse(localStorage.getItem("animais") || "[]");
  const localMatch = localList.find(
    (item) => normalizeKey(item.nome) === normalizeKey(name)
  );
  if (localMatch) {
    const origemTipo = localMatch.origemTipo || "individual";
    const origemNome =
      origemTipo === "abrigo"
        ? (localMatch.origemNome || localMatch.abrigoOrigem || "Abrigo cadastrado")
        : (localMatch.origemNome || "Cadastro online");
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
          ? "img/Rectangle 3 (3).png"
          : "img/Rectangle 1.png"),
      galeria: Array.isArray(localMatch.galeria) ? localMatch.galeria : [],
      origemTipo,
      origemNome,
      microchip: localMatch.microchip || "Não informado",
      vacinas: Array.isArray(localMatch.vacinas) ? localMatch.vacinas : [],
      antipulgasVermes: localMatch.antipulgasVermes || "Não informado",
      doencas: localMatch.doencas || "Nenhuma doença informada",
      localResgate: localMatch.localResgate || "",
      cidade: localMatch.cidade || "",
      estado: localMatch.estado || "",
      telefoneContato: localMatch.telefoneContato || ""
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

function findAbrigoByName(name) {
  if (!name) return null;
  return getAbrigosList().find((item) => {
    const principal = item.nomeFantasia || item.nome || "";
    return normalizeKey(principal) === normalizeKey(name);
  }) || null;
}

function formatAbrigoSummary(abrigo) {
  if (!abrigo) return "Informações do abrigo não encontradas.";
  const tipo = abrigo.tipoInstituicao ? `Tipo: ${abrigo.tipoInstituicao}` : "";
  const doc = abrigo.cnpj ? `CNPJ: ${abrigo.cnpj}` : "";
  const licenca = abrigo.licenca ? `Licença: ${abrigo.licenca}` : "";
  return [tipo, doc, licenca].filter(Boolean).join(" • ") || "Informações legais não informadas.";
}

function fillAbrigoModal(abrigo) {
  if (!abrigoModal || !abrigo) return;
  const nome = abrigo.nomeFantasia || abrigo.nome || "Abrigo";
  if (abrigoModalNome) abrigoModalNome.textContent = nome;
  if (abrigoModalCidade) {
    abrigoModalCidade.textContent = `${abrigo.cidade || "-"} / ${abrigo.estado || "-"}`;
  }
  if (abrigoModalDescricao) {
    abrigoModalDescricao.textContent = abrigo.descricaoAbrigo || "Sem descrição disponível.";
  }
  if (abrigoModalInfo) {
    abrigoModalInfo.textContent = formatAbrigoSummary(abrigo);
  }
  if (abrigoModalLogo) {
    if (abrigo.logoAbrigo) {
      abrigoModalLogo.src = abrigo.logoAbrigo;
      abrigoModalLogo.hidden = false;
    } else {
      abrigoModalLogo.hidden = true;
      abrigoModalLogo.removeAttribute("src");
    }
  }
  if (abrigoModalFotos) {
    const fotos = Array.isArray(abrigo.fotosAbrigo) ? abrigo.fotosAbrigo : [];
    abrigoModalFotos.innerHTML = fotos
      .slice(0, 6)
      .map((src) => `<img src="${src}" alt="Foto do abrigo ${nome}" />`)
      .join("");
  }
}

function fillAbrigoModalFallback(animalData) {
  const nomeOrigem = animalData?.origemNome || "Abrigo não informado";
  if (abrigoModalNome) abrigoModalNome.textContent = nomeOrigem;
  if (abrigoModalCidade) abrigoModalCidade.textContent = "- / -";
  if (abrigoModalDescricao) {
    abrigoModalDescricao.textContent =
      "Este animal ainda não possui perfil completo do abrigo cadastrado.";
  }
  if (abrigoModalInfo) abrigoModalInfo.textContent = "Informações legais não informadas.";
  if (abrigoModalLogo) {
    abrigoModalLogo.hidden = true;
    abrigoModalLogo.removeAttribute("src");
  }
  if (abrigoModalFotos) abrigoModalFotos.innerHTML = "";
}

function openAbrigoModal() {
  if (!abrigoModal) return;
  abrigoModal.hidden = false;
}

function closeAbrigoModal() {
  if (!abrigoModal) return;
  abrigoModal.hidden = true;
}

function openEnderecoModal() {
  if (!enderecoModal) return;
  enderecoModal.hidden = false;
}

function closeEnderecoModal() {
  if (!enderecoModal) return;
  enderecoModal.hidden = true;
}

function buildHealthSummary(data) {
  const fallback = getStaticAnimalHealth(data?.nome);
  const vacinas =
    Array.isArray(data?.vacinas) && data.vacinas.length > 0
      ? data.vacinas
      : Array.isArray(fallback?.vacinas)
        ? fallback.vacinas
        : [];

  return {
    microchip: data?.microchip || fallback?.microchip || "Não informado",
    vacinas: vacinas.length > 0 ? vacinas.join(", ") : "Não informado",
    antipulgasVermes:
      data?.antipulgasVermes || fallback?.antipulgasVermes || "Não informado",
    doencas: data?.doencas || fallback?.doencas || "Nenhuma doença informada"
  };
}

function renderHealthList(data) {
  if (!animalHealthList) return;
  const health = buildHealthSummary(data);
  const items = [
    { label: "Microchip", value: health.microchip },
    { label: "Vacinas", value: health.vacinas },
    { label: "Pulga e vermes", value: health.antipulgasVermes },
    { label: "Doenças", value: health.doencas }
  ];

  animalHealthList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = `${item.label}: `;
    li.appendChild(strong);
    li.append(item.value);
    animalHealthList.appendChild(li);
  });
}

function buildAnimalGallery(data) {
  const fromData =
    Array.isArray(data?.galeria) && data.galeria.length > 0
      ? data.galeria
      : typeof data?.galeria === "string"
        ? data.galeria
          .split("|")
          .map((item) => item.trim())
          .filter(Boolean)
        : [];
  const fallback = getStaticAnimalGallery(data?.nome);
  const base = data?.imagem ? [data.imagem] : [];
  const merged = [...base, ...fromData, ...fallback]
    .filter(Boolean)
    .filter((value, index, arr) => arr.indexOf(value) === index);
  return merged.length > 0 ? merged : ["img/Rectangle 1.png"];
}

function renderAnimalContactDetails(data) {
  const contact = buildAnimalContact(data);
  if (animalResponsavelNome) animalResponsavelNome.textContent = contact.nome;
  if (animalResponsavelEndereco) animalResponsavelEndereco.textContent = contact.endereco;
  if (animalResponsavelTelefone) animalResponsavelTelefone.textContent = `${contact.telefone} (ficticio)`;
  if (enderecoModalTexto) {
    enderecoModalTexto.textContent = `${contact.nome} - ${contact.endereco}`;
  }
  if (enderecoModalTelefone) {
    enderecoModalTelefone.textContent = `Telefone: ${contact.telefone} (ficticio)`;
  }
}

function renderVisitContactInfo(animalName) {
  if (!visitResponsavelNome || !visitResponsavelEndereco || !visitResponsavelTelefone) return;

  const animalData = findAnimalByName(animalName) || { nome: animalName, especie: "" };
  const contact = buildAnimalContact(animalData);
  visitResponsavelNome.textContent = contact.nome;
  visitResponsavelEndereco.textContent = contact.endereco;
  visitResponsavelTelefone.textContent = `${contact.telefone} (ficticio)`;
}

function renderAnimalDetail() {
  if (window.__animalLoaded) return;
  if (!animalTitle || !animalDesc || !animalImage) return;
  closeAbrigoModal();

  const params = new URLSearchParams(window.location.search);
  const nameFromQuery = params.get("nome");
  const stored = JSON.parse(localStorage.getItem("animalSelecionado") || "null");
  const storedMatchesQuery =
    stored &&
    nameFromQuery &&
    normalizeKey(stored.nome) === normalizeKey(nameFromQuery);
  const data =
    (storedMatchesQuery && stored) ||
    (nameFromQuery && findAnimalByName(nameFromQuery)) ||
    (stored && findAnimalByName(stored.nome)) ||
    stored ||
    staticAnimals[0];

  animalTitle.textContent = `Sobre o(a) ${data.nome}...`;
  animalDesc.textContent = data.descricao;
  animalImage.src = data.imagem;
  animalImage.alt = data.nome;
  renderHealthList(data);
  renderAnimalContactDetails(data);

  if (animalThumbs) {
    const thumbs = buildAnimalGallery(data).slice(0, 4);
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

  if (originBlock && originText) {
    const origemTipoAnimal = data.origemTipo || "";
    const origemNomeAnimal = data.origemNome || "";
    if (origemTipoAnimal && origemNomeAnimal) {
      originBlock.hidden = false;
      originText.textContent =
        origemTipoAnimal === "abrigo"
          ? `Abrigo/ONG ${origemNomeAnimal}`
          : `Pessoa física ${origemNomeAnimal}`;
    } else {
      originBlock.hidden = true;
    }
  }

  const abrigoAssociado =
    (data.origemTipo === "abrigo" && findAbrigoByName(data.origemNome)) || null;
  if (openAbrigoModalBtn) {
    openAbrigoModalBtn.hidden = false;
    openAbrigoModalBtn.onclick = (event) => {
      event.preventDefault();
      if (abrigoAssociado) {
        fillAbrigoModal(abrigoAssociado);
      } else {
        fillAbrigoModalFallback(data);
      }
      openAbrigoModal();
    };
  }

  if (openEnderecoModalBtn) {
    openEnderecoModalBtn.onclick = (event) => {
      event.preventDefault();
      openEnderecoModal();
    };
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

async function readFilesAsDataURLs(fileList) {
  const files = Array.from(fileList || []);
  if (files.length === 0) return [];
  const results = await Promise.all(files.map((file) => readFileAsDataURL(file)));
  return results.filter(Boolean);
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
    const vacinasSelecionadas = formData.getAll("vacinas");
    if (vacinasSelecionadas.length === 0) {
      if (animalFeedback) {
        animalFeedback.textContent = "Selecione ao menos uma vacina obrigatória.";
        animalFeedback.style.color = "#b33a3a";
      }
      return;
    }
    data.vacinas = vacinasSelecionadas;
    const file = animalForm.querySelector("input[type='file']")?.files?.[0];
    if (file) {
      data.foto = await readFileAsDataURL(file);
    }
    if (data.origemTipo === "abrigo") {
      data.origemNome = data.abrigoOrigem || "";
    }
    if (data.origemTipo !== "abrigo") {
      delete data.abrigoOrigem;
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
  if (visitaAnimal) {
    renderVisitContactInfo(visitaAnimal.value || animalParam || staticAnimals[0]?.nome);
    visitaAnimal.addEventListener("change", () => {
      renderVisitContactInfo(visitaAnimal.value);
    });
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

if (closeAbrigoModalBtn) {
  closeAbrigoModalBtn.addEventListener("click", () => {
    closeAbrigoModal();
  });
}
if (closeEnderecoModalBtn) {
  closeEnderecoModalBtn.addEventListener("click", () => {
    closeEnderecoModal();
  });
}

if (abrigoModal) {
  closeAbrigoModal();
  abrigoModal.addEventListener("click", (event) => {
    if (event.target === abrigoModal) {
      closeAbrigoModal();
    }
  });
}
if (enderecoModal) {
  closeEnderecoModal();
  enderecoModal.addEventListener("click", (event) => {
    if (event.target === enderecoModal) {
      closeEnderecoModal();
    }
  });
}

if (abrigoModal || enderecoModal) {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAbrigoModal();
      closeEnderecoModal();
    }
  });
}

renderCadastros();
renderLocalAnimais();
attachCardHandlers();
renderAnimalDetail();
ensureAmbientBackground();

