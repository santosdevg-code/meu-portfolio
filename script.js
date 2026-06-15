/* ========================================================
   PORTFOLIO — script.js
   Funcionalidades: Navbar, Typewriter, Scroll Reveal,
   Skill Bars, Dark Mode, Cursor, Form
   ======================================================== */

// ========================
//  DARK / LIGHT MODE
// ========================
const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// Carrega tema salvo (padrão: dark)
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ========================
//  NAVBAR — SCROLL & ACTIVE
// ========================
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const allLinks  = document.querySelectorAll('.nav-links a');
const sections  = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Adiciona classe scrolled após 40px
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  atualizarActive();
}, { passive: true });

// Atualiza o link ativo conforme a seção visível
function atualizarActive() {
  let atual = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) atual = sec.getAttribute('id');
  });
  allLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${atual}`) {
      link.classList.add('active');
    }
  });
}

// Menu mobile (hamburger)
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Fecha o menu ao clicar em um link
allLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ========================
//  TYPEWRITER EFFECT
// ========================
const roles = [
  'Desenvolvedor Front-end',
  'Aluno SENAI Dev Web',
  'Entusiasta de JavaScript',
  'Gabriel Santos — Dev Web',
];

const roleText = document.getElementById('roleText');
let roleIndex  = 0;
let charIndex  = 0;
let deleting   = false;

function typeWriter() {
  if (!roleText) return;

  const current = roles[roleIndex];

  if (!deleting) {
    roleText.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeWriter, 1800); // pausa antes de apagar
      return;
    }
  } else {
    roleText.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeWriter, deleting ? 60 : 100);
}

// Inicia o typewriter após um pequeno delay
setTimeout(typeWriter, 800);

// ========================
//  CURSOR PERSONALIZADO
// ========================
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX  = 0, trailY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// O trail segue o cursor com inércia
function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Efeito de hover nos links e botões
document.querySelectorAll('a, button, .projeto-card, .tool-item, .contato-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform      = 'translate(-50%,-50%) scale(2)';
    cursorTrail.style.transform = 'translate(-50%,-50%) scale(1.5)';
    cursorTrail.style.opacity   = '0.7';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform      = 'translate(-50%,-50%) scale(1)';
    cursorTrail.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorTrail.style.opacity   = '0.4';
  });
});

// ========================
//  SCROLL REVEAL
// ========================
const revealEls = document.querySelectorAll(
  '.sobre-grid, .projeto-card, .skill-bar, .tool-item, .tl-item, .contato-item, .contato-form-wrap, .section-head, .section-title'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Delay escalonado para grupos de elementos
      const delay = Array.from(revealEls).indexOf(entry.target) % 6 * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ========================
//  SKILL BARS ANIMADAS
// ========================
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill  = entry.target;
      const width = fill.getAttribute('data-width');
      // Pequeno delay para parecer mais natural
      setTimeout(() => {
        fill.style.width = width + '%';
      }, 200);
      barObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

barFills.forEach(fill => barObserver.observe(fill));

// ========================
//  CONTATO FORM
// ========================
const form = document.getElementById('contatoForm');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn  = form.querySelector('button[type="submit"]');
    const span = btn.querySelector('span');
    const icon = btn.querySelector('i');

    // Estado de envio
    btn.disabled     = true;
    span.textContent = 'Enviando...';
    icon.className   = 'fa-solid fa-spinner fa-spin';

    // Simulação de envio (substitua por Formspree/EmailJS)
    setTimeout(() => {
      span.textContent = 'Mensagem Enviada!';
      icon.className   = 'fa-solid fa-check';
      btn.style.background = '#4ade80';

      form.reset();

      // Volta ao estado original após 3s
      setTimeout(() => {
        btn.disabled         = false;
        span.textContent     = 'Enviar Mensagem';
        icon.className       = 'fa-solid fa-paper-plane';
        btn.style.background = '';
      }, 3000);
    }, 1500);
  });
}

// ========================
//  HORA INICIAL DO CHAT (se existir)
// ========================
const horaInit = document.getElementById('hora-init');
if (horaInit) {
  horaInit.textContent = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit'
  });
}

// ========================
//  SMOOTH SCROLL para navegadores antigos
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========================
//  DRAG & DROP DE FOTOS
// ========================

// Configuração de cada zona de drop
const dropSlots = [
  {
    zoneId:       'dropPerfil',
    imgId:        'imgPerfil',
    placeholderId:'placeholderPerfil',
    storageKey:   'foto_perfil',
    isPerfil:     true
  },
  {
    zoneId:       'dropChat',
    imgId:        'imgChat',
    placeholderId:'placeholderChat',
    storageKey:   'foto_chat'
  },
  {
    zoneId:       'dropReino',
    imgId:        'imgReino',
    placeholderId:'placeholderReino',
    storageKey:   'foto_reino'
  },
  {
    zoneId:       'dropMenu',
    imgId:        'imgMenu',
    placeholderId:'placeholderMenu',
    storageKey:   'foto_menu'
  }
];

// Toast de feedback
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// Aplica uma imagem (base64) em um slot
function aplicarFoto(slot, base64) {
  const img         = document.getElementById(slot.imgId);
  const placeholder = document.getElementById(slot.placeholderId);
  const zone        = document.getElementById(slot.zoneId);

  if (!img || !zone) return;

  img.src = base64;
  img.style.display = 'block';
  if (placeholder) placeholder.style.display = 'none';

  // Adiciona botão X para remover
  let btnLimpar = zone.querySelector('.btn-limpar-foto');
  if (!btnLimpar) {
    btnLimpar = document.createElement('button');
    btnLimpar.className = 'btn-limpar-foto visible';
    btnLimpar.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    btnLimpar.title = 'Remover foto';
    btnLimpar.addEventListener('click', (e) => {
      e.stopPropagation();
      limparFoto(slot);
    });
    zone.appendChild(btnLimpar);
  } else {
    btnLimpar.classList.add('visible');
  }

  // Salva no localStorage para persistir
  try { localStorage.setItem(slot.storageKey, base64); } catch(e) {}
}

// Remove a foto de um slot
function limparFoto(slot) {
  const img         = document.getElementById(slot.imgId);
  const placeholder = document.getElementById(slot.placeholderId);
  const zone        = document.getElementById(slot.zoneId);

  if (img) { img.src = ''; img.style.display = 'none'; }
  if (placeholder) placeholder.style.display = '';

  const btnLimpar = zone && zone.querySelector('.btn-limpar-foto');
  if (btnLimpar) btnLimpar.classList.remove('visible');

  try { localStorage.removeItem(slot.storageKey); } catch(e) {}
  showToast('Foto removida');
}

// Processa o arquivo de imagem (File → base64)
function processarArquivo(file, slot) {
  if (!file || !file.type.startsWith('image/')) {
    showToast('❌ Arquivo inválido — use JPG, PNG ou WEBP');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    aplicarFoto(slot, e.target.result);
    showToast('✅ Foto adicionada!');
  };
  reader.readAsDataURL(file);
}

// Inicializa cada slot de drop
dropSlots.forEach(slot => {
  const zone = document.getElementById(slot.zoneId);
  if (!zone) return;

  // Adiciona hint de drop se não existir (o perfil não tem)
  if (!slot.isPerfil && !zone.querySelector('.drop-hint')) {
    const hint = document.createElement('div');
    hint.className = 'drop-hint';
    hint.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Arraste a screenshot';
    zone.appendChild(hint);
  }
  // Hint no perfil
  if (slot.isPerfil && !zone.querySelector('.drop-hint')) {
    const hint = document.createElement('div');
    hint.className = 'drop-hint';
    hint.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Arraste sua foto';
    zone.appendChild(hint);
  }

  // Eventos de drag
  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.classList.add('drag-over');
  });
  zone.addEventListener('dragleave', () => {
    zone.classList.remove('drag-over');
  });
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    processarArquivo(file, slot);
  });

  // Clique também abre seletor de arquivo
  zone.addEventListener('click', (e) => {
    if (e.target.closest('.btn-limpar-foto')) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => processarArquivo(input.files[0], slot);
    input.click();
  });

  // Carrega foto salva do localStorage
  try {
    const saved = localStorage.getItem(slot.storageKey);
    if (saved) aplicarFoto(slot, saved);
  } catch(e) {}
});

// ========================
//  DROP ZONE — LIGA DOS ATLETAS
// ========================
const ligaSlot = {
  zoneId:        'dropLiga',
  imgId:         'imgLiga',
  placeholderId: 'placeholderLiga',
  storageKey:    'foto_liga'
};

// Registra o slot da Liga na lista de dropSlots e inicializa
dropSlots.push(ligaSlot);
(function inicializarLiga() {
  const slot = ligaSlot;
  const zone = document.getElementById(slot.zoneId);
  if (!zone) return;

  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault(); zone.classList.remove('drag-over');
    processarArquivo(e.dataTransfer.files[0], slot);
  });
  zone.addEventListener('click', (e) => {
    if (e.target.closest('.btn-limpar-foto')) return;
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*';
    input.onchange = () => processarArquivo(input.files[0], slot);
    input.click();
  });

  try {
    const saved = localStorage.getItem(slot.storageKey);
    if (saved) aplicarFoto(slot, saved);
  } catch(e) {}
})();

// ========================
//  GERENCIADOR DE PROJETOS EXTRAS
// ========================
const STORAGE_PROJETOS = 'portfolio_projetos_extras';

function carregarProjetosExtras() {
  try { return JSON.parse(localStorage.getItem(STORAGE_PROJETOS)) || []; } catch { return []; }
}
function salvarProjetosExtras(lista) {
  try { localStorage.setItem(STORAGE_PROJETOS, JSON.stringify(lista)); } catch {}
}

function renderizarProjetosExtras() {
  const container = document.getElementById('projetos-extras');
  if (!container) return;
  const lista = carregarProjetosExtras();
  container.innerHTML = '';

  lista.forEach((p, idx) => {
    const article = document.createElement('article');
    article.className = 'projeto-card projeto-card-extra';
    article.style.position = 'relative';

    const tagsHTML = (p.tags || []).map(t => `<span>${t.trim()}</span>`).join('');
    const tagEspecialHTML = p.tagEspecial
      ? `<span class="card-tag accent">${p.tagEspecial}</span>` : '';

    const thumbHTML = p.imagem
      ? `<img class="card-thumb-img" src="${p.imagem}" alt="${p.nome}" />`
      : `<div class="card-thumb-empty"><i class="fa-solid fa-image"></i></div>`;

    article.innerHTML = `
      <button class="btn-deletar-projeto" data-idx="${idx}" title="Remover projeto">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="card-inner">
        <div class="card-top">
          <div class="card-labels">
            ${tagEspecialHTML}
            <span class="card-tag">Projeto</span>
          </div>
          <div class="card-links">
            ${p.github ? `<a href="${p.github}" target="_blank" aria-label="Código"><i class="fa-brands fa-github"></i></a>` : ''}
            ${p.demo   ? `<a href="${p.demo}"   target="_blank" aria-label="Demo"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
          </div>
        </div>
        <div class="card-thumb">${thumbHTML}</div>
        <div class="card-body">
          <h3>${p.nome}</h3>
          <p>${p.desc}</p>
          <div class="card-stack">${tagsHTML}</div>
        </div>
      </div>`;

    article.querySelector('.btn-deletar-projeto').addEventListener('click', () => {
      if (!confirm('Remover este projeto?')) return;
      const lista = carregarProjetosExtras();
      lista.splice(idx, 1);
      salvarProjetosExtras(lista);
      renderizarProjetosExtras();
      showToast('Projeto removido');
    });

    container.appendChild(article);
  });
}

// ========================
//  MODAL ADICIONAR PROJETO
// ========================
let maddImageBase64 = null;

const btnAddProjeto  = document.getElementById('btnAddProjeto');
const modalAddProjeto = document.getElementById('modalAddProjeto');
const btnFecharModal = document.getElementById('btnFecharModal');
const btnCancelarAdd = document.getElementById('btnCancelarAdd');
const btnSalvarProjeto = document.getElementById('btnSalvarProjeto');
const maddDropzone   = document.getElementById('maddDropzone');
const maddInput      = document.getElementById('maddInput');
const maddPreview    = document.getElementById('maddPreview');

function abrirModal() {
  modalAddProjeto.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  // Limpa o form
  document.getElementById('addNome').value = '';
  document.getElementById('addDesc').value = '';
  document.getElementById('addTags').value = '';
  document.getElementById('addGithub').value = '';
  document.getElementById('addDemo').value = '';
  document.getElementById('addTagEspecial').value = '';
  maddImageBase64 = null;
  maddPreview.style.display = 'none';
  maddPreview.src = '';
}
function fecharModal() {
  modalAddProjeto.style.display = 'none';
  document.body.style.overflow = '';
}

btnAddProjeto.addEventListener('click', abrirModal);
btnFecharModal.addEventListener('click', fecharModal);
btnCancelarAdd.addEventListener('click', fecharModal);
modalAddProjeto.addEventListener('click', (e) => {
  if (e.target === modalAddProjeto) fecharModal();
});

// Drop zone do modal
maddDropzone.addEventListener('click', () => maddInput.click());
maddDropzone.addEventListener('dragover', (e) => { e.preventDefault(); maddDropzone.classList.add('drag-over'); });
maddDropzone.addEventListener('dragleave', () => maddDropzone.classList.remove('drag-over'));
maddDropzone.addEventListener('drop', (e) => {
  e.preventDefault(); maddDropzone.classList.remove('drag-over');
  processarImagemModal(e.dataTransfer.files[0]);
});
maddInput.addEventListener('change', () => processarImagemModal(maddInput.files[0]));

function processarImagemModal(file) {
  if (!file || !file.type.startsWith('image/')) {
    showToast('❌ Use JPG, PNG ou WEBP'); return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    maddImageBase64 = e.target.result;
    maddPreview.src = maddImageBase64;
    maddPreview.style.display = 'block';
    maddDropzone.querySelector('span').style.display = 'none';
    maddDropzone.querySelector('i').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

// Salvar projeto
btnSalvarProjeto.addEventListener('click', () => {
  const nome = document.getElementById('addNome').value.trim();
  const desc = document.getElementById('addDesc').value.trim();
  if (!nome || !desc) { showToast('❌ Nome e descrição são obrigatórios'); return; }

  const novoProjeto = {
    nome,
    desc,
    tags: document.getElementById('addTags').value.split(',').filter(t => t.trim()),
    github: document.getElementById('addGithub').value.trim(),
    demo:   document.getElementById('addDemo').value.trim(),
    tagEspecial: document.getElementById('addTagEspecial').value.trim(),
    imagem: maddImageBase64 || null,
  };

  const lista = carregarProjetosExtras();
  lista.push(novoProjeto);
  salvarProjetosExtras(lista);
  renderizarProjetosExtras();
  fecharModal();
  showToast('✅ Projeto adicionado!');
});

// Carrega projetos extras ao iniciar
renderizarProjetosExtras();
