/* Light / dark theme. Follows the device setting until the visitor uses the switch; a choice made with the
   switch is kept for the current visit only (like the language), so the next visit starts from the device again.
   Loaded in <head> so the right colours are on screen from the first paint.
   In a browser, the switch sits in the top bar on narrow windows and at the end of the menu bar on wide ones.
   In the installed app (home-screen icon) it is in the menu list. Note for the app: iOS draws the status bar at the
   top (clock, battery) from the device setting, so a manual choice that differs from the device can leave the status
   bar text hard to read until the choice matches the device again. */
(function(){
  var root = document.documentElement, KEY = 'theme', COLORS = {light:'#E9EDEC', dark:'#0E1315'}, subs = [];
  var mq = null; try{ mq = window.matchMedia('(prefers-color-scheme: dark)'); }catch(e){}
  var app = false;
  try{ app = navigator.standalone === true || matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches; }catch(e){}
  if(app) root.setAttribute('data-app', '');
  function stored(){ try{ var s = sessionStorage.getItem(KEY); return (s === 'dark' || s === 'light') ? s : null; }catch(e){ return null; } }
  function system(){ return (mq && mq.matches) ? 'dark' : 'light'; }
  /* The page carries one theme-color tag per device setting (in the HTML, so it is there at launch). A manual
     choice points both at the chosen colour; otherwise each keeps its own. */
  var metas = [].slice.call(document.querySelectorAll('meta[name="theme-color"]'));
  if(!metas.length){ var m0 = document.createElement('meta'); m0.name = 'theme-color'; document.head.appendChild(m0); metas = [m0]; }
  function apply(){
    var o = stored(), m = o || system();
    root.setAttribute('data-theme', m);
    metas.forEach(function(el){
      var med = el.getAttribute('media') || '';
      el.setAttribute('content', o ? COLORS[o] : (/dark/.test(med) ? COLORS.dark : /light/.test(med) ? COLORS.light : COLORS[m]));
    });
    subs.forEach(function(f){ try{ f(m); }catch(e){} });
  }
  window.THEME = {
    get: function(){ return root.getAttribute('data-theme') || system(); },
    toggle: function(){
      var next = this.get() === 'dark' ? 'light' : 'dark';
      try{ sessionStorage.setItem(KEY, next); }catch(e){}
      apply();
    },
    onchange: function(f){ subs.push(f); }
  };
  if(mq){
    var follow = function(){ if(!stored()) apply(); };
    if(mq.addEventListener) mq.addEventListener('change', follow); else if(mq.addListener) mq.addListener(follow);
  }
  apply();
})();
