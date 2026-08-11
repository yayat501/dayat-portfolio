
(function(){
  const base = window.PORTFOLIO_DATA || {profile:{},projects:[]};
  let data = base;
  try{
    const local = localStorage.getItem('dayatPortfolioData');
    if(local) data = JSON.parse(local);
  }catch(e){ console.warn(e); }

  const p = data.profile || {};
  const txt = (id, value) => { const el=document.getElementById(id); if(el && value) el.textContent=value; };
  txt('brand', p.brand);
  txt('brandFooter', p.brand);
  txt('heroName', p.name ? `Halo! Saya ${p.name}` : 'Halo!');
  txt('headline', p.headline);
  txt('subheadline', p.subheadline);
  txt('aboutText', p.about);
  txt('location', p.location);
  txt('email', p.email);

  const wa = (p.whatsapp || '').replace(/\D/g,'');
  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = `https://wa.me/${wa}?text=${encodeURIComponent('Halo, saya ingin konsultasi pembuatan website.')}`;
  });
  document.querySelectorAll('[data-instagram]').forEach(a => a.href = p.instagram || '#');
  document.querySelectorAll('[data-github]').forEach(a => a.href = p.github || '#');

  const wrap = document.getElementById('projectList');
  const projects = data.projects || [];
  if(!projects.length){
    wrap.innerHTML = '<div class="empty">Belum ada project. Tambahkan dari halaman Kelola Portofolio.</div>';
    return;
  }
  wrap.innerHTML = projects.map((pr,idx)=>{
    const feats = (pr.features||[]).slice(0,6).map(x=>`<li>${escapeHtml(x)}</li>`).join('');
    const stack = (pr.stack||[]).map(x=>`<span>${escapeHtml(x)}</span>`).join('');
    const demo = pr.demo ? `<a class="btn btn-primary" href="${safeUrl(pr.demo)}" target="_blank" rel="noopener">Lihat Demo</a>` : '';
    const gh = pr.github ? `<a class="btn btn-outline" href="${safeUrl(pr.github)}" target="_blank" rel="noopener">GitHub</a>` : '';
    return `<article class="project">
      <div class="project-img"><img src="${safeImg(pr.image)}" alt="${escapeHtml(pr.title)}" onerror="this.src='assets/img/projects/museum-nekara.svg'"></div>
      <div class="project-body">
        <div class="project-cat">${escapeHtml(pr.category||'Project')}</div>
        <h3>${escapeHtml(pr.title||`Project ${idx+1}`)}</h3>
        <p>${escapeHtml(pr.description||'')}</p>
        <ul class="features">${feats}</ul>
        <div class="stack">${stack}</div>
        ${(demo||gh)?`<div class="project-actions">${demo}${gh}</div>`:''}
      </div>
    </article>`;
  }).join('');

  function escapeHtml(v=''){return String(v).replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}
  function safeUrl(v=''){ return /^(https?:\/\/|#)/i.test(v) ? v : '#'; }
  function safeImg(v=''){ return v && !/^javascript:/i.test(v) ? v : 'assets/img/projects/museum-nekara.svg'; }
})();
