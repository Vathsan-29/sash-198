(function(){
var $=function(i){return document.getElementById(i)},N=PAGES.length,cur=0,shown=true,fav={};
try{fav=JSON.parse(localStorage.getItem("sahanaFav")||"{}")}catch(e){}
var sky=$("sky"),box=$("hearts"),nm=$("name"),wrap=$("nameWrap");

/* sound: generated in code, off by default */
var ac,on=false,mt,notes=[261.6,329.6,392,440,523.3,392,329.6,293.7],ni=0;
function ctx(){if(!ac)ac=new(window.AudioContext||window.webkitAudioContext)();if(ac.state==="suspended")ac.resume();return ac}
function tone(f,dt,d,v){try{var a=ctx(),t=a.currentTime+dt,o=a.createOscillator(),g=a.createGain();o.type="sine";o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.06);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+.1)}catch(e){}}
function chime(){if(on){tone(880,0,1.6,.08);tone(1318.5,.16,2,.06)}}
$("snd").onclick=function(){on=!on;this.textContent=on?"sound on":"sound off";this.setAttribute("aria-pressed",on);clearInterval(mt);if(on){ctx();mt=setInterval(function(){tone(notes[ni++%notes.length],0,3.6,.035)},1900)}};

/* hearts */
var beh=3,rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function add(b,fresh){
  var h=document.createElement("div");h.className="h h"+b;h.textContent="♥\uFE0E";
  var s=Math.random()*34+30,sw=(Math.random()*90+20)*(Math.random()<.5?-1:1);
  h.style.cssText="left:"+(Math.random()*90)+"%;font-size:"+s+"px;--s:"+sw+"px;--t:"+(b===3?(4+Math.random()*4):(11+Math.random()*12))+"s;--d:"+(fresh?"0":"-"+(Math.random()*20))+"s;opacity:"+(.55+Math.random()*.45);
  if(b===3)h.style.top=(8+Math.random()*80)+"%";
  box.appendChild(h);
}
function hearts(b){if(rm)b=3;beh=b;box.innerHTML="";for(var i=0;i<(innerWidth<600?14:26);i++)add(b)}
function pop(el){
  var r=el.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
  for(var i=0;i<14;i++){
    var s=document.createElement("span");s.className="sp";s.textContent=i%3?"✦":"♡\uFE0E";
    var a=Math.random()*6.28,d=40+Math.random()*90;
    s.style.cssText="left:"+x+"px;top:"+y+"px;font-size:"+(10+Math.random()*14)+"px;--dx:"+Math.cos(a)*d+"px;--dy:"+(Math.sin(a)*d+30)+"px";
    document.body.appendChild(s);setTimeout(function(q){q.remove()},1000,s);
  }
  el.remove();add(beh,true);
  if(shown)return;
  shown=true;
  var w=wrap.getBoundingClientRect();
  nm.style.setProperty("--ox",(x-innerWidth/2)+"px");nm.style.setProperty("--oy",(y-(w.top+w.height/2))+"px");
  nm.className="show a"+PAGES[cur][6];
  $("hint").style.opacity=0;$("meta").classList.add("on");$("line").classList.add("on");chime();
}

/* pages */
function render(i){
  cur=i;shown=false;var p=PAGES[i],h=322+(p[4]%16);
  document.documentElement.style.setProperty("--g1","hsl("+h+",78%,60%)");
  document.documentElement.style.setProperty("--g2","hsl("+h+",95%,80%)");
  nm.dir=p[8]?"rtl":"ltr";
  $("lang").textContent=p[0];
  nm.textContent=p[3];nm.className="";nm.style.fontFamily=p[5]+",'Noto Serif',serif";
  $("hint").style.opacity=1;
  $("meta").textContent=p[1]+" · "+p[2]+" · "+PRON+(p[9]?" · spelling not yet verified":"");
  $("meta").classList.remove("on");
  $("line").textContent=LINES[i%LINES.length];$("line").classList.remove("on");
  $("count").textContent=(i+1)+" / "+N;$("jump").value="";$("jump").max=N;
  $("fav").textContent=fav[i]?"♥\uFE0E":"♡\uFE0E";$("fav").classList.toggle("on",!!fav[i]);
  $("prev").disabled=false;$("prev").style.visibility=i?"visible":"hidden";
  hearts(p[7]);
}
function show(id){["intro","page","final"].forEach(function(k){$(k).hidden=k!==id})}
function go(i){if(i>=N){fin();return}render(Math.max(0,i));show("page")}
function fin(){shown=true;box.innerHTML="";$("msg").textContent=FINAL;$("grid").hidden=true;
  $("grid").innerHTML="";PAGES.forEach(function(p,i){var b=document.createElement("button");b.textContent=p[3];b.title=p[0];b.style.fontFamily=p[5]+",serif";b.onclick=function(){go(i)};$("grid").appendChild(b)});
  show("final");hearts(3);chime()}
$("next").onclick=function(){go(cur+1)};
$("prev").onclick=function(){go(cur-1)};
$("jump").onchange=function(){var v=parseInt(this.value,10);if(v>=1&&v<=N)go(v-1)};
$("fav").onclick=function(){fav[cur]=!fav[cur];this.textContent=fav[cur]?"♥\uFE0E":"♡\uFE0E";this.classList.toggle("on",!!fav[cur]);try{localStorage.setItem("sahanaFav",JSON.stringify(fav))}catch(e){}};
$("gridBtn").onclick=function(){var g=$("grid");g.hidden=!g.hidden};
$("back").onclick=function(){go(0)};
function begin(){go(0)}
$("begin").onclick=begin;$("begin").onkeydown=function(e){if(e.key==="Enter"||e.key===" ")begin()};
document.addEventListener("keydown",function(e){if($("page").hidden||e.target.id==="jump")return;if(e.key==="ArrowRight")go(cur+1);if(e.key==="ArrowLeft"&&cur)go(cur-1)});
/* forgiving taps: the nearest heart within reach pops, even if something sits on top of it */
function hit(e){
  if(e.target.closest&&e.target.closest("button,input,nav,header"))return;
  var best=null,bd=1e9,hs=box.children;
  for(var i=0;i<hs.length;i++){var r=hs[i].getBoundingClientRect(),d=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2));
    if(d<Math.max(44,r.width/2+16)&&d<bd){bd=d;best=hs[i]}}
  if(best)pop(best);
}
window.addEventListener("pointerdown",hit);
hearts(3);
})();
