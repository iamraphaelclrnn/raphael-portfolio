/* ==========================================================
   NAVIGATION: smooth scrolling, active section, menus, light/dark mode
   ========================================================== */
(function(){
  var root=document.getElementById('pxn'); if(!root||root.dataset.ready) return; root.dataset.ready='1';
  /* ---- light / dark theme (saved per visitor) ---- */
  var KEY='px-theme',html=document.documentElement,themeBtn=root.querySelector('.pxn-theme');
  function saved(){try{return localStorage.getItem(KEY);}catch(e){return null;}}
  function applyTheme(t){html.setAttribute('data-px-theme',t);var light=t==='light';themeBtn.setAttribute('aria-pressed',String(light));
    var lab=light?'Switch to dark mode':'Switch to light mode';themeBtn.setAttribute('aria-label',lab);themeBtn.title=lab;themeBtn.querySelector('.pxn-theme-t').textContent=light?'DARK':'LIGHT';}
  applyTheme(saved()==='light'?'light':'dark');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var curtain=root.querySelector('.pxn-curtain');
  for(var i=0;i<60;i++){var b=document.createElement('i');b.style.transitionDelay=(Math.random()*0.12).toFixed(3)+'s';curtain.appendChild(b);}
  var toggle=root.querySelector('.pxn-toggle'), panel=root.querySelector('.pxn-panel');
  var links=[].slice.call(root.querySelectorAll('a[data-target]'));
  var NAV_H=70, busy=false;
  themeBtn.addEventListener('click',function(){
    var next=html.getAttribute('data-px-theme')==='light'?'dark':'light';
    try{localStorage.setItem(KEY,next);}catch(e){}
    themeBtn.classList.remove('spin');void themeBtn.offsetWidth;themeBtn.classList.add('spin');
    if(reduce||busy){applyTheme(next);return;}
    busy=true;curtain.classList.add('on');
    setTimeout(function(){applyTheme(next);curtain.classList.remove('on');setTimeout(function(){busy=false;},260);},240);
  });

  function setPanel(open){
    panel.classList.toggle('is-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    if(open){var f=panel.querySelector('a');setTimeout(function(){f&&f.focus();},60);}
  }
  toggle.addEventListener('click',function(){setPanel(!panel.classList.contains('is-open'));});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('is-open')){setPanel(false);toggle.focus();}});
  document.addEventListener('click',function(e){if(panel.classList.contains('is-open')&&!panel.contains(e.target)&&!toggle.contains(e.target))setPanel(false);});

  function jump(el){
    var y=el.getBoundingClientRect().top+window.pageYOffset-NAV_H+2;
    window.scrollTo({top:Math.max(0,y),behavior:'auto'});
    el.setAttribute('tabindex','-1'); el.focus({preventScroll:true});
  }
  function go(id){
    var el=document.getElementById(id); if(!el) return;
    try{if(history.replaceState) history.replaceState(null,'','#'+id);}catch(err){}
    if(reduce){jump(el);return;}
    if(busy) return; busy=true;
    curtain.classList.add('on');
    setTimeout(function(){jump(el);curtain.classList.remove('on');setTimeout(function(){busy=false;},260);},260);
  }
  var more=root.querySelector('.pxn-more'),moreBtn=root.querySelector('.pxn-more-btn'),moreLinks=[].slice.call(root.querySelectorAll('.pxn-more-menu a'));
  function setMore(open,focusFirst){more.classList.toggle('open',open);moreBtn.setAttribute('aria-expanded',String(open));if(open&&focusFirst)setTimeout(function(){moreLinks[0].focus();},30);}
  moreBtn.addEventListener('click',function(){setMore(!more.classList.contains('open'));});
  moreBtn.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){e.preventDefault();setMore(true,true);}});
  more.addEventListener('keydown',function(e){var k=moreLinks.indexOf(document.activeElement);
    if(e.key==='Escape'){setMore(false);moreBtn.focus();}
    else if(k>-1&&e.key==='ArrowDown'){e.preventDefault();moreLinks[(k+1)%moreLinks.length].focus();}
    else if(k>-1&&e.key==='ArrowUp'){e.preventDefault();moreLinks[(k-1+moreLinks.length)%moreLinks.length].focus();}});
  more.addEventListener('focusout',function(e){if(!more.contains(e.relatedTarget))setMore(false);});
  document.addEventListener('click',function(e){if(!more.contains(e.target))setMore(false);});
  links.forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var t=a.dataset.target;setPanel(false);setMore(false);go(t);});});

  var map={home:'home',about:'about',advantages:'advantages',experience:'experience',works:'works',achievements:'achievements',education:'education',techstack:'techstack',skills:'skills',services:'services',testimonials:'testimonials',faq:'faq',contact:'contact'};
  function setActive(id){links.forEach(function(a){var on=a.dataset.target===id;a.classList.toggle('is-active',on);if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});more.classList.toggle('is-active',!!more.querySelector('a.is-active'));}
  function observe(){
    var secs=Object.keys(map).map(function(k){return document.getElementById(k);}).filter(Boolean);
    if(!secs.length){setTimeout(observe,400);return;}
    if(!('IntersectionObserver' in window)) return;
    var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting)setActive(map[en.target.id]);});},{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){io.observe(s);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',observe);else observe();
})();
