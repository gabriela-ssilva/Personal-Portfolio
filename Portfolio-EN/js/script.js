/* ===========================================================
   EXPANDIR TEXTO (Sobre mim)
   =========================================================== */
function expandirTexto() {
  const textos = document.querySelectorAll('.texto-completo');
  const botao = document.querySelector('.botao-seta');

  textos.forEach(t => t.classList.toggle('expandido'));
  botao.classList.toggle('ativo');
}

/* ===========================================================
   MENU MOBILE
   =========================================================== */
function toggleMenu() {
  const btn = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobileMenu');

  const isOpen = btn.classList.toggle('is-open');
  menu.classList.toggle('open', isOpen);

  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

document.addEventListener('click', (e) => {
  const btn = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobileMenu');

  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    btn.classList.remove('is-open');
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
});

/* ===========================================================
   CARROSSEL UX/UI DESKTOP
   =========================================================== */

const carrossel = document.getElementById('carrossel');
let rotacaoAutomatica;

function atualizarPosicoes() {
  const items = carrossel.querySelectorAll('.carrossel-item');
  items.forEach(i => i.classList.remove('esquerda', 'centro', 'direita'));

  if (items.length >= 3) {
    items[0].classList.add('esquerda');
    items[1].classList.add('centro');
    items[2].classList.add('direita');
  }
}

function rotacionarCarrossel() {
  carrossel.appendChild(carrossel.firstElementChild);
  atualizarPosicoes();
}

function pararRotacaoAutomatica() {
  clearInterval(rotacaoAutomatica);
}

function iniciarRotacaoAutomatica() {
  rotacaoAutomatica = setInterval(() => {
    rotacionarCarrossel();
  }, 6000);
}

/* Botões */
function avancarSlide() {
  rotacionarCarrossel();
  pararRotacaoAutomatica();
}

function voltarSlide() {
  const ultimo = carrossel.lastElementChild;
  carrossel.insertBefore(ultimo, carrossel.firstElementChild);
  atualizarPosicoes();
  pararRotacaoAutomatica();
}

/* Inicialização */
atualizarPosicoes();
iniciarRotacaoAutomatica();

/* ===========================================================
   LIGHTBOX GLOBAL  (UX + Design Gráfico)
   =========================================================== */

const lightbox = document.getElementById('lightbox');
const imagemAmpliada = document.getElementById('imagem-ampliada');
const fecharLb = document.querySelector('.fechar');

let imagensParaNavegar = [];
let indexAtual = 0;

function abrirLightbox(lista, index) {
  imagensParaNavegar = lista;
  indexAtual = index;

  imagemAmpliada.src = imagensParaNavegar[indexAtual];
  lightbox.style.display = 'flex';

  document.body.classList.add("no-scroll");
  document.querySelector(".menu").style.opacity = "0";
}

function fecharLightbox() {
  lightbox.style.display = 'none';
  document.body.classList.remove("no-scroll");
  document.querySelector(".menu").style.opacity = "1";
}

function proximaImagem() {
  indexAtual = (indexAtual + 1) % imagensParaNavegar.length;
  imagemAmpliada.src = imagensParaNavegar[indexAtual];
}

function imagemAnterior() {
  indexAtual = (indexAtual - 1 + imagensParaNavegar.length) % imagensParaNavegar.length;
  imagemAmpliada.src = imagensParaNavegar[indexAtual];
}

/* Eventos do Lightbox */
fecharLb.addEventListener('click', fecharLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) fecharLightbox();
});

document.addEventListener('keydown', e => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") proximaImagem();
    if (e.key === "ArrowLeft") imagemAnterior();
    if (e.key === "Escape") fecharLightbox();
  }
});

/* ===========================================================
   APLICAR LIGHTBOX EM UX/UI
   =========================================================== */

const uxImgs = document.querySelectorAll('#carrossel img, .cards-ux-mobile img');

uxImgs.forEach((img, index) => {
  img.addEventListener('click', () => {
    const lista = Array.from(uxImgs).map(i => i.src);
    abrirLightbox(lista, index);
  });
});

/* ===========================================================
   APLICAR LIGHTBOX EM DESIGN GRÁFICO
   =========================================================== */

const imagensGrafico = document.querySelectorAll('.imagens img');

imagensGrafico.forEach((img, index) => {
  img.addEventListener('click', () => {
    const lista = Array.from(imagensGrafico).map(i => i.src);
    abrirLightbox(lista, index);
  });
});

/* ===========================================================
   TOOLTIP SIMPLES (mouse)
   =========================================================== */

document.querySelectorAll("[data-tooltip]").forEach(el => {
  el.addEventListener("mouseenter", () => {
    let tooltip = document.createElement("div");
    tooltip.className = "tooltip-balao";
    tooltip.innerText = el.dataset.tooltip;

    document.body.appendChild(tooltip);

    const rect = el.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + "px";
    tooltip.style.top = rect.top - 35 + "px";

    el._tooltip = tooltip;
  });

  el.addEventListener("mouseleave", () => {
    if (el._tooltip) el._tooltip.remove();
  });
});

/* ===========================================================
   ANO AUTOMÁTICO NO RODAPÉ
   =========================================================== */
document.getElementById("ano").textContent = new Date().getFullYear();
