// ===== Tema claro/escuro =====
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

function aplicarTema(tema) {
  root.setAttribute("data-theme", tema);
  themeBtn.textContent = tema === "dark" ? "🌙" : "☀️";
}

let temaInicial = "dark";
try { temaInicial = localStorage.getItem("tema") || "dark"; } catch (e) {}
aplicarTema(temaInicial);

themeBtn.addEventListener("click", () => {
  const novo = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  aplicarTema(novo);
  try { localStorage.setItem("tema", novo); } catch (e) {}
});

// ===== Menu mobile =====
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", () => {
  const aberto = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", aberto);
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// ===== Efeito de digitação =====
const frases = [
  "futuro desenvolvedor de sistemas",
  "estudante em constante evolução",
  "sonhando em ser lutador de jiu-jitsu",
  "determinado a crescer na tecnologia"
];
const alvo = document.getElementById("typed");
let f = 0, c = 0, apagando = false;

function digitar() {
  const frase = frases[f];
  alvo.textContent = frase.substring(0, c);

  if (!apagando && c < frase.length) {
    c++; setTimeout(digitar, 70);
  } else if (!apagando) {
    apagando = true; setTimeout(digitar, 1500);
  } else if (c > 0) {
    c--; setTimeout(digitar, 35);
  } else {
    apagando = false; f = (f + 1) % frases.length; setTimeout(digitar, 300);
  }
}
digitar();

// ===== Linha do tempo interativa =====
const tabs = document.querySelectorAll(".tl-tab");
const paineis = document.querySelectorAll(".tl-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    paineis.forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("active");
  });
});

// ===== Cartões expansíveis =====
document.querySelectorAll(".acc-item").forEach((item) => {
  const head = item.querySelector(".acc-head");
  const body = item.querySelector(".acc-body");

  head.addEventListener("click", () => {
    const abrir = !item.classList.contains("open");
    item.classList.toggle("open", abrir);
    head.setAttribute("aria-expanded", abrir);
    body.style.maxHeight = abrir ? body.scrollHeight + "px" : "0";
  });
});

// ===== Animações ao rolar =====
const observer = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("visible");
    e.target.querySelectorAll(".bar i").forEach((b) => {
      b.style.width = b.dataset.level + "%";
    });
    observer.unobserve(e.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== Link ativo no menu =====
const links = document.querySelectorAll("#menu a");
const secoes = [...links].map((l) => document.querySelector(l.getAttribute("href")));

const navObserver = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });

secoes.forEach((s) => s && navObserver.observe(s));

// ===== Ano no rodapé =====
document.getElementById("ano").textContent = new Date().getFullYear();
