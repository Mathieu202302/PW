/* Shared behavior for every page: header, footer, gallery, lightbox, language switch and page content.
   Page content lives in data.js. Interface text lives in i18n.js. */
(function(){
'use strict';
var S = window.SITE, P = S.profile, I = window.I18N;
var NAME_EN = (P.name && P.name.en) || P.name;   /* header and footer always show the English name */
var $ = function(s, r){ return (r||document).querySelector(s); };
var $$ = function(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
var esc = function(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
var page = document.body.getAttribute('data-page');
var main = $('#main');

/* ================= Language ================= */
var lang = 'en';
/* The site opens in the visitor's device language. A choice made with the EN / 中文 switch is kept only
   for the current visit (all pages), so the next visit starts from the device language again. */
function detectLang(){
  var q = ''; try{ q = new URLSearchParams(location.search).get('lang') || ''; }catch(e){}
  if(q === 'en' || q === 'zh') return q;
  try{ localStorage.removeItem('lang'); }catch(e){}
  try{ var s = sessionStorage.getItem('lang'); if(s === 'en' || s === 'zh') return s; }catch(e){}
  var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
  for(var i = 0; i < list.length; i++){ if(/^zh/i.test(list[i])) return 'zh'; if(/^en/i.test(list[i])) return 'en'; }
  return 'en';
}
function L(v){ return (v && typeof v === 'object' && 'en' in v) ? (v[lang] || v.en) : v; }
function t(key){
  var v = I[lang][key]; if(v === undefined) v = I.en[key];
  return typeof v === 'function' ? v.apply(null, Array.prototype.slice.call(arguments, 1)) : v;
}

/* ================= Placeholder art (used until a real src is set) ================= */
function rng(seed){ var s = (seed || 1) >>> 0; return function(){ s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
function head(w, h, stops){
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">' +
    stops.map(function(s){ return '<stop offset="'+s[0]+'" stop-color="'+s[1]+'"/>'; }).join('') + '</linearGradient></defs><rect width="'+w+'" height="'+h+'" fill="url(#g)"/>';
}
function hillsSVG(seed, w, h, hue){
  var r = rng(seed), svg = head(w, h, [[0,'hsl('+hue+',50%,64%)'],[1,'hsl('+(hue+25)+',60%,88%)']]);
  svg += '<circle cx="'+(w*(.2+r()*.6))+'" cy="'+(h*(.16+r()*.18))+'" r="'+(Math.min(w,h)*.07)+'" fill="hsla(45,90%,93%,.9)"/>';
  for(var l=0; l<4; l++){
    var base = h*(.5+l*.1), amp = h*(.12-l*.016), pts = [], i;
    for(i=0; i<=6; i++) pts.push([w*i/6, base + (r()-.5)*2*amp]);
    var d = 'M0,'+h+' L'+pts[0][0]+','+pts[0][1];
    for(i=1; i<pts.length; i++){ d += ' Q'+pts[i-1][0]+','+pts[i-1][1]+' '+((pts[i-1][0]+pts[i][0])/2)+','+((pts[i-1][1]+pts[i][1])/2); }
    d += ' L'+w+','+pts[6][1]+' L'+w+','+h+' Z';
    svg += '<path d="'+d+'" fill="hsl('+(hue+10*l)+','+(32-l*4)+'%,'+(48-l*10)+'%)"/>';
  }
  return svg + '</svg>';
}
function citySVG(seed, w, h, hue){
  var r = rng(seed), svg = head(w, h, [[0,'hsl('+hue+',45%,16%)'],[.6,'hsl('+(hue+20)+',50%,38%)'],[1,'hsl('+(hue+45)+',65%,68%)']]);
  svg += '<circle cx="'+(w*(.2+r()*.6))+'" cy="'+(h*.2)+'" r="'+(Math.min(w,h)*.05)+'" fill="hsla(50,60%,92%,.9)"/>';
  [[.18,.38,'hsl('+hue+',28%,24%)',false],[.12,.3,'hsl('+hue+',30%,8%)',true]].forEach(function(L){
    for(var x=-10; x<w;){
      var bw = w*(.05+r()*.08), bh = h*(L[0]+r()*L[1]);
      svg += '<rect x="'+x+'" y="'+(h-bh)+'" width="'+bw+'" height="'+bh+'" fill="'+L[2]+'"/>';
      if(L[3]){
        for(var wy=h-bh+bw*.18; wy<h-bw*.2; wy+=bw*.22){
          for(var wx=x+bw*.14; wx<x+bw-bw*.2; wx+=bw*.2){
            if(r() < .32) svg += '<rect x="'+wx+'" y="'+wy+'" width="'+(bw*.08)+'" height="'+(bw*.1)+'" fill="hsla(46,95%,70%,.85)"/>';
          }
        }
      }
      x += bw + w*.004;
    }
  });
  return svg + '</svg>';
}
function boxSVG(seed, w, h, hue){
  var bw = w*.56, bh = h*.42, x = (w-bw)/2 - w*.04, y = h*.36, d = bw*.22;
  var svg = head(w, h, [[0,'hsl('+hue+',22%,88%)'],[1,'hsl('+hue+',22%,72%)']]);
  svg += '<ellipse cx="'+(x+bw/2+d/2)+'" cy="'+(y+bh+h*.02)+'" rx="'+(bw*.62)+'" ry="'+(h*.025)+'" fill="rgba(0,0,0,.18)"/>';
  svg += '<polygon points="'+x+','+y+' '+(x+d)+','+(y-d*.6)+' '+(x+bw+d)+','+(y-d*.6)+' '+(x+bw)+','+y+'" fill="hsl('+hue+',55%,60%)"/>';
  svg += '<polygon points="'+(x+bw)+','+y+' '+(x+bw+d)+','+(y-d*.6)+' '+(x+bw+d)+','+(y+bh-d*.6)+' '+(x+bw)+','+(y+bh)+'" fill="hsl('+hue+',55%,30%)"/>';
  svg += '<rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+bh+'" fill="hsl('+hue+',55%,42%)"/>';
  svg += '<rect x="'+x+'" y="'+(y+bh*.4)+'" width="'+bw+'" height="'+(bh*.14)+'" fill="hsla(0,0%,100%,.82)"/>';
  svg += '<circle cx="'+(x+bw/2)+'" cy="'+(y+bh*.2)+'" r="'+(bw*.07)+'" fill="hsla(45,90%,80%,.9)"/>';
  return svg + '</svg>';
}
function bricksSVG(seed, w, h, hue){
  var r = rng(seed), svg = head(w, h, [[0,'hsl('+hue+',18%,92%)'],[1,'hsl('+hue+',18%,76%)']]);
  var W = w*.66, u = W/6, x0 = (w-W)/2, bh = h*.105, y0 = h*.66;
  var rows = [[3,3],[2,3,1],[3,3],[1,3,2]], cols = [hue, hue+55, hue+190, hue+310, hue+120];
  svg += '<ellipse cx="'+(w/2)+'" cy="'+(y0+bh+h*.012)+'" rx="'+(W*.62)+'" ry="'+(h*.022)+'" fill="rgba(0,0,0,.16)"/>';
  rows.forEach(function(row, ri){
    var x = x0, y = y0 - ri*bh;
    row.forEach(function(n){
      var bw = n*u, c = cols[Math.floor(r()*cols.length)];
      svg += '<rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+bh+'" fill="hsl('+c+',68%,48%)" stroke="rgba(0,0,0,.28)" stroke-width="1.5"/>';
      for(var k=0; k<n; k++){
        var sx = x + k*u + u*.2;
        svg += '<rect x="'+sx+'" y="'+(y-bh*.2)+'" width="'+(u*.6)+'" height="'+(bh*.22)+'" rx="'+(bh*.06)+'" fill="hsl('+c+',68%,56%)" stroke="rgba(0,0,0,.28)" stroke-width="1.5"/>';
      }
      x += bw;
    });
  });
  return svg + '</svg>';
}
function carSVG(seed, w, h, hue){
  var cx = w*.12, cw = w*.76, base = h*.58, bh = h*.1, rr = bh*.66;
  var svg = head(w, h, [[0,'hsl('+hue+',16%,92%)'],[1,'hsl('+hue+',16%,78%)']]);
  svg += '<rect x="'+(w*.06)+'" y="'+(base+rr)+'" width="'+(w*.88)+'" height="'+(h*.022)+'" fill="hsl('+hue+',14%,34%)"/>';
  svg += '<ellipse cx="'+(w/2)+'" cy="'+(base+rr)+'" rx="'+(cw*.5)+'" ry="'+(h*.012)+'" fill="rgba(0,0,0,.2)"/>';
  var P = function(a,b){ return (cx+cw*a).toFixed(1)+','+(base-bh*b).toFixed(1); };
  svg += '<path d="M'+P(0,0)+' L'+P(0,.9)+' Q'+P(.03,1.05)+' '+P(.14,1.08)+' L'+P(.36,1.1)+' L'+P(.46,2.15)+' L'+P(.7,2.15)+' L'+P(.86,1.14)+' L'+P(.97,1.0)+' L'+P(1,.9)+' L'+P(1,0)+' Z" fill="hsl('+hue+',68%,44%)" stroke="rgba(0,0,0,.3)" stroke-width="1.5"/>';
  svg += '<path d="M'+P(.39,1.2)+' L'+P(.47,2.0)+' L'+P(.58,2.0)+' L'+P(.58,1.2)+' Z M'+P(.61,1.2)+' L'+P(.61,2.0)+' L'+P(.69,2.0)+' L'+P(.8,1.2)+' Z" fill="hsl('+hue+',30%,86%)"/>';
  svg += '<rect x="'+(cx+cw*.02)+'" y="'+(base-bh*.7)+'" width="'+(cw*.05)+'" height="'+(bh*.22)+'" fill="hsl(48,90%,75%)"/>';
  [.22,.78].forEach(function(f){
    var wx = cx + cw*f;
    svg += '<circle cx="'+wx+'" cy="'+base+'" r="'+rr+'" fill="#1b1f21"/><circle cx="'+wx+'" cy="'+base+'" r="'+(rr*.5)+'" fill="hsl('+hue+',10%,72%)"/><circle cx="'+wx+'" cy="'+base+'" r="'+(rr*.14)+'" fill="#1b1f21"/>';
  });
  return svg + '</svg>';
}
function pawAt(cx, cy, s, fill, op, rot){
  var g = '<g transform="rotate('+rot+' '+cx+' '+cy+')" fill="'+fill+'" fill-opacity="'+op+'">';
  g += '<ellipse cx="'+cx+'" cy="'+(cy+s*.1)+'" rx="'+(s*.19)+'" ry="'+(s*.15)+'"/>';
  g += '<circle cx="'+(cx-s*.13)+'" cy="'+(cy+s*.03)+'" r="'+(s*.075)+'"/><circle cx="'+(cx+s*.13)+'" cy="'+(cy+s*.03)+'" r="'+(s*.075)+'"/>';
  [[-.27,-.1,-24],[-.1,-.26,-8],[.1,-.26,8],[.27,-.1,24]].forEach(function(t){
    g += '<ellipse cx="'+(cx+s*t[0])+'" cy="'+(cy+s*t[1])+'" rx="'+(s*.075)+'" ry="'+(s*.105)+'" transform="rotate('+t[2]+' '+(cx+s*t[0])+' '+(cy+s*t[1])+')"/>';
  });
  return g + '</g>';
}
function pawSVG(seed, w, h, hue){
  var r = rng(seed), s = Math.min(w, h), ink = 'hsl('+(hue+8)+',42%,24%)';
  var svg = head(w, h, [[0,'hsl('+hue+',58%,88%)'],[1,'hsl('+(hue+22)+',50%,70%)']]);
  svg += '<ellipse cx="'+(w/2)+'" cy="'+(h*.9)+'" rx="'+(w*.6)+'" ry="'+(h*.16)+'" fill="hsla('+hue+',40%,40%,.18)"/>';
  svg += pawAt(w*(.3+r()*.1), h*(.74+r()*.04), s*.52, ink, .22, -18+r()*10);
  svg += pawAt(w*(.58+r()*.1), h*(.5+r()*.05), s*.78, ink, .9, 10+r()*10);
  return svg + '</svg>';
}
function artURI(a, w, h){
  var f = a.kind === 'city' ? citySVG : a.kind === 'bricks' ? bricksSVG : a.kind === 'car' ? carSVG : a.kind === 'box' ? boxSVG : a.kind === 'paw' ? pawSVG : hillsSVG;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(f(a.seed, w, h, a.hue));
}
function dims(it){ return {w: it.w || 800, h: it.h || 1000}; }
function ytThumb(id){ return 'https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/hqdefault.jpg'; }
function driveImg(id, px){ return 'https://lh3.googleusercontent.com/d/' + encodeURIComponent(id) + '=w' + (px || 900); }
function hasImg(it){ return !!(it.src || it.drive); }
function srcOf(it, px){ var d = dims(it); return it.src || (it.drive ? driveImg(it.drive, px) : (it.video ? ytThumb(it.video) : artURI(it.art, d.w, d.h))); }

/* ================= Header, navigation, footer ================= */
function renderHeader(){
  var h = $('#top'), isOpen = h.classList.contains('open');
  var NAV = [
    {key:'photography', label:t('photography'), href:'photography.html',
     sub:[{label:t('all_photos'), href:'photography.html'}].concat(S.albums.map(function(a){ return {label:L(a.name), href:'photography.html#'+a.id}; }))},
    {key:'collections', label:t('collections'), href:'collections.html',
     sub:[{label:t('all_collections'), href:'collections.html'}].concat(S.collections.map(function(c){ return {label:L(c.name), href:'collections.html#'+c.id}; }))},
    {key:'life', label:t('life'), href:'life.html',
     sub:[{label:t('all_life'), href:'life.html'}].concat(S.life.albums.map(function(a){ return {label:L(a.name), href:'life.html#'+a.id}; }))},
    {key:'career', label:t('career'), href:'career.html'},
    {key:'about', label:t('about'), href:'about.html'}
  ];
  h.innerHTML =
    '<div class="top-in"><a class="brand" href="index.html"><img src="logo-small.png" width="420" height="218" alt=""><span>'+esc(NAME_EN)+'</span></a>' +
    '<button type="button" class="menu-btn" aria-expanded="'+isOpen+'" aria-controls="nav">'+esc(t('menu'))+'</button>' +
    '<nav class="nav" id="nav" aria-label="'+esc(t('nav_main'))+'"><ul class="nav-list">' + NAV.map(function(n){
      var cur = n.key === page ? ' aria-current="page"' : '';
      if(!n.sub) return '<li class="nav-item"><a class="nav-link" href="'+n.href+'"'+cur+'>'+esc(n.label)+'</a></li>';
      return '<li class="nav-item has-sub"><a class="nav-link" href="'+n.href+'"'+cur+'>'+esc(n.label)+'</a>' +
        '<button type="button" class="caret" aria-expanded="false" aria-haspopup="true" aria-label="'+esc(t('open_menu', n.label))+'"></button>' +
        '<ul class="sub">' + n.sub.map(function(s){ return '<li><a href="'+s.href+'">'+esc(s.label)+'</a></li>'; }).join('') + '</ul></li>';
    }).join('') + '</ul>' +
    '<div class="nav-tools"><div class="lang" role="group" aria-label="'+esc(t('lang_group'))+'">' +
      '<button type="button" lang="en" data-lang="en" aria-pressed="'+(lang === 'en')+'" aria-label="English">EN</button>' +
      '<button type="button" lang="zh-Hant-TW" data-lang="zh" aria-pressed="'+(lang === 'zh')+'" aria-label="繁體中文">中文</button>' +
    '</div>' + themeBtn() + '</div></nav></div><div class="progress" id="progress"></div>';
  updateProgress();
}
var SUN = '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/></svg>';
var MOON = '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.2A8 8 0 0 1 9.8 4a8 8 0 1 0 10.2 10.2z"/></svg>';
function themeLabel(){ return t(window.THEME && THEME.get() === 'dark' ? 'theme_to_light' : 'theme_to_dark'); }
function themeBtn(){ var l = esc(themeLabel()); return '<button type="button" class="theme-btn" title="'+l+'" aria-label="'+l+'">'+SUN+MOON+'</button>'; }
function syncThemeBtn(){ var b = $('.theme-btn'); if(b){ var l = themeLabel(); b.setAttribute('aria-label', l); b.setAttribute('title', l); } }
if(window.THEME) THEME.onchange(syncThemeBtn);
function closeSubs(except){
  $$('#top .has-sub.open').forEach(function(li){ if(li !== except){ li.classList.remove('open'); $('.caret', li).setAttribute('aria-expanded','false'); } });
}
function updateProgress(){
  var bar = $('#progress'); if(!bar) return;
  var d = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = 'scaleX(' + (d > 0 ? Math.min(1, scrollY / d) : 0) + ')';
}
function bindHeaderOnce(){
  var h = $('#top');
  h.addEventListener('click', function(e){
    var m = e.target.closest('.menu-btn'), c = e.target.closest('.caret'), g = e.target.closest('[data-lang]'), th = e.target.closest('.theme-btn');
    if(th){ THEME.toggle(); }
    else if(m){ var open = !h.classList.contains('open'); h.classList.toggle('open', open); m.setAttribute('aria-expanded', String(open)); }
    else if(c){ e.stopPropagation(); var li = c.parentNode, o = !li.classList.contains('open'); closeSubs(li); li.classList.toggle('open', o); c.setAttribute('aria-expanded', String(o)); }
    else if(g){ setLang(g.getAttribute('data-lang')); }
  });
  document.addEventListener('click', function(e){ if(!e.target.closest('.has-sub')) closeSubs(null); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      closeSubs(null);
      if(document.activeElement && document.activeElement.closest && document.activeElement.closest('.sub')) document.activeElement.blur();
    }
  });
  var tick = false;
  addEventListener('scroll', function(){ if(!tick){ tick = true; requestAnimationFrame(function(){ updateProgress(); tick = false; }); } }, {passive:true});
}
var footRO = null;
function syncFooterLogo(){
  var tx = $('.foot-txt'), logo = $('.foot-logo'); if(!tx || !logo) return;
  function fit(){ var h = Math.round(tx.getBoundingClientRect().height); if(h > 0) logo.style.height = h + 'px'; }
  fit();
  if(footRO){ footRO.disconnect(); footRO = null; }
  if(window.ResizeObserver){ footRO = new ResizeObserver(fit); footRO.observe(tx); }
}
function renderFooter(){
  $('#foot').innerHTML =
    '<div class="shell foot-in"><div class="foot-id"><img class="foot-logo" src="footer-logo.png" width="560" height="560" alt="" aria-hidden="true">' +
    '<div class="foot-txt"><p class="foot-h display">'+esc(t('foot_h'))+'</p><p class="foot-sub">'+esc(t('foot_sub'))+'</p>' +
    '<a class="btn solid foot-cta" href="contact.html">'+esc(t('contact_btn'))+'</a></div></div>' +
    '<ul class="links">' +
    P.links.map(function(l){ return '<li><a href="'+esc(l.href)+'" target="_blank" rel="noopener noreferrer">'+esc(l.label)+'</a></li>'; }).join('') +
    '</ul></div><div class="shell copy"><p>'+esc(t('foot_rights', NAME_EN))+'</p><p class="legal">'+esc(t('foot_legal', NAME_EN))+'</p>'+versionHTML()+'</div>';
  syncFooterLogo();
}

/* ================= Lightbox ================= */
var lb = null, lbState = {list:[], i:0, opener:null, auto:false};
function buildLB(){
  var el = document.createElement('div');
  el.className = 'lb'; el.hidden = true; el.setAttribute('role','dialog'); el.setAttribute('aria-modal','true'); el.setAttribute('aria-label', t('lb_viewer'));
  el.innerHTML =
    '<div class="lb-top"><output aria-live="polite"></output><button type="button" class="lb-btn" data-a="close">'+esc(t('close'))+'</button></div>' +
    '<div class="lb-stage"><button type="button" class="lb-btn lb-nav prev" data-a="prev" aria-label="'+esc(t('prev'))+'">&#8249;</button><img alt="" referrerpolicy="no-referrer"><button type="button" class="lb-btn lb-nav next" data-a="next" aria-label="'+esc(t('next'))+'">&#8250;</button></div>' +
    '<div class="lb-cap"></div><div class="lb-strip" role="group" aria-label="'+esc(t('all_images'))+'"></div>';
  document.body.appendChild(el);
  lb = {el:el, img:$('img', el), out:$('output', el), cap:$('.lb-cap', el), strip:$('.lb-strip', el), stage:$('.lb-stage', el)};
  el.addEventListener('click', function(e){
    var a = e.target.closest('[data-a]'), j = e.target.closest('[data-j]');
    if(a){ var k = a.getAttribute('data-a'); if(k === 'close') closeLB(); else step(k === 'next' ? 1 : -1); }
    else if(j){ lbState.i = parseInt(j.getAttribute('data-j'), 10); showLB(); }
    else if(e.target === lb.stage){ closeLB(); }
  });
  lb.strip.addEventListener('error', function(e){ if(e.target.tagName === 'IMG') e.target.style.visibility = 'hidden'; }, true);
  var sx = null;
  lb.stage.addEventListener('pointerdown', function(e){ sx = e.clientX; });
  lb.stage.addEventListener('pointerup', function(e){
    if(sx === null) return; var dx = e.clientX - sx; sx = null;
    if(Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });
}
document.addEventListener('keydown', function(e){
  if(!lb || lb.el.hidden) return;
  if(e.key === 'Escape'){ closeLB(); }
  else if(e.key === 'ArrowRight'){ step(1); }
  else if(e.key === 'ArrowLeft'){ step(-1); }
  else if(e.key === 'Home'){ lbState.i = 0; showLB(); }
  else if(e.key === 'End'){ lbState.i = lbState.list.length - 1; showLB(); }
  else if(e.key === 'Tab'){
    var f = $$('button', lb.el); if(!f.length) return;
    var first = f[0], last = f[f.length-1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
});
function step(d){ var n = lbState.list.length; lbState.i = (lbState.i + d + n) % n; showLB(); }
function clearVideo(){ var f = $('iframe', lb.stage); if(f) f.remove(); }
function showLB(){
  var it = lbState.list[lbState.i], auto = lbState.auto; lbState.auto = false;
  clearVideo();
  if(it.video){
    lb.img.hidden = true;
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(it.video) + '?rel=0&hl=' + (lang === 'zh' ? 'zh-TW' : 'en') + (auto ? '&autoplay=1' : '');
    f.title = it.title; f.allowFullscreen = true;
    f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    lb.stage.insertBefore(f, $('.next', lb.stage));
  } else {
    lb.img.hidden = false; lb.img.src = it.src; lb.img.alt = it.note || it.title;
  }
  lb.out.textContent = (lbState.i + 1) + ' / ' + lbState.list.length;
  lb.cap.innerHTML = esc(it.title) + (it.note ? '<em>' + esc(it.note) + '</em>' : '') + '<span>' + esc(it.meta) + '</span>';
  $$('button', lb.strip).forEach(function(b, k){
    var on = k === lbState.i; b.setAttribute('aria-current', String(on));
    if(on) b.scrollIntoView({inline:'center', block:'nearest'});
  });
}
function openLB(list, i, opener){
  if(!lb) buildLB();
  lbState = {list:list, i:i, opener:opener, auto:true};
  lb.strip.innerHTML = list.map(function(it, k){
    return '<button type="button" data-j="'+k+'" aria-label="'+esc(t('show', it.title))+'" aria-current="false"><img src="'+(it.thumb || it.src)+'" alt="" referrerpolicy="no-referrer"></button>';
  }).join('');
  lb.el.hidden = false; document.body.style.overflow = 'hidden';
  showLB(); $('[data-a="close"]', lb.el).focus();
}
function closeLB(){
  clearVideo(); lb.el.hidden = true; document.body.style.overflow = '';
  if(lbState.opener && lbState.opener.focus && document.contains(lbState.opener)) lbState.opener.focus({preventScroll:true});
}
function resetLB(){ if(lb){ lb.el.remove(); lb = null; document.body.style.overflow = ''; } }

/* ================= Pages ================= */
var hashFn = null, clockT = null;
function onHash(fn){ if(hashFn) removeEventListener('hashchange', hashFn); hashFn = fn; if(fn) addEventListener('hashchange', fn); }
function pageHead(title, text){ return '<div class="page-head"><h1 class="display">'+esc(title)+'</h1><p>'+esc(text)+'</p></div>'; }
function roleList(){ return '<ul class="roles" aria-label="'+esc(t('roles_label'))+'">' + P.roles.map(function(r){ return '<li>'+esc(L(r))+'</li>'; }).join('') + '</ul>'; }
function albumNameIn(albums, id){ var a = albums.filter(function(x){ return x.id === id; })[0]; return a ? L(a.name) : ''; }

/* ---- Home ---- */
function renderHome(){
  var photo = S.photos[0], coll = S.collections[0];
  main.innerHTML =
  '<div class="shell"><section class="home-hero" aria-label="'+esc(L(P.name))+'">' +
    '<div class="home-copy">' +
      '<h1 class="display"><span class="hello">'+esc(t('hello'))+'</span> <span class="nm"><span class="nm-main">'+esc(L(P.name))+'</span>'+(lang === 'zh' ? ' <span class="nm-en" lang="en">'+esc(NAME_EN)+'</span>' : '')+'</span></h1>' +
      '<p class="big">'+esc(t('home_big'))+'</p>' + roleList() +
      '<div class="cta"><a class="btn solid" href="photography.html">'+esc(t('cta_photo'))+'</a><a class="btn line" href="about.html">'+esc(t('cta_about'))+'</a></div>' +
    '</div>' +
    '<figure class="film"><img src="matthew-portrait.jpg" width="1200" height="1500" alt="'+esc(t('portrait_alt'))+'">' +
      '<div class="ann tl">'+esc(L(P.name))+'\n'+esc(L(P.short))+'</div><div class="ann tr" id="clock"></div>' +
      '<div class="ann bl">'+esc(t('ann_bl'))+'</div><div class="ann br">'+esc(t('ann_br'))+'</div></figure>' +
  '</section></div>' +
  '<section class="band"><div class="shell band-in"><h2>'+esc(t('explore'))+'</h2><div class="explore">' +
    '<a class="ex photo" href="photography.html"><img src="'+srcOf(photo, 1200)+'" alt="" referrerpolicy="no-referrer"><h3>'+esc(t('photography'))+'</h3><p>'+esc(t('ex_photo_p'))+'</p></a>' +
    '<a class="ex coll" href="collections.html"><img src="'+srcOf(coll.items[0], 1200)+'" alt="" referrerpolicy="no-referrer"><h3>'+esc(t('collections'))+'</h3><p>'+esc(t('ex_coll_p'))+'</p></a>' +
    '<a class="ex career" href="career.html"><img src="career-bg.jpg" alt="" width="1000" height="675"><div class="ann">'+esc(t('ann_career'))+'</div><div><h3>'+esc(t('career'))+'</h3><p>'+esc(t('ex_career_p'))+'</p></div></a>' +
    '<a class="ex" href="about.html"><img src="matthew-wide.jpg" alt="" style="object-position:62% 40%"><h3>'+esc(t('about'))+'</h3><p>'+esc(t('ex_about_p'))+'</p></a>' +
  '</div></div></section>';
  function clock(){
    var el = $('#clock'); if(!el) return;
    var s = new Intl.DateTimeFormat(lang === 'zh' ? 'zh-TW' : 'en-US', {hour:'numeric', minute:'2-digit', timeZone:P.tz}).format(new Date());
    el.textContent = t('ann_local') + '\n' + s;
  }
  clock(); clearInterval(clockT); clockT = setInterval(clock, 20000);
}

/* ---- Photography and My life (same gallery, different data) ----
   Every preview in a gallery has the same width: 1 column on phones, 2 on tablets, 3 on desktop.
   Wide photos are shown at 3:2. A tall photo is exactly as high as two wide ones plus the gap between them, so rows line up. Columns all start at the same top edge, and each photo goes
   into the shortest column, so photos keep the order written in data.js. */
function renderGallery(cfg){
  main.innerHTML = '<div class="shell">' + pageHead(t(cfg.h), t(cfg.p)) +
    '<nav class="chips" id="chips" aria-label="'+esc(t(cfg.aria))+'"></nav><p class="count" id="count" aria-live="polite"></p><div class="jgrid" id="grid"></div></div>';
  var grid = $('#grid'), items = [], nodes = [], laidW = 0;
  function isTall(p){ return !p.video && p.h > p.w; }
  function layout(){
    var W = grid.clientWidth; if(!W || !nodes.length) return;
    laidW = W;
    var g = W < 600 ? 12 : 16, cols = W < 600 ? 1 : (W < 900 ? 2 : 3);
    var cw = Math.floor((W - (cols - 1) * g) / cols), lh = Math.round(cw * 2 / 3), colH = [], k;
    for(k = 0; k < cols; k++) colH.push(0);
    nodes.forEach(function(n, i){
      var c = 0; for(k = 1; k < cols; k++){ if(colH[k] < colH[c] - 0.5) c = k; }
      var h = isTall(items[i]) ? 2 * lh + g : lh;
      n.style.width = cw + 'px'; n.style.height = h + 'px';
      n.style.left = (c * (cw + g)) + 'px'; n.style.top = colH[c] + 'px';
      colH[c] += h + g;
    });
    grid.style.height = (Math.max.apply(null, colH) - g) + 'px';
  }
  function draw(){
    var h = location.hash.slice(1) || 'all';
    if(h !== 'all' && !cfg.albums.some(function(a){ return a.id === h; })) h = 'all';
    $('#chips').innerHTML = [{id:'all', name:t('all')}].concat(cfg.albums).map(function(a){
      return '<a class="chip" href="#'+a.id+'" aria-current="'+(a.id === h)+'">'+esc(L(a.name))+'</a>';
    }).join('');
    items = cfg.items.filter(function(p){ return h === 'all' || p.album === h; });
    $('#count').textContent = h === 'all' ? t(cfg.count, items.length) : t(cfg.countIn, items.length, albumNameIn(cfg.albums, h));
    var tmp = document.createElement('div');
    tmp.innerHTML = items.map(function(p, i){
      var vid = !!p.video;
      return '<button type="button" class="tile'+(vid ? ' video' : '')+'" data-i="'+i+'" aria-label="'+esc(t(vid ? 'open_video' : 'open_photo', L(p.title)))+'">' +
        '<img src="'+srcOf(p, 800)+'" alt="'+esc(p.caption ? L(p.caption) : L(p.title))+'" loading="lazy" referrerpolicy="no-referrer">' +
        '<span class="cap"><b>'+esc(L(p.title))+'</b><span>'+esc(albumNameIn(cfg.albums, p.album))+'</span></span>' +
        (vid ? '<span class="vbadge" aria-hidden="true"></span>' : (hasImg(p) ? '' : '<span class="ph">'+esc(t('placeholder'))+'</span>')) + '</button>';
    }).join('');
    nodes = Array.prototype.slice.call(tmp.children);
    grid.innerHTML = ''; nodes.forEach(function(n){ grid.appendChild(n); });
    layout();
  }
  grid.addEventListener('error', function(e){ if(e.target.tagName === 'IMG') e.target.style.visibility = 'hidden'; }, true);
  grid.addEventListener('click', function(e){
    var tile = e.target.closest('.tile'); if(!tile) return;
    openLB(items.map(function(p){
      return {src:srcOf(p, 2000), thumb:srcOf(p, 160), video:p.video || '', title:L(p.title), note:p.caption ? L(p.caption) : '',
        meta:albumNameIn(cfg.albums, p.album) + (p.video ? t('video_meta') : (hasImg(p) ? '' : t('placeholder_meta')))};
    }), parseInt(tile.getAttribute('data-i'), 10), tile);
  });
  if(window.ResizeObserver){
    new ResizeObserver(function(){ if(grid.clientWidth && Math.abs(grid.clientWidth - laidW) > 1) layout(); }).observe(grid);
  } else {
    addEventListener('resize', function(){ if(grid.clientWidth !== laidW) layout(); });
  }
  onHash(draw); draw();
}
function renderPhotography(){ renderGallery({albums:S.albums, items:S.photos, h:'photo_h', p:'photo_p', aria:'albums_aria', count:'photo_count', countIn:'photo_count_in'}); }
function renderLife(){ renderGallery({albums:S.life.albums, items:S.life.items, h:'life_h', p:'life_p', aria:'life_aria', count:'life_count', countIn:'life_count_in'}); }

/* ---- Collections ---- */
function youtubeHTML(y){
  return '<div class="yt"><div class="yt-copy"><h3>'+esc(t('yt_h'))+'</h3><p>'+esc(t('yt_p'))+'</p>' +
    '<a class="btn solid" href="'+esc(y.url)+'" target="_blank" rel="noopener noreferrer">'+esc(t('yt_watch'))+'</a></div>' +
    '<div class="yt-frame" data-v="'+esc(y.id)+'"><button type="button" class="yt-play" aria-label="'+esc(t('yt_play'))+'">' +
      '<img src="'+ytThumb(y.id)+'" alt="" loading="lazy"><span class="yt-btn" aria-hidden="true"></span></button></div></div>';
}
function versionHTML(){
  var v = S.version; if(!v || !v.number) return '';
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v.date || ''), when = v.date || '';
  if(m){ try{ when = new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString(lang === 'zh' ? 'zh-TW' : 'en-US', {year:'numeric', month:lang === 'zh' ? 'long' : 'short', day:'numeric'}); }catch(e){} }
  return '<p class="legal ver">'+esc(t('foot_version', v.number, when))+'</p>';
}
function shopHTML(sh){
  return '<div class="shop"><div><h3>'+esc(L(sh.title))+'</h3><p>'+esc(L(sh.text))+'</p></div>' +
    '<a class="btn solid" href="'+esc(sh.url)+'" target="_blank" rel="noopener noreferrer">'+esc(t('shop_visit'))+'</a></div>';
}
function playYouTube(box){
  var f = document.createElement('iframe');
  f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(box.getAttribute('data-v')) + '?autoplay=1&rel=0&hl=' + (lang === 'zh' ? 'zh-TW' : 'en');
  f.title = t('yt_frame'); f.allowFullscreen = true;
  f.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
  f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
  box.innerHTML = ''; box.appendChild(f); f.focus();
}
function renderCollections(){
  main.innerHTML = '<div class="shell">' + pageHead(t('coll_h'), t('coll_p')) +
    '<nav class="chips" id="chips" aria-label="'+esc(t('colls_aria'))+'"></nav><p class="count" id="count" aria-live="polite"></p><div id="colls"></div><div style="height:48px"></div></div>';
  var lists = {};
  function draw(){
    var h = location.hash.slice(1) || 'all';
    if(h !== 'all' && !S.collections.some(function(c){ return c.id === h; })) h = 'all';
    $('#chips').innerHTML = [{id:'all', name:t('all')}].concat(S.collections).map(function(c){
      return '<a class="chip" href="#'+c.id+'" aria-current="'+(c.id === h)+'">'+esc(L(c.name))+'</a>';
    }).join('');
    var shown = S.collections.filter(function(c){ return h === 'all' || c.id === h; });
    var n = shown.reduce(function(sum, c){ return sum + c.items.length; }, 0);
    $('#count').textContent = t('coll_count', shown.length, n);
    $('#colls').innerHTML = shown.map(function(c){
      lists[c.id] = c.items.map(function(it){ return {src:srcOf(it, 2000), thumb:srcOf(it, 160), title:L(it.title), note:it.caption ? L(it.caption) : '', meta:L(c.name) + (lang === 'zh' ? '，' : ', ') + L(it.meta)}; });
      return '<section class="coll-sec" aria-labelledby="h-'+c.id+'"><div class="coll-head"><h2 id="h-'+c.id+'">'+esc(L(c.name))+'</h2><p>'+esc(L(c.blurb))+'</p></div>' + (c.shop && c.shop.url ? shopHTML(c.shop) : '') + (c.youtube ? youtubeHTML(c.youtube) : '') + '<div class="grid">' +
        c.items.map(function(it, i){
          return '<button type="button" class="tile" data-c="'+c.id+'" data-i="'+i+'" aria-label="'+esc(t('open_item', L(it.title)))+'">' +
            '<img src="'+srcOf(it, 800)+'" alt="'+esc(it.caption ? L(it.caption) : L(it.title))+'" loading="lazy" referrerpolicy="no-referrer">' +
            '<span class="cap"><b>'+esc(L(it.title))+'</b><span>'+esc(L(it.meta))+'</span></span>' + (hasImg(it) ? '' : '<span class="ph">'+esc(t('placeholder'))+'</span>') + '</button>';
        }).join('') + '</div></section>';
    }).join('');
  }
  $('#colls').addEventListener('error', function(e){ if(e.target.tagName === 'IMG') e.target.style.visibility = 'hidden'; }, true);
  $('#colls').addEventListener('click', function(e){
    var yt = e.target.closest('.yt-play'); if(yt){ playYouTube(yt.parentNode); return; }
    var tile = e.target.closest('.tile'); if(!tile) return;
    openLB(lists[tile.getAttribute('data-c')], parseInt(tile.getAttribute('data-i'), 10), tile);
  });
  onHash(draw); draw();
}

/* ---- Career ---- */
function renderCareer(){
  main.innerHTML = '<div class="shell">' + pageHead(t('career_h'), t('career_p')) + '</div>' +
  '<section class="sec"><div class="shell sec-in"><div><h2>'+esc(t('edu_h'))+'</h2></div><div><ul class="tl">' + S.education.map(function(x){
    var name = x.href ? '<a href="'+esc(x.href)+'" target="_blank" rel="noopener noreferrer">'+esc(L(x.title))+'</a>' : esc(L(x.title));
    var sub = L(x.sub), note = L(x.note);
    return '<li><span class="tl-when">'+esc(L(x.when))+'</span><div><div class="tl-t">'+name+'</div>' +
      (sub ? '<p class="tl-s">'+esc(sub)+'</p>' : '') + (note ? '<p class="tl-n">'+esc(note)+'</p>' : '') + '</div></li>';
  }).join('') + '</ul></div></div></section>';
  onHash(null);
}

/* ---- About ---- */
function renderAbout(){
  main.innerHTML = '<div class="shell">' + pageHead(t('about_h'), t('about_p')) +
  '<figure class="wide"><img src="matthew-wide.jpg" width="1920" height="1080" alt="'+esc(t('wide_alt'))+'"></figure>' +
  '<div class="about-grid"><div><h2 class="display" style="font-size:clamp(1.5rem,2.6vw,2rem);line-height:1.1">'+esc(t('about_hi'))+'</h2></div><div class="about-text">' +
    '<p>'+esc(t('about_p1'))+'</p><p>'+esc(t('about_p2'))+'</p>' + roleList() + '<p>'+esc(t('about_p3'))+'</p>' +
    '<dl class="facts"><div><dt>'+esc(t('f_grew'))+'</dt><dd>'+esc(t('v_grew'))+'</dd></div><div><dt>'+esc(t('f_lives'))+'</dt><dd>'+esc(L(P.location))+'</dd></div>' +
    '<div><dt>'+esc(t('f_study'))+'</dt><dd>'+esc(t('v_study'))+'</dd></div><div><dt>'+esc(t('f_grad'))+'</dt><dd>'+esc(t('v_grad'))+'</dd></div>' +
    '<div><dt>'+esc(t('f_into'))+'</dt><dd>'+esc(t('v_into'))+'</dd></div></dl>' +
    '<div class="about-links"><a class="btn solid" href="photography.html">'+esc(t('about_btn1'))+'</a><a class="btn line" href="collections.html">'+esc(t('about_btn2'))+'</a></div>' +
  '</div></div></div>';
  onHash(null);
}

/* ---- Contact ---- */
function renderContact(){
  function field(id, label, control, hint){
    return '<div class="fld"><label for="'+id+'">'+esc(label)+'</label>' + control +
      (hint ? '<p class="fld-hint" id="'+id+'Hint">'+esc(hint)+'</p>' : '') + '<p class="fld-err" id="'+id+'Err" role="alert"></p></div>';
  }
  main.innerHTML = '<div class="shell">' + pageHead(t('contact_h'), t('contact_p')) +
    '<form class="msg" id="msgForm" novalidate>' +
      field('msgName', t('name_label'), '<input type="text" id="msgName" name="name" autocomplete="name" maxlength="80" required aria-describedby="msgNameErr">') +
      field('msgEmail', t('email_label'), '<input type="email" id="msgEmail" name="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" maxlength="120" required aria-describedby="msgEmailHint msgEmailErr">', t('email_hint')) +
      field('msgText', t('msg_label'), '<textarea id="msgText" name="message" rows="9" maxlength="3000" required aria-describedby="msgTextErr"></textarea>') +
      '<input type="checkbox" name="botcheck" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">' +
      '<div class="msg-row"><button type="submit" class="btn solid" id="msgSend">'+esc(t('send'))+'</button><p class="msg-status" id="msgStatus" role="status" aria-live="polite"></p></div>' +
    '</form></div>';
  var form = $('#msgForm'), nameEl = $('#msgName'), mailEl = $('#msgEmail'), box = $('#msgText'), btn = $('#msgSend'), status = $('#msgStatus');
  var MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function say(text, kind){ status.textContent = text; status.setAttribute('data-kind', kind || ''); }
  function flag(el, text){ el.setAttribute('aria-invalid', text ? 'true' : 'false'); $('#' + el.id + 'Err').textContent = text || ''; return !text; }
  function checkName(){ return flag(nameEl, nameEl.value.trim() ? '' : t('err_name')); }
  function checkMail(){ return flag(mailEl, MAIL.test(mailEl.value.trim()) ? '' : t('err_email')); }
  function checkText(){ return flag(box, box.value.trim() ? '' : t('st_empty')); }
  nameEl.addEventListener('blur', function(){ if(nameEl.value) checkName(); });
  mailEl.addEventListener('blur', function(){ if(mailEl.value) checkMail(); });
  [nameEl, mailEl, box].forEach(function(el){ el.addEventListener('input', function(){ if(el.getAttribute('aria-invalid') === 'true'){ if(el === nameEl) checkName(); else if(el === mailEl) checkMail(); else checkText(); } }); });
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var okName = checkName(), okMail = checkMail(), okText = checkText();
    if(!okName){ nameEl.focus(); return; }
    if(!okMail){ mailEl.focus(); return; }
    if(!okText){ box.focus(); return; }
    if(form.botcheck.checked){ return; }
    var cfg = S.contact || {}, key = cfg.accessKey || '', fid = cfg.formId || '';
    if(!key && !fid){ say(t('st_noconf'), 'err'); return; }
    var who = nameEl.value.trim(), mail = mailEl.value.trim(), subj = 'New message from ' + who + ' (website)';
    btn.disabled = true; say(t('st_sending'), '');
    var url = fid ? 'https://formsubmit.co/ajax/' + encodeURIComponent(fid) : 'https://api.web3forms.com/submit';
    var body = fid ? {name: who, email: mail, message: box.value.trim(), _subject: subj, _captcha: 'false', _template: 'table', _honey: ''}
                   : {access_key: key, subject: subj, from_name: who, name: who, email: mail, message: box.value.trim()};
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify(body)
    }).then(function(r){ return r.json().then(function(j){ return {ok: r.ok && j.success !== false && j.success !== 'false'}; }); })
    .then(function(res){
      if(res.ok){ box.value = ''; nameEl.value = ''; mailEl.value = ''; [nameEl, mailEl, box].forEach(function(el){ el.setAttribute('aria-invalid', 'false'); }); say(t('st_ok'), 'ok'); }
      else { say(t('st_fail'), 'err'); }
    }).catch(function(){ say(t('st_net'), 'err'); })
    .then(function(){ btn.disabled = false; });
  });
  onHash(null);
}

/* ================= Render everything, and switch language ================= */
var pages = {home:renderHome, photography:renderPhotography, collections:renderCollections, life:renderLife, career:renderCareer, about:renderAbout, contact:renderContact};
function renderAll(){
  document.documentElement.lang = lang === 'zh' ? 'zh-Hant-TW' : 'en';
  document.title = t('title_' + page);
  var md = $('meta[name="description"]'); if(md) md.setAttribute('content', t('meta_desc'));
  var skip = $('.skip'); if(skip) skip.textContent = t('skip');
  renderHeader(); renderFooter(); pages[page]();
}
function setLang(next){
  if(next === lang) return;
  var draft = ['#msgName', '#msgEmail', '#msgText'].map(function(q){ return $(q) ? $(q).value : ''; });
  resetLB(); lang = next;
  try{ sessionStorage.setItem('lang', next); }catch(e){}
  renderAll();
  ['#msgName', '#msgEmail', '#msgText'].forEach(function(q, k){ if(draft[k] && $(q)) $(q).value = draft[k]; });
}


/* ================= Pull down to refresh (installed web app only) =================
   Browsers already refresh on pull-down. An app added to the home screen does not on iPhone, so this adds it there. */
function initPTR(){
  var standalone = false;
  try{ standalone = navigator.standalone === true || matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches; }catch(e){}
  if(!standalone) return;
  document.documentElement.classList.add('standalone');
  var el = document.createElement('div');
  el.className = 'ptr'; el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite');
  el.innerHTML = '<span class="ptr-arrow" aria-hidden="true"></span><span class="ptr-txt"></span>';
  document.body.appendChild(el);
  var txt = $('.ptr-txt', el), startY = null, startX = 0, dist = 0, pulling = false, busy = false, LIMIT = 150, TRIGGER = 80;
  function paint(d, state){
    el.style.setProperty('--pull', d + 'px');
    el.setAttribute('data-state', state);
    txt.textContent = state === 'loading' ? t('ptr_loading') : state === 'ready' ? t('ptr_release') : t('ptr_pull');
  }
  function reset(){ pulling = false; startY = null; dist = 0; el.classList.remove('on'); el.style.setProperty('--pull', '0px'); el.setAttribute('data-state', ''); txt.textContent = ''; }
  function blocked(target){
    if(busy || (lb && !lb.el.hidden)) return true;
    if(target && target.closest && target.closest('textarea, input, iframe, .lb')) return true;
    var drafts = $$('#msgName, #msgEmail, #msgText'); for(var q = 0; q < drafts.length; q++){ if(drafts[q].value.trim()) return true; }
    return false;
  }
  document.addEventListener('touchstart', function(e){
    if(e.touches.length !== 1 || window.scrollY > 0 || blocked(e.target)){ startY = null; return; }
    startY = e.touches[0].clientY; startX = e.touches[0].clientX; dist = 0; pulling = false;
  }, {passive:true});
  document.addEventListener('touchmove', function(e){
    if(startY === null) return;
    if(window.scrollY > 0){ reset(); return; }
    var dy = e.touches[0].clientY - startY, dx = Math.abs(e.touches[0].clientX - startX);
    if(!pulling){
      if(dy <= 8) return;
      if(dx > dy){ startY = null; return; }
      pulling = true; el.classList.add('on');
    }
    if(e.cancelable) e.preventDefault();
    dist = Math.min(LIMIT, dy * .5);
    paint(dist, dist >= TRIGGER ? 'ready' : 'pull');
  }, {passive:false});
  function end(){
    if(!pulling){ startY = null; return; }
    if(dist >= TRIGGER){
      busy = true; paint(TRIGGER, 'loading');
      setTimeout(function(){ location.reload(); }, 350);
    } else { reset(); }
  }
  document.addEventListener('touchend', end, {passive:true});
  document.addEventListener('touchcancel', function(){ if(!busy) reset(); }, {passive:true});
}

lang = detectLang();
bindHeaderOnce();
renderAll();
initPTR();
})();
