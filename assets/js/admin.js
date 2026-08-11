
(function(){
  const DEFAULT = window.PORTFOLIO_DATA || {profile:{},projects:[]};
  let data = load();
  const $ = s => document.querySelector(s);

  function load(){
    try{
      const v=localStorage.getItem('dayatPortfolioData');
      return v ? JSON.parse(v) : JSON.parse(JSON.stringify(DEFAULT));
    }catch(e){ return JSON.parse(JSON.stringify(DEFAULT)); }
  }
  function save(){
    localStorage.setItem('dayatPortfolioData', JSON.stringify(data));
    render();
    flash('Perubahan tersimpan di browser ini.');
  }
  function reset(){
    if(confirm('Kembalikan ke data bawaan?')){
      data=JSON.parse(JSON.stringify(DEFAULT)); localStorage.removeItem('dayatPortfolioData'); fillProfile(); render(); flash('Data dikembalikan ke bawaan.');
    }
  }
  function flash(msg){ const el=$('#status'); el.textContent=msg; setTimeout(()=>el.textContent='',3000); }

  const fields=['brand','name','headline','subheadline','about','location','whatsapp','instagram','github','email'];
  function fillProfile(){ fields.forEach(k=>{ const el=$(`[name="${k}"]`); if(el) el.value=data.profile?.[k]||''; }); }
  function readProfile(){
    data.profile=data.profile||{};
    fields.forEach(k=>{ const el=$(`[name="${k}"]`); data.profile[k]=el?el.value.trim():''; });
  }

  function render(){
    const box=$('#projectAdminList');
    if(!data.projects?.length){box.innerHTML='<div class="small">Belum ada project.</div>'; return;}
    box.innerHTML=data.projects.map((p,i)=>`
      <div class="admin-project">
        <div><strong>${esc(p.title)}</strong><div class="small">${esc(p.category||'')} · ${(p.stack||[]).join(', ')}</div><div class="small">${esc(p.description||'')}</div></div>
        <div><button class="btn btn-outline" data-edit="${i}">Edit</button> <button class="btn danger" data-del="${i}">Hapus</button></div>
      </div>`).join('');
    box.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>editProject(+b.dataset.edit));
    box.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>deleteProject(+b.dataset.del));
  }

  function blankProject(){return {title:'',category:'',description:'',features:[],stack:[],image:'assets/img/projects/museum-nekara.svg',demo:'',github:''};}
  function editProject(i){
    const p = i>=0 ? data.projects[i] : blankProject();
    $('#editIndex').value=i;
    $('#pTitle').value=p.title||''; $('#pCategory').value=p.category||''; $('#pDesc').value=p.description||'';
    $('#pFeatures').value=(p.features||[]).join('\n'); $('#pStack').value=(p.stack||[]).join(', ');
    $('#pImage').value=p.image||''; $('#pDemo').value=p.demo||''; $('#pGithub').value=p.github||'';
    $('#projectEditor').scrollIntoView({behavior:'smooth',block:'start'});
  }
  function deleteProject(i){
    if(confirm(`Hapus project "${data.projects[i].title}"?`)){ data.projects.splice(i,1); save(); }
  }
  function saveProject(){
    const i=+$('#editIndex').value;
    const p={
      title:$('#pTitle').value.trim(), category:$('#pCategory').value.trim(), description:$('#pDesc').value.trim(),
      features:$('#pFeatures').value.split('\n').map(x=>x.trim()).filter(Boolean),
      stack:$('#pStack').value.split(',').map(x=>x.trim()).filter(Boolean),
      image:$('#pImage').value.trim()||'assets/img/projects/museum-nekara.svg',
      demo:$('#pDemo').value.trim(), github:$('#pGithub').value.trim()
    };
    if(!p.title){alert('Nama project wajib diisi.'); return;}
    readProfile();
    data.projects=data.projects||[];
    if(i>=0) data.projects[i]=p; else data.projects.push(p);
    $('#editIndex').value=-1; $('#projectForm').reset(); save();
  }

  function exportJS(){
    readProfile();
    const content='window.PORTFOLIO_DATA = '+JSON.stringify(data,null,2)+';\n';
    download('portfolio-data.js', content, 'application/javascript');
    flash('portfolio-data.js berhasil dibuat. Ganti file assets/js/portfolio-data.js di GitHub dengan file ini.');
  }
  function exportJSON(){
    readProfile();
    download('portfolio-backup.json', JSON.stringify(data,null,2), 'application/json');
  }
  function importJSON(file){
    const r=new FileReader();
    r.onload=()=>{ try{data=JSON.parse(r.result); localStorage.setItem('dayatPortfolioData',JSON.stringify(data)); fillProfile();render();flash('Data berhasil diimpor.');}catch(e){alert('File JSON tidak valid.');} };
    r.readAsText(file);
  }
  function download(name,content,type){
    const blob=new Blob([content],{type}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob);a.download=name;a.click();URL.revokeObjectURL(a.href);
  }
  function esc(v=''){return String(v).replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));}

  $('#saveProfile').onclick=()=>{readProfile();save();};
  $('#addProject').onclick=()=>editProject(-1);
  $('#saveProject').onclick=saveProject;
  $('#cancelProject').onclick=()=>{ $('#editIndex').value=-1; $('#projectForm').reset(); };
  $('#exportJS').onclick=exportJS; $('#exportJSON').onclick=exportJSON; $('#resetData').onclick=reset;
  $('#importFile').onchange=e=>{ if(e.target.files[0]) importJSON(e.target.files[0]); };
  fillProfile(); render();
})();
