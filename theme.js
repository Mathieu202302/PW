/* Light / dark theme. Follows the device setting until the visitor uses the switch; a choice made with the
   switch is kept for the current visit only (like the language), so the next visit starts from the device again.
   Loaded in <head> so the right colours are on screen from the first paint. */
(function(){
  var root = document.documentElement, KEY = 'theme', COLORS = {light:'#E9EDEC', dark:'#0E1315'}, subs = [];
  var mq = null; try{ mq = window.matchMedia('(prefers-color-scheme: dark)'); }catch(e){}
  function stored(){ try{ var s = sessionStorage.getItem(KEY); return (s === 'dark' || s === 'light') ? s : null; }catch(e){ return null; } }
  function system(){ return (mq && mq.matches) ? 'dark' : 'light'; }
  var meta = document.querySelector('meta[name="theme-color"]');
  if(!meta){ meta = document.createElement('meta'); meta.name = 'theme-color'; document.head.appendChild(meta); }
  function apply(){
    var m = stored() || system();
    root.setAttribute('data-theme', m);
    meta.setAttribute('content', COLORS[m]);
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
