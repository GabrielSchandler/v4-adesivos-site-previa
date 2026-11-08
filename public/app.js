'use strict';
const WHATSAPP_NUMBER = '5511991492392';
window.dataLayer = window.dataLayer || [];
function track(eventName, params = {}) { window.dataLayer.push({ event: eventName, ...params }); }
function whatsappURL(message) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`; }
function openWhatsApp(message, context) {
  track('whatsapp_click', { context });
  const opened = window.open(whatsappURL(message), '_blank', 'noopener,noreferrer');
  return opened;
}
const messages = {
  menu: 'Olá! Gostaria de conversar com a V4 Adesivos sobre um projeto de comunicação visual.',
  frota: 'Olá! Conheci os trabalhos da V4 Adesivos e gostaria de um orçamento para adesivagem de frota.',
  envelopamento: 'Olá! Gostaria de um orçamento para envelopamento automotivo. Podemos conversar sobre uma aplicação parcial ou total?',
  ambientacao: 'Olá! Gostaria de um orçamento para ambientação comercial, com a identidade visual da minha empresa.',
  projeto: 'Olá! Quero conversar sobre um projeto personalizado de comunicação visual para minha empresa.',
  duvida: 'Olá! Vi o site da V4 Adesivos e gostaria de esclarecer uma dúvida sobre meu projeto.',
  final: 'Olá! Quero colocar a marca da minha empresa em movimento. Gostaria de solicitar um orçamento.',
  mobile: 'Olá! Conheci a V4 Adesivos pelo site e gostaria de solicitar um orçamento.'
};
function icon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const attributes = { viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2', 'stroke-linecap':'round', 'stroke-linejoin':'round', class:'icon', 'aria-hidden':'true', focusable:'false' };
  Object.entries(attributes).forEach(([key,value]) => svg.setAttribute(key,value));
  (V4_ICONS[name] || V4_ICONS.MessageCircle).forEach(([tag, attrs]) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([key,value]) => element.setAttribute(key,value));
    svg.append(element);
  });
  return svg;
}
function renderIcons(parent = document) { parent.querySelectorAll('[data-icon]').forEach(el => el.replaceWith(icon(el.dataset.icon))); }
renderIcons();
document.querySelector('.rating-stars').setAttribute('role','img');
const aboutImage = document.querySelector('.about-photo img');
aboutImage.src = 'images/portfolio/salus-3-van-10.webp';
aboutImage.alt = 'Van do Instituto Salus com identidade visual aplicada pela V4 Adesivos';
aboutImage.width = 800;
aboutImage.height = 740;
document.querySelector('.about-photo-caption strong').textContent = 'Instituto Salus · Van comercial';
document.querySelectorAll('.js-whatsapp').forEach(link => {
  link.href = whatsappURL(messages[link.dataset.context] || messages.menu);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.addEventListener('click', event => {
    event.preventDefault();
    openWhatsApp(messages[link.dataset.context] || messages.menu, link.dataset.context || 'cta');
  });
});
document.querySelectorAll('a[href="#orcamento"]').forEach(link => link.addEventListener('click', () => track('budget_cta_click', { target:'#orcamento' })));

const vehicleCategories = [
  {id:'todos',label:'Todos'}, {id:'caminhoes',label:'Caminhões'}, {id:'vans',label:'Vans'},
  {id:'carros',label:'Carros'}, {id:'cacamba',label:'Com caçamba'}, {id:'bau',label:'Com baú'},
  {id:'kombis',label:'Kombis'}, {id:'ambulancias',label:'Ambulâncias'}, {id:'ambientes',label:'Ambientes'}
];
const categoryNames = {caminhoes:'Caminhões',vans:'Vans',carros:'Carros de passeio',cacamba:'Utilitários com caçamba',bau:'Utilitários com baú',kombis:'Kombis',ambulancias:'Ambulâncias',ambientes:'Ambientação comercial'};
const galleryPhotos = [
  ['utilitarios-com-bau-01','caminhoes','Imcopesc','Caminhão baú com comunicação visual azul'],
  ['sorri-sustentabilidade-lateral-2-van-12','vans','Sorridents','Van com identidade visual Sorridents'],
  ['wst-lateral-utilitarios-com-cacamba-01','cacamba','WST','Picape com identidade visual azul WST'],
  ['xerife-lateral-2-kombi-01','kombis','RedeTV! · Jorge Wilson','Kombi com identidade do programa Jorge Wilson'],
  ['ambientacao-comercial-07','ambientes','Identidade no ambiente','Ambientação de espaço comercial com paredes adesivadas'],
  ['carros-pequenos-09','carros','Segfort','Carro de supervisão com identidade Segfort'],
  ['utilitarios-com-bau-03','caminhoes','Pneuzago','Caminhão com baú adesivado para atacadista de pneus'],
  ['utilitarios-com-bau-04','caminhoes','BM Móveis','Caminhão com comunicação visual de móveis para salão'],
  ['utilitarios-com-bau-02','caminhoes','Imcopesc · Lateral','Lateral do caminhão Imcopesc adesivado'],
  ['salus-3-van-10','vans','Instituto Salus','Traseira de van com identidade Instituto Salus'],
  ['hora-do-sabor-lateral-van-03','vans','Hora do Sabor','Van com identidade visual Hora do Sabor'],
  ['uti-movel-ambulancia-03','ambulancias','UTI móvel','Ambulância caracterizada com identificação de UTI móvel'],
  ['unimed-lateral-2-ambulancia-04','ambulancias','Unimed','Ambulância com caracterização verde e laranja'],
  ['beecorp-lateral-ambulancia-05','ambulancias','BeeCorp','Ambulância com identificação BeeCorp'],
  ['van-instituto-ambulancia-01','vans','Instituto Sorridents','Van com comunicação visual do Instituto Sorridents'],
  ['alumax-strada-lateral-2-utilitarios-com-cacamba-08','cacamba','Alumax','Picape com identidade visual Alumax'],
  ['bonfatto-saveiro-utilitarios-com-cacamba-07','cacamba','Bonfatto','Picape Saveiro com comunicação visual comercial'],
  ['rangel-pinturas-2-utilitarios-com-cacamba-04','cacamba','Rangel Pinturas','Picape com identidade preta e dourada Rangel Pinturas'],
  ['carros-pequenos-01','carros','Comunicação em verde','Carro comercial com aplicação de identidade em verde'],
  ['carros-pequenos-04','carros','Bonfatto Arquitetura','Carro com adesivagem para empresa de arquitetura'],
  ['carros-pequenos-10','carros','Mendes Moraes','Carro com identificação da empresa Mendes Moraes'],
  ['casa-amarela-1-kombi-08','kombis','Casa Amarela','Kombi com comunicação de empreendimento imobiliário'],
  ['pop-queijo-kombi-lateral-kombi-04','kombis','Pop Queijo','Kombi com identidade Pop Queijo'],
  ['telhadista-kombi-lateral-kombi-03','kombis','Serviços de telhados','Kombi com identidade comercial vermelha'],
  ['utilitarios-com-bau-25','bau','Dollar · Lateral','Utilitário com baú adesivado para transporte de animais'],
  ['utilitarios-com-bau-26','bau','Dollar · Traseira','Traseira de utilitário com identidade Dollar'],
  ['utilitarios-com-bau-47','bau','Identidade no baú','Traseira de utilitário com aplicação de identidade comercial'],
  ['utilitarios-com-bau-48','bau','Acqua Duratop','Utilitário com aplicação comercial na traseira'],
  ['grupo-acontrans-fiorino-3','bau','Grupo Acontrans','Fiorino com envelopamento comercial dourado'],
  ['je-lateral-geral','cacamba','J&E','Utilitário com envelopamento comercial na lateral'],
  ['ambientacao-comercial-01','ambientes','E-Moving · Comunicação interna','Painel de comunicação visual no ambiente da E-Moving'],
  ['ambientacao-comercial-02','ambientes','E-Moving · Recepção','Recepção comercial com painéis adesivados'],
  ['ambientacao-comercial-03','ambientes','E-Moving · Fachada','Identidade visual aplicada na fachada da E-Moving'],
  ['ambientacao-comercial-05','ambientes','Comunicação em saúde','Parede com aplicação de comunicação visual em saúde'],
  ['galeria-01','ambientes','Adesivo de parede','Aplicação fotográfica em parede de ambiente comercial'],
  ['galeria-03','ambientes','Painel informativo','Painel de comunicação visual para radiografia panorâmica']
].map(([file,category,title,alt]) => ({file,category,title,alt,src:`images/portfolio/${file}.webp`,small:`images/portfolio/${file}-small.webp`}));

const filters = document.querySelector('.gallery-filters');
const grid = document.querySelector('.gallery-grid');
const showMore = document.getElementById('showMore');
const modal = document.getElementById('galleryLightbox');
let selectedCategory = 'todos';
let visiblePhotos = galleryPhotos;
let expanded = false;
let activePhoto = 0;
let lightboxTrigger = null;
for (const category of vehicleCategories) {
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'gallery-filter'; button.dataset.category = category.id;
  button.textContent = category.label; button.setAttribute('aria-pressed', String(category.id === selectedCategory));
  button.addEventListener('click', () => {
    selectedCategory = category.id; expanded = false;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    track('portfolio_filter', { category:category.id });
    renderGallery();
  });
  filters.append(button);
}
function renderGallery() {
  visiblePhotos = galleryPhotos.filter(photo => selectedCategory === 'todos' || photo.category === selectedCategory);
  const photosToShow = expanded ? visiblePhotos : visiblePhotos.slice(0,6);
  grid.replaceChildren();
  photosToShow.forEach((photo,index) => {
    const figure = document.createElement('figure'); figure.className = 'gallery-card';
    const button = document.createElement('button'); button.type = 'button'; button.className = 'gallery-photo';
    button.setAttribute('aria-label', `Ampliar: ${photo.title}`);
    const img = document.createElement('img'); img.src = photo.src; img.alt = `${photo.alt}. Trabalho do portfólio da V4 Adesivos.`;
    if (!photo.file.startsWith('galeria-')) { img.srcset = `${photo.small} 520w, ${photo.src} 800w`; img.sizes = '(max-width:540px) calc(100vw - 40px), (max-width:820px) 45vw, 65vw'; }
    img.loading = 'lazy'; img.decoding = 'async'; img.width = 800; img.height = 600;
    const expandIcon = document.createElement('span'); expandIcon.className = 'photo-expand'; expandIcon.append(icon('Expand'));
    button.append(img,expandIcon);
    button.addEventListener('click', () => {
      lightboxTrigger = button; activePhoto = index; updateLightbox(); modal.showModal();
      document.body.classList.add('locked');
      track('portfolio_image_open', { category:photo.category, image:photo.file });
    });
    const caption = document.createElement('figcaption');
    const title = document.createElement('strong'); title.textContent = photo.title;
    const category = document.createElement('span'); category.textContent = categoryNames[photo.category];
    caption.append(title,category); figure.append(button,caption); grid.append(figure);
  });
  document.querySelector('.gallery-status').textContent = `${photosToShow.length} de ${visiblePhotos.length} fotografias`;
  showMore.hidden = visiblePhotos.length <= 6;
  showMore.replaceChildren(icon(expanded ? 'Minus' : 'Plus'), document.createTextNode(expanded ? 'Ver menos trabalhos' : 'Ver mais trabalhos'));
}
showMore.addEventListener('click', () => {
  expanded = !expanded; renderGallery();
  if (!expanded) document.getElementById('portfolio').scrollIntoView({block:'start'});
  track('portfolio_expand', { expanded });
});
function updateLightbox() {
  const photo = visiblePhotos[activePhoto];
  document.getElementById('lightboxTitle').textContent = photo.title;
  document.getElementById('lightboxCategory').textContent = categoryNames[photo.category];
  const image = document.getElementById('lightboxImage'); image.src = photo.src; image.alt = `${photo.alt}. V4 Adesivos.`;
  document.getElementById('lightboxCounter').textContent = `${activePhoto + 1} / ${visiblePhotos.length}`;
}
function movePhoto(direction) { activePhoto = (activePhoto + direction + visiblePhotos.length) % visiblePhotos.length; updateLightbox(); }
document.getElementById('lightboxClose').addEventListener('click', () => modal.close());
document.getElementById('lightboxPrev').addEventListener('click', () => movePhoto(-1));
document.getElementById('lightboxNext').addEventListener('click', () => movePhoto(1));
modal.addEventListener('close', () => { document.body.classList.remove('locked'); lightboxTrigger?.focus({preventScroll:true}); });
modal.addEventListener('click', event => {
  if (event.target !== modal) return;
  const bounds = modal.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modal.close();
});
modal.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); movePhoto(event.key === 'ArrowLeft' ? -1 : 1); }
});
let touchStart = null;
document.getElementById('lightboxImage').addEventListener('touchstart', event => { touchStart = event.touches[0].clientX; }, {passive:true});
document.getElementById('lightboxImage').addEventListener('touchend', event => {
  if (touchStart === null) return;
  const movement = event.changedTouches[0].clientX - touchStart;
  if (Math.abs(movement) > 55) movePhoto(movement > 0 ? -1 : 1);
  touchStart = null;
}, {passive:true});
document.getElementById('galleryQuote').addEventListener('click', () => {
  const category = categoryNames[selectedCategory] || 'veículos e comunicação visual';
  openWhatsApp(`Olá! Vi o portfólio da V4 Adesivos e gostaria de um orçamento para ${category.toLowerCase()}.`, 'galeria');
});
document.getElementById('lightboxQuote').addEventListener('click', () => {
  const photo = visiblePhotos[activePhoto];
  openWhatsApp(`Olá! Vi o trabalho ${photo.title} no portfólio da V4 e gostaria de um projeto para ${categoryNames[photo.category].toLowerCase()}.`, 'portfolio_imagem');
});
renderGallery();

const services = {
  frota: {image:'sorri-sustentabilidade-lateral-2-van-12',alt:'Van Sorridents adesivada pela V4',caption:'Sorridents · Van comercial',title:'A empresa reconhecida em cada trajeto.',description:'Aplicação da sua identidade em carros, vans, Kombis, utilitários, ambulâncias e caminhões. Uma apresentação consistente, mesmo com veículos de modelos diferentes.',cta:'Conversar sobre minha frota'},
  envelopamento: {image:'grupo-acontrans-fiorino-3',alt:'Fiorino Grupo Acontrans com envelopamento comercial pela V4',caption:'Grupo Acontrans · Envelopamento',title:'Mais superfície. Mais presença.',description:'Envelopamento parcial ou total para valorizar a comunicação do seu veículo. A aplicação pode explorar portas, laterais, traseira e outras áreas conforme a proposta visual.',cta:'Orçar meu envelopamento'},
  ambientacao: {image:'ambientacao-comercial-07',alt:'Ambiente comercial com paredes adesivadas pela V4',caption:'V4 Adesivos · Ambientação comercial',title:'A sua identidade ocupa o seu espaço.',description:'Adesivos para paredes e vitrines, painéis e placas internas. Projetos personalizados para conectar o ambiente comercial à identidade da sua empresa.',cta:'Orçar meu ambiente'}
};
const serviceTabs = [...document.querySelectorAll('.service-tab')];
function selectService(tab) {
  serviceTabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
  const service = services[tab.dataset.service];
  const image = document.getElementById('serviceImage'); image.src = `images/portfolio/${service.image}.webp`; image.alt = service.alt;
  document.getElementById('serviceImageCaption').textContent = service.caption;
  document.getElementById('serviceTitle').textContent = service.title;
  document.getElementById('serviceDescription').textContent = service.description;
  const cta = document.getElementById('serviceQuote'); cta.dataset.context = tab.dataset.service; cta.href = whatsappURL(messages[tab.dataset.service]); cta.replaceChildren(document.createTextNode(service.cta),icon('MessageCircle'));
  document.getElementById('servicePanel').setAttribute('aria-labelledby',tab.id);
  track('service_view', {service:tab.dataset.service});
}
serviceTabs.forEach((tab,index) => {
  tab.addEventListener('click', () => selectService(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (['ArrowDown','ArrowRight'].includes(event.key)) next = (index+1)%serviceTabs.length;
    if (['ArrowUp','ArrowLeft'].includes(event.key)) next = (index-1+serviceTabs.length)%serviceTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = serviceTabs.length-1;
    if (next !== undefined) { event.preventDefault(); selectService(serviceTabs[next]); serviceTabs[next].focus(); }
  });
});
const form = document.getElementById('quoteForm');
const vehicleFields = ['modelo','quantidade'].map(name => form.elements.namedItem(name));
form.elements.servico.addEventListener('change', () => {
  const isAmbient = form.elements.servico.value === 'Ambientação comercial';
  vehicleFields.forEach(input => { input.disabled = isAmbient; input.closest('.field').classList.toggle('inactive',isAmbient); });
});
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const isAmbient = data.get('servico') === 'Ambientação comercial';
  const lines = ['Olá! Conheci a V4 Adesivos pelo site e gostaria de um orçamento.','',`Nome e empresa: ${data.get('nome').trim()}`,`Tipo de serviço: ${data.get('servico')}`];
  if (!isAmbient) lines.push(`Modelo do veículo: ${data.get('modelo')?.trim() || 'A definir'}`,`Quantidade de veículos: ${data.get('quantidade') || 'A definir'}`);
  lines.push(`Cidade: ${data.get('cidade').trim()}`,`Mensagem adicional: ${data.get('detalhes')?.trim() || 'Sem observações adicionais'}`);
  track('quote_form_submit', { service_type:data.get('servico'), vehicle_count:data.get('quantidade') || '' });
  openWhatsApp(lines.join('\n'),'formulario_orcamento');
});

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
function setMenu(open, restoreFocus = true) {
  mobileMenu.hidden = !open;
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.setAttribute('aria-label',open ? 'Fechar menu' : 'Abrir menu');
  menuToggle.replaceChildren(icon(open ? 'X' : 'Menu'));
  document.body.classList.toggle('locked',open);
  main.inert = open; footer.inert = open;
  document.querySelector('.mobile-contact').classList.toggle('hidden-contact',open);
  if (open) mobileMenu.querySelector('a').focus();
  else if (restoreFocus) menuToggle.focus({preventScroll:true});
}
menuToggle.addEventListener('click', () => setMenu(mobileMenu.hidden));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false,false)));
document.addEventListener('keydown', event => {
  if (mobileMenu.hidden) return;
  if (event.key === 'Escape') setMenu(false);
  if (event.key === 'Tab') {
    const focusables = [menuToggle,...mobileMenu.querySelectorAll('a')];
    const first = focusables[0], last = focusables.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
window.matchMedia('(min-width:821px)').addEventListener('change', event => { if (event.matches && !mobileMenu.hidden) setMenu(false,false); });
let scrollPending = false;
window.addEventListener('scroll', () => {
  if (scrollPending) return;
  scrollPending = true;
  requestAnimationFrame(() => { document.getElementById('siteHeader').classList.toggle('scrolled',scrollY > 20); scrollPending = false; });
}, {passive:true});
const contact = document.querySelector('.mobile-contact');
const budgetObserver = new IntersectionObserver(entries => {
  contact.classList.toggle('hidden-contact', entries[0].isIntersecting || !mobileMenu.hidden);
}, {threshold:0});
budgetObserver.observe(form);
if (!window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), {threshold:.07});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
