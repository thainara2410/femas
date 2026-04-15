/* ================================================================
 *  DADOS DOS ÁLBUNS DA FEMAS
 *
 *  Cada álbum possui duas seções independentes:
 *    midias → Mídias da Edição  (cartazes, posts, artes, etc.)
 *    fotos  → Fotos da Feira    (registros fotográficos do evento)
 *
 *  Para adicionar um novo álbum, insira um objeto no array abaixo.
 *  O restante do código funciona automaticamente.
 * ================================================================ */
var ALBUMS = [ 
  {
    id: 'femas-2025/1',
    title: 'FEMAS 2025/2',
    description: 'Momentos marcantes da edição anterior.',
    midias: [],
    fotos: [
      { src: 'assets/image/albuns/2023/foto1.jpg', caption: 'Stand principal' },
      { src: 'assets/image/albuns/2023/foto2.jpg', caption: 'Apresentação dos projetos' },
    ]
  },
  {
    id: 'femas-2025/2',
    title: 'FEMAS 2025/1',
    description: 'Registros da edição de 2024 na Praça dos Bancos.',
    midias: [{ src: 'assets/image/albuns/2025_02/IMG_4927.JPEG', caption: 'Abertura do evento' },
      { src: 'assets/image/albuns/2025_02/IMG_4933.JPEG', caption: 'Exposição de mídias' },],
    fotos: [
      { src: 'assets/image/albuns/2025_02/IMG_4935.JPEG', caption: 'Interação com o público' },
      { src: 'assets/image/albuns/2025_02/IMG_4939.JPEG', caption: 'Interação com o público' },
      { src: 'assets/image/albuns/2025_02/IMG_4987.JPEG', caption: 'Interação com o público' },
    ]
  },
  {
    id: 'femas-2024/2',
    title: 'FEMAS 2024/2',
    description: 'Registros da edição de 2024/02 na Praça dos Bancos.',
    midias: [
      { src: 'assets/image/albuns/2024_02/grupo3.png', caption: 'Saúde e bem estar' },
      { src: 'assets/image/albuns/2024_02/grupo7.png', caption: 'Energia limpa e acessível' }],
    fotos: [
      { src: 'assets/image/albuns/2024_02/grupo12.png', caption: 'Consumo e produção responsável' },
      { src: 'assets/image/albuns/2024_02/grupo15.png', caption: 'Vida terrestre' },
      { src: 'assets/image/albuns/2024_02/organizacao.png', caption: 'Organização' },
    ]
  },
  {
    id: 'femas-2024/1',
    title: 'FEMAS 2024/1',
    description: 'Momentos marcantes da edição anterior.',
    midias: [],
    fotos: [
      { src: 'assets/image/albuns/2023/foto1.jpg', caption: 'Stand principal' },
      { src: 'assets/image/albuns/2023/foto2.jpg', caption: 'Apresentação dos projetos' },
    ]
  },
  {
    id: 'femas-2023/2',
    title: 'FEMAS 2023/2',
    description: 'Registros da edição de 2024 na Praça dos Bancos.',
    midias: [],
    fotos: [
      { src: 'assets/image/albuns/2024/foto1.jpg', caption: 'Abertura do evento' },
      { src: 'assets/image/albuns/2024/foto2.jpg', caption: 'Exposição de mídias' },
      { src: 'assets/image/albuns/2024/foto3.jpg', caption: 'Interação com o público' },
    ]
  },
  {
    id: 'femas-2023',
    title: 'FEMAS 2023',
    description: 'Momentos marcantes da edição anterior.',
    midias: [],
    fotos: [
      { src: 'assets/image/albuns/2023/foto1.jpg', caption: 'Stand principal' },
      { src: 'assets/image/albuns/2023/foto2.jpg', caption: 'Apresentação dos projetos' },
    ]
  },
  {
    id: 'femas-2024',
    title: 'FEMAS 2024',
    description: 'Registros da edição de 2024 na Praça dos Bancos.',
    midias: [ { src: 'assets/image/albuns/2024/foto1.jpg', caption: 'Abertura do evento' }],
    fotos: [
      { src: 'assets/image/albuns/2024/foto2.jpg', caption: 'Exposição de mídias' },
      { src: 'assets/image/albuns/2024/foto3.jpg', caption: 'Interação com o público' },
    ]
  }
];

/* ================================================================
 *  ENGINE — não altere abaixo para adicionar álbuns
 * ================================================================ */
(function () {
  var albumGrid   = document.getElementById('album-grid');
  var lightbox    = document.getElementById('album-lightbox');
  var lbTitle     = document.getElementById('lb-title');
  var lbTabBtns   = document.querySelectorAll('.album-lightbox__tab');
  var lbGrid      = document.getElementById('lb-grid');
  var lbBack      = document.getElementById('lb-back');
  var photoZoom   = document.getElementById('photo-zoom');
  var zoomImg     = document.getElementById('zoom-img');
  var zoomClose   = document.getElementById('zoom-close');
  var zoomPrev    = document.getElementById('zoom-prev');
  var zoomNext    = document.getElementById('zoom-next');
  var zoomCap     = document.getElementById('zoom-caption');
  var scrollTrack = document.getElementById('album-scroll-track');
  var scrollPrev  = document.getElementById('album-scroll-prev');
  var scrollNext  = document.getElementById('album-scroll-next');

  var SCROLL_STEP   = 320;
  var currentPhotos = [];
  var currentIndex  = 0;
  var activeAlbum   = null;
  var activeTab     = 'fotos';

  /* ── Scroll horizontal ── */
  function updateScrollBtns() {
    if (!scrollTrack) return;
    var atStart = scrollTrack.scrollLeft <= 4;
    var atEnd   = scrollTrack.scrollLeft + scrollTrack.clientWidth >= scrollTrack.scrollWidth - 4;
    scrollPrev.classList.toggle('hidden', atStart);
    scrollNext.classList.toggle('hidden', atEnd);
  }

  if (scrollPrev && scrollNext && scrollTrack) {
    scrollPrev.addEventListener('click', function () {
      scrollTrack.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
    });
    scrollNext.addEventListener('click', function () {
      scrollTrack.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
    });
    scrollTrack.addEventListener('scroll', updateScrollBtns);
    setTimeout(updateScrollBtns, 100);
  }

  /* ── Thumb do card (capa = fotos; fallback para mídias) ── */
  function buildThumb(album) {
    var coverPhotos = (album.fotos && album.fotos.length) ? album.fotos : (album.midias || []);
    var div = document.createElement('div');
    div.className = 'album-card__thumb' + (coverPhotos.length <= 1 ? ' album-card__thumb--single' : '');
    var tiles = coverPhotos.length === 0 ? [{}] : coverPhotos.slice(0, 3);
    tiles.forEach(function(p) {
      var t = document.createElement('div');
      t.className = 'album-card__thumb-tile';
      if (p.src) t.style.backgroundImage = "url('" + p.src + "')";
      div.appendChild(t);
    });
    var totalFotos  = (album.fotos  || []).length;
    var totalMidias = (album.midias || []).length;
    var badge = document.createElement('span');
    badge.className = 'album-card__badge';
    badge.textContent = totalFotos + ' foto' + (totalFotos !== 1 ? 's' : '') +
                        ' · ' + totalMidias + ' mídia' + (totalMidias !== 1 ? 's' : '');
    div.appendChild(badge);
    return div;
  }

  /* ── Renderiza cards na grade ── */
  function renderAlbums() {
    albumGrid.innerHTML = '';
    if (!ALBUMS.length) {
      albumGrid.innerHTML = '<p style="color:#888;text-align:center;width:100%">Nenhum álbum cadastrado ainda.</p>';
      return;
    }
    ALBUMS.forEach(function(album, i) {
      var card = document.createElement('div');
      card.className = 'album-card';
      card.style.animationDelay = (i * 0.08) + 's';
      card.appendChild(buildThumb(album));
      var info = document.createElement('div');
      info.className = 'album-card__info';
      info.innerHTML = '<h2>' + album.title + '</h2><p>' + (album.description || '') + '</p>';
      card.appendChild(info);
      card.addEventListener('click', function() { openAlbum(album, 'fotos'); });
      albumGrid.appendChild(card);
    });
    setTimeout(updateScrollBtns, 150);
  }

  /* ── Abre o lightbox ── */
  function openAlbum(album, tab) {
    activeAlbum = album;
    activeTab   = tab || 'fotos';
    lbTitle.textContent = album.title;
    renderTab(activeTab);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbTabBtns.forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.tab === activeTab);
    });
  }

  /* ── Renderiza conteúdo da aba ── */
  function renderTab(tab) {
    activeTab     = tab;
    var photos    = (tab === 'midias') ? (activeAlbum.midias || []) : (activeAlbum.fotos || []);
    currentPhotos = photos;
    lbGrid.innerHTML = '';

    if (!photos.length) {
      lbGrid.innerHTML = '<p class="lb-empty">Nenhum conteúdo nesta seção ainda.</p>';
      return;
    }
    photos.forEach(function(photo, i) {
      var item = document.createElement('div');
      item.className = 'photo-item';
      item.style.animationDelay = (i * 0.04) + 's';
      var img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.caption || '';
      img.loading = 'lazy';
      item.appendChild(img);
      item.addEventListener('click', function() { openZoom(i); });
      lbGrid.appendChild(item);
    });
  }

  /* ── Clique nas abas ── */
  lbTabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      lbTabBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      renderTab(btn.dataset.tab);
    });
  });

  /* ── Fecha lightbox ── */
  function closeAlbum() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    activeAlbum = null;
  }

  /* ── Zoom ── */
  function openZoom(index) {
    currentIndex = index;
    var photo    = currentPhotos[index];
    zoomImg.src  = photo.src;
    zoomImg.alt  = photo.caption || '';
    zoomCap.textContent = photo.caption
      ? (index + 1) + ' / ' + currentPhotos.length + ' — ' + photo.caption
      : (index + 1) + ' / ' + currentPhotos.length;
    photoZoom.classList.add('open');
  }

  function closeZoom() { photoZoom.classList.remove('open'); zoomImg.src = ''; }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + currentPhotos.length) % currentPhotos.length;
    openZoom(currentIndex);
  }

  lbBack.addEventListener('click', closeAlbum);
  zoomClose.addEventListener('click', closeZoom);
  zoomPrev.addEventListener('click', function() { navigate(-1); });
  zoomNext.addEventListener('click', function() { navigate(1); });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (photoZoom.classList.contains('open')) closeZoom();
      else if (lightbox.classList.contains('open')) closeAlbum();
    }
    if (photoZoom.classList.contains('open')) {
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    }
  });

  renderAlbums();
})();
