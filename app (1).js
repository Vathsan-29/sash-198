(function(){
var $=function(i){return document.getElementById(i)},N=PAGES.length,cur=0,shown=false,fav={};
try{fav=JSON.parse(localStorage.getItem("sahanaFav")||"{}")}catch(e){}
var sky=$("sky"),box=$("hearts"),nm=$("name"),wrap=$("nameWrap");

/* sound: generated in code, off by default */
var ac,on=false,mt,notes=[261.6,329.6,392,440,523.3,392,329.6,293.7],ni=0;
function ctx(){if(!ac)ac=new(window.AudioContext||window.webkitAudioContext)();if(ac.state==="suspended")ac.resume();return ac}
function tone(f,dt,d,v){try{var a=ctx(),t=a.currentTime+dt,o=a.createOscillator(),g=a.createGain();o.type="sine";o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.06);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+.1)}catch(e){}}
function chime(){if(on){tone(880,0,1.6,.08);tone(1318.5,.16,2,.06)}}
$("snd").onclick=function(){on=!on;this.textContent=on?"sound on":"sound off";this.setAttribute("aria-pressed",on);clearInterval(mt);if(on){ctx();mt=setInterval(function(){tone(notes[ni++%notes.length],0,3.6,.035)},1900)}};

/* hearts */
function hearts(b){
  box.innerHTML="";var n=innerWidth<600?14:26;
  for(var i=0;i<n;i++){
    var h=document.createElement("div");h.className="h h"+b;h.textContent="♥";
    var s=(Math.random()*40+14),sw=(Math.random()*90+20)*(Math.random()<.5?-1:1);
    h.style.cssText="left:"+(Math.random()*94)+"%;font-size:"+s+"px;--s:"+sw+"px;--t:"+(b===3?(4+Math.random()*4):(11+Math.random()*12))+"s;--d:-"+(Math.random()*20)+"s;opacity:"+(.55+Math.random()*.45);
    if(b===3)h.style.top=(6+Math.random()*84)+"%";
    h.addEventListener("pointerdown",pop);box.appendChild(h);
  }
}
function pop(e){
  var r=this.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
  for(var i=0;i<14;i++){
    var s=document.createElement("span");s.className="sp";s.textContent=i%3?"✦":"♡";
    var a=Math.random()*6.28,d=40+Math.random()*90;
    s.style.cssText="left:"+x+"px;top:"+y+"px;font-size:"+(10+Math.random()*14)+"px;--dx:"+Math.cos(a)*d+"px;--dy:"+(Math.sin(a)*d+30)+"px";
    document.body.appendChild(s);setTimeout(function(q){q.remove()},1000,s);
  }
  this.remove();
  if(shown)return;
  shown=true;
  var w=wrap.getBoundingClientRect();
  nm.style.setProperty("--ox",(x-innerWidth/2)+"px");nm.style.setProperty("--oy",(y-(w.top+w.height/2))+"px");
  nm.className="show a"+PAGES[cur][6];
  $("hint").style.opacity=0;$("meta").classList.add("on");$("line").classList.add("on");chime();
}

/* pages */
function render(i){
  cur=i;shown=false;var p=PAGES[i],h=p[4];
  document.documentElement.style.setProperty("--g1","hsl("+h+",45%,10%)");
  document.documentElement.style.setProperty("--g2","hsl("+((h+25)%360)+",50%,26%)");
  document.documentElement.dir=p[8]?"rtl":"ltr";
  $("lang").textContent=p[0];
  nm.textContent=p[3];nm.className="";nm.style.fontFamily=p[5]+",'Noto Serif',serif";
  $("hint").style.opacity=1;
  $("meta").textContent=p[1]+" · "+p[2]+" · "+PRON+(p[9]?" · spelling not yet verified":"");
  $("meta").classList.remove("on");
  $("line").textContent=LINES[i%LINES.length];$("line").classList.remove("on");
  $("count").textContent=(i+1)+" / "+N;$("jump").value="";$("jump").max=N;
  $("fav").textContent=fav[i]?"♥":"♡";$("fav").classList.toggle("on",!!fav[i]);
  $("prev").disabled=false;$("prev").style.visibility=i?"visible":"hidden";
  hearts(p[7]);
}
function show(id){["intro","page","final"].forEach(function(k){$(k).hidden=k!==id})}
function go(i){if(i>=N){fin();return}render(Math.max(0,i));show("page")}
function fin(){box.innerHTML="";document.documentElement.dir="ltr";$("msg").textContent=FINAL;$("grid").hidden=true;
  $("grid").innerHTML="";PAGES.forEach(function(p,i){var b=document.createElement("button");b.textContent=p[3];b.title=p[0];b.style.fontFamily=p[5]+",serif";b.onclick=function(){go(i)};$("grid").appendChild(b)});
  show("final");hearts(3);chime()}
$("next").onclick=function(){go(cur+1)};
$("prev").onclick=function(){go(cur-1)};
$("jump").onkeydown=function(e){if(e.key==="Enter"){var v=parseInt(this.value,10);if(v>=1&&v<=N)go(v-1)}};
$("fav").onclick=function(){fav[cur]=!fav[cur];this.textContent=fav[cur]?"♥":"♡";this.classList.toggle("on",!!fav[cur]);try{localStorage.setItem("sahanaFav",JSON.stringify(fav))}catch(e){}};
$("gridBtn").onclick=function(){var g=$("grid");g.hidden=!g.hidden};
$("back").onclick=function(){go(0)};
function begin(){go(0)}
$("begin").onclick=begin;$("begin").onkeydown=function(e){if(e.key==="Enter"||e.key===" ")begin()};
document.addEventListener("keydown",function(e){if($("page").hidden||e.target.id==="jump")return;if(e.key==="ArrowRight")go(cur+1);if(e.key==="ArrowLeft"&&cur)go(cur-1)});
hearts(3);
})();
