/* Shared behavior for every page: header, footer, gallery, lightbox and page content.
   Content lives in data.js. */
(function(){
'use strict';
var S = window.SITE, P = S.profile;
var $ = function(s, r){ return (r||document).querySelector(s); };
var $$ = function(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
var esc = function(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
var clamp = function(v,a,b){ return v<a?a:v>b?b:v; };
var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
var page = document.body.getAttribute('data-page');
var main = $('#main');

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
function artURI(a, w, h){
  var f = a.kind === 'city' ? citySVG : a.kind === 'box' ? boxSVG : hillsSVG;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(f(a.seed, w, h, a.hue));
}
function dims(it){ return {w: it.w || 800, h: it.h || 1000}; }
function srcOf(it){ var d = dims(it); return it.src || artURI(it.art, d.w, d.h); }

/* ================= Header, navigation, footer ================= */
var NAV = [
  {key:'photography', label:'Photography', href:'photography.html',
   sub:[{label:'All photos', href:'photography.html'}].concat(S.albums.map(function(a){ return {label:a.name, href:'photography.html#'+a.id}; }))},
  {key:'collections', label:'Collections', href:'collections.html',
   sub:[{label:'All collections', href:'collections.html'}].concat(S.collections.map(function(c){ return {label:c.name, href:'collections.html#'+c.id}; }))},
  {key:'career', label:'Career', href:'career.html'},
  {key:'about', label:'About me', href:'about.html'}
];
function renderHeader(){
  var h = $('#top');
  h.innerHTML =
    '<div class="top-in"><a class="brand" href="index.html">'+esc(P.name)+'</a>' +
    '<button type="button" class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>' +
    '<nav class="nav" id="nav" aria-label="Main"><ul class="nav-list">' + NAV.map(function(n){
      var cur = n.key === page ? ' aria-current="page"' : '';
      if(!n.sub) return '<li class="nav-item"><a class="nav-link" href="'+n.href+'"'+cur+'>'+esc(n.label)+'</a></li>';
      return '<li class="nav-item has-sub"><a class="nav-link" href="'+n.href+'"'+cur+'>'+esc(n.label)+'</a>' +
        '<button type="button" class="caret" aria-expanded="false" aria-haspopup="true" aria-label="Open the '+esc(n.label)+' menu"></button>' +
        '<ul class="sub">' + n.sub.map(function(s){ return '<li><a href="'+s.href+'">'+esc(s.label)+'</a></li>'; }).join('') + '</ul></li>';
    }).join('') + '</ul></nav></div><div class="progress" id="progress"></div>';

  var menuBtn = $('.menu-btn', h);
  menuBtn.addEventListener('click', function(){
    var open = !h.classList.contains('open'); h.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', String(open));
  });
  function closeSubs(except){
    $$('.has-sub.open', h).forEach(function(li){ if(li !== except){ li.classList.remove('open'); $('.caret', li).setAttribute('aria-expanded','false'); } });
  }
  $$('.caret', h).forEach(function(c){
    c.addEventListener('click', function(e){
      e.stopPropagation();
      var li = c.parentNode, open = !li.classList.contains('open');
      closeSubs(li); li.classList.toggle('open', open); c.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function(e){ if(!e.target.closest('.has-sub')) closeSubs(null); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      closeSubs(null);
      if(document.activeElement && document.activeElement.closest && document.activeElement.closest('.sub')) document.activeElement.blur();
    }
  });

  var bar = $('#progress'), tick = false;
  function upd(){
    var d = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (d > 0 ? Math.min(1, scrollY / d) : 0) + ')'; tick = false;
  }
  addEventListener('scroll', function(){ if(!tick){ tick = true; requestAnimationFrame(upd); } }, {passive:true});
}
function renderFooter(){
  $('#foot').innerHTML =
    '<div class="shell foot-in"><div><p class="foot-h display">Say hello</p><p class="foot-email" id="emailText">'+esc(P.email)+'</p></div>' +
    '<div class="foot-actions"><button type="button" class="btn solid" data-copy>Copy email</button><ul class="links">' +
    P.links.map(function(l){ return '<li><a href="'+esc(l.href)+'" target="_blank" rel="noopener noreferrer">'+esc(l.label)+'</a></li>'; }).join('') +
    '</ul></div></div><p class="shell copy">© 2026 '+esc(P.name)+'</p>';
}
var toastEl = $('#toast'), toastT;
function toast(msg){ toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function(){ toastEl.classList.remove('on'); }, 2400); }
function copyEmail(){
  var p; try{ p = navigator.clipboard.writeText(P.email); }catch(e){ p = Promise.reject(e); }
  p.then(function(){ toast('Email copied'); }).catch(function(){
    var el = $('#emailText'), r = document.createRange(), s = window.getSelection();
    r.selectNodeContents(el); s.removeAllRanges(); s.addRange(r); el.scrollIntoView({block:'center'});
    toast('Email selected. Press Ctrl+C or Cmd+C to copy it.');
  });
}
document.addEventListener('click', function(e){ if(e.target.closest('[data-copy]')) copyEmail(); });

/* ================= Lightbox ================= */
var lb = null, lbState = {list:[], i:0, opener:null};
function buildLB(){
  var el = document.createElement('div');
  el.className = 'lb'; el.hidden = true; el.setAttribute('role','dialog'); el.setAttribute('aria-modal','true'); el.setAttribute('aria-label','Image viewer');
  el.innerHTML =
    '<div class="lb-top"><output aria-live="polite"></output><button type="button" class="lb-btn" data-a="close">Close</button></div>' +
    '<div class="lb-stage"><button type="button" class="lb-btn lb-nav prev" data-a="prev" aria-label="Previous image">&#8249;</button><img alt=""><button type="button" class="lb-btn lb-nav next" data-a="next" aria-label="Next image">&#8250;</button></div>' +
    '<div class="lb-cap"></div><div class="lb-strip" role="group" aria-label="All images"></div>';
  document.body.appendChild(el);
  lb = {el:el, img:$('img', el), out:$('output', el), cap:$('.lb-cap', el), strip:$('.lb-strip', el), stage:$('.lb-stage', el)};
  el.addEventListener('click', function(e){
    var a = e.target.closest('[data-a]'), j = e.target.closest('[data-j]');
    if(a){ var k = a.getAttribute('data-a'); if(k === 'close') closeLB(); else step(k === 'next' ? 1 : -1); }
    else if(j){ lbState.i = parseInt(j.getAttribute('data-j'), 10); showLB(); }
    else if(e.target === lb.stage){ closeLB(); }
  });
  var sx = null;
  lb.stage.addEventListener('pointerdown', function(e){ sx = e.clientX; });
  lb.stage.addEventListener('pointerup', function(e){
    if(sx === null) return; var dx = e.clientX - sx; sx = null;
    if(Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });
  document.addEventListener('keydown', function(e){
    if(el.hidden) return;
    if(e.key === 'Escape'){ closeLB(); }
    else if(e.key === 'ArrowRight'){ step(1); }
    else if(e.key === 'ArrowLeft'){ step(-1); }
    else if(e.key === 'Home'){ lbState.i = 0; showLB(); }
    else if(e.key === 'End'){ lbState.i = lbState.list.length - 1; showLB(); }
    else if(e.key === 'Tab'){
      var f = $$('button', el); if(!f.length) return;
      var first = f[0], last = f[f.length-1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });
}
function step(d){ var n = lbState.list.length; lbState.i = (lbState.i + d + n) % n; showLB(); }
function showLB(){
  var it = lbState.list[lbState.i];
  lb.img.src = it.src; lb.img.alt = it.title;
  lb.out.textContent = (lbState.i + 1) + ' / ' + lbState.list.length;
  lb.cap.innerHTML = esc(it.title) + '<span>' + esc(it.meta) + '</span>';
  $$('button', lb.strip).forEach(function(b, k){
    var on = k === lbState.i; b.setAttribute('aria-current', String(on));
    if(on) b.scrollIntoView({inline:'center', block:'nearest'});
  });
}
function openLB(list, i, opener){
  if(!lb) buildLB();
  lbState = {list:list, i:i, opener:opener};
  lb.strip.innerHTML = list.map(function(it, k){
    return '<button type="button" data-j="'+k+'" aria-label="Show '+esc(it.title)+'" aria-current="false"><img src="'+it.src+'" alt=""></button>';
  }).join('');
  lb.el.hidden = false; document.body.style.overflow = 'hidden';
  showLB(); $('[data-a="close"]', lb.el).focus();
}
function closeLB(){
  lb.el.hidden = true; document.body.style.overflow = '';
  if(lbState.opener && lbState.opener.focus) lbState.opener.focus({preventScroll:true});
}

/* ================= Pages ================= */
function pageHead(title, text){
  return '<div class="page-head"><h1 class="display">'+esc(title)+'</h1><p>'+esc(text)+'</p></div>';
}
function albumName(id){ var a = S.albums.filter(function(x){ return x.id === id; })[0]; return a ? a.name : ''; }

/* ---- Home ---- */
function renderHome(){
  var photo = S.photos[0], coll = S.collections[0];
  main.innerHTML =
  '<div class="shell"><section class="home-hero" aria-label="Introduction">' +
    '<div class="home-copy">' +
      '<h1 class="display">'+esc(P.name)+'</h1>' +
      '<p class="big">I live in San Diego, where I\'m studying electrical and computer engineering with a focus on medical imaging. Away from class, I take photographs and keep a few collections.</p>' +
      '<p>This site is where I keep all of it: my photography, my collections, my career so far, and a little about me.</p>' +
      '<div class="cta"><a class="btn solid" href="photography.html">See my photography</a><a class="btn line" href="about.html">About me</a></div>' +
    '</div>' +
    '<figure class="film"><img src="matthew-portrait.jpg" width="1200" height="1500" alt="Matthew Wang leaning on a railing in sunglasses and a white shirt, with hills and the Hollywood sign behind him">' +
      '<div class="ann tl">'+esc(P.name)+'\n'+esc(P.short)+'</div><div class="ann tr" id="clock"></div>' +
      '<div class="ann bl">M.S. ECE\nMedical imaging</div><div class="ann br">Class of 2027</div></figure>' +
  '</section></div>' +
  '<section class="band"><div class="shell band-in"><h2>Explore</h2><div class="explore">' +
    '<a class="ex photo" href="photography.html"><img src="'+srcOf(photo)+'" alt=""><h3>Photography</h3><p>Albums from my camera.</p></a>' +
    '<a class="ex coll" href="collections.html"><img src="'+srcOf(coll.items[0])+'" alt=""><h3>Collections</h3><p>Sealed Disney Lorcana and more to come.</p></a>' +
    '<a class="ex career" href="career.html"><div class="ann">Education\nM.S., ECE\n2025 to 2027</div><div><h3>Career</h3><p>Education, projects and tools.</p></div></a>' +
    '<a class="ex" href="about.html"><img src="matthew-wide.jpg" alt="" style="object-position:62% 40%"><h3>About me</h3><p>A bit more about me.</p></a>' +
  '</div></div></section>';
  function clock(){
    var t = new Intl.DateTimeFormat('en-US', {hour:'numeric', minute:'2-digit', timeZone:P.tz}).format(new Date());
    $('#clock').textContent = 'Local time\n' + t;
  }
  clock(); setInterval(clock, 20000);
}

/* ---- Photography ---- */
function renderPhotography(){
  main.innerHTML = '<div class="shell">' + pageHead('Photography', 'Frames from my camera, grouped by album.') +
    '<nav class="chips" id="chips" aria-label="Albums"></nav><p class="count" id="count" aria-live="polite"></p><div class="masonry" id="grid"></div></div>';
  var list = [];
  function draw(){
    var h = location.hash.slice(1) || 'all';
    if(h !== 'all' && !S.albums.some(function(a){ return a.id === h; })) h = 'all';
    $('#chips').innerHTML = [{id:'all', name:'All'}].concat(S.albums).map(function(a){
      return '<a class="chip" href="#'+a.id+'" aria-current="'+(a.id === h)+'">'+esc(a.name)+'</a>';
    }).join('');
    list = S.photos.filter(function(p){ return h === 'all' || p.album === h; });
    $('#count').textContent = list.length + (list.length === 1 ? ' photo' : ' photos') + (h === 'all' ? '' : ' in ' + albumName(h));
    $('#grid').innerHTML = list.map(function(p, i){
      return '<button type="button" class="tile" data-i="'+i+'" style="aspect-ratio:'+p.w+'/'+p.h+'" aria-label="Open photo: '+esc(p.title)+'">' +
        '<img src="'+srcOf(p)+'" width="'+p.w+'" height="'+p.h+'" alt="'+esc(p.title)+'" loading="lazy">' +
        '<span class="cap"><b>'+esc(p.title)+'</b><span>'+esc(albumName(p.album))+'</span></span>' + (p.src ? '' : '<span class="ph">Placeholder</span>') + '</button>';
    }).join('');
  }
  $('#grid').addEventListener('click', function(e){
    var t = e.target.closest('.tile'); if(!t) return;
    openLB(list.map(function(p){ return {src:srcOf(p), title:p.title, meta:albumName(p.album) + (p.src ? '' : ', placeholder')}; }), parseInt(t.getAttribute('data-i'), 10), t);
  });
  addEventListener('hashchange', draw); draw();
}

/* ---- Collections ---- */
function renderCollections(){
  main.innerHTML = '<div class="shell">' + pageHead('Collections', 'Things I collect, shown the way I keep them.') +
    '<nav class="chips" id="chips" aria-label="Collections"></nav><p class="count" id="count" aria-live="polite"></p><div id="colls"></div><div style="height:48px"></div></div>';
  var lists = {};
  function draw(){
    var h = location.hash.slice(1) || 'all';
    if(h !== 'all' && !S.collections.some(function(c){ return c.id === h; })) h = 'all';
    $('#chips').innerHTML = [{id:'all', name:'All'}].concat(S.collections).map(function(c){
      return '<a class="chip" href="#'+c.id+'" aria-current="'+(c.id === h)+'">'+esc(c.name)+'</a>';
    }).join('');
    var shown = S.collections.filter(function(c){ return h === 'all' || c.id === h; });
    var n = shown.reduce(function(t, c){ return t + c.items.length; }, 0);
    $('#count').textContent = shown.length + (shown.length === 1 ? ' collection' : ' collections') + ', ' + n + ' items';
    $('#colls').innerHTML = shown.map(function(c){
      lists[c.id] = c.items.map(function(it){ return {src:srcOf(it), title:it.title, meta:c.name + ', ' + it.meta}; });
      return '<section class="coll-sec" aria-labelledby="h-'+c.id+'"><div class="coll-head"><h2 id="h-'+c.id+'">'+esc(c.name)+'</h2><p>'+esc(c.blurb)+'</p></div><div class="grid">' +
        c.items.map(function(it, i){
          return '<button type="button" class="tile" data-c="'+c.id+'" data-i="'+i+'" aria-label="Open item: '+esc(it.title)+'">' +
            '<img src="'+srcOf(it)+'" alt="'+esc(it.title)+'" loading="lazy">' +
            '<span class="cap"><b>'+esc(it.title)+'</b><span>'+esc(it.meta)+'</span></span>' + (it.src ? '' : '<span class="ph">Placeholder</span>') + '</button>';
        }).join('') + '</div></section>';
    }).join('');
  }
  $('#colls').addEventListener('click', function(e){
    var t = e.target.closest('.tile'); if(!t) return;
    openLB(lists[t.getAttribute('data-c')], parseInt(t.getAttribute('data-i'), 10), t);
  });
  addEventListener('hashchange', draw); draw();
}

/* ---- Career ---- */
function timeline(items){
  return '<ul class="tl">' + items.map(function(x){
    return '<li><span class="tl-when">'+esc(x.when)+'</span><div><div class="tl-t">'+esc(x.title)+(x.sample ? '<span class="tag sample">Sample</span>' : '')+'</div>' +
      '<p class="tl-s">'+esc(x.sub)+'</p><p class="tl-n">'+esc(x.note)+'</p></div></li>';
  }).join('') + '</ul>';
}
function renderCareer(){
  var tags = [], filter = 'All';
  S.projects.forEach(function(p){ p.tags.forEach(function(t){ if(tags.indexOf(t) < 0) tags.push(t); }); });
  var usage = function(s){ return S.projects.filter(function(p){ return p.tools.indexOf(s) >= 0; }).length; };
  main.innerHTML = '<div class="shell">' + pageHead('Career', 'School, work and projects.') + '</div>' +
  '<section class="sec"><div class="shell sec-in"><div><h2>Education</h2></div><div>'+timeline(S.education)+'</div></div></section>' +
  '<section class="sec"><div class="shell sec-in"><div><h2>Work and research</h2></div><div>'+timeline(S.work)+'</div></div></section>' +
  '<section class="sec" id="projects"><div class="shell sec-in"><div><h2>Projects</h2><p class="note">Open a row for role, tools and result. Pick a tool below to filter.</p></div><div>' +
    '<div class="chips" id="pchips" role="group" aria-label="Filter projects"></div><p class="count" id="count" aria-live="polite"></p>' +
    '<ul class="plist" id="plist">' + S.projects.map(function(p){
      return '<li class="proj" data-id="'+p.id+'"><button type="button" class="proj-head" id="h-'+p.id+'" aria-expanded="false" aria-controls="d-'+p.id+'">' +
        '<span class="yr">'+esc(p.year)+'</span><span><span class="ptitle">'+esc(p.title)+'</span><span class="psum">'+esc(p.summary)+'</span></span>' +
        '<span class="ptags"><span class="tag sample">Sample</span>'+p.tags.map(function(t){ return '<span class="tag">'+esc(t)+'</span>'; }).join('')+'</span><span class="chev" aria-hidden="true"></span></button>' +
        '<div class="proj-body" id="d-'+p.id+'" role="region" aria-labelledby="h-'+p.id+'"><div class="proj-body-in"><dl><dt>Role</dt><dd>'+esc(p.role)+'</dd><dt>Tools</dt><dd>'+esc(p.toolsText)+'</dd><dt>Result</dt><dd>'+esc(p.result)+'</dd></dl></div></div></li>';
    }).join('') + '</ul><p class="empty" id="empty" hidden>No project lists that yet. <button type="button" id="clearF">Show all projects</button></p></div></div></section>' +
  '<section class="sec"><div class="shell sec-in"><div><h2>Toolkit</h2><p class="note">The number is how many projects use it. Select one to see them.</p></div><div class="groups">' +
    S.skillGroups.map(function(g){
      return '<div class="group"><h3>'+esc(g.title)+'</h3><ul>' + g.items.map(function(s){
        return '<li><button type="button" class="skill" data-skill="'+esc(s)+'"><span>'+esc(s)+'</span><b>'+usage(s)+'</b></button></li>';
      }).join('') + '</ul></div>';
    }).join('') + '</div></div></section>';

  function apply(){
    var names = ['All'].concat(tags); if(names.indexOf(filter) < 0) names.push(filter);
    $('#pchips').innerHTML = names.map(function(n){ return '<button type="button" class="chip" data-f="'+esc(n)+'" aria-pressed="'+(n === filter)+'">'+esc(n)+'</button>'; }).join('');
    var shown = 0;
    $$('.proj').forEach(function(li){
      var p = S.projects.filter(function(x){ return x.id === li.getAttribute('data-id'); })[0];
      var ok = filter === 'All' || p.tags.indexOf(filter) >= 0 || p.tools.indexOf(filter) >= 0;
      li.hidden = !ok; if(ok) shown++;
    });
    $('#count').textContent = filter === 'All' ? S.projects.length + ' projects' : 'Showing ' + shown + ' of ' + S.projects.length + ' projects for ' + filter;
    $('#empty').hidden = shown !== 0;
  }
  $('#plist').addEventListener('click', function(e){
    var hd = e.target.closest('.proj-head'); if(!hd) return;
    var li = hd.parentNode, open = !li.classList.contains('open'); li.classList.toggle('open', open); hd.setAttribute('aria-expanded', String(open));
  });
  $('#pchips').addEventListener('click', function(e){ var b = e.target.closest('[data-f]'); if(b){ filter = b.getAttribute('data-f'); apply(); } });
  $('#clearF').addEventListener('click', function(){ filter = 'All'; apply(); });
  $$('[data-skill]').forEach(function(b){
    b.addEventListener('click', function(){ filter = b.getAttribute('data-skill'); apply(); $('#projects').scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block:'start'}); });
  });
  apply();
}

/* ---- About ---- */
function renderAbout(){
  main.innerHTML = '<div class="shell">' + pageHead('About me', 'A little about who I am and what this site is for.') +
  '<figure class="wide"><img src="matthew-wide.jpg" width="1920" height="1080" alt="Matthew Wang leaning on a railing in sunglasses, with hills and the Hollywood sign behind him"></figure>' +
  '<div class="about-grid"><div><h2 class="display" style="font-size:clamp(1.5rem,2.6vw,2rem);line-height:1.1">Hi, I\'m Matthew.</h2></div><div class="about-text">' +
    '<p>I\'m Matthew Wang. I live in San Diego, where I\'m in the second year of a master\'s degree in electrical and computer engineering, on the medical imaging track.</p>' +
    '<p>I graduate in 2027. Outside of class I take photographs and keep a collection of sealed Disney Lorcana product, and this site is where I keep both, along with my career so far.</p>' +
    '<p>It is a work in progress. Pages will fill in as I add more photos, more of the collection and more of what I\'ve built.</p>' +
    '<dl class="facts"><div><dt>Lives in</dt><dd>'+esc(P.location)+'</dd></div><div><dt>Studying</dt><dd>M.S., electrical and computer engineering</dd></div>' +
    '<div><dt>Track</dt><dd>Medical imaging</dd></div><div><dt>Graduating</dt><dd>2027</dd></div>' +
    '<div><dt>Outside of class</dt><dd>Photography, collecting</dd></div><div><dt>Best way to reach me</dt><dd>Email, below</dd></div></dl>' +
    '<div class="about-links"><a class="btn solid" href="photography.html">See my photography</a><a class="btn line" href="collections.html">See my collections</a></div>' +
  '</div></div></div>';
}

renderHeader(); renderFooter();
({home:renderHome, photography:renderPhotography, collections:renderCollections, career:renderCareer, about:renderAbout})[page]();
})();
