/* ==========================================================
   FOOTER: pixel character, year, back to top
   ========================================================== */
(function(){
  var f=document.getElementById('pxf'); if(!f||f.dataset.ready) return; f.dataset.ready='1';
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  f.querySelector('.pxf-year').textContent=new Date().getFullYear();
  var PAL={K:'#101426',W:'#F4F0E8',w:'#ffffff',P:'#7756D8',Y:'#FFDA78',y:'#d9a93f',R:'#FF7F91',S:'#f2c9a0',H:'#3a2a20',B:'#3a4a8a',F:'#1877f2',A:'#25D366'};
  var TOP=["...HHHH...","..HHHHHH..","..HSSSSH..","..SKSSKS..","..SSSSSS..","...SRRS...","..PPPPPP..",".SPPPPPPS.",".S.PPPP.S."];
  var ART={
    walkA:TOP.concat(["...BBBB...","...B..B...","..B....B..","..KK..KK.."]),
    walkB:TOP.concat(["...BBBB...","....BB....","....BB....","....KKK..."]),
    waveA:["...HHHH...","..HHHHHH..","..HSSSSH..","..SKSSKS.S","..SSSSSS.S","...SRRS.S.","..PPPPPPS.",".SPPPPPP..",".S.PPPP...","...BBBB...","...B..B...","...B..B...","..KK..KK.."],
    waveB:["...HHHH...","..HHHHHH..","..HSSSSH..","..SKSSKS..","..SSSSSS.S","...SRRS.S.","..PPPPPPS.",".SPPPPPP..",".S.PPPP...","...BBBB...","...B..B...","...B..B...","..KK..KK.."],
    fb:["FFFFFFFF","FFFFwwwF","FFFwFFFF","FFwwwwFF","FFFwFFFF","FFFwFFFF","FFFwFFFF","FFFwFFFF"],
    ig:["RRRRRRRR","R.....YR","R.RRRR.R","R.R..R.R","R.R..R.R","R.RRRR.R","R......R","RRRRRRRR"],
    wa:[".AAAAAA.","AAAAAAAA","AAwwwwAA","AAwAAwAA","AAwwwwAA","AAAAAAAA",".AAAAAA.","AA......"],
    calday:[".K....K.","RRRRRRRR","WWWWWWWW","WKWKWKWW","WWWWWWWW","WKWYYWKW","WWWYYWWW","WWWWWWWW"],
    mail:["yyyyyyyyyy","yyWWWWWWyy","yWyWWWWyWy","yWWyWWyWWy","yWWWyyWWWy","yWWWWWWWWy","yyyyyyyyyy"]
  };
  function sh(m,s){var o=[];for(var y=0;y<m.length;y++)for(var x=0;x<m[y].length;x++){var c=m[y][x];if(c!=='.'&&PAL[c])o.push(((x+1)*s)+'px '+((y+1)*s)+'px 0 0 '+PAL[c]);}return o.join(',');}
  function draw(n){var names=n.dataset.art.split('|'),s=+n.dataset.size||4,w=0,h=0;n.innerHTML='';
    names.forEach(function(nm,k){var m=ART[nm];if(!m)return;h=Math.max(h,m.length);m.forEach(function(r){w=Math.max(w,r.length);});var i=document.createElement('i');i.className='f'+(k+1);
      i.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(-s)+'px;top:'+(-s)+'px;box-shadow:'+sh(m,s);n.appendChild(i);});
    n.style.width=(w*s)+'px';n.style.height=(h*s)+'px';}
  [].forEach.call(f.querySelectorAll('[data-art]'),draw);
  var h2=f.querySelector('h2'),txt=h2.textContent;h2.textContent='';
  txt.split('').forEach(function(ch,i){var s=document.createElement('span');s.setAttribute('aria-hidden','true');s.style.setProperty('--i',i);s.textContent=ch===' '?'\u00a0':ch;h2.appendChild(s);});
  var ch=f.querySelector('.pxf-char .art');
  function start(){if(f.classList.contains('on'))return;f.classList.add('on');
    setTimeout(function(){ch.dataset.art='waveA|waveB';draw(ch);},reduce?0:2250);}
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){start();io.disconnect();}},{threshold:.35});io.observe(f);}else start();
  f.querySelector('.pxf-top').addEventListener('click',function(){
    window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});
    var home=document.getElementById('home');if(home){home.setAttribute('tabindex','-1');setTimeout(function(){home.focus({preventScroll:true});},reduce?0:600);}
  });
})();
