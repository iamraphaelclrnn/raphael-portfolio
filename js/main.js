/* ==========================================================
   MAIN: preloader, animations, galleries, video player, FAQ, EmailJS contact form
   ========================================================== */
(function(){
  if(window.__pxvBooted) return; window.__pxvBooted=true;
  var root=document.getElementById('pxv'); if(!root) return;
  var T0=performance.now();
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer=window.matchMedia('(pointer: fine)').matches;
  var isSmall=window.innerWidth<720;
  function $(s,c){return (c||root).querySelector(s);}
  function $$(s,c){return [].slice.call((c||root).querySelectorAll(s));}
  function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
  function rnd(a,b){return a+Math.random()*(b-a);}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}

  function dlUrl(src){return /res\.cloudinary\.com\/[^/]+\/image\/upload\//.test(src)?src.replace('/image/upload/','/image/upload/fl_attachment/'):src;}
  /* themed fallback for any broken image (records the URL for review) */
  root.addEventListener('error',function(e){var t=e.target;if(!t||t.tagName!=='IMG'||t.closest('.px-viewer')||t.dataset.failed)return;t.dataset.failed='1';
    if(t.classList.contains('lg')){var s=document.createElement('span');s.className='lg-code';s.textContent=t.dataset.code||'?';t.replaceWith(s);console.warn('[Raphael_Pixel] logo unavailable:',t.src);return;}
    console.warn('[Raphael_Pixel] image unavailable:',t.currentSrc||t.src);
    var f=document.createElement('div');f.className='px-imgfail';f.innerHTML='<span>IMAGE UNAVAILABLE</span>'+(t.src?'<a href="'+t.src+'" target="_blank" rel="noopener noreferrer">OPEN ORIGINAL ↗</a>':'');
    t.style.display='none';t.parentNode.insertBefore(f,t.nextSibling);},true);
  function tilt(node,max){if(!finePointer||reduce)return;node.classList.add('px-tiltable');
    node.addEventListener('pointermove',function(e){var r=node.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;node.style.setProperty('--ry',(x*max)+'deg');node.style.setProperty('--rx',(-y*max)+'deg');});
    node.addEventListener('pointerleave',function(){node.style.setProperty('--ry','0deg');node.style.setProperty('--rx','0deg');});}

  /* ---------------- PIXEL ART ---------------- */
  var PAL={K:'#101426',W:'#F4F0E8',w:'#ffffff',P:'#7756D8',p:'#5a3fb5',C:'#55E6E9',c:'#2aa9ac',G:'#89F0A0',g:'#4fb867',Y:'#FFDA78',y:'#d9a93f',R:'#FF7F91',r:'#c95264',S:'#f2c9a0',H:'#3a2a20',B:'#3a4a8a',F:'#1877f2',T:'#8a5a3a',D:'#2d6b3a',O:'#c2763a',A:'#25D366'};
  var TOP=["...HHHH...","..HHHHHH..","..HSSSSH..","..SKSSKS..","..SSSSSS..","...SRRS...","..PPPPPP..",".SPPPPPPS.",".S.PPPP.S."];
  var ART={
    walkA:TOP.concat(["...BBBB...","...B..B...","..B....B..","..KK..KK.."]),
    walkB:TOP.concat(["...BBBB...","....BB....","....BB....","....KKK..."]),
    idleA:TOP.concat(["...BBBB...","...B..B...","...B..B...","..KK..KK.."]),
    idleB:(function(){var t=TOP.slice();t[3]="..SSSSSS..";return t.concat(["...BBBB...","...B..B...","...B..B...","..KK..KK.."]);})(),
    cursor:["K.......","KK......","KWK.....","KWWK....","KWWWK...","KWWWWK..","KWWWWWK.","KWWWKKKK","KWKWK...","KK.KWK..","K...KK.."],
    star:["...YY...","...YY...","YYYYYYYY",".YYyyYY.","..YYYY..",".YY..YY.","YY....YY"],
    controller:["..PPPPPPPP..",".PPPPPPPPPP.","PPWPPPPPPYPP","PWWWPPPPYPCP","PPWPPPPPPCPP","PPPP....PPPP",".PP......PP."],
    fb:["FFFFFFFF","FFFFwwwF","FFFwFFFF","FFwwwwFF","FFFwFFFF","FFFwFFFF","FFFwFFFF","FFFwFFFF"],
    ig:["RRRRRRRR","R.....YR","R.RRRR.R","R.R..R.R","R.R..R.R","R.RRRR.R","R......R","RRRRRRRR"],
    mail:["yyyyyyyyyy","yyWWWWWWyy","yWyWWWWyWy","yWWyWWyWWy","yWWWyyWWWy","yWWWWWWWWy","yyyyyyyyyy"],
    palette:["..GGGG..",".GRGGYG.","GGGGGGCG","GPGG..GG","GGGG..G.",".GGGGG..","..GGG..."],
    bolt:["....YY..","...YY...","..YY....",".YYYYYY.","....YY..","...YY...","..YY....",".Y......"],
    calendar:[".R....R.","CCCCCCCC","CWWWWWWC","CWKWKWKC","CWWWWWWC","CWKWKWWC","CCCCCCCC"],
    rocket:["...CC...","..CWWC..","..CWWC..","..CCCC..",".PCCCCP.","PP.CC.PP","...RR...","..R..R.."],
    gear:["..C..C..",".CCCCCC.","CCC..CCC",".C....C.",".C....C.","CCC..CCC",".CCCCCC.","..C..C.."],
    heart:[".RR.RR.","RRRRRRR","RRRRRRR",".RRRRR.","..RRR..","...R..."],
    bulb:["..YYYY..",".YYYYYY.",".YYWYYY.",".YYYYYY.","..YYYY..","..CCCC..","..CCCC..","...CC..."],
    chat:["CCCCCCCC","CWWWWWWC","CWKWKWKC","CWWWWWWC","CCCCCCCC",".CC.....","C......."],
    clock:["..CCCC..",".CWWWWC.","CWWKWWWC","CWWKKKWC","CWWWWWWC",".CWWWWC.","..CCCC.."],
    lens:[".CCCC...","CWWWWC..","CWWWWC..","CWWWWC..",".CCCC...",".....Y..","......Y.",".......Y"],
    tree:["...DD...","..DGGD..",".DGGGGD.","DGGGGGGD",".DGGGGD.","DGGGGGGD","DDDDDDDD","...TT...","...TT..."],
    flag:["KYYYY.","KYYYYY","KYYYY.","K.....","K.....","K.....","KK...."],
    book:["PPPPPPPP","PWWWPWWP","PWKWPWKP","PWWWPWWP","PWKWPWKP","PWWWPWWP","PPPPPPPP"],
    phone:["KKKKKK","KCCCCK","KCCCCK","KCCCCK","KCCCCK","KKKKKK","KKWWKK","KKKKKK"],
    trophy:["Y.YYYY.Y","YYYYYYYY",".YYYYYY.","..YYYY..","...YY...","...YY...","..YYYY..",".YYYYYY."],
    cap:["....KK....","..KKKKKK..","KKKKKKKKKK","..KKKKKKY.","..KKKKK.Y.","........Y."],
    coin:[".YYYY.","YYYyYY","YYYyYY","YYYyYY","YYYyYY",".YYYY."],
    cloud:["....WWWW........","..WWWWWWWW..WW..",".WWWWWWWWWWWWWW.","WWWWWWWWWWWWWWWW","WWWWWWWWWWWWWWWW",".WWWWWWWWWWWWWW."],
    robot:["....YY....","....CC....",".CCCCCCCC.",".CWWCCWWC.",".CWKCCKWC.",".CCCCCCCC.",".CCRRRRCC.","..CCCCCC..",".PPPPPPPP.","PP.PPPP.PP",".P.P..P.P."],
    robot2:["....RR....","....CC....",".CCCCCCCC.",".CYYCCYYC.",".CYYCCYYC.",".CCCCCCCC.",".CCWRRWCC.","..CCCCCC..",".PPPPPPPP.","PP.PPPP.PP",".P.P..P.P."],
    briefcase:["...YYYY...","...Y..Y...","TTTTTTTTTT","TOOOOOOOOT","TOOOYYOOOT","TTTTTTTTTT","TOOOOOOOOT","TTTTTTTTTT"],
    bug:[".K....K.","..K..K..",".RRRRRR.","RRKRRKRR","RRRRRRRR",".RRRRRR.","R.R..R.R"],
    wa:[".AAAAAA.","AAAAAAAA","AAwwwwAA","AAwAAwAA","AAwwwwAA","AAAAAAAA",".AAAAAA.","AA......"],
    calday:[".K....K.","RRRRRRRR","WWWWWWWW","WKWKWKWW","WWWWWWWW","WKWYYWKW","WWWYYWWW","WWWWWWWW"],
    quote:["YY.YY","YY.YY",".Y..Y","Y..Y."],
    play:["K.....","KKK...","KKKKK.","KKKKKK","KKKKK.","KKK...","K....."],
    hammer:["WWWW..","WWWWT.","...T..","..T...",".T....","T....."],
    globe:["..CCCC..",".CWCCWC.","CWWCCWWC","CCCCCCCC","CWWCCWWC",".CWCCWC.","..CCCC.."],
    doc:["WWWWW..","WKKKWW.","WWWWWWW","WKKKKKW","WWWWWWW","WKKKKKW","WWWWWWW","WKKKWWW","WWWWWWW"],
    db:["..CCCC..",".CWWWWC.","CCCCCCCC","CWWWWWWC","CCCCCCCC","CWWWWWWC","CCCCCCCC",".CCCCCC."],
    palm:["..GGG.GG..",".GGGGGGGG.","GG.GTGG.GG","G...T...GG","....T.....","....T.....","...TT.....","...T......","...T......","..TTT....."],
    github:["KKKKKKKKKK","KKWKKKKWKK","KKWWWWWWKK","KWWWWWWWWK","KWWKWWKWWK","KWWWWWWWWK","KKWWWWWWKK","KKKWKKWKKK","KWWWKKWKKK","KKKKKKKKKK"],
    pixgem:["..CC..",".CWWC.","CCWCCC",".CCCC.","..CC.."]
  };
  function shadow(map,s){
    var out=[];
    for(var y=0;y<map.length;y++){for(var x=0;x<map[y].length;x++){var ch=map[y][x];if(ch!=='.'&&PAL[ch])out.push(((x+1)*s)+'px '+((y+1)*s)+'px 0 0 '+PAL[ch]);}}
    return out.join(',');
  }
  function renderArt(node){
    if(node.dataset.done) return; node.dataset.done='1';
    var names=node.dataset.art.split('|'), s=+node.dataset.size||4;
    var w=0,h=0;
    names.forEach(function(n,k){var m=ART[n];if(!m)return;h=Math.max(h,m.length);m.forEach(function(r){w=Math.max(w,r.length);});
      var i=document.createElement('i');i.className='f'+(k+1);i.style.width=s+'px';i.style.height=s+'px';i.style.left=(-s)+'px';i.style.top=(-s)+'px';i.style.boxShadow=shadow(m,s);node.appendChild(i);});
    node.style.width=(w*s)+'px';node.style.height=(h*s)+'px';
    if(names.length>1&&names[0]==='idleA'){node.classList.remove('anim');node.classList.add('blink');}
  }
  function arts(scope){$$('[data-art]',scope).forEach(renderArt);}
  function artHTML(name,size,cls){return '<span class="art '+(cls||'')+'" data-art="'+name+'" data-size="'+size+'"></span>';}
  arts(root);

  /* ---------------- PRELOADER ---------------- */
  var pre=$('#px-pre'), ready=false, readyCbs=[];
  function onReady(fn){if(ready)fn();else readyCbs.push(fn);}
  (function(){
    var html=document.documentElement, prevOv=html.style.overflow; html.style.overflow='hidden';
    var cas=$('.px-pre-cascade',pre), cov=$('.px-pre-logo .cover',pre), bar=$('.px-pre-bar',pre), stars=$('.px-pre-stars',pre), wipe=$('.px-pre-wipe',pre);
    var i,b;
    for(i=0;i<160;i++){b=el('i');b.style.animationDelay=(rnd(0,.45)).toFixed(2)+'s';cas.appendChild(b);}
    for(i=0;i<64;i++){b=el('i');b.style.animationDelay=(rnd(.1,.68)).toFixed(2)+'s';cov.appendChild(b);}
    var blocks=[];for(i=0;i<20;i++){b=el('i');bar.appendChild(b);blocks.push(b);}
    for(i=0;i<18;i++){b=el('i');b.style.left=rnd(5,95)+'%';b.style.top=rnd(5,95)+'%';b.style.animationDelay=rnd(0,1)+'s';stars.appendChild(b);}
    for(i=0;i<96;i++){b=el('i');b.style.transitionDelay=(rnd(0,.16)).toFixed(2)+'s';wipe.appendChild(b);}
    var msgs=['INITIALIZING PIXELVERSE...','LOADING CREATIVE SKILLS...','EQUIPPING DIGITAL TOOLS...'];
    var msgEl=$('.px-pre-msg',pre), pctEl=$('.px-pre-pct',pre);
    // warm the hero image while the boot runs (never blocks the timer)
    var warm=new Image();warm.src='https://res.cloudinary.com/tt2vm9rd/image/upload/v1792064667/ChatGPT_Image_Oct_15_2026_07_42_35_PM-3.png';
    function at(ms,fn){setTimeout(fn,Math.max(0,ms-(performance.now()-T0)));}
    var tick=null;
    at(700,function(){pre.classList.add('s2');
      tick=setInterval(function(){var t=performance.now()-T0;var p=Math.min(1,Math.max(0,(t-700)/1800));
        var n=Math.round(p*20);blocks.forEach(function(bk,k){bk.classList.toggle('on',k<n);});
        pctEl.textContent=Math.round(p*100)+'%';
        msgEl.textContent=msgs[Math.min(2,Math.floor(p*3))];
        if(p>=1){clearInterval(tick);} },60);});
    at(1600,function(){pre.classList.add('s3');});
    at(2500,function(){pre.classList.add('s4');pctEl.textContent='100%';blocks.forEach(function(bk){bk.classList.add('on');});});
    at(3000,function(){pre.classList.add('cover');});
    at(3320,function(){pre.classList.add('reveal');html.style.overflow=prevOv;ready=true;readyCbs.forEach(function(f){try{f();}catch(e){console.error(e);}});readyCbs=[];});
    at(3750,function(){pre.classList.add('gone');pre.setAttribute('aria-hidden','true');if(tick)clearInterval(tick);});
  })();

  /* ---------------- WORLD BACKGROUND ---------------- */
  (function(){
    var w=$('.px-world'), st=$('.stars',w), fl=$('.floaters',w), cl=$('.clouds',w), i,b;
    var nS=isSmall?28:64, nF=isSmall?4:12;
    for(i=0;i<nS;i++){b=el('i',Math.random()<.12?'b':'');b.style.left=rnd(0,100)+'%';b.style.top=rnd(0,100)+'%';b.style.animationDelay=rnd(0,3).toFixed(2)+'s';b.style.animationDuration=rnd(2,4).toFixed(2)+'s';st.appendChild(b);}
    for(i=0;i<nF;i++){b=el('i');b.style.left=rnd(0,100)+'%';b.style.animationDuration=rnd(14,26).toFixed(1)+'s';b.style.animationDelay=(-rnd(0,26)).toFixed(1)+'s';if(Math.random()<.4)b.style.background='#7756D8';fl.appendChild(b);}
    for(i=0;i<3;i++){b=el('span','cloud');b.style.top=(10+i*28)+'%';b.style.animationDuration=(70+i*25)+'s';b.style.animationDelay=(-rnd(0,70)).toFixed(0)+'s';b.innerHTML=artHTML('cloud',6+i*2);cl.appendChild(b);}
    arts(cl);
    if(reduce) return;
    var ticking=false;
    window.addEventListener('scroll',function(){if(ticking)return;ticking=true;requestAnimationFrame(function(){var y=window.pageYOffset;
      st.style.transform='translateY('+(-y*0.04)+'px)';cl.style.transform='translateY('+(-y*0.08)+'px)';w.style.setProperty('--sy',(-(y*0.15)%48)+'px');ticking=false;});},{passive:true});
  })();

  /* ---------------- CURSOR ---------------- */
  (function(){
    if(!finePointer||reduce) return;
    var c=$('.px-cursor'), tag=$('.tag',c);
    document.documentElement.classList.add('px-cursor-on');
    document.addEventListener('mousemove',function(e){c.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)';},{passive:true});
    document.addEventListener('mouseover',function(e){
      var t=e.target; if(!t.closest){return;}
      if(t.closest('input,textarea,select')){c.classList.add('hide');return;} c.classList.remove('hide');
      var d=t.closest('[data-cursor]'), label='';
      if(d) label=d.getAttribute('data-cursor');
      else if(t.closest('a')) label='OPEN';
      else if(t.closest('button,summary,[role=tab]')) label='CLICK';
      tag.textContent=label; c.classList.toggle('has-tag',!!label);
    });
    document.addEventListener('mouseleave',function(){c.classList.add('hide');});
    document.addEventListener('mouseenter',function(){c.classList.remove('hide');});
  })();

  /* ---------------- SCROLL HELPER ---------------- */
  function goTo(id,cb){var t=document.getElementById(id);if(!t)return;var y=t.getBoundingClientRect().top+window.pageYOffset-70;window.scrollTo({top:Math.max(0,y),behavior:reduce?'auto':'smooth'});if(cb)setTimeout(cb,reduce?0:700);}
  $$('[data-scroll]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();goTo(a.dataset.scroll);});});

  /* ---------------- TOASTS + HUD ---------------- */
  var toastBox=$('.px-toasts');
  function toast(top,msg){
    while(toastBox.children.length>=2) toastBox.removeChild(toastBox.firstChild);
    var t=el('div','px-toast',artHTML('trophy',3)+'<div><small>'+esc(top)+'</small>'+esc(msg)+'</div>');toastBox.appendChild(t);arts(t);
    setTimeout(function(){t.classList.add('out');setTimeout(function(){t.remove();},320);},3200);
  }
  var LEVELS=[['home','LV 01','PROFILE',0],['about','LV 02','MEET THE PLAYER',1],['advantages','LV 03','TRAITS',2],['skills','LV 04','SKILL TREE',3],['education','LV 05','ORIGIN STORY',4],['experience','LV 06','CAREER QUEST',5],['achievements','LV 07','CERTIFICATIONS',6],['techstack','LV 08','INVENTORY',7],['works','LV 09','PROJECT VAULT',8],['services','LV 10','QUESTS',9],['faq','LV 11','KNOWLEDGE',10],['testimonials','LV 12','FEEDBACK',11],['contact','FINAL','NEW QUEST',12]];
  var TOASTS={about:['ACHIEVEMENT UNLOCKED','MET RAPHAEL'],experience:['CAREER LOG FOUND','PROFESSIONAL JOURNEY'],works:['VAULT OPENED','PROJECT INVENTORY'],achievements:['NEW AREA DISCOVERED','TROPHY ROOM'],education:['LORE UNLOCKED','ORIGIN STORY'],techstack:['NEW AREA DISCOVERED','DIGITAL TOOLKIT'],skills:['NEW AREA DISCOVERED','SKILL TREE'],services:['QUEST DISCOVERED','SERVICES'],contact:['FINAL LEVEL REACHED','LET\'S COLLABORATE']};
  var hud=$('.px-hud'), segs=$('.segs',hud), seen={};
  for(var s=0;s<13;s++)segs.appendChild(el('i'));
  function setLevel(id){
    var L=LEVELS.filter(function(l){return l[0]===id;})[0]; if(!L) return;
    $('.lv',hud).textContent=L[1]; $('.nm',hud).textContent=L[2];
    [].forEach.call(segs.children,function(sg,k){sg.className=k<L[3]?'on':(k===L[3]?'cur':'');});
    if(ready&&TOASTS[id]&&!seen[id]){seen[id]=1;toast(TOASTS[id][0],TOASTS[id][1]);}
  }
  onReady(function(){hud.classList.add('show');});
  if('IntersectionObserver' in window){
    var lio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)setLevel(e.target.id);});},{rootMargin:'-45% 0px -50% 0px'});
    LEVELS.forEach(function(l){var t=document.getElementById(l[0]);if(t)lio.observe(t);});
  }

  /* ---------------- REVEAL HELPER ---------------- */
  function reveal(nodes,fn,opts){
    if(!('IntersectionObserver' in window)||reduce){nodes.forEach(function(n,i){fn(n,i);});return;}
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){io.unobserve(e.target);var i=nodes.indexOf(e.target);onReady(function(){fn(e.target,i);});}});},opts||{threshold:.18});
    nodes.forEach(function(n){io.observe(n);});
  }

  /* ---------------- HERO ---------------- */
  (function(){
    var hero=$('#home');
    var idx=0;
    $$('[data-split]',hero).forEach(function(line){
      var words=line.textContent.split(' '); line.textContent='';
      words.forEach(function(wd,wi){var w=el('span','w');wd.split('').forEach(function(ch){var c=el('span','ch');c.textContent=ch;c.style.animationDelay=(0.25+idx*0.035).toFixed(3)+'s';idx++;w.appendChild(c);});line.appendChild(w);if(wi<words.length-1)line.appendChild(document.createTextNode(' '));});
    });
    var fades=$$('.fade',hero);fades.forEach(function(f,i){f.style.transitionDelay=(i===0?0:0.9+i*0.15)+'s';});
    var parts=$('.parts',hero),stars=$('.px-hero-stars',hero),i,b;
    var cols=['#FFDA78','#55E6E9','#89F0A0','#FF7F91'];
    for(i=0;i<12;i++){b=el('i');b.style.left=rnd(0,96)+'%';b.style.top=rnd(0,96)+'%';b.style.background=cols[i%4];b.style.animationDelay=rnd(0,3).toFixed(2)+'s';b.style.animationDuration=rnd(2.4,4).toFixed(2)+'s';parts.appendChild(b);}
    for(i=0;i<16;i++){b=el('i');b.style.left=rnd(0,100)+'%';b.style.top=rnd(4,80)+'%';b.style.animationDelay=rnd(0,2.4).toFixed(2)+'s';if(i%5===0){b.style.background='#FFDA78';}stars.appendChild(b);}
    onReady(function(){hero.classList.add('on');startTyper();});
    // typer
    var words2=['SOCIAL MEDIA MANAGER','GOHIGHLEVEL VIRTUAL ASSISTANT','DIGITAL CREATIVE','WEB & AUTOMATION ENTHUSIAST'];
    var out=$('.px-typer .txt',hero);
    function startTyper(){
      var wi=0;
      if(reduce){out.textContent=words2[0];setInterval(function(){wi=(wi+1)%words2.length;out.textContent=words2[wi];},2600);return;}
      var ci=0,del=false;
      (function step(){var w=words2[wi];
        if(!del){ci++;out.textContent=w.slice(0,ci);if(ci===w.length){del=true;return setTimeout(step,1700);}return setTimeout(step,65);}
        ci--;out.textContent=w.slice(0,ci);if(ci===0){del=false;wi=(wi+1)%words2.length;return setTimeout(step,300);}setTimeout(step,28);})();
    }
    // pointer parallax
    if(finePointer&&!reduce){
      var layers=$$('.par',hero),raf=null,mx=0,my=0;
      hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5;
        if(raf)return;raf=requestAnimationFrame(function(){layers.forEach(function(l){var d=+l.dataset.depth||8;l.style.transform='translate('+(-mx*d)+'px,'+(-my*d)+'px)';});stars.style.transform='translate('+(mx*14)+'px,'+(my*10)+'px)';raf=null;});});
      hero.addEventListener('pointerleave',function(){layers.forEach(function(l){l.style.transform='';});stars.style.transform='';});
    }
    // easter egg
    var egg=$('.px-egg',hero),clicks=0,timer=null,busy=false;
    egg.addEventListener('click',function(){
      if(busy)return; clicks++; clearTimeout(timer); timer=setTimeout(function(){clicks=0;},1800);
      egg.style.transform='rotate('+(clicks%2?-12:12)+'deg)';setTimeout(function(){egg.style.transform='';},120);
      if(clicks<5)return; clicks=0;busy=true;
      var pop=el('div','px-secret','SECRET LEVEL FOUND!<br>+1 UP · YOU FOUND THE CONTROLLER');pop.setAttribute('role','status');document.body.appendChild(pop);
      var n=reduce?0:26;for(var k=0;k<n;k++){(function(k){var c=el('span','px-coin',artHTML('coin',4));c.style.left=rnd(2,96)+'vw';c.style.animationDelay=(k*0.05).toFixed(2)+'s';document.body.appendChild(c);arts(c);setTimeout(function(){c.remove();},2600+k*50);})(k);}
      $('.px-hero-copy',hero).classList.add('jump');
      setTimeout(function(){pop.remove();$('.px-hero-copy',hero).classList.remove('jump');busy=false;},2800);
    });
  })();

  /* ---------------- MODAL CORE ---------------- */
  var lockCount=0,lockPrev='';
  function lock(on){var h=document.documentElement;if(on){if(lockCount++===0){lockPrev=h.style.overflow;h.style.overflow='hidden';}}else if(lockCount>0&&--lockCount===0){h.style.overflow=lockPrev;}}
  function focusables(m){return $$('button,a[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',m).filter(function(x){return x.offsetParent!==null&&!x.disabled;});}
  function openModal(m,onKey){
    m._last=document.activeElement; m.classList.add('open'); lock(true);
    m._key=function(e){
      if(e.key==='Escape'){e.preventDefault();closeModal(m);return;}
      if(e.key==='Tab'){var f=focusables(m);if(!f.length)return;var a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();}}
      if(onKey)onKey(e);
    };
    document.addEventListener('keydown',m._key);
    setTimeout(function(){if(!m.classList.contains('open'))return;var b=m.querySelector('.px-ib.x')||focusables(m)[0];if(b)b.focus();},30);
  }
  function closeModal(m){if(!m.classList.contains('open'))return;m.classList.remove('open');lock(false);document.removeEventListener('keydown',m._key);if(m._onClose)m._onClose();if(m._last&&m._last.focus)m._last.focus();}
  $$('.px-modal').forEach(function(m){$$('[data-close]',m).forEach(function(b){b.addEventListener('click',function(){closeModal(m);});});});

  /* ---------------- VIEWER (zoom / pan / pinch / swipe) ---------------- */
  var V=(function(){
    var m=$('#px-viewer'),stage=$('.stage',m),img=$('img',stage),loading=$('.loading',stage),title=$('.t',m),count=$('.count',m),dlA=$('.dl',m),origA=$('.orig',m);
    var items=[],i=0,s=1,x=0,y=0,label='';
    function apply(){img.style.transform='translate(-50%,-50%) translate('+x+'px,'+y+'px) scale('+s+')';}
    function clampPan(){var sw=stage.clientWidth,sh=stage.clientHeight,iw=img.offsetWidth*s,ih=img.offsetHeight*s;var mx=Math.max(0,(iw-sw)/2+20),my=Math.max(0,(ih-sh)/2+20);x=Math.min(mx,Math.max(-mx,x));y=Math.min(my,Math.max(-my,y));}
    function zoomAt(ns,cx,cy){ns=Math.min(6,Math.max(1,ns));var r=ns/s;x=cx-(cx-x)*r;y=cy-(cy-y)*r;s=ns;if(s===1){x=0;y=0;}clampPan();apply();}
    function center(e){var r=stage.getBoundingClientRect();return [e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2];}
    function show(){var it=items[i];s=1;x=0;y=0;apply();loading.style.display='grid';img.style.opacity='0';
      img.onload=function(){loading.style.display='none';img.style.opacity='1';};img.onerror=function(){loading.innerHTML='IMAGE COULD NOT LOAD<br><br><a class="px-mini" href="'+it.src+'" target="_blank" rel="noopener noreferrer">OPEN ORIGINAL ↗</a>';console.warn('[Raphael_Pixel] image unavailable:',it.src);};
      img.src=it.src;img.alt=it.alt;title.textContent=it.title;count.textContent=' '+(i+1)+' / '+items.length;loading.textContent='LOADING...';dlA.href=dlUrl(it.src);dlA.style.display=it.noDl?'none':'';origA.href=it.src;
      [].forEach.call(m.querySelectorAll('.nav'),function(n){n.style.display=items.length>1?'':'none';});}
    function go(d){i=(i+d+items.length)%items.length;show();}
    $$('[data-act]',m).forEach(function(b){b.addEventListener('click',function(){var a=b.dataset.act;
      if(a==='in')zoomAt(s*1.5,0,0);else if(a==='out')zoomAt(s/1.5,0,0);else if(a==='reset')zoomAt(1,0,0);else if(a==='prev')go(-1);else if(a==='next')go(1);});});
    stage.addEventListener('wheel',function(e){e.preventDefault();var c=center(e);zoomAt(s*(e.deltaY<0?1.2:1/1.2),c[0],c[1]);},{passive:false});
    stage.addEventListener('dblclick',function(e){var c=center(e);zoomAt(s>1?1:2.5,c[0],c[1]);});
    var ptr={},startD=0,startS=1,last=null,swipeX=0,swipeStart=null;
    function dist(){var p=Object.keys(ptr).map(function(k){return ptr[k];});return Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);}
    stage.addEventListener('pointerdown',function(e){if(e.target.closest('.nav'))return;stage.setPointerCapture(e.pointerId);ptr[e.pointerId]={x:e.clientX,y:e.clientY};
      var n=Object.keys(ptr).length;if(n===2){startD=dist();startS=s;stage.classList.add('pinch');}else{last={x:e.clientX,y:e.clientY};swipeStart=e.clientX;stage.classList.add('drag');}});
    stage.addEventListener('pointermove',function(e){if(!ptr[e.pointerId])return;ptr[e.pointerId]={x:e.clientX,y:e.clientY};var n=Object.keys(ptr).length;
      if(n===2&&startD){var p=Object.keys(ptr).map(function(k){return ptr[k];});var mid={clientX:(p[0].x+p[1].x)/2,clientY:(p[0].y+p[1].y)/2};var c=center(mid);zoomAt(startS*dist()/startD,c[0],c[1]);return;}
      if(n===1&&last){if(s>1){x+=e.clientX-last.x;y+=e.clientY-last.y;clampPan();apply();}last={x:e.clientX,y:e.clientY};}});
    function up(e){if(!ptr[e.pointerId])return;delete ptr[e.pointerId];var n=Object.keys(ptr).length;
      if(n<2){startD=0;stage.classList.remove('pinch');}
      if(n===0){stage.classList.remove('drag');if(s===1&&swipeStart!=null&&items.length>1){var dx=e.clientX-swipeStart;if(Math.abs(dx)>60)go(dx<0?1:-1);}last=null;swipeStart=null;}
      else{var k=Object.keys(ptr)[0];last={x:ptr[k].x,y:ptr[k].y};swipeStart=null;}}
    stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
    window.addEventListener('resize',function(){if(m.classList.contains('open')){clampPan();apply();}});
    m._onClose=function(){img.removeAttribute('src');};
    return {open:function(list,idx){items=list;i=idx;show();openModal(m,function(e){if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1);else if(e.key==='+'||e.key==='=')zoomAt(s*1.5,0,0);else if(e.key==='-')zoomAt(s/1.5,0,0);});}};
  })();

  /* ---------------- ABOUT: PHOTO CARDS ---------------- */
  (function(){
    var box=$('#px-cards'),cards=$$('.px-card',box);
    var photos=cards.map(function(c,k){var im=$('img',c);return {src:im.src,alt:im.alt,title:'PHOTO CARD 0'+(k+1)};});
    cards.forEach(function(c,k){c.setAttribute('data-cursor','VIEW');c.addEventListener('click',function(){V.open(photos,k);});});
    reveal(cards,function(c,i){c.style.animationDelay=(i*0.14)+'s';c.classList.add('in');});
    if(finePointer&&!reduce){var depth=[14,-10,8,-16],raf=null;
      box.addEventListener('pointermove',function(e){var r=box.getBoundingClientRect(),mx=(e.clientX-r.left)/r.width-.5,my=(e.clientY-r.top)/r.height-.5;if(raf)return;
        raf=requestAnimationFrame(function(){cards.forEach(function(c,k){c.style.setProperty('--mx',(mx*depth[k])+'px');c.style.setProperty('--my',(my*depth[k])+'px');});raf=null;});});
      box.addEventListener('pointerleave',function(){cards.forEach(function(c){c.style.setProperty('--mx','0px');c.style.setProperty('--my','0px');});});}
  })();

  /* ---------------- ADVANTAGES ---------------- */
  reveal([$('.px-adv')],function(){$$('.px-trait').forEach(function(t,i){t.style.animationDelay=(i*0.15)+'s';$$('.meter i',t).forEach(function(m,k){m.style.animationDelay=(i*0.15+0.7+k*0.1)+'s';});t.classList.add('in');});},{threshold:.1});

  /* ---------------- CERTIFICATES: TROPHY CASE ---------------- */
  (function(){
    var C='https://res.cloudinary.com/tt2vm9rd/image/upload/';
    var certs=[['GoHighLevel Expert','v1788223765/ghl.png'],['Social Media Management','v1788238923/SMM.png'],['Data Entry','v1789178337/Raphael_Robin_Calaranan.png'],['Google Analytics','v1788223061/google.png'],['HTML & CSS','v1788223062/ht.png'],['Databases','v1788223062/Screenshot_2024-09-04_033547.png'],['Mobile Application Concept','v1788516882/app.png'],['Best in Expo','v1788516882/expo.png'],['UI/UX','v1788516882/ui.png']];
    var list=certs.map(function(c){return {title:c[0],src:C+c[1],alt:'Certificate or award: '+c[0]};});
    var wrap=$('#px-certs'),n=list.length,cur=0,busy=false;
    var tabs=list.map(function(c,k){return '<button type="button" role="tab" id="px-acht'+k+'" aria-controls="px-ach-stage" aria-selected="'+(k===0)+'" tabindex="'+(k===0?0:-1)+'"><span class="ix">#0'+(k+1)+'</span><span class="nm">'+esc(c.title)+'</span><span class="gem" aria-hidden="true"></span></button>';}).join('');
    var blocks='';for(var q=0;q<40;q++)blocks+='<i style="transition-delay:'+(Math.random()*0.14).toFixed(2)+'s"></i>';
    var dots='';for(q=0;q<n;q++)dots+='<i></i>';
    wrap.innerHTML='<div class="px-ach"><div class="px-ach-list" role="tablist" aria-label="Certificates" aria-orientation="vertical">'+tabs+'</div>'+
      '<div class="px-ach-stage pbox" id="px-ach-stage" role="tabpanel">'+
        '<div class="top"><span class="ctr"></span><span class="badge">'+artHTML('trophy',2)+' UNLOCKED</span></div>'+
        '<button type="button" class="shot" data-cursor="INSPECT"><img src="'+list[0].src+'" alt="'+esc(list[0].alt)+'" loading="lazy" width="800" height="600"><span class="wipe" aria-hidden="true">'+blocks+'</span><span class="tip" aria-hidden="true">CLICK TO INSPECT</span><span class="burst" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span></button>'+
        '<div class="nav"><button type="button" class="px-ib prev" aria-label="Previous certificate">◀</button><h3 class="ttl"></h3><button type="button" class="px-ib next" aria-label="Next certificate">▶</button></div>'+
        '<div class="row"><div class="dots" aria-hidden="true">'+dots+'</div><div class="acts"><button type="button" class="px-mini insp">⛶ INSPECT</button><a class="px-mini ghost dlc" href="#" download>⤓ DOWNLOAD</a></div></div>'+
      '</div></div>';
    arts(wrap);
    var root2=$('.px-ach',wrap),btns=$$('[role=tab]',wrap),stage=$('.px-ach-stage',wrap),shot=$('.shot',stage),img=$('img',shot),ttl=$('.ttl',stage),ctr=$('.ctr',stage),dl=$('.dlc',stage),dotEls=$$('.dots i',stage);
    function paint(k){var it=list[k];
      img.style.display='';var fb=shot.querySelector('.px-imgfail');if(fb)fb.remove();delete img.dataset.failed;
      img.src=it.src;img.alt=it.alt;ttl.textContent=it.title;ctr.textContent='ACHIEVEMENT 0'+(k+1)+' / 0'+n;dl.href=dlUrl(it.src);dl.setAttribute('aria-label','Download '+it.title+' certificate');
      shot.setAttribute('aria-label','Inspect '+it.title+' certificate full screen');stage.setAttribute('aria-labelledby','px-acht'+k);
      dotEls.forEach(function(d,j){d.className=j<k?'on':(j===k?'cur':'');});
      btns.forEach(function(b,j){var on=j===k;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;});
      var act=btns[k];if(act&&act.parentNode.scrollWidth>act.parentNode.clientWidth){act.parentNode.scrollTo({left:act.offsetLeft-20,behavior:reduce?'auto':'smooth'});}}
    function show(k,focus){k=(k+n)%n;if(k===cur||busy){if(focus)btns[k].focus();return;}cur=k;if(focus)btns[k].focus();
      if(reduce){paint(k);return;}
      busy=true;shot.classList.add('cover');
      setTimeout(function(){paint(k);shot.classList.remove('cover');shot.classList.remove('pop');void shot.offsetWidth;shot.classList.add('pop');setTimeout(function(){busy=false;},260);},220);}
    btns.forEach(function(b,k){b.addEventListener('click',function(){show(k);});
      b.addEventListener('keydown',function(e){var m=null;if(e.key==='ArrowDown'||e.key==='ArrowRight')m=k+1;else if(e.key==='ArrowUp'||e.key==='ArrowLeft')m=k-1;else if(e.key==='Home')m=0;else if(e.key==='End')m=n-1;if(m!=null){e.preventDefault();show(m,true);}});});
    $('.prev',stage).addEventListener('click',function(){show(cur-1);});$('.next',stage).addEventListener('click',function(){show(cur+1);});
    shot.addEventListener('click',function(){V.open(list,cur);});$('.insp',stage).addEventListener('click',function(){V.open(list,cur);});
    var sx=null;shot.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')sx=e.clientX;});
    shot.addEventListener('pointerup',function(e){if(sx==null)return;var dx=e.clientX-sx;sx=null;if(Math.abs(dx)>50){e.preventDefault();show(dx<0?cur+1:cur-1);shot.dataset.swiped='1';setTimeout(function(){delete shot.dataset.swiped;},50);}});
    shot.addEventListener('click',function(e){if(shot.dataset.swiped){e.stopImmediatePropagation();}},true);
    paint(0);
    reveal([root2],function(){root2.classList.add('in');btns.forEach(function(b,k){b.style.animationDelay=(k*0.06)+'s';});},{threshold:.15});
  })();

  /* ---------------- EDUCATION ---------------- */
  reveal([$('#px-edu')],function(e){e.classList.add('in');},{threshold:.25});

  /* ---------------- TECH STACK ---------------- */
  var SERVICES_LIST;
  (function(){
    var CATS=[
      {id:'web',tab:'WEB DEVELOPMENT',color:'#55E6E9',deco:['gear','book'],note:'Languages, frameworks, and habits for building on the web.',items:[
        ['HTML5','Markup language','Structures the content of every web page.','Page layouts and custom code blocks for funnels and sites.','H5'],
        ['CSS3','Styling language','Controls layout, color, typography, and animation on the web.','Styling landing pages and custom sections.','C3'],
        ['JavaScript','Programming language','Adds interactivity and logic to web pages.','Interactive elements, form behavior, and small scripts.','JS'],
        ['TypeScript','Typed superset of JavaScript','Adds type checking to JavaScript for safer, clearer code.','Bigger front end projects that need fewer bugs.','TS'],
        ['Python','Programming language','An easy to read language for scripts and working with data.','Automating repetitive tasks and handling data.','PY'],
        ['PHP','Server language','Runs on the server to build dynamic websites.','Understanding and editing websites built with PHP.','PHP'],
        ['SQL','Database query language','Reads, filters, and organizes data stored in databases.','Pulling and cleaning records for reports.','SQL'],
        ['React','JavaScript library','Builds interfaces out of reusable components.','Web apps and interactive pages built from reusable parts.','RE'],
        ['Tailwind CSS','CSS framework','Utility classes for styling quickly and consistently.','Fast page styling with a consistent design system.','TW'],
        ['Git & GitHub','Version control','Tracks changes to code and supports collaboration.','Keeping project history and sharing code safely.','GIT'],
        ['Responsive Web Design','Design practice','Makes layouts adapt to phones, tablets, and desktops.','Pages that work well on any screen.','RWD'],
        ['REST APIs','Integration standard','A common way for apps to send and request data.','Connecting tools and passing data between platforms.','API']]},
      {id:'social',tab:'SOCIAL MEDIA',color:'#FF7F91',deco:['chat','heart'],note:'Tools for planning, scheduling, posting, chatting with followers, and checking results.',items:[
        ['Meta Business Suite','Social management','Manages Facebook and Instagram pages, posts, and inboxes in one place.','Scheduling posts and replying to messages.','MBS'],
        ['Facebook Ads Manager','Advertising','Creates, targets, and tracks Facebook and Instagram ads.','Setting up and monitoring paid campaigns.','ADS'],
        ['Instagram Professional Tools','Social platform','Insights and features for creator and business accounts.','Tracking reach and engagement on Instagram.','IG'],
        ['TikTok','Social platform','A short video platform for reaching new audiences.','Publishing and testing short video content.','TT'],
        ['TikTok Business Center','Business management','Manages TikTok ad accounts, assets, and team access.','Organizing brand accounts and permissions.','TBC'],
        ['LinkedIn','Social platform','Professional network for B2B content and outreach.','Building a professional brand presence.','IN'],
        ['Canva','Design tool','Fast graphic design with templates and brand kits.','Post graphics, carousels, and stories.','CV'],
        ['Buffer','Scheduling','Plans and schedules posts across channels.','Keeping a consistent posting calendar.','BUF'],
        ['Hootsuite','Social management','Schedules posts and monitors multiple accounts.','Managing several brands from one dashboard.','HS'],
        ['Later','Scheduling','A visual content planner, especially for Instagram.','Planning how an Instagram grid will look.','LTR'],
        ['Metricool','Analytics & planning','Combines scheduling with performance analytics.','Reporting on social results over time.','MC'],
        ['Google Analytics','Web analytics','Measures website traffic and visitor behavior.','Seeing which posts send people to a website.','GA'],
        ['Google Trends','Research','Shows what people are searching for over time.','Finding timely content ideas.','GT'],
        ['Google Sheets','Spreadsheets','Shared spreadsheets that live in the cloud.','Content calendars and simple reports.','GS'],
        ['Trello','Project management','Boards and cards for tracking tasks visually.','Moving content from idea to published.','TRL'],
        ['Notion','Workspace','Notes, docs, and databases in one place.','Content libraries, SOPs, and planning.','NT']]},
      {id:'ghl',tab:'GOHIGHLEVEL',color:'#89F0A0',deco:['bolt','calendar'],note:'Features inside GoHighLevel. They are all part of one platform, not separate apps.',items:[
        ['CRM & Contact Management','Stores every lead and customer along with their history.','Keeping contact records clean and searchable.','CRM'],
        ['Pipelines & Opportunities','Tracks deals through stages from lead to sale.','Seeing where each lead stands.','PIP'],
        ['Workflow Automation','Runs actions automatically when something happens.','Followups and internal tasks that run on their own.','WF'],
        ['Forms & Surveys','Collects information from visitors.','Lead capture and intake questionnaires.','FRM'],
        ['Landing Pages & Funnels','Builds pages that guide visitors toward one action.','Sign up pages and sales funnels.','FNL'],
        ['Website Builder','Builds full websites inside GoHighLevel.','Business sites connected to the CRM.','WEB'],
        ['Calendars & Appointment Booking','Lets people book time directly.','Booking consultations and calls.','CAL'],
        ['Email Marketing','Sends campaigns and newsletters.','Broadcasts and nurture emails.','EM'],
        ['SMS Automation','Sends automated text messages.','Reminders and quick check ins.','SMS'],
        ['Conversations & Unified Inbox','One inbox for SMS, email, chat, and social messages.','Replying to leads from a single place.','INB'],
        ['AI Chatbots','Automated chat replies on websites and messaging channels.','Answering common questions instantly.','BOT'],
        ['AI Voice Agents','AI that answers and handles phone calls.','Call intake outside business hours.','VOX'],
        ['Reputation Management','Requests and monitors customer reviews.','Asking happy customers for reviews.','REP'],
        ['Memberships & Courses','Hosts gated content and online courses.','Delivering training or member content.','MEM'],
        ['Reporting & Analytics','Dashboards for leads, calls, and campaigns.','Checking what is working.','RPT'],
        ['Triggers & Webhooks','Starts automations from events or outside apps.','Connecting GoHighLevel to other tools.','HK'],
        ['Integrations','Connects GoHighLevel with other apps.','Syncing data across the tech stack.','INT'],
        ['Tags & Custom Fields','Labels and extra data stored on contacts.','Segmenting audiences precisely.','TAG'],
        ['Lead Nurturing','Regular, friendly contact that keeps leads warm.','Moving leads toward booking or buying.','NUR'],
        ['Campaign Management','Plans and runs marketing campaigns with several steps.','Coordinating emails, texts, and offers.','CMP']].map(function(r){return [r[0],'GoHighLevel capability',r[1],r[2],r[3]];})},
      {id:'creative',tab:'CREATIVE TOOLS',color:'#FFDA78',deco:['palette','star'],note:'Software for designing graphics and editing photos and videos.',items:[
        ['Canva','Design tool','Templates and simple drag and drop design.','Social graphics and quick marketing assets.','CV'],
        ['Adobe Photoshop','Image editing','Professional photo editing and compositing.','Retouching and detailed graphics.','PS'],
        ['Adobe Illustrator','Vector design','Creates scalable vector artwork.','Logos, icons, and illustrations.','AI'],
        ['Adobe Premiere Pro','Video editing','Professional video editing on a timeline.','Longer edits and polished videos.','PR'],
        ['Adobe After Effects','Motion graphics','Animation and visual effects for video.','Animated titles and motion graphics.','AE'],
        ['Adobe Lightroom','Photo editing','Color grading and batch photo edits.','Consistent looks across photo sets.','LR'],
        ['CapCut','Video editing','Quick edits for short videos, right on your phone.','Reels and TikTok edits.','CC'],
        ['Figma','Interface design','Collaborative UI design and prototyping.','Mockups for pages and apps.','FG'],
        ['DaVinci Resolve','Video editing','Editing with advanced color correction.','Video projects that need careful color work.','DR'],
        ['Adobe Express','Design tool','Quick graphics and simple videos.','Fast promotional content.','AX'],
        ['Photopea','Image editing','A free editor that works like Photoshop, right in the browser.','Quick edits without installing software.','PP'],
        ['OBS Studio','Recording & streaming','Records screens and streams live video.','Tutorials and screen recordings.','OBS']]}
    ];

    /* ---- official logos: Devicon (full colour), Simple Icons (inline, brand colour), site favicons for brands neither set covers ---- */
    var DV='https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/';
    var SI={"meta":["0467DF","M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"],"instagram":["FF0069","M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"],"tiktok":["000000","M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"],"buffer":["231F20","M1.371 5.476L11.943 0l10.686 5.476-10.686 5.495zm3.36 4.81l7.212 3.547 7.288-3.547 3.398 1.655-10.686 5.202L1.371 11.94zm0 6.171l7.212 3.911 7.288-3.91 3.398 1.815L11.943 24 1.371 18.273z"],"hootsuite":["FF4C46","M11.417 11.14c.505.75.28 1.572-.38 2.017-.66.444-1.505.343-2.01-.407-.506-.75-.282-1.572.378-2.017.66-.444 1.506-.343 2.012.407zm5.017-.274c-.66.444-.884 1.266-.379 2.016.506.75 1.352.852 2.012.407.66-.444.884-1.266.379-2.016-.506-.75-1.352-.852-2.012-.407zm7.422-7.086L19.03 6.638l.236.272c2.224 2.613 3.591 6.409 4.247 8.606a4.362 4.362 0 0 1-.638 3.8C21.449 21.295 18.398 24 12.369 24c-6.58 0-10-3.25-11.644-5.251a3.117 3.117 0 0 1-.51-3.067c.909-2.444 2.766-7.126 4.257-8.825a13.158 13.158 0 0 1 2.897-2.478L2.4.534c-.27-.208-.034-.632.285-.513l8.077 3.006c.38-.066.758-.1 1.13-.1 1.407 0 2.737.307 4.074 1.084l7.744-.695c.266-.024.378.331.147.464zm-8.218 13.656a4.126 4.126 0 0 1-3.316-.232c-.073-.037-.143.055-.087.115.457.49 1.273 1.35 1.766 1.775.102.088.259.077.35-.023l1.369-1.512c.053-.059-.008-.15-.082-.123zm.24-1.156-1.796-2.018a.34.34 0 0 0-.513.008l-1.44 1.716a.18.18 0 0 0 .031.262c.333.239 1.148.76 1.942.76.734 0 1.402-.285 1.724-.447a.18.18 0 0 0 .052-.281zm1.616-8.409c-.3-.034-.603.035-.862.188l-1.808 1.07c-.45.268-1.02.231-1.432-.091L11.819 7.82a4.669 4.669 0 0 0-1.776-.858c-2.698-.638-4.532.78-5.914 3.44-1.32 2.539-.583 6.184 2.672 7.05 3.438.914 5.71-2.903 6.618-4.175a.439.439 0 0 1 .712-.002c1.408 1.916 3.306 3.968 5.34 3.557 2.656-.535 2.342-3.905 1.512-5.7-.735-1.588-1.83-3.074-3.49-3.262z"],"googleanalytics":["E37400","M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z"],"googlesheets":["34A853","M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.91h3.41v-1.91zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5h6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z"],"davinciresolve":["233A51","M17.621 0 5.977.004c-1.37 0-2.756.345-3.762 1.11a4.925 4.925 0 0 0-1.61 2.003C.233 3.93 0 5.02 0 5.951l.012 12.2c.002 1.604.479 3.057 1.461 4.112.984 1.056 2.462 1.683 4.331 1.691L16.856 24c1.26.005 3.095-.036 4.303-.714 1.075-.605 2.025-1.556 2.497-2.984.278-.84.345-2.084.344-3.147l-.021-11.13c-.002-.888-.15-2.023-.547-2.934-.425-.976-1.181-1.815-2.322-2.425C20.353.26 19.123 0 17.622 0zm0 .93c1.378 0 2.538.295 3.04.565.977.523 1.544 1.166 1.889 1.96.315.721.47 1.793.473 2.572l.018 11.13c.002 1.013-.097 2.257-.298 2.86-.396 1.202-1.146 1.946-2.063 2.462-.814.457-2.612.593-3.82.588l-11.05-.044c-1.657-.007-2.832-.534-3.626-1.386-.792-.851-1.212-2.06-1.212-3.485L.999 5.95c0-.829.196-1.827.474-2.437.345-.757.75-1.207 1.365-1.674C3.585 1.27 4.868.97 6.08.97zm-5.66 3.423c-1.976.089-3.204 1.658-3.214 3.29.019 1.443 1.635 3.481 2.884 4.53.12.099.154.109.33.18.062.025.198-.047.327-.135.36-.245.993-.947 1.648-1.738a7.67 7.67 0 0 0 1.031-1.683c.409-.89.261-1.599.235-1.888a3.983 3.983 0 0 0-.99-1.692 3.36 3.36 0 0 0-2.251-.864zm4.172 7.922a10.185 10.185 0 0 0-3.244.61c-.15.058-.26.1-.374.17-.057.036-.11.135-.105.292.017.433.29 1.278.624 2.27.384 1.135 1.066 2.27 1.844 2.74a3.23 3.23 0 0 0 2.53.342c.832-.243 1.595-.868 1.962-1.546.986-1.818.19-3.548-1.121-4.417-.447-.296-1.133-.445-1.89-.46-.074 0-.15-.002-.226-.001zm-8.432.038a6.201 6.201 0 0 0-.752.047c-.596.078-.932.273-1.29.51a3.177 3.177 0 0 0-1.365 1.979c-.075.552-.086 1.053.033 1.507.433 1.389 1.326 2.222 2.847 2.452.636.028 1.37-.063 1.99-.45 1.269-.782 2.08-3.17 2.412-4.742.053-.176.035-.357-.013-.42-.005-.067-.044-.113-.19-.183-.398-.192-1.32-.417-2.375-.6a7.68 7.68 0 0 0-1.297-.1z"],"photopea":["18A497","M20.098 0A3.899 3.899 0 0 1 24 3.903v16.194A3.899 3.899 0 0 1 20.098 24H6.393l-.051-10.34v-.074c0-3.92 3.112-7.09 6.963-7.09 2.31 0 4.177 1.902 4.177 4.254 0 2.352-1.867 4.254-4.177 4.254-.77 0-1.393-.634-1.393-1.418 0-.783.623-1.418 1.393-1.418.769 0 1.392-.634 1.392-1.418 0-.784-.623-1.418-1.392-1.418-2.31 0-4.178 1.9-4.178 4.253 0 2.352 1.868 4.254 4.178 4.254 3.85 0 6.962-3.169 6.962-7.09 0-3.92-3.112-7.089-6.962-7.089-5.39 0-9.75 4.436-9.75 9.925v.086l.023 10.315A3.899 3.899 0 0 1 0 20.097V3.903A3.899 3.899 0 0 1 3.902 0z"],"obsstudio":["302E31","M12,24C5.383,24,0,18.617,0,12S5.383,0,12,0s12,5.383,12,12S18.617,24,12,24z M12,1.109 C5.995,1.109,1.11,5.995,1.11,12C1.11,18.005,5.995,22.89,12,22.89S22.89,18.005,22.89,12C22.89,5.995,18.005,1.109,12,1.109z M6.182,5.99c0.352-1.698,1.503-3.229,3.05-3.996c-0.269,0.273-0.595,0.483-0.844,0.78c-1.02,1.1-1.48,2.692-1.199,4.156 c0.355,2.235,2.455,4.06,4.732,4.028c1.765,0.079,3.485-0.937,4.348-2.468c1.848,0.063,3.645,1.017,4.7,2.548 c0.54,0.799,0.962,1.736,0.991,2.711c-0.342-1.295-1.202-2.446-2.375-3.095c-1.135-0.639-2.529-0.802-3.772-0.425 c-1.56,0.448-2.849,1.723-3.293,3.293c-0.377,1.25-0.216,2.628,0.377,3.772c-0.825,1.429-2.315,2.449-3.932,2.756 c-1.244,0.261-2.551,0.059-3.709-0.464c1.036,0.302,2.161,0.355,3.191-0.011c1.381-0.457,2.522-1.567,3.024-2.935 c0.556-1.49,0.345-3.261-0.591-4.54c-0.7-1.007-1.803-1.717-3.002-1.969c-0.38-0.068-0.764-0.098-1.148-0.134 c-0.611-1.231-0.834-2.66-0.528-3.996L6.182,5.99z"]};
    var LOGO={
      'HTML5':['dv','html5/html5-original'],'CSS3':['dv','css3/css3-original'],'JavaScript':['dv','javascript/javascript-original'],'TypeScript':['dv','typescript/typescript-original'],
      'Python':['dv','python/python-original'],'PHP':['dv','php/php-original'],'SQL':['px','db'],'React':['dv','react/react-original'],'Tailwind CSS':['dv','tailwindcss/tailwindcss-original'],
      'Git & GitHub':['dv','git/git-original'],'Responsive Web Design':['px','phone'],'REST APIs':['px','gear'],
      'Meta Business Suite':['si','meta'],'Facebook Ads Manager':['dv','facebook/facebook-original'],'Instagram Professional Tools':['si','instagram'],'TikTok':['si','tiktok'],'TikTok Business Center':['si','tiktok'],
      'LinkedIn':['dv','linkedin/linkedin-original'],'Canva':['dv','canva/canva-original'],'Buffer':['si','buffer'],'Hootsuite':['si','hootsuite'],'Later':['fav','later.com'],'Metricool':['fav','metricool.com'],
      'Google Analytics':['si','googleanalytics'],'Google Trends':['fav','trends.google.com'],'Google Sheets':['si','googlesheets'],'Trello':['dv','trello/trello-original'],'Notion':['dv','notion/notion-original'],
      'Adobe Photoshop':['dv','photoshop/photoshop-original'],'Adobe Illustrator':['dv','illustrator/illustrator-original'],'Adobe Premiere Pro':['dv','premierepro/premierepro-original'],'Adobe After Effects':['dv','aftereffects/aftereffects-original'],
      'Adobe Lightroom':['fav','lightroom.adobe.com'],'CapCut':['fav','capcut.com'],'Figma':['dv','figma/figma-original'],'DaVinci Resolve':['si','davinciresolve'],'Adobe Express':['fav','new.express.adobe.com'],'Photopea':['si','photopea'],'OBS Studio':['si','obsstudio']
    };
    function logoHTML(name,code,cat){
      var L=cat==='ghl'?['fav','gohighlevel.com']:LOGO[name];
      if(!L)return '<span class="lg-code">'+esc(code)+'</span>';
      if(L[0]==='px')return artHTML(L[1],4,'lg-px');
      if(L[0]==='si'){var s=SI[L[1]];return '<svg class="lg" viewBox="0 0 24 24" role="img" aria-label="'+esc(name)+' logo"><path fill="#'+s[0]+'" d="'+s[1]+'"/></svg>';}
      var src=L[0]==='dv'?DV+L[1]+'.svg':'https://www.google.com/s2/favicons?domain='+L[1]+'&sz=128';
      return '<img class="lg" src="'+src+'" alt="'+esc(name)+' logo" data-code="'+esc(code)+'" loading="lazy" width="64" height="64">';
    }
    var tabs=$('#px-tabs'),panel=$('#px-tabpanel'),slots=$('#px-slots'),note=$('.note',panel),deco=$('.deco',panel),eq=$('#px-equip'),cur=-1,busy=false;
    CATS.forEach(function(c,k){var t=el('button','px-tab','[ '+c.tab+' ]');t.type='button';t.id='px-tab-'+c.id;t.setAttribute('role','tab');t.setAttribute('aria-controls','px-tabpanel');t.setAttribute('aria-selected','false');t.tabIndex=-1;
      t.addEventListener('click',function(){select(k,true);});tabs.appendChild(t);});
    var tabEls=$$('.px-tab',tabs);
    tabs.addEventListener('keydown',function(e){var k=tabEls.indexOf(document.activeElement);if(k<0)return;var n=null;
      if(e.key==='ArrowRight')n=(k+1)%tabEls.length;else if(e.key==='ArrowLeft')n=(k-1+tabEls.length)%tabEls.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabEls.length-1;
      if(n!=null){e.preventDefault();tabEls[n].focus();select(n,true);}});
    function equip(c,item,btn){
      $$('.px-slot',slots).forEach(function(s){s.setAttribute('aria-pressed','false');});if(btn)btn.setAttribute('aria-pressed','true');
      eq.style.setProperty('--c',c.color);eq.classList.remove('swap');void eq.offsetWidth;eq.classList.add('swap');
      var bg=$('.big',eq);bg.classList.add('lgt');bg.innerHTML=logoHTML(item[0],item[4],c.id)+(c.id==='ghl'?'<span class="badge">'+esc(item[4])+'</span>':'');arts(bg);$('.tn',eq).textContent=item[0];$('.cat',eq).textContent=c.tab.charAt(0)+c.tab.slice(1).toLowerCase()+' · '+item[1];
      $('.pp',eq).textContent=item[2];$('.ap',eq).textContent=item[3];
    }
    function sparks(fromEl,color){if(reduce)return;var r=fromEl.getBoundingClientRect(),pr=panel.getBoundingClientRect();for(var q=0;q<3;q++){var s=el('span','px-spark');s.style.background=color;s.style.left=(r.left-pr.left+r.width/2)+'px';s.style.top=(r.top-pr.top+r.height/2)+'px';s.style.setProperty('--dx',rnd(-40,40)+'px');s.style.setProperty('--dy',rnd(-40,20)+'px');panel.appendChild(s);setTimeout(function(sp){return function(){sp.remove();};}(s),600);}}
    function build(k){
      var c=CATS[k];slots.innerHTML='';note.textContent=c.note;deco.innerHTML=c.deco.map(function(d){return artHTML(d,4);}).join('');arts(deco);
      panel.setAttribute('aria-labelledby','px-tab-'+c.id);
      c.items.forEach(function(it,j){
        var li=el('li');var b=el('button','px-slot'+(reduce?'':' asm'),'<span class="mono lgt" aria-hidden="true">'+logoHTML(it[0],it[4],c.id)+(c.id==='ghl'?'<span class="badge">'+esc(it[4])+'</span>':'')+'</span><span class="nm">'+esc(it[0])+'</span><span class="tt" role="tooltip">'+esc(it[2])+'</span>');
        b.type='button';b.style.setProperty('--c',c.color);b.style.animationDelay=(j*0.035)+'s';b.setAttribute('aria-pressed','false');b.setAttribute('data-cursor','EQUIP');
        b.addEventListener('click',function(){equip(c,it,b);});li.appendChild(b);slots.appendChild(li);
      });
      arts(slots);
      equip(c,c.items[0],slots.querySelector('.px-slot'));
    }
    function select(k,user){
      if(k===cur||busy)return;var first=cur<0;cur=k;
      tabEls.forEach(function(t,j){t.setAttribute('aria-selected',String(j===k));t.tabIndex=j===k?0:-1;});
      if(first||reduce){build(k);return;}
      busy=true;var old=$$('.px-slot',slots);old.forEach(function(s,j){s.classList.remove('asm');s.style.animationDelay=(j*0.012)+'s';s.classList.add('dis');if(j%3===0)sparks(s,CATS[k].color);});
      setTimeout(function(){build(k);busy=false;},300);
    }
    select(0,false);
  })();

  /* ---------------- HUMAN SKILLS TREE ---------------- */
  (function(){
    var SK=[['Communication','Clear, professional communication that supports collaboration and understanding.','chat'],
      ['Time Management','Prioritizing responsibilities, organizing workloads, and maintaining productive workflows.','clock'],
      ['Problem Solving','Approaching challenges thoughtfully and finding practical ways forward.','gear'],
      ['Adaptability','Adjusting to new tools, expectations, and changing project requirements.','bolt'],
      ['Creativity','Generating fresh ideas and approaching tasks with an imaginative perspective.','palette'],
      ['Attention to Detail','Maintaining accuracy, consistency, and quality throughout a project.','lens'],
      ['Collaboration','Working constructively with clients, teammates, and other professionals.','heart'],
      ['Continuous Learning','Maintaining curiosity and developing skills as technology and business needs evolve.','bulb']];
    var tree=$('#px-tree'),svg=$('svg',tree),dlg=$('#px-dialog'),nodes=[],lines=[],runners=[],active=-1;
    var NS='http://www.w3.org/2000/svg';
    SK.forEach(function(s,k){
      var a=(-90+k*45)*Math.PI/180,nx=50+40*Math.cos(a),ny=50+40*Math.sin(a);
      var b=el('button','node','<span class="orb">'+artHTML(s[2],5)+'</span><span class="txt"><span class="lb">'+esc(s[0])+'</span><span class="desc">'+esc(s[1])+'</span></span>');
      b.type='button';b.style.setProperty('--nx',nx+'%');b.style.setProperty('--ny',ny+'%');b.setAttribute('aria-expanded','false');b.setAttribute('data-cursor','SELECT');
      b.addEventListener('click',function(){setAct(active===k&&window.innerWidth<=720?-1:k);});
      b.addEventListener('mouseenter',function(){if(window.innerWidth>720)setAct(k);});
      b.addEventListener('focus',function(){if(window.innerWidth>720)setAct(k);});
      tree.appendChild(b);nodes.push(b);
      var ln=document.createElementNS(NS,'line');svg.appendChild(ln);lines.push(ln);
      var r=el('span','runner');r.style.setProperty('--rd',(k*0.3)+'s');tree.appendChild(r);runners.push(r);
    });
    arts(tree);
    function layout(){var w=tree.clientWidth,h=tree.clientHeight;if(!w||window.innerWidth<=720)return;svg.setAttribute('viewBox','0 0 '+w+' '+h);
      nodes.forEach(function(n,k){var a=(-90+k*45)*Math.PI/180,x=w/2+0.4*w*Math.cos(a),y=h/2+0.4*h*Math.sin(a);
        lines[k].setAttribute('x1',w/2);lines[k].setAttribute('y1',h/2);lines[k].setAttribute('x2',x);lines[k].setAttribute('y2',y);
        runners[k].style.setProperty('--dx',(x-w/2)+'px');runners[k].style.setProperty('--dy',(y-h/2)+'px');});}
    layout();window.addEventListener('resize',layout);
    function setAct(k){active=k;tree.classList.toggle('has-act',k>=0);
      nodes.forEach(function(n,j){n.classList.toggle('act',j===k);n.setAttribute('aria-expanded',String(j===k));});
      lines.forEach(function(l,j){l.classList.toggle('act',j===k);});
      if(k<0)return;dlg.classList.remove('swap');void dlg.offsetWidth;dlg.classList.add('swap');
      $('h3',dlg).textContent=SK[k][0];$('p',dlg).textContent=SK[k][1];$('.who',dlg).textContent='SKILL 0'+(k+1)+' / 08';}
    reveal([tree],function(){tree.classList.add('on');nodes.forEach(function(n,k){setTimeout(function(){n.classList.add('lit');lines[k].classList.add('lit');},reduce?0:k*170);});},{threshold:.3});
  })();

  /* ---------------- SERVICES ---------------- */
  (function(){
    var SV=[
      {id:'ghl-crm',t:'GoHighLevel CRM Setup & Management',tag:'Organize leads. Streamline operations.',d:'Help businesses establish and maintain a structured GoHighLevel workspace that supports customer relationship management and daily operations.',icon:'gear',sc:'#1d2b5c',gc:'#2d6b3a',
        l:['CRM configuration','Contact organization','Tags and custom fields','Pipeline setup','Opportunity tracking','Calendar configuration','Form and survey setup','General CRM maintenance']},
      {id:'automation',t:'Workflow Automation & Lead Nurturing',tag:'Spend less time repeating tasks.',d:'Support business processes through automated workflows that make communication, lead tracking, and followups more consistent.',icon:'bolt',sc:'#3a1f5c',gc:'#5a3fb5',
        l:['Automated followup sequences','Email and SMS workflows','Lead nurturing campaigns','Appointment reminders','Workflow triggers','Pipeline stage automations','Basic integration setup','Automation monitoring and refinement']},
      {id:'social',t:'Social Media Management & Content Strategy',tag:'Create content that connects.',d:'Help brands maintain an organized, engaging, and consistent social media presence.',icon:'chat',sc:'#5c1f3a',gc:'#c95264',
        l:['Social media content planning','Content calendars','Caption and copywriting','Graphic design','Post scheduling','Content research','Community engagement support','Analytics reporting','Social media account organization']},
      {id:'creative',t:'Creative Content & Digital Design',tag:'Bring creative ideas to life.',d:'Create digital visuals and content assets that support brand communication and marketing campaigns.',icon:'palette',sc:'#4a3a12',gc:'#d9a93f',
        l:['Social media graphics','Marketing materials','Short video editing','Reels and TikTok content editing','Thumbnail design','Basic branding assets','Promotional content','Landing page visual assets','Presentation design']},
      {id:'va',t:'General Virtual Assistance & Business Support',tag:'Reliable support behind the scenes.',d:'Provide organized administrative and operational support to help businesses manage recurring digital responsibilities.',icon:'calendar',sc:'#103a3c',gc:'#2aa9ac',
        l:['Data entry and organization','Email and inbox management','Calendar and scheduling assistance','Online research','Spreadsheet management','Document preparation','File organization','Customer support assistance','CRM data updates','Task and project coordination']}];
    SERVICES_LIST=SV;
    var grid=$('#px-quests'),qm=$('#px-qmodal'),current=null;
    SV.forEach(function(s,k){
            var a=el('article','px-quest pbox');a.style.setProperty('--sc',s.sc);a.style.setProperty('--gc',s.gc);
      a.innerHTML='<div class="scene" aria-hidden="true"><div class="bits"><i></i><i></i><i></i><i></i></div><span class="icon">'+artHTML(s.icon,6)+'</span><span class="hero">'+artHTML('walkA|walkB',3,'anim')+'</span><span class="say">'+esc(s.tag)+'</span><div class="gnd"></div></div>'+
        '<div class="qb"><div class="qn">QUEST 0'+(k+1)+'</div><h3>'+esc(s.t)+'</h3><p>'+esc(s.d)+'</p>'+
        '<details><summary>DELIVERABLES</summary><ul>'+s.l.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul></details>'+
        '<div class="acts"><button type="button" class="pbtn ghost sm" data-view>VIEW QUEST</button><button type="button" class="pbtn sm" data-start>START A PROJECT</button></div></div>';
      $('[data-view]',a).addEventListener('click',function(){openQuest(k);});
      $('[data-start]',a).addEventListener('click',function(){discuss(k);});
      grid.appendChild(a);
    });
    arts(grid);
    reveal($$('.px-quest',grid),function(q,i){q.style.animationDelay=(i*0.12)+'s';q.classList.add('in');},{threshold:.12});
    function openQuest(k){var s=SV[k];current=k;$('.qlabel',qm).textContent='QUEST 0'+(k+1)+' / 05';$('#px-q-title').textContent=s.t;$('.tag',qm).textContent='"'+s.tag+'"';$('.desc',qm).textContent=s.d;
      $('ul',qm).innerHTML=s.l.map(function(x){return '<li>'+esc(x)+'</li>';}).join('');openModal(qm);}
    $('[data-discuss]',qm).addEventListener('click',function(){var k=current;qm._last=null;closeModal(qm);discuss(k);});
    var SVC_MAP={'ghl-crm':'GoHighLevel Services','automation':'GoHighLevel Services','social':'Social Media Management Services','creative':'Social Media Management Services'};
    function discuss(k){var s=SV[k],sel=document.getElementById('px-service'),msg=document.getElementById('px-msg'),note=document.getElementById('px-sel');
      if(sel&&SVC_MAP[s.id]){sel.value=SVC_MAP[s.id];sel.dispatchEvent(new Event('change'));}
      if(msg&&!msg.value.trim()){msg.value='Hi Raphael, I\'m interested in your '+s.t+' service. ';msg.dispatchEvent(new Event('input'));}
      if(note){note.textContent='QUEST SELECTED: '+s.t.toUpperCase();note.classList.add('show');}
      goTo('contact',function(){var n=document.getElementById('px-name');if(n)n.focus({preventScroll:true});});
      toast('QUEST SELECTED',s.t.toUpperCase());}
  })();

  /* ================= V2: VIDEO MODAL (Loom) ================= */
  var VM=(function(){
    var m=$('#px-video'),scr=$('.screen',m),ttl=$('#px-v-title'),cnt=$('.count',m),desc=$('.desc',m),openA=$('.open',m),sw=$('.sw',m),list=[],i=0,tmr=null;
    var fsBtn=$('[data-v=fs]',m);
    if(!(sw.requestFullscreen||sw.webkitRequestFullscreen))fsBtn.style.display='none';
    function show(){
      var v=list[i];clearTimeout(tmr);
      ttl.textContent=v.title;cnt.textContent=list.length>1?(i+1)+' / '+list.length:'';desc.textContent=v.desc;openA.href='https://www.loom.com/share/'+v.id;
      $$('[data-v=prev],[data-v=next]',m).forEach(function(b){b.style.display=list.length>1?'':'none';});
      scr.innerHTML='<div class="ld">LOADING DEMO...</div>';
      var f=document.createElement('iframe');
      f.src='https://www.loom.com/embed/'+v.id;f.title='Demo video: '+v.title;f.setAttribute('loading','lazy');
      f.setAttribute('allow','autoplay; fullscreen; picture-in-picture; clipboard-write');f.setAttribute('allowfullscreen','');
      f.onload=function(){f.classList.add('ok');var l=$('.ld',scr);if(l)l.remove();clearTimeout(tmr);};
      scr.appendChild(f);
      tmr=setTimeout(function(){var l=$('.ld',scr);if(l){l.innerHTML='THE PLAYER IS TAKING A WHILE.<br><a href="https://www.loom.com/share/'+v.id+'" target="_blank" rel="noopener noreferrer">WATCH IT ON LOOM ↗</a>';console.warn('[Raphael_Pixel] Loom embed slow or blocked:',v.id);}},10000);
    }
    function go(d){i=(i+d+list.length)%list.length;show();}
    $('[data-v=prev]',m).addEventListener('click',function(){go(-1);});
    $('[data-v=next]',m).addEventListener('click',function(){go(1);});
    fsBtn.addEventListener('click',function(){var fn=sw.requestFullscreen||sw.webkitRequestFullscreen;if(fn)fn.call(sw);});
    m._onClose=function(){clearTimeout(tmr);scr.innerHTML='';if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen();};
    return {open:function(l,k){list=l;i=k;openModal(m,function(e){if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1);});show();}};
  })();

  /* ================= V2: EXPERIENCE ================= */
  (function(){
    var items=$$('.px-xp-item');
    items.forEach(function(it){$$('.px-term li',it).forEach(function(li,k){li.style.animationDelay=(0.4+k*0.45)+'s';});});
    reveal(items,function(it,i){it.style.transitionDelay=(i*0.15)+'s';it.classList.add('in');var t=$('.px-term',it);setTimeout(function(){t.classList.add('typed');},reduce?0:400);},{threshold:.15});
    $$('.px-xp-tog').forEach(function(b){b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!open));b.textContent=open?'QUEST LOG ▸':'QUEST LOG ▾';});});
    var dbg=$('#px-debug'),bugs=$$('.bug',dbg),qa=$('.qa',dbg),left=bugs.length;
    function done(){qa.textContent='QA CHECK COMPLETE ✓ ALL TESTS PASSING';qa.classList.add('done');}
    bugs.forEach(function(b){b.addEventListener('click',function(){if(b.classList.contains('squash'))return;b.classList.add('squash');b.setAttribute('aria-hidden','true');b.tabIndex=-1;left--;
      if(left>0)qa.textContent='BUG SQUASHED! '+left+' LEFT';else done();});});
  })();

  /* ================= V2: WORKS ================= */
  (function(){
    var C='https://res.cloudinary.com/tt2vm9rd/image/upload/';
    function img(src,alt,lazy){return '<img src="'+src+'" alt="'+esc(alt)+'"'+(lazy===false?'':' loading="lazy"')+' width="800" height="600">';}
    function dlBtn(src,label){return '<a class="px-mini ghost" href="'+dlUrl(src)+'" download aria-label="'+esc(label)+'">⤓ '+(label.indexOf('PART')>-1?label:'DOWNLOAD')+'</a>';}
    /* ---- tabs ---- */
    var topTabs=$$('.px-wtabs [role=tab]'),ind=$('.px-wtabs .ind'),panels=[$('#px-wp-ghl'),$('#px-wp-smm'),$('#px-wp-web')],topCur=0;
    function moveInd(){var t=topTabs[topCur];ind.style.left=t.offsetLeft+'px';ind.style.width=t.offsetWidth+'px';}
    function selectTop(k,focus){topCur=k;topTabs.forEach(function(t,j){t.setAttribute('aria-selected',String(j===k));t.tabIndex=j===k?0:-1;});
      panels.forEach(function(p,j){p.hidden=j!==k;});panels[k].classList.remove('swap');void panels[k].offsetWidth;panels[k].classList.add('swap');moveInd();if(focus)topTabs[k].focus();
      if(k===0&&subCur<0)selectSub(0);}
    topTabs.forEach(function(t,k){t.addEventListener('click',function(){selectTop(k);});t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();selectTop((k+(e.key==='ArrowRight'?1:2))%3,true);}});});
    window.addEventListener('resize',moveInd);setTimeout(moveInd,50);onReady(moveInd);

    /* ---- WEBSITES: UNDER MAINTENANCE ---- */
    (function(){
      var p=$('#px-wp-web'),load='',sparks='';
      for(var q=0;q<12;q++)load+='<i style="animation-delay:'+(q*0.2).toFixed(1)+'s"></i>';
      for(q=0;q<6;q++)sparks+='<i style="left:'+(30+q*7)+'%;animation-delay:'+(q*0.25).toFixed(2)+'s"></i>';
      p.innerHTML='<div class="px-maint pbox"><div class="txt"><div class="kick">WEBSITES</div><h3>UNDER MAINTENANCE</h3>'+
        '<p>Raphael is giving this part of the vault a tune up. His website projects will be back here soon, so check again later.</p>'+
        '<div class="load" aria-hidden="true">'+load+'</div><p class="mini">STATUS: WORK IN PROGRESS</p></div>'+
        '<div class="scene" aria-hidden="true"><div class="stripes"></div><div class="mon"><div class="scr"><span class="err">MAINTENANCE<br>MODE</span><span class="bar"><i></i></span></div><div class="stand"></div></div>'+
        '<span class="bot">'+artHTML('robot|robot2',5,'anim')+'</span><span class="tool">'+artHTML('hammer',4)+'</span><div class="sparks">'+sparks+'</div><div class="stripes b"></div><div class="gnd"></div></div></div>';
      arts(p);
    })();

    /* ---- SOCIAL MEDIA: BAKE BLUSH ---- */
    var BB=[
      ['Bake Blush Logo','v1790046717/bake_blush_logo.jpg','The Bake Blush logo. Every graphic in this set was built around it, so the colors and feel stay consistent.'],
      ['Bake Blush Poster','v1790049845/poster.png','A branded poster where Raphael balanced photos, type, and layout to show what Bake Blush is all about.'],
      ['Product Highlight','v1790049891/product_highlight.png','A post that puts one product front and center, with a clean layout that keeps the focus where it belongs.'],
      ['Customer Highlight','v1790050493/customer_highlight.png','A warmer, more personal post that celebrates customers and the community around the brand.'],
      ['Engagement Post','v1790050798/engement_post.png','Made to get people talking. Raphael designed it to invite comments and make the page feel friendly and easy to join.'],
      ['Promotional Post','v1790050976/promotional_post.png','A promo graphic that gets the offer across quickly while still looking and feeling like Bake Blush.']
    ].map(function(r){return {title:r[0],src:C+r[1],alt:'Bake Blush social media design: '+r[0],desc:r[2]};});
    (function(){
      var p=$('#px-wp-smm');
      p.innerHTML='<div class="px-brandhead pbox"><div class="logo">'+img(BB[0].src,'Bake Blush logo')+'</div><div><div class="kick">PROJECT COLLECTION · SOCIAL MEDIA MANAGEMENT</div><h3>BAKE BLUSH: SOCIAL MEDIA CREATIVE COLLECTION</h3><p>A set of social media graphics Raphael made for Bake Blush. It covers the brand look, product posts, customer shoutouts, and promos, all kept in one consistent style.</p></div></div>'+
        '<div class="px-feat"><button type="button" class="frame" data-cursor="VIEW">'+img(BB[0].src,BB[0].alt)+'</button><div class="info pbox"><div class="ctr"></div><h4></h4><p></p><div class="acts"><button type="button" class="px-mini fullv">⛶ VIEW FULL SCREEN</button><a class="px-mini ghost dlf" href="#" download>⤓ DOWNLOAD</a></div></div></div>'+
        '<div class="px-dcards" role="group" aria-label="Bake Blush designs"></div>';
      var frame=$('.frame',p),fimg=$('img',frame),info=$('.info',p),cards=$('.px-dcards',p),fi=0;
      var FX=['-40px','0px','40px','-40px','0px','40px'],FY=['20px','40px','20px','-30px','-40px','-30px'];
      BB.forEach(function(it,k){var b=el('button','px-dcard','<span class="tip" aria-hidden="true">VIEW DESIGN</span><span class="im">'+img(it.src,it.alt)+'</span><span class="no">DESIGN 0'+(k+1)+'</span>');
        b.type='button';b.setAttribute('aria-pressed',String(k===0));b.setAttribute('aria-label','Show '+it.title+' in the preview');b.setAttribute('data-cursor','SELECT');b.style.setProperty('--fx',FX[k]);b.style.setProperty('--fy',FY[k]);
        b.addEventListener('click',function(){setFeat(k);});cards.appendChild(b);tilt(b,10);});
      function setFeat(k){fi=k;var it=BB[k];
        $$('.px-dcard',cards).forEach(function(c,j){c.setAttribute('aria-pressed',String(j===k));});
        fimg.style.display='';var fb=frame.querySelector('.px-imgfail');if(fb)fb.remove();delete fimg.dataset.failed;
        fimg.src=it.src;fimg.alt=it.alt;frame.setAttribute('aria-label','Open '+it.title+' full screen');
        $('.ctr',info).textContent='DESIGN 0'+(k+1)+' / 0'+BB.length;$('h4',info).textContent=it.title;$('p',info).textContent=it.desc;$('.dlf',info).href=dlUrl(it.src);$('.dlf',info).setAttribute('aria-label','Download '+it.title);
        frame.classList.remove('swap');void frame.offsetWidth;frame.classList.add('swap');}
      frame.addEventListener('click',function(){V.open(BB,fi);});$('.fullv',info).addEventListener('click',function(){V.open(BB,fi);});
      setFeat(0);
      reveal($$('.px-dcard',cards),function(c,i){c.style.animationDelay=(i*0.1)+'s';c.classList.add('in');},{threshold:.1});
    })();

    /* ---- GHL DATA ---- */
    var WF=[
      ['Payment Success / Failed','v1788575509/Payment_Success_Failed_Different_Success_Workflow.png','cb37b0ec208045babff04e4438045f10','Sorts customers by how their payment went. Successful and failed payments each get their own follow up, so nobody falls through the cracks.'],
      ['Power Dialer','v1788575576/Powerdialer_Workflow.png','80824ca3422146d8a3f978b3047d3e76','Keeps calling organized. Leads move through a clear calling process, and every attempt is noted on the contact.'],
      ['Meeting Started','v1788575673/Meeting_Started_Workflow.png','adf18a7a2bb541bab69a7a273a6f07da','Runs when a meeting begins and takes care of the CRM updates that go with it.'],
      ['New Lead','v1788575767/1._New_Lead_Workflow.png','2f76f607a2a04e2ea0db8852c64b2ae1','Where every new inquiry starts. It sets up a clean contact record, sends the first reply, and lines up the next follow up.'],
      ['Contacted','v1788575963/2._Contacted_Workflow.png','001c2086e9d04a919ac694d636c92fec','For leads who have already been reached. It keeps the conversation going with follow ups at the right time.'],
      ['Interested','v1788576042/3._Interested_Workflow.png','58ba1313ac09422d9cd5906e95d549e6','When a lead shows interest, this workflow sorts them so the next conversation feels more relevant to them.'],
      ['Automated Appointment Booking & Reminders','v1788576169/4.Appointment_Booked_Confirmation_Reminder_Workflow.png','a664b5e5866a4298b2166cf2b1267855','Sends booking confirmations and reminders on its own, so fewer people forget about their appointment.'],
      ['Showed','v1788576253/5._Showed_Workflow.png','a480c56b03554ce0996df77d516f776e','Takes care of the next steps after someone shows up for their appointment.'],
      ['No Show','v1788576314/6._No_Show_Workflow.png','a100ba7fb25541cc8edee695f2632fac','Reaches out to people who missed their appointment and makes it easy for them to book again.'],
      ['Cancelled','v1788576378/7._Cancelled.png','ff2f5d2c7bd54d99a974ddd80afd0376','Updates the contact when an appointment gets cancelled and sends the right follow up.'],
      ['Proposal Sent','v1788576435/8._Proposal_Sent.png','1298425aa90f4f609a57e2057f7688cd','Keeps track of proposals that have gone out and follows up with the lead while it\'s still fresh.'],
      ['Proposal Signed','v1788576533/9._Proposal_Signed.png','8a9905c1fa394998ad275bb886b9b71b','Moves a signed proposal into the next stage so the new customer can get started smoothly.'],
      ['Converted','v1788576613/10._Converted_Workflow.png','0fd43438fdcb4331b5533420e147f23a','For leads who became customers. It updates their records and kicks off what comes next.'],
      ['Custom Disposition','v1788576695/Custom_Disposition.png','2000c70455e547e1ac5641b67a70ef2f','Labels each call or contact with an outcome, and that outcome decides what happens next.'],
      ['Lost Reason',['v1788576804/11._Lost_Reson_Workflow.png','v1788576803/11._Lost_Reson_Workflow_part_2.png'],null,'Records why a deal didn\'t close, so the business can look back later and spot patterns.']
    ];
    var DASH=[
      ['Agency Launchpad','v1788577205/agency_launchpad.png','An agency level starting page that puts the most used tools just one click away.'],
      ['Agency Dashboard','v1788577206/agency_dashboard.png','An agency dashboard laid out so the important numbers are easy to scan at a glance.'],
      ['Subaccount Launchpad','v1788577273/sub_launchpad.png','A launchpad for subaccount users, with quick access to the tools they use every day.'],
      ['Subaccount Dashboard','v1788577274/sub_dashboard.png','A practical subaccount dashboard that shows account info in a clear, organized way.']
    ];
    var AI=[
      ['Voice AI & Conversation AI Agents Showcase','0d33142dc39440a08937f3905e66523a','A walkthrough of voice and chat AI agents, and how they can fit into everyday customer conversations.','VOICE + CHAT AGENTS ONLINE'],
      ['AI Voice Agent Demonstration','beff896073f84ac0802555fefea07213','Raphael shows how an AI voice agent can handle a structured conversation and collect information along the way.','INCOMING CALL...'],
      ['Conversation Widget Demonstration','60a3bdf981874e45bf8e378073da52ff','A demo of a chat widget and how it gives website visitors an easy way to reach a business.','HI! HOW CAN I HELP?']
    ];
    var A2P=['v1788657992/Screenshot_2026-02-10_234755.png','v1788657992/Screenshot_2026-02-10_234751.png','v1788657992/Screenshot_2026-02-10_234805.png','v1788657992/Screenshot_2026-02-10_234723.png','v1788657992/Screenshot_2026-02-10_234801.png','v1788657992/Screenshot_2026-02-10_234728.png','v1788657992/Screenshot_2026-02-10_234811.png','v1788657993/Screenshot_2026-02-10_234735.png','v1788657993/Screenshot_2026-02-10_234739.png','v1788657993/Screenshot_2026-02-10_234745.png'];

    /* ---- GHL sub tabs ---- */
    var SUBS=[['wf','WORKFLOWS'],['dash','DASHBOARDS'],['ai','AI CONVERSATION & VOICE AGENTS'],['other','OTHER PROJECTS'],['a2p','A2P REGISTRATION & COMPLIANCE']];
    var subBar=$('.px-wsub'),subWrap=$('#px-wsps'),subCur=-1,built={},subBtns=[],subPanels=[];
    SUBS.forEach(function(s,k){var b=el('button','',s[1]);b.type='button';b.id='px-st-'+s[0];b.setAttribute('role','tab');b.setAttribute('aria-controls','px-sp-'+s[0]);b.setAttribute('aria-selected','false');b.tabIndex=-1;
      b.addEventListener('click',function(){selectSub(k);});
      b.addEventListener('keydown',function(e){var n=null;if(e.key==='ArrowRight')n=(k+1)%SUBS.length;else if(e.key==='ArrowLeft')n=(k-1+SUBS.length)%SUBS.length;if(n!=null){e.preventDefault();selectSub(n);subBtns[n].focus();}});
      subBar.appendChild(b);subBtns.push(b);
      var p=el('div','px-wsp');p.id='px-sp-'+s[0];p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby',b.id);p.hidden=true;subWrap.appendChild(p);subPanels.push(p);});
    function selectSub(k){subCur=k;subBtns.forEach(function(b,j){b.setAttribute('aria-selected',String(j===k));b.tabIndex=j===k?0:-1;});
      subPanels.forEach(function(p,j){p.hidden=j!==k;});var id=SUBS[k][0];if(!built[id]){built[id]=1;BUILD[id](subPanels[k]);}
      subPanels[k].classList.remove('swap');void subPanels[k].offsetWidth;subPanels[k].classList.add('swap');
      if(subBtns[k].scrollIntoView&&subBar.scrollWidth>subBar.clientWidth)subBar.scrollLeft=subBtns[k].offsetLeft-20;}
    function head(kick,title,txt){return '<div class="sub-head"><div class="kick">'+kick+'</div><h3>'+title+'</h3>'+txt.map(function(t){return '<p>'+t+'</p>';}).join('')+'</div>';}

    var BUILD={
      wf:function(p){
        var viewList=[],vidList=[],items=[];
        WF.forEach(function(w){
          var imgs=[].concat(w[1]).map(function(x){return C+x;}),start=viewList.length,pair=imgs.length>1,vIdx=-1;
          imgs.forEach(function(src,j){viewList.push({title:w[0]+(pair?' (Part '+(j+1)+')':''),src:src,alt:w[0]+' workflow screenshot'+(pair?', part '+(j+1):'')});});
          if(w[2]){vIdx=vidList.length;vidList.push({title:w[0],id:w[2],desc:w[3]});}
          items.push({t:w[0],imgs:imgs,start:start,v:vIdx,d:w[3]});
        });
        var n=items.length,cur=0,busy=false,blocks='';for(var q=0;q<40;q++)blocks+='<i style="transition-delay:'+(Math.random()*0.14).toFixed(2)+'s"></i>';
        function pad(x){return (x<10?'0':'')+x;}
        var tabs=items.map(function(it,k){return '<button type="button" role="tab" id="px-wft'+k+'" aria-controls="px-wf-stage" aria-selected="'+(k===0)+'" tabindex="'+(k===0?0:-1)+'"><span class="ix">'+pad(k+1)+'</span><span class="nm">'+esc(it.t)+'</span><span class="gem'+(it.v>-1?' demo':'')+'" aria-hidden="true"></span></button>';}).join('');
        p.innerHTML=head('GOHIGHLEVEL · WORKFLOWS','AUTOMATION LAB: WORKFLOW SHOWCASE',['Here\'s how Raphael builds automations for each stage of the CRM. Pick a workflow from the list to see it, and watch the video walkthrough where there is one.'])+
          '<div class="px-ach px-wfx"><div class="px-ach-list" role="tablist" aria-label="Workflows" aria-orientation="vertical">'+tabs+'</div>'+
          '<div class="px-ach-stage pbox" id="px-wf-stage" role="tabpanel"><div class="top"><span class="ctr"></span><span class="badge"></span></div><div class="shots"></div>'+
          '<div class="nav"><button type="button" class="px-ib prev" aria-label="Previous workflow">◀</button><h3 class="ttl"></h3><button type="button" class="px-ib next" aria-label="Next workflow">▶</button></div>'+
          '<p class="desc"></p><div class="row"><div class="dots" aria-hidden="true">'+'<i></i>'.repeat(n)+'</div><div class="acts"></div></div></div></div>';
        var root2=$('.px-wfx',p),btns=$$('[role=tab]',root2),stage=$('.px-ach-stage',root2),shots=$('.shots',stage),dots=$$('.dots i',stage);
        function paint(k){var it=items[k],pair=it.imgs.length>1;
          shots.className='shots'+(pair?' pair':'');
          shots.innerHTML=it.imgs.map(function(src,j){return '<button type="button" class="shot" data-v="'+(it.start+j)+'" data-cursor="VIEW" aria-label="View '+esc(it.t)+(pair?' part '+(j+1):'')+' full screen">'+(pair?'<span class="tag">PART '+(j+1)+'</span>':'')+'<img src="'+src+'" alt="'+esc(it.t)+' workflow screenshot'+(pair?', part '+(j+1):'')+'" loading="lazy" width="800" height="500"><span class="wipe" aria-hidden="true">'+blocks+'</span><span class="tip" aria-hidden="true">CLICK TO VIEW</span></button>';}).join('');
          $('.ctr',stage).textContent='WORKFLOW '+pad(k+1)+' / '+n;
          $('.badge',stage).textContent=it.v>-1?'▶ DEMO AVAILABLE':(pair?'2 PARTS':'SCREENSHOT');
          $('.ttl',stage).textContent=it.t;$('.desc',stage).textContent=it.d;
          $('.acts',stage).innerHTML='<button type="button" class="px-mini" data-v="'+it.start+'">⛶ VIEW WORKFLOW</button>'+(it.v>-1?'<button type="button" class="px-mini gold" data-demo="'+it.v+'">▶ WATCH DEMO</button>':'')+
            (pair?it.imgs.map(function(src,j){return dlBtn(src,'PART '+(j+1));}).join(''):dlBtn(it.imgs[0],'Download '+it.t+' workflow image'));
          stage.setAttribute('aria-labelledby','px-wft'+k);
          dots.forEach(function(d,j){d.className=j<k?'on':(j===k?'cur':'');});
          btns.forEach(function(b,j){var on=j===k;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;});
          var act=btns[k],lst=act.parentNode;if(lst.scrollWidth>lst.clientWidth)lst.scrollTo({left:act.offsetLeft-20,behavior:reduce?'auto':'smooth'});}
        function show(k,focus){k=(k+n)%n;if(focus)btns[k].focus();if(k===cur||busy)return;cur=k;
          if(reduce){paint(k);return;}
          busy=true;$$('.shot',shots).forEach(function(s){s.classList.add('cover');});
          setTimeout(function(){paint(k);$$('.shot',shots).forEach(function(s){s.classList.add('pop');});setTimeout(function(){busy=false;},260);},220);}
        btns.forEach(function(b,k){b.addEventListener('click',function(){show(k);});
          b.addEventListener('keydown',function(e){var m=null;if(e.key==='ArrowDown'||e.key==='ArrowRight')m=k+1;else if(e.key==='ArrowUp'||e.key==='ArrowLeft')m=k-1;else if(e.key==='Home')m=0;else if(e.key==='End')m=n-1;if(m!=null){e.preventDefault();show(m,true);}});});
        $('.prev',stage).addEventListener('click',function(){show(cur-1);});$('.next',stage).addEventListener('click',function(){show(cur+1);});
        stage.addEventListener('click',function(e){var v=e.target.closest('[data-v]'),d=e.target.closest('[data-demo]');if(v)V.open(viewList,+v.dataset.v);else if(d)VM.open(vidList,+d.dataset.demo);});
        paint(0);
        reveal([root2],function(){root2.classList.add('in');btns.forEach(function(b,k){b.style.animationDelay=(k*0.04)+'s';});},{threshold:.1});
      },
      dash:function(p){
        var list=DASH.map(function(d){return {title:d[0],src:C+d[1],alt:'GoHighLevel '+d[0]+' screenshot'};});
        p.innerHTML=head('GOHIGHLEVEL · DASHBOARDS','CONTROL ROOM: CRM DASHBOARDS',['A few ways Raphael sets up GoHighLevel workspaces so the important stuff is always easy to find.'])+'<div class="px-dash"></div>';
        var g=$('.px-dash',p);
        DASH.forEach(function(d,k){var it=list[k];
          var c=el('article','px-mon','<button type="button" class="bez" data-cursor="VIEW" aria-label="View '+esc(d[0])+' full screen"><span class="scr">'+img(it.src,it.alt)+'</span><span class="brand" aria-hidden="true">PX 0'+(k+1)+'</span><span class="leds" aria-hidden="true"><i></i><i></i><i></i></span></button><div class="stand" aria-hidden="true"></div><div class="base" aria-hidden="true"></div>'+
            '<div class="cap pbox"><h4>'+esc(d[0])+'</h4><p>'+esc(d[2])+'</p><div class="acts"><button type="button" class="px-mini fullv">⛶ VIEW DASHBOARD</button>'+dlBtn(it.src,'Download '+d[0]+' image')+'</div></div>');
          $('.bez',c).addEventListener('click',function(){V.open(list,k);});$('.fullv',c).addEventListener('click',function(){V.open(list,k);});
          g.appendChild(c);tilt($('.bez',c),6);});
        reveal($$('.px-mon',g),function(c,i){c.style.animationDelay=(i*0.15)+'s';c.classList.add('in');},{threshold:.15});
      },
      ai:function(p){
        var vids=AI.map(function(a){return {title:a[0],id:a[1],desc:a[2]};});
        p.innerHTML=head('GOHIGHLEVEL · AI','AI LAB: INTELLIGENT CONVERSATIONS',['Short demos of the AI chat and voice tools inside GoHighLevel, and how they can help businesses talk with their customers.'])+'<div class="px-ai"></div>';
        var g=$('.px-ai',p);
        AI.forEach(function(a,k){var waves='';for(var q=0;q<9;q++)waves+='<i style="animation-delay:'+(q*0.09).toFixed(2)+'s"></i>';
          var c=el('article','px-aic','<div class="tb" aria-hidden="true"><i></i><i></i><i></i>AI_TERMINAL_0'+(k+1)+'<span>LIVE</span></div>'+
            '<div class="stage" aria-hidden="true"><span class="say">'+esc(a[3])+'</span><span class="bot">'+artHTML('robot|robot2',5,'anim')+'</span><span class="wave">'+waves+'</span></div>'+
            '<button type="button" class="play" data-demo="'+k+'" aria-label="Play '+esc(a[0])+'">'+artHTML('play',4)+'</button>'+
            '<div class="bd"><h4>'+esc(a[0])+'</h4><p>'+esc(a[2])+'</p><div class="acts"><button type="button" class="px-mini gold" data-demo="'+k+'">▶ WATCH DEMO</button><a class="px-mini ghost" href="https://www.loom.com/share/'+a[1]+'" target="_blank" rel="noopener noreferrer">OPEN IN LOOM ↗</a></div></div>');
          g.appendChild(c);});
        arts(g);
        g.addEventListener('click',function(e){var d=e.target.closest('[data-demo]');if(d)VM.open(vids,+d.dataset.demo);});
        var cards=$$('.px-aic',g);
        reveal(cards,function(c,i){c.style.animationDelay=(i*0.15)+'s';c.classList.add('in');},{threshold:.15});
        if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('off',!e.isIntersecting);});});cards.forEach(function(c){io.observe(c);});}
      },
      other:function(p){
        var vid=[{title:'Summer Booking Rentals: Resort Booking Website',id:'93d2f691cf0e49b9860f30110e93a27d',desc:'Raphael walks through a resort booking website, from checking availability and browsing stays to picking dates and seeing the booking summary.'}];
        var waves='';for(var q=0;q<7;q++)waves+='<i style="animation-delay:'+(q*0.15).toFixed(2)+'s"></i>';
        p.innerHTML=head('GOHIGHLEVEL · OTHER PROJECTS','MORE PROJECTS: BOOKING WEBSITE DEMO',[])+
          '<article class="px-oproj pbox">'+
            '<button type="button" class="scr" data-demo="0" aria-label="Play the Summer Booking Rentals demo">'+
              '<span class="sky" aria-hidden="true"><span class="sun"></span><span class="bird b1"></span><span class="bird b2"></span></span>'+
              '<span class="sea" aria-hidden="true">'+waves+'</span><span class="sand" aria-hidden="true"></span>'+
              '<span class="palm" aria-hidden="true">'+artHTML('palm',5)+'</span>'+
              '<span class="url" aria-hidden="true">RC.org · Summer Booking Rentals</span>'+
              '<span class="play" aria-hidden="true">'+artHTML('play',5)+'</span><span class="lbl" aria-hidden="true">▶ WATCH DEMO</span></button>'+
            '<div class="bd"><div class="kick">PROJECT DEMO · RESORT BOOKING WEBSITE</div><h4>Summer Booking Rentals</h4>'+
              '<p>A short walkthrough of a resort booking website Raphael has been building. It follows the path a guest would take, from landing on the page to seeing a summary of their booking.</p>'+
              '<ul class="steps">'+
                '<li><b>Check availability.</b> A big welcome section with a button to see what is open.</li>'+
                '<li><b>Pick a kind of stay.</b> Luxury, private villa, beachfront, island, or family friendly.</li>'+
                '<li><b>Open a resort.</b> Each resort card opens up with its own details.</li>'+
                '<li><b>Choose dates and times.</b> Guests set when they arrive and when they leave.</li>'+
                '<li><b>Review the booking.</b> A receipt style summary shows everything at a glance.</li></ul>'+
              '<p class="wip">Work in progress: the final booking form is still being built, so the confirm button does not go through yet.</p>'+
              '<div class="acts"><button type="button" class="px-mini gold" data-demo="0">▶ WATCH DEMO</button><a class="px-mini ghost" href="https://www.loom.com/share/'+vid[0].id+'" target="_blank" rel="noopener noreferrer">OPEN IN LOOM ↗</a></div>'+
            '</div></article>';
        arts(p);
        p.addEventListener('click',function(e){var d=e.target.closest('[data-demo]');if(d)VM.open(vid,0);});
        reveal([$('.px-oproj',p)],function(o){o.classList.add('in');},{threshold:.15});
      },
      a2p:function(p){
        var list=A2P.map(function(x,k){var n=(k<9?'0':'')+(k+1);return {title:'A2P Screenshot '+n,src:C+x,alt:'A2P registration screenshot '+n,cap:'Screenshot '+n+' of 10 from Raphael\'s A2P registration work in GoHighLevel. Open it full screen to read the details.'};});
        var steps='';list.forEach(function(it,k){steps+='<button type="button" data-k="'+k+'" aria-label="Show screenshot '+(k+1)+' of 10"><span class="th">'+img(it.src,'')+'</span><span class="dot">'+(k+1)+'</span></button>';});
        p.innerHTML='<div class="px-a2p-title">A2P REGISTRATION &amp; APPROVAL SUPPORT</div>'+head('GOHIGHLEVEL · A2P','A2P REGISTRATION: MESSAGING COMPLIANCE SHOWCASE',['A2P registration takes patience and a good eye for detail. Raphael reviews the requirements, gathers the business details, writes the messaging use cases, and double checks everything before it goes in for review.','The goal is a smoother, less confusing setup for the businesses he works with.'])+
          '<div class="px-a2p"><div class="viewer"><button type="button" class="pv" data-cursor="VIEW"><span class="scanl" aria-hidden="true"></span>'+img(list[0].src,list[0].alt)+'</button>'+
          '<div class="meta pbox" aria-live="polite"><div class="step"></div><div class="prog" aria-hidden="true">'+'<i></i>'.repeat(10)+'</div><h4></h4><p></p><div class="acts"><button type="button" class="px-mini fullv">⛶ VIEW FULL SCREEN</button><a class="px-mini ghost dla" href="#" download>⤓ DOWNLOAD</a></div></div></div>'+
          '<div class="px-path" role="group" aria-label="A2P screenshots, 10 steps"><span class="trail" aria-hidden="true"></span>'+steps+'</div></div>';
        var pv=$('.pv',p),pimg=$('img',pv),meta=$('.meta',p),btns=$$('.px-path button',p),trail=$('.trail',p),cur=0;
        function sel(k){cur=k;var it=list[k];
          pimg.style.display='';var fb=pv.querySelector('.px-imgfail');if(fb)fb.remove();delete pimg.dataset.failed;
          pimg.src=it.src;pimg.alt=it.alt;pv.setAttribute('aria-label','Open '+it.title+' full screen');
          $('.step',meta).textContent='STEP '+(k+1)+' / 10';$('h4',meta).textContent=it.title;$('p',meta).textContent=it.cap;$('.dla',meta).href=dlUrl(it.src);
          $$('.prog i',meta).forEach(function(b,j){b.classList.toggle('on',j<=k);});
          btns.forEach(function(b,j){if(j===k)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');b.classList.toggle('done',j<k);});
          trail.style.width=(k/9*90)+'%';pv.classList.remove('swap');void pv.offsetWidth;pv.classList.add('swap');}
        btns.forEach(function(b,k){b.addEventListener('click',function(){sel(k);});});
        pv.addEventListener('click',function(){V.open(list,cur);});$('.fullv',meta).addEventListener('click',function(){V.open(list,cur);});
        sel(0);
      }
    };
    selectSub(0);
  })();

  /* ================= TESTIMONIALS (3 columns) ================= */
  (function(){
    var T=[
      {tag:'SMM CLIENT',author:'Social Media Management Client',pos:'Client',icon:'chat',hl:['Creative','Detail oriented','Open to feedback'],
       text:'Raphael has a creative approach to social media content and pays attention to the little details that make a design feel complete. He\'s easy to communicate with, open to feedback, and genuinely interested in making sure the content fits the brand. Working with him has been a positive experience.'},
      {tag:'GHL CLIENT',author:'GoHighLevel Client',pos:'Client',icon:'gear',hl:['Organized','Patient','Clear communicator'],
       text:'Raphael has been helpful in organizing CRM processes and approaching automation tasks with patience and attention to detail. He communicates clearly, takes time to understand what needs to be done, and works toward practical solutions. I appreciate his dedication and professional attitude.'},
      {tag:'GHL COACH',author:'Arnold Unson',pos:'GHL Coach',icon:'star',hl:['Eager to learn','Thoughtful','Coachable'],
       text:'Raphael shows a strong willingness to learn and understand how GoHighLevel works beyond the basics. He approaches workflows and CRM tasks thoughtfully, asks relevant questions, and takes feedback seriously. It\'s encouraging to see his continued development in automation and platform management.'}
    ];
    var box=$('#px-tst');if(!box)return;
    box.className='px-tst3';
    box.innerHTML=T.map(function(t,k){return '<figure class="px-tcard pbox"><span class="tg">'+t.tag+'</span>'+
      '<div class="hd"><span class="av" aria-hidden="true">'+artHTML('idleA|idleB',4)+'</span><span class="ic" aria-hidden="true">'+artHTML(t.icon,3)+'</span></div>'+
      '<span class="q" aria-hidden="true">'+artHTML('quote',4)+'</span>'+
      '<blockquote>'+esc(t.text)+'</blockquote>'+
      '<ul class="hl" aria-label="Highlights">'+t.hl.map(function(h){return '<li>'+esc(h)+'</li>';}).join('')+'</ul>'+
      '<figcaption><b>'+esc(t.author)+'</b><small>'+esc(t.pos)+'</small></figcaption><span class="cur" aria-hidden="true">▼</span></figure>';}).join('');
    arts(box);
    reveal($$('.px-tcard',box),function(c,i){c.style.animationDelay=(i*0.15)+'s';c.classList.add('in');},{threshold:.15});
  })();

  /* ================= V2: FAQ (3 columns) ================= */
  (function(){
    var COLS=[
      {id:'ghl',title:'GOHIGHLEVEL',icon:'gear',q:[
        ['What can Raphael set up in GoHighLevel?','He can set up and tidy up your CRM, pipelines, tags and custom fields, forms, calendars, funnels, websites, and the automations that tie them together. You can start with one piece or have him handle the whole account.'],
        ['Can he build automated follow ups and appointment reminders?','Yes. He builds workflows for new leads, booking confirmations, reminders, no shows, and follow ups by email and SMS. Each one is planned around how your business actually works.'],
        ['Can he work inside my existing account?','Yes. He can clean up and improve what you already have, or build a fresh setup from the ground up if that makes more sense.'],
        ['Does he help with A2P registration?','Yes. He helps prepare the business details and messaging use cases that A2P registration needs, and checks everything before it gets submitted. The final approval is up to the carriers, but he makes the process a lot less confusing.'],
        ['Can he set up AI chat or voice agents?','He has worked with the conversation AI and voice AI tools inside GoHighLevel and can help set them up and test them. He will go over your needs first so you know what to expect.']]},
      {id:'smm',title:'SOCIAL MEDIA MANAGEMENT',icon:'chat',q:[
        ['Which platforms does Raphael manage?','Facebook, Instagram, TikTok, and LinkedIn. If your business uses another platform, just ask.'],
        ['Does he create the graphics and captions too?','Yes. He designs post graphics, writes captions, and edits short videos like Reels and TikToks, so everything looks and sounds like your brand.'],
        ['How does he plan the content?','He builds a content calendar around your goals, your brand, and your audience, then shares it with you for feedback before anything goes live.'],
        ['Can he schedule posts and reply to comments?','Yes. He schedules posts with tools like Meta Business Suite or Buffer, and he can help with day to day engagement like answering comments and messages.'],
        ['Will I get updates on how my pages are doing?','Yes. He can put together simple reports that show your reach, engagement, and which posts did best, so you can see what is working.']]},
      {id:'va',title:'VIRTUAL ASSISTANCE',icon:'calendar',q:[
        ['What tasks can Raphael help with?','Data entry, inbox and calendar management, online research, spreadsheets, document prep, file organization, CRM updates, and basic customer support.'],
        ['Can he manage my inbox and calendar?','Yes. He can sort your inbox, reply to routine emails, and keep your schedule organized so meetings and deadlines do not slip.'],
        ['What tools does he work with?','Gmail, Google Sheets, Google Calendar, Notion, Trello, Canva, and GoHighLevel, among others. If your team uses something different, he picks up new tools quickly.'],
        ['Can he follow our existing processes?','Yes. He can work from your current documents, checklists, and SOPs, and he will ask questions whenever something is unclear.'],
        ['How do we get started?','Send a message through the contact form or book a discovery call. Tell him what you need help with, and he will suggest how he can support you.']]}
    ];
    var wrap=$('#px-faq');if(!wrap)return;
    COLS.forEach(function(col){
      var c=el('div','px-fcol pbox'),qs='';
      col.q.forEach(function(q,k){var id='px-fq-'+col.id+k;
        qs+='<div class="px-fq"><h4><button type="button" id="'+id+'b" aria-expanded="false" aria-controls="'+id+'a"><span class="pt" aria-hidden="true">'+artHTML('cursor',2)+'</span><span>'+esc(q[0])+'</span><span class="sign" aria-hidden="true">+</span></button></h4>'+
          '<div class="ans" id="'+id+'a" role="region" aria-labelledby="'+id+'b" hidden><span class="sr">'+esc(q[1])+'</span><span class="typed" aria-hidden="true"></span></div></div>';});
      c.innerHTML='<div class="fh"><span class="ic" aria-hidden="true">'+artHTML(col.icon,4)+'</span><div><h3>'+col.title+'</h3><small>5 QUESTIONS</small></div><span class="sp" aria-hidden="true">'+artHTML('idleA|idleB',3)+'</span></div><div class="fl">'+qs+'</div>';
      wrap.appendChild(c);
      var items=$$('.px-fq',c),sp=$('.sp',c),timer=null,open=-1;
      function setOpen(k){clearTimeout(timer);
        items.forEach(function(it,j){var on=j===k;it.classList.toggle('open',on);$('button',it).setAttribute('aria-expanded',String(on));$('.ans',it).hidden=!on;$('.sign',it).textContent=on?'−':'+';if(!on)$('.typed',it).textContent='';});
        open=k;if(k<0)return;
        sp.classList.remove('react');void sp.offsetWidth;sp.classList.add('react');
        var full=col.q[k][1],out=$('.typed',items[k]);
        if(reduce){out.textContent=full;return;}
        var n=0;(function type(){n=Math.min(full.length,n+3);out.textContent=full.slice(0,n);if(n<full.length)timer=setTimeout(type,14);})();}
      items.forEach(function(it,k){$('button',it).addEventListener('click',function(){setOpen(open===k?-1:k);});});
    });
    arts(wrap);
    reveal($$('.px-fcol',wrap),function(c,i){c.style.animation='pxQuestIn .6s steps(6) '+(i*0.15)+'s backwards';},{threshold:.1});
  })();

  /* ================= CONTACT FORM (EmailJS) ================= */
  (function(){
    var EJ={serviceId:'service_05n4q3i',templateId:'template_umulqsu',autoReplyId:'template_qwx24uy',publicKey:'v_Ouj9qhvcE-3EJqi'};
    var TO='calarananraphael@gmail.com';
    var f=$('#px-form');if(!f)return;
    var E=f.elements,st=$('.px-status',f),btn=$('.submit',f),cnt=$('.count',f),sending=false;
    btn.setAttribute('data-cursor','SEND');
    var rules={
      user_name:function(v){return v.trim().length>1?'':'Please enter your full name.';},
      user_email:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())?'':'Please enter a valid email, like name@example.com.';},
      service_type:function(v){return v?'':'Please choose a type of service.';},
      user_message:function(v){return v.trim().length>=10?'':'Please write a short message (at least 10 characters).';}
    };
    function check(i){var m=rules[i.name](i.value),fl=i.closest('.px-field');fl.classList.toggle('bad',!!m);$('.err',fl).textContent=m;i.setAttribute('aria-invalid',m?'true':'false');return !m;}
    Object.keys(rules).forEach(function(n){var i=E[n];
      i.addEventListener('blur',function(){if(i.value)check(i);});
      i.addEventListener('input',function(){if(i.closest('.px-field').classList.contains('bad'))check(i);});
      i.addEventListener('change',function(){if(i.closest('.px-field').classList.contains('bad'))check(i);});});
    E.user_message.addEventListener('input',function(){cnt.textContent=E.user_message.value.length+' / 2000';});
    function status(kind,title,html){st.className='px-status show '+kind;st.innerHTML='<b>'+title+'</b>'+html;}
    function done(){f.classList.remove('sending');btn.disabled=false;sending=false;}
    function send(){
      if(sending)return;
      if(E.company.value){status('ok','MESSAGE SENT!','Thanks for reaching out.');f.reset();return;}
      var bad=null;Object.keys(rules).forEach(function(n){if(!check(E[n])&&!bad)bad=E[n];});
      if(bad){bad.focus();status('bad','CHECK THE FORM','A few fields need a quick fix before your message can go out.');return;}
      if(!window.emailjs||!window.emailjs.send){
        status('bad','FORM UNAVAILABLE','The message service did not load. Please email <a href="mailto:'+TO+'">'+TO+'</a> or use one of the quick links instead.');
        console.warn('[Raphael_Pixel] EmailJS SDK not loaded');return;}
      var name=E.user_name.value.trim(),email=E.user_email.value.trim(),svc=E.service_type.value,msg=E.user_message.value.trim();
      /* EmailJS template variables: {{user_name}} {{user_email}} {{service_type}} {{user_message}} (plus {{reply_to}} for the Reply To field) */
      var params={user_name:name,user_email:email,service_type:svc,user_message:msg,reply_to:email};
      /* the auto reply gets the same data plus common aliases, so its "To Email" works whether it is set to
         {{user_email}}, {{to_email}}, {{email}} or {{reply_to}}. Whatever the visitor types is where it goes. */
      var replyParams={user_name:name,user_email:email,service_type:svc,user_message:msg,reply_to:email,to_email:email,email:email,to_name:name,from_name:'Raphael Robin Calaranan'};
      sending=true;btn.disabled=true;f.classList.add('sending');st.className='px-status';
      var opts={publicKey:EJ.publicKey};
      window.emailjs.send(EJ.serviceId,EJ.templateId,params,opts).then(function(){
        /* wait a moment before the auto reply (EmailJS limits back to back requests), then retry once if needed */
        function autoReply(tries){
          window.emailjs.send(EJ.serviceId,EJ.autoReplyId,replyParams,opts).then(function(){console.info('[Raphael_Pixel] auto reply sent to',email);},function(err){
            console.warn('[Raphael_Pixel] auto reply failed (status '+(err&&err.status)+'):',err&&err.text);
            if(tries>0)setTimeout(function(){autoReply(tries-1);},2500);
            else{var w=document.createElement('span');w.className='arw';w.textContent=' (Heads up: the confirmation email could not be sent, but Raphael still got your message.)';st.appendChild(w);}
          });
        }
        setTimeout(function(){autoReply(1);},1200);
        var first=name.split(' ')[0];
        status('ok','MESSAGE SENT!','Thanks, '+esc(first)+'! Raphael got your message and will reply to <b class="em">'+esc(email)+'</b>. A confirmation email is on its way to you as well.');
        f.reset();cnt.textContent='0 / 2000';var n=$('#px-sel');if(n)n.classList.remove('show');
        toast('QUEST REQUEST SENT','MESSAGE DELIVERED');
        setTimeout(done,reduce?0:1100);
      },function(err){
        console.warn('[Raphael_Pixel] EmailJS error',err);
        status('bad','SOMETHING WENT WRONG','Your message did not go through. Please try again in a moment, or email <a href="mailto:'+TO+'">'+TO+'</a> directly.');
        done();
      });
    }
    /* the button is wired directly so it works everywhere, even where form submission is blocked */
    btn.addEventListener('click',function(e){e.preventDefault();send();});
    f.addEventListener('submit',function(e){e.preventDefault();send();});
    $$('input',f).forEach(function(i){i.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();send();}});});
  })();
  /* ================= V2: REVEAL CONTACT PANEL ================= */
  reveal([$('.px-cp-left'),$('#px-form')],function(p,i){p.style.animation='pxBoxIn .5s steps(5) '+(i*0.15)+'s backwards';},{threshold:.15});
})();
