/* Turnamen Catur KSL — prototype shared script: sample data, layout shell, guide, helpers.
   No backend: edits (results, players) are kept in this browser's localStorage only. */
(function(){
// ---------- icons (minimal stroke SVG) ----------
const P={
 crown:'<path d="M4 18h16M5 18 3 7l5 4 4-6 4 6 5-4-2 11"/>',
 home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
 swap:'<path d="M7 4 3 8l4 4"/><path d="M3 8h14"/><path d="m17 20 4-4-4-4"/><path d="M21 16H7"/>',
 trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 grid:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 qr:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>',
 share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
 phone:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
 laptop:'<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
 guide:'<path d="m3 6 2 2 3-3M3 13l2 2 3-3M11 6h10M11 13h10M11 20h10"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 upload:'<path d="M12 15V3M7 8l5-5 5 5"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
 edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/>',
 flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
 lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
 left:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
 right:'<path d="m9 6 6 6-6 6"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 pin:'<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 out:'<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>',
 org:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
 check:'<path d="m5 12 5 5 9-10"/>',
 x:'<path d="M6 6l12 12M18 6 6 18"/>',
 msg:'<path d="M4 20l1.5-4A8 8 0 1 1 8 18.5z"/>',
 copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
 list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
 star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
 dash:'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><path d="M3 16h7v5H3z"/>'
};
const AVC=["#e7efeb","#f6efe2","#e8eef6","#f3e8ee","#ececee","#eef3e2"];
const av=(n,c="")=>{const h=[...n].reduce((a,ch)=>a+ch.charCodeAt(0),0);return `<span class="av ${c}" style="background:${AVC[h%AVC.length]}">${n.split(/\s+/).map(w=>w[0]).join("").slice(0,2).toUpperCase()}</span>`};
const tip=t=>`<span class="tip" role="button" tabindex="0" data-act="tip" data-t="${t.replace(/"/g,"&quot;")}" aria-label="Penjelasan">?</span>`;
const icon=(n,c="")=>`<svg class="ic ${c}" viewBox="0 0 24 24" aria-hidden="true">${P[n]||""}</svg>`;

// ---------- sample data ----------
const A=[["Raihan",1652,"Bugih"],["Radit",1611,"Pamekasan"],["Fikri",1585,"Galis"],["Abdi",1560,"Pamekasan"],["Robet",1534,"Bugih"],["Navil",1510,"Pademawu"],["Yoga",1497,"Pamekasan"],["Reza",1480,"Larangan"]];
const B=[["Alvin",1310,"Pamekasan"],["Dafa",1288,"Bugih"],["Fauzi",1260,"Galis"],["Hasan",1241,"Pamekasan"],["Jaka",1220,"Pademawu"],["Leo",1198,"Bugih"],["Sahrul",1175,"Larangan"],["Yuda",1150,"Pamekasan"]];
const mk=l=>l.map((p,i)=>({id:i,name:p[0],rtg:p[1],club:p[2]}));
// round robin by circle method: n players -> n-1 rounds
function rr(n){const a=[...Array(n).keys()],R=[];for(let r=0;r<n-1;r++){const g=[];for(let i=0;i<n/2;i++){let w=a[i],b=a[n-1-i];if((i===0&&r%2)||(i>0&&(i+r)%2))[w,b]=[b,w];g.push({w,b,res:null})}R.push(g);a.splice(1,0,a.pop())}return R}
let seed=7;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
function play(c,n){c.rounds.forEach((g,ri)=>{if(ri>=n)return;g.forEach(x=>{const d=c.players[x.w].rtg-c.players[x.b].rtg+30,v=rnd()+d/400;x.res=v>.62?"1-0":v<.38?"0-1":"½-½"})})}
const TOURS=[
 {id:"ksl",name:"Turnamen Penggalangan Dana KSL",org:"KSL",place:"Rumah Raihan, Pamekasan",date:"Ahad, 12 Jul 2026",time:"07.00 - 09.00 WIB",status:"live",sys:"Liga satu putaran",fee:"Rp 5.000",tb:"Pertemuan langsung, Jumlah menang, Sonneborn-Berger, Koya",
  classes:[{name:"Kelas A",desc:"Kemampuan tinggi",players:mk(A),rounds:rr(8),pub:5},{name:"Kelas B",desc:"Menengah / pemula",players:mk(B),rounds:rr(8),pub:5}]},
 {id:"pahlawan",name:"Turnamen Catur Hari Pahlawan 2026",org:"KSL",place:"Pamekasan",date:"10 Nov 2026",status:"done",sys:"Swiss 7 babak",n:80},
 {id:"galis",name:"Open Galis Cup",org:"Komunitas Catur Galis",place:"Galis",date:"29 Nov 2026",status:"soon",sys:"Swiss 5 babak",n:32},
 {id:"pelajar",name:"Rintisan Pelajar Pamekasan",org:"KSL",place:"SMPN 1 Pamekasan",date:"6 Des 2026",status:"soon",sys:"Gugur",n:16}
];
const T=TOURS[0];
T.classes.forEach(c=>play(c,4));
// restore edits saved in this browser
const KEY="ksl-proto-v2";
try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(s)s.forEach((k,i)=>{const c=T.classes[i];c.pub=k.pub;if(k.players)c.players=k.players;else(k.extra||[]).forEach(p=>c.players.push(p));k.res.forEach((g,ri)=>g.forEach((r,bi)=>{const x=c.rounds[ri][bi];if(Array.isArray(r)){x.w=r[0];x.b=r[1];x.res=r[2]}else x.res=r}))})}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(T.classes.map(c=>({pub:c.pub,players:c.players,res:c.rounds.map(g=>g.map(x=>[x.w,x.b,x.res]))}))))}catch(e){}}
function reset(){try{localStorage.removeItem(KEY);localStorage.removeItem("ksl-pending");localStorage.removeItem("ksl-plan")}catch(e){}location.reload()}

// ---------- glossary & tie-break presets ----------
const TERMS={
 "Pertemuan langsung":"Siapa yang menang saat dua pemain dengan poin sama saling bertemu.",
 "Jumlah menang":"Pemain dengan kemenangan lebih banyak diunggulkan.",
 "Sonneborn-Berger":"Poin lawan yang dikalahkan + setengah poin lawan yang seri. Menang dari lawan kuat bernilai lebih.",
 "Koya":"Poin yang diraih melawan pemain yang mendapat minimal setengah poin maksimal.",
 "Buchholz":"Jumlah poin semua lawan. Makin berat lawan yang dihadapi, makin tinggi.",
 "Buchholz Cut-1":"Buchholz tanpa lawan dengan poin terendah, supaya satu lawan lemah tidak merugikan.",
 "Rata-rata rating lawan":"Rata-rata rating semua lawan yang dihadapi.",
 "Menang dengan hitam":"Jumlah kemenangan saat bermain dengan buah hitam.",
 "Bye":"Tidak dapat lawan di babak itu karena jumlah pemain ganjil. Biasanya dapat 1 poin.",
 "WO":"Menang karena lawan tidak hadir. Tidak dihitung untuk rating."
};
const TB={
 rr:["Pertemuan langsung","Jumlah menang","Sonneborn-Berger","Koya","Menang dengan hitam"],
 swiss:["Buchholz Cut-1","Buchholz","Pertemuan langsung","Jumlah menang","Sonneborn-Berger","Rata-rata rating lawan","Menang dengan hitam"],
 ko:[]
};

// ---------- chess helpers ----------
const score=r=>r==="1-0"?[1,0]:r==="0-1"?[0,1]:r==="½-½"?[.5,.5]:null;
function standings(c){
  const s=c.players.map(p=>({...p,pts:0,w:0,d:0,l:0,g:0,opp:[]}));
  c.rounds.forEach(g=>g.forEach(x=>{const p=score(x.res);if(!p)return;[[x.w,x.b,p[0]],[x.b,x.w,p[1]]].forEach(([me,op,v])=>{const m=s[me];m.pts+=v;m.g++;v===1?m.w++:v===0?m.l++:m.d++;m.opp.push([op,v])})}));
  s.forEach(p=>{
    p.sb=p.opp.reduce((a,[o,v])=>a+v*s[o].pts,0);          // Sonneborn-Berger
    p.bh=p.opp.reduce((a,[o])=>a+s[o].pts,0);              // Buchholz
    p.koya=p.opp.reduce((a,[o,v])=>a+(s[o].pts>=s[o].g/2?v:0),0); // Koya: vs opponents on >= 50%
  });
  // round-robin order: points, direct encounter, wins, Sonneborn-Berger, rating
  const h2h=(a,b)=>{const m=a.opp.find(([o])=>o===b.id);return m?(m[1]===1?-1:m[1]===0?1:0):0};
  return s.slice().sort((a,b)=>b.pts-a.pts||h2h(a,b)||b.w-a.w||b.sb-a.sb||b.koya-a.koya||b.rtg-a.rtg);
}
const curRound=c=>{const i=c.rounds.findIndex(g=>g.some(x=>!x.res));return i<0?c.rounds.length:i+1};
const doneRounds=c=>c.rounds.filter(g=>g.every(x=>x.res)).length;
const fmt=n=>n===0?"0":n<1?"½":(n%1?Math.floor(n)+"½":String(n));
const pill=s=>s==="live"?'<span class="pill live">Berlangsung</span>':s==="done"?'<span class="pill ok">Selesai</span>':'<span class="pill">Segera</span>';

// ---------- share & self-registration ----------
const shareUrl=()=>location.href.replace(/[^/]*$/,"turnamen.html?kelas=0");
function copyLink(){const u=shareUrl();(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>toast("Link disalin"),()=>{prompt("Salin link ini:",u)})}
const waHref=()=>"https://wa.me/?text="+encodeURIComponent("Pairing & klasemen "+T.name+": "+shareUrl());
const PKEY="ksl-pending";
const pending=()=>{try{return JSON.parse(localStorage.getItem(PKEY)||"[]")}catch(e){return[]}};
const setPending=a=>{try{localStorage.setItem(PKEY,JSON.stringify(a))}catch(e){}};

// ---------- plan (free / premium), simulated in this browser ----------
const plan=()=>{try{return localStorage.getItem("ksl-plan")||"free"}catch(e){return"free"}};
const setPlan=v=>{try{localStorage.setItem("ksl-plan",v)}catch(e){}};
const pro=()=>plan()!=="free";
const proPill='<span class="pill pro">Premium</span>';

// ---------- url params ----------
const Q=new URLSearchParams(location.search);
const qp=(k,d)=>Q.has(k)?Q.get(k):d;
const kelas=()=>Math.min(+qp("kelas",0)||0,T.classes.length-1);
// link that keeps the selected class and search
function link(page,extra={}){const u=new URLSearchParams();u.set("kelas",kelas());if(Q.get("cari"))u.set("cari",Q.get("cari"));for(const k in extra)extra[k]==null?u.delete(k):u.set(k,extra[k]);return page+"?"+u}
function setParam(k,v){v?Q.set(k,v):Q.delete(k);history.replaceState(null,"",location.pathname+"?"+Q)}

// ---------- shell ----------
const page=document.body.dataset.page, area=document.body.dataset.area||"publik";
const GUIDE=[
 ["Penonton & pemain",[
  ["index","Beranda","Daftar turnamen yang berlangsung, jadwal, dan arsip. Tanpa login."],
  ["turnamen","Ringkasan turnamen","Info lokasi, jadwal, kelas, pemimpin klasemen, dan QR."],
  ["pairing","Pairing per babak","Lawan, nomor meja, dan warna buah. Pilih kelas dan babak."],
  ["klasemen","Klasemen","Poin dan tie-break dihitung otomatis. Juara 1-3 ditandai."],
  ["peserta","Daftar peserta","Semua pemain per kelas dengan rating dan asal klub."],
  ["tabel-silang","Tabel silang","Hasil semua pertemuan dalam satu tabel."],
  ["daftar-peserta","Daftar jadi peserta","Pemain mendaftar sendiri. Panitia tinggal menerima."],
  ["pemain","Detail pemain","Riwayat lawan dan hasil tiap babak satu pemain."]]],
 ["Panitia / wasit",[
  ["masuk","Masuk","Hanya panitia yang login. Penonton tidak perlu akun."],
  ["daftar","Daftar penyelenggara","Klub atau komunitas lain bisa membuat akun sendiri."],
  ["panel","Dashboard","Ringkasan turnamen milik penyelenggara."],
  ["panel-buat","Buat turnamen","Tiga langkah: info, kelas dan sistem, lalu terbitkan."],
  ["panel-pemain","Kelola pemain","Tambah manual atau impor Excel, per kelas."],
  ["panel-babak","Babak dan hasil","Isi hasil per meja, lalu buat pairing babak berikutnya."],
  ["panel-penyelenggara","Penyelenggara (admin KSL)","Pantau dan setujui klub lain yang mendaftar."],
  ["paket","Paket Gratis / Premium","Fitur inti gratis. Premium untuk fitur tambahan."]]],
];
const file=id=>(id==="index"?"index":id)+".html";
let done={};try{done=JSON.parse(localStorage.getItem("ksl-guide")||"{}")}catch(e){}

function shell(){
  const app=document.getElementById("app");
  const isPanel=area==="panel", ph=document.body.classList.contains("phone");
  document.body.classList.toggle("area-panel",isPanel);
  const brand=`<a href="index.html" class="logo"><img class="ksl-logo" src="assets/ksl-logo.png" alt="Logo KSL"><span class="wm">KSL</span></a>`;
  const head=`<header><div class="hbar">
    ${brand}
    <span class="sp"></span>
    <div class="toolbar">
            ${isPanel?`<a class="tb" href="index.html" title="Lihat halaman penonton">${icon("home")}<span class="dsk">Tampilan publik</span></a>`:`<a class="tb" href="panel.html" title="Lihat halaman panitia">${icon("lock")}<span class="dsk">Tampilan panitia</span></a>`}
      <span class="div"></span>
      <button class="tb" data-act="device" title="Ganti tampilan laptop / HP">${icon(ph?"laptop":"phone")}<span class="dsk">${ph?"Laptop":"Tampilan HP"}</span></button>
      <span class="div"></span>
      <button class="tb" data-act="guide">${icon("guide")}Guide <span class="count" id="gCount"></span></button>
    </div>
  </div></header>`;
  const railItems=isPanel
    ?[["panel","dash","Dashboard"],["panel-babak","flag","Babak dan hasil"],["panel-pemain","users","Pemain"],["panel-buat","plus","Buat turnamen"],["panel-penyelenggara","org","Penyelenggara"],["paket","star","Paket"],0,["index","home","Halaman publik"],["masuk","out","Keluar"]]
    :[["index","home","Beranda"],["turnamen","info","Ringkasan turnamen"],["pairing","swap","Pairing"],["klasemen","trophy","Klasemen"],["peserta","users","Peserta"],0,["panel","lock","Panel panitia"]];
  const href=x=>["index","masuk","panel"].includes(x[0])||isPanel?file(x[0]):link(file(x[0]));
  const rail=isPanel
    ?`<nav class="rail wide">${brand}${railItems.map(x=>x?`<a class="it ${page===x[0]?"on":""}" href="${href(x)}">${icon(x[1],"lg")}${x[2]}</a>`:"<hr>").join("")}<div class="me">${av("Mukhlish")}<div><b>Mukhlish</b><span class="mute">Admin KSL · ${pro()?"Premium":"Gratis"}</span></div></div></nav>`
    :"";
  const tabs=isPanel
    ?[["panel","dash","Dashboard"],["panel-babak","flag","Babak"],["panel-pemain","users","Pemain"],["panel-buat","plus","Buat"],["panel-penyelenggara","org","Klub"]]
    :[["index","home","Beranda"],["pairing","swap","Pairing"],["klasemen","trophy","Klasemen"],["masuk","lock","Panitia"]];
  const bnav=`<nav class="bnav">${tabs.map(([p,i,l])=>`<a href="${p==="index"||p==="masuk"||isPanel?file(p):link(file(p))}" class="${page===p?"on":""}">${icon(i,"lg")}${l}</a>`).join("")}</nav>`;
  app.insertAdjacentHTML("afterbegin",rail+head);
  app.insertAdjacentHTML("beforeend",bnav);
  document.body.insertAdjacentHTML("beforeend",`<aside id="guide"><div class="gh"><b>Guide</b><div class="bar"><i id="gBar"></i></div><button class="btn alt sm" data-act="guide-close">${icon("x")}Tutup</button></div><ol id="gList"></ol><div class="pad bt sm mute">Centang fitur yang sudah dicoba. <button class="lnk" data-act="reset">Reset data contoh</button></div></aside><div id="shade" data-act="guide-close"></div><div id="toast"></div>`);
  renderGuide();
}
function renderGuide(){
  let n=0,tot=0,h="";
  GUIDE.forEach(([grp,items])=>{h+=`<div class="grp">${grp}</div>`;items.forEach(([p,t,d])=>{tot++;if(done[p])n++;h+=`<li class="${p===page?"here":""}"><input type="checkbox" data-guide="${p}" ${done[p]?"checked":""} aria-label="Sudah dicoba"><div><b>${t}</b><span class="mute sm">${d}</span> ${p===page?'<span class="pill acc">halaman ini</span>':`<a class="lnk sm" href="${file(p)}">Buka</a>`}</div></li>`})});
  document.getElementById("gList").innerHTML=h;
  document.getElementById("gCount").textContent=n+"/"+tot;
  document.getElementById("gBar").style.width=(n/tot*100)+"%";
}
function toast(t,ic="check",ms=1900){const e=document.getElementById("toast");e.innerHTML=icon(ic)+"<span>"+t+"</span>";e.classList.add("on");clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove("on"),ms)}

// ---------- shared blocks ----------
function tourHead(active){
  const k=kelas();
  const tabs=[["turnamen","info","Ringkasan"],["pairing","swap","Pairing"],["klasemen","trophy","Klasemen"],["peserta","users","Peserta"],["tabel-silang","grid","Tabel silang","Silang"]];
  return `<a class="back" href="index.html">${icon("left")}Semua turnamen</a>
  <div class="card mb">
    <div class="pad">
      <div class="row between nowrap"><h1>${T.name}</h1>${pill(T.status)}</div>
      <div class="meta mt2"><span>${icon("cal")}${T.date}</span><span>${icon("pin")}${T.place}</span><span>${icon("list")}${T.sys}</span><span class="pill acc">KSL</span></div>
      <div class="row mt">
        <div class="seg">${T.classes.map((c,i)=>`<a class="${i===k?"on":""}" href="${link(file(active),{kelas:i,babak:null})}">${c.name}</a>`).join("")}</div>
        <div class="input-ic" style="flex:1;max-width:240px;min-width:150px">${icon("search")}<input id="cari" placeholder="Cari nama saya" value="${Q.get("cari")||""}"></div>
      </div>
    </div>
    <nav class="tabs bt">${tabs.map(([p,i,l,s])=>`<a class="${p===active?"on":""}" href="${link(file(p))}">${icon(i)}<span class="dsk">${l}</span><span class="mob">${s||l}</span></a>`).join("")}</nav>
  </div>`;
}
const hit=p=>{const q=(Q.get("cari")||"").toLowerCase();return q&&p.name.toLowerCase().includes(q)};
const pLink=(id,name,withAv)=>{const a=`<a class="nm" href="${link("pemain.html",{id})}">${name}</a>`;return withAv?`<span class="who">${av(name)}${a}</span>`:a};

function panelShell(active,inner){return inner}

// ---------- render loop & events ----------
let renderFn=()=>"";
function render(){document.getElementById("view").innerHTML=renderFn()}
const acts={};
document.addEventListener("click",e=>{
  const el=e.target.closest("[data-act],[data-guide]");if(!el)return;
  if(el.dataset.guide){done[el.dataset.guide]=el.checked;try{localStorage.setItem("ksl-guide",JSON.stringify(done))}catch(_){}renderGuide();return}
  const a=el.dataset.act;
  if(a==="guide")document.getElementById("guide").classList.add("open");
  else if(a==="guide-close")document.getElementById("guide").classList.remove("open");
  else if(a==="device"){const on=document.body.classList.toggle("phone");try{localStorage.setItem("ksl-phone",on?"1":"")}catch(_){}document.querySelector("header").remove();document.querySelector(".rail").remove();document.querySelector(".bnav").remove();document.getElementById("guide").remove();document.getElementById("shade").remove();document.getElementById("toast").remove();shell()}
  else if(a==="reset")reset();
  else if(a==="pro"){e.preventDefault();if(pro())toast(el.dataset.f+" (Premium) dijalankan");else location.href="paket.html?f="+encodeURIComponent(el.dataset.f)}
  else if(a==="tip"){e.preventDefault();toast(el.dataset.t,"info",Math.max(2500,el.dataset.t.length*60))}
  else if(acts[a]){e.preventDefault();acts[a](el);render()}
});
document.addEventListener("input",e=>{if(e.target.id!=="cari")return;const pos=e.target.selectionStart;setParam("cari",e.target.value);render();const f=document.getElementById("cari");f.focus();f.setSelectionRange(pos,pos)});

try{if(localStorage.getItem("ksl-phone"))document.body.classList.add("phone")}catch(e){}
shell();

window.KSL={plan,setPlan,pro,proPill,tip,copyLink,waHref,pending,setPending,TERMS,TB,av,T,TOURS,icon,standings,curRound,doneRounds,fmt,pill,kelas,qp,link,setParam,tourHead,panelShell,hit,pLink,toast,save,score,
  page(fn,actions={}){renderFn=fn;Object.assign(acts,actions);render()},render};
})();
