import { useState, useRef } from "react";

const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
    .fade-up { animation: fadeUp 0.6s ease forwards; }
    .fade-up-1 { animation: fadeUp 0.6s 0.1s ease both; }
    .fade-up-2 { animation: fadeUp 0.6s 0.2s ease both; }
    .fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }
    .fade-up-4 { animation: fadeUp 0.6s 0.4s ease both; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(6,182,212,0.4) !important; }
    .btn-primary { transition: all 0.2s ease !important; }
    .template-card:hover { transform: translateY(-4px); }
    .template-card { transition: all 0.2s ease; }
    .feature-card:hover { border-color: rgba(6,182,212,0.5) !important; background: rgba(6,182,212,0.05) !important; }
    .feature-card { transition: all 0.2s ease; }
    input:focus, textarea:focus { border-color: #06b6d4 !important; outline: none; box-shadow: 0 0 0 3px rgba(6,182,212,0.15); }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
  `}</style>
);

const TEMPLATES = [
  { id: "modern",   name: "Modern",   accent: "#2563EB", desc: "Clean & ATS-Friendly",      tag: "Most Popular" },
  { id: "minimal",  name: "Minimal",  accent: "#0F766E", desc: "Elegant & Timeless",         tag: "Clean" },
  { id: "bold",     name: "Bold",     accent: "#DC2626", desc: "Confident & Eye-Catching",   tag: "Stand Out" },
  { id: "creative", name: "Creative", accent: "#7C3AED", desc: "Sidebar Layout & Modern",    tag: "Creative" },
  { id: "classic",  name: "Classic",  accent: "#1E293B", desc: "Traditional & Professional", tag: "Timeless" },
];

const STEPS = [
  { id: "template",   label: "Template",   icon: "◈" },
  { id: "personal",   label: "Personal",   icon: "👤" },
  { id: "education",  label: "Education",  icon: "🎓" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "skills",     label: "Skills",     icon: "⚡" },
];

const emptyExp  = () => ({ company: "", role: "", duration: "", description: "" });
const emptyProj = () => ({ title: "", description: "" });
const initForm  = { name:"", email:"", phone:"", city:"", linkedin:"", objective:"", degree:"", university:"", gradYear:"", gpa:"", skills:"" };

function RS({ title, accent, underline, children }) {
  return (
    <div style={{ marginBottom: "11px" }}>
      <div style={{
        fontSize: "9.5px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.2px",
        color: underline ? "#111" : accent,
        borderBottom: underline ? "1.5px solid #111" : `2px solid ${accent}`,
        paddingBottom: "3px", marginBottom: "6px",
      }}>{title}</div>
      {children}
    </div>
  );
}

function ModernResume({ f, exp, proj, accent }) {
  return (
    <div style={{ fontFamily:"'Georgia',serif", fontSize:"11px", color:"#1e293b", lineHeight:1.55 }}>
      <div style={{ background:accent, color:"white", padding:"16px", marginBottom:"14px", borderRadius:"3px" }}>
        <div style={{ fontSize:"21px", fontWeight:"700" }}>{f.name||"Your Name"}</div>
        <div style={{ marginTop:"4px", fontSize:"10px", opacity:0.9 }}>
          {[f.email,f.phone,f.city,f.linkedin].filter(Boolean).join("  ·  ")||"email@example.com  ·  Phone  ·  City"}
        </div>
      </div>
      {f.objective && <RS title="Objective" accent={accent}><p style={{margin:0,color:"#374151"}}>{f.objective}</p></RS>}
      <RS title="Education" accent={accent}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <div><div style={{fontWeight:"600"}}>{f.degree||"Degree"}</div><div style={{color:"#64748b"}}>{f.university||"University"}</div></div>
          <div style={{textAlign:"right",color:"#64748b"}}><div>{f.gradYear||"2025"}</div>{f.gpa&&<div>GPA: {f.gpa}</div>}</div>
        </div>
      </RS>
      {exp.some(e=>e.role||e.company)&&<RS title="Experience" accent={accent}>{exp.filter(e=>e.role||e.company).map((e,i)=>(
        <div key={i} style={{marginBottom:"7px"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{fontWeight:"600"}}>{e.role}{e.company?` — ${e.company}`:""}</div>
            <div style={{color:"#64748b",fontSize:"10px"}}>{e.duration}</div>
          </div>
          {e.description&&<div style={{color:"#374151"}}>{e.description}</div>}
        </div>
      ))}</RS>}
      {proj.some(p=>p.title)&&<RS title="Projects" accent={accent}>{proj.filter(p=>p.title).map((p,i)=>(
        <div key={i} style={{marginBottom:"6px"}}><span style={{fontWeight:"600"}}>{p.title}</span>{p.description&&<span style={{color:"#374151"}}> — {p.description}</span>}</div>
      ))}</RS>}
      {f.skills&&<RS title="Skills" accent={accent}><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{f.skills.split(",").map((s,i)=>(
        <span key={i} style={{background:`${accent}18`,color:accent,padding:"2px 8px",borderRadius:"3px",fontSize:"10px"}}>{s.trim()}</span>
      ))}</div></RS>}
    </div>
  );
}

function MinimalResume({ f, exp, proj, accent }) {
  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#1e293b",lineHeight:1.55}}>
      <div style={{borderLeft:`4px solid ${accent}`,paddingLeft:"12px",marginBottom:"14px"}}>
        <div style={{fontSize:"20px",fontWeight:"700",color:"#0f172a"}}>{f.name||"Your Name"}</div>
        <div style={{color:"#64748b",fontSize:"10px",marginTop:"3px"}}>
          {[f.email,f.phone,f.city,f.linkedin].filter(Boolean).join("  ·  ")||"email@example.com"}
        </div>
      </div>
      {f.objective&&<RS title="Summary" accent={accent}><p style={{margin:0,color:"#374151"}}>{f.objective}</p></RS>}
      <RS title="Education" accent={accent}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <div><div style={{fontWeight:"600"}}>{f.degree||"Degree"}</div><div style={{color:"#64748b"}}>{f.university}</div></div>
          <div style={{color:"#64748b"}}>{f.gradYear}{f.gpa&&` · GPA ${f.gpa}`}</div>
        </div>
      </RS>
      {exp.some(e=>e.role||e.company)&&<RS title="Experience" accent={accent}>{exp.filter(e=>e.role||e.company).map((e,i)=>(
        <div key={i} style={{marginBottom:"7px"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{fontWeight:"600"}}>{e.role}{e.company?` · ${e.company}`:""}</div>
            <div style={{color:"#64748b",fontSize:"10px"}}>{e.duration}</div>
          </div>
          {e.description&&<div style={{color:"#374151"}}>{e.description}</div>}
        </div>
      ))}</RS>}
      {proj.some(p=>p.title)&&<RS title="Projects" accent={accent}>{proj.filter(p=>p.title).map((p,i)=>(
        <div key={i} style={{marginBottom:"6px"}}><span style={{fontWeight:"600"}}>{p.title}</span>{p.description&&<span style={{color:"#374151"}}> — {p.description}</span>}</div>
      ))}</RS>}
      {f.skills&&<RS title="Skills" accent={accent}><p style={{margin:0,color:"#374151"}}>{f.skills}</p></RS>}
    </div>
  );
}

function BoldResume({ f, exp, proj, accent }) {
  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#1e293b",lineHeight:1.55}}>
      <div style={{background:"#0f172a",color:"white",padding:"16px",marginBottom:"14px",borderRadius:"3px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,right:0,width:"80px",height:"80px",background:accent,borderRadius:"0 0 0 80px",opacity:0.6}}/>
        <div style={{fontSize:"22px",fontWeight:"800",position:"relative"}}>{f.name||"Your Name"}</div>
        <div style={{marginTop:"4px",fontSize:"10px",color:"#94a3b8",position:"relative"}}>
          {[f.email,f.phone,f.city].filter(Boolean).join("  ·  ")||"email@example.com"}
        </div>
      </div>
      {f.objective&&<RS title="Profile" accent={accent}><p style={{margin:0,color:"#374151"}}>{f.objective}</p></RS>}
      <RS title="Education" accent={accent}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <div><div style={{fontWeight:"700"}}>{f.degree||"Degree"}</div><div style={{color:"#64748b"}}>{f.university}</div></div>
          <div style={{color:"#64748b"}}>{f.gradYear}{f.gpa&&` · ${f.gpa}`}</div>
        </div>
      </RS>
      {exp.some(e=>e.role||e.company)&&<RS title="Experience" accent={accent}>{exp.filter(e=>e.role||e.company).map((e,i)=>(
        <div key={i} style={{marginBottom:"7px"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{fontWeight:"700"}}>{e.role}{e.company?` @ ${e.company}`:""}</div>
            <div style={{color:accent,fontSize:"10px",fontWeight:"600"}}>{e.duration}</div>
          </div>
          {e.description&&<div style={{color:"#374151"}}>{e.description}</div>}
        </div>
      ))}</RS>}
      {proj.some(p=>p.title)&&<RS title="Projects" accent={accent}>{proj.filter(p=>p.title).map((p,i)=>(
        <div key={i} style={{marginBottom:"6px"}}><span style={{fontWeight:"700"}}>{p.title}</span>{p.description&&<span style={{color:"#374151"}}> — {p.description}</span>}</div>
      ))}</RS>}
      {f.skills&&<RS title="Skills" accent={accent}><div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>{f.skills.split(",").map((s,i)=>(
        <span key={i} style={{background:"#0f172a",color:"white",padding:"2px 8px",borderRadius:"3px",fontSize:"10px"}}>{s.trim()}</span>
      ))}</div></RS>}
    </div>
  );
}

function CreativeResume({ f, exp, proj, accent }) {
  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#1e1e2e",lineHeight:1.5,display:"flex"}}>
      <div style={{width:"36%",background:accent,color:"white",padding:"14px",flexShrink:0}}>
        <div style={{fontSize:"15px",fontWeight:"700",marginBottom:"3px"}}>{f.name||"Your Name"}</div>
        <div style={{fontSize:"9px",opacity:0.85,marginBottom:"14px"}}>
          {[f.email,f.phone,f.city].filter(Boolean).map((v,i)=><div key={i}>{v}</div>)}
          {f.linkedin&&<div style={{marginTop:"2px"}}>{f.linkedin}</div>}
        </div>
        {f.skills&&<>
          <div style={{fontWeight:"700",fontSize:"9px",textTransform:"uppercase",letterSpacing:"1px",borderBottom:"1px solid rgba(255,255,255,0.3)",paddingBottom:"4px",marginBottom:"7px"}}>Skills</div>
          {f.skills.split(",").map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.18)",padding:"3px 7px",borderRadius:"3px",fontSize:"9px",marginBottom:"4px"}}>{s.trim()}</div>
          ))}
        </>}
      </div>
      <div style={{flex:1,padding:"14px",background:"white"}}>
        {f.objective&&<div style={{marginBottom:"10px"}}><div style={{fontSize:"9.5px",fontWeight:"700",textTransform:"uppercase",color:accent,letterSpacing:"1px",borderBottom:`2px solid ${accent}`,paddingBottom:"3px",marginBottom:"5px"}}>About</div><p style={{margin:0,color:"#374151"}}>{f.objective}</p></div>}
        <RS title="Education" accent={accent}>
          <div style={{fontWeight:"600"}}>{f.degree||"Degree"}</div>
          <div style={{color:"#64748b"}}>{f.university}{f.gradYear?` (${f.gradYear})`:""}{f.gpa?` · GPA ${f.gpa}`:""}</div>
        </RS>
        {exp.some(e=>e.role||e.company)&&<RS title="Experience" accent={accent}>{exp.filter(e=>e.role||e.company).map((e,i)=>(
          <div key={i} style={{marginBottom:"6px"}}>
            <div style={{fontWeight:"600"}}>{e.role}{e.company?` @ ${e.company}`:""} <span style={{fontWeight:"400",color:"#94a3b8",fontSize:"9px"}}>{e.duration}</span></div>
            {e.description&&<div style={{color:"#374151"}}>{e.description}</div>}
          </div>
        ))}</RS>}
        {proj.some(p=>p.title)&&<RS title="Projects" accent={accent}>{proj.filter(p=>p.title).map((p,i)=>(
          <div key={i} style={{marginBottom:"5px"}}><b>{p.title}</b>{p.description&&<span style={{color:"#374151"}}> — {p.description}</span>}</div>
        ))}</RS>}
      </div>
    </div>
  );
}

function ClassicResume({ f, exp, proj }) {
  return (
    <div style={{fontFamily:"'Times New Roman',serif",fontSize:"11px",color:"#111",lineHeight:1.6}}>
      <div style={{textAlign:"center",marginBottom:"12px",borderBottom:"2px solid #111",paddingBottom:"8px"}}>
        <div style={{fontSize:"20px",fontWeight:"700",letterSpacing:"2px",textTransform:"uppercase"}}>{f.name||"Your Name"}</div>
        <div style={{fontSize:"10px",color:"#444",marginTop:"3px"}}>
          {[f.email,f.phone,f.city].filter(Boolean).join(" | ")||"email@example.com | Phone | City"}
        </div>
      </div>
      {f.objective&&<RS title="OBJECTIVE" accent="#111" underline><p style={{margin:0}}>{f.objective}</p></RS>}
      <RS title="EDUCATION" accent="#111" underline>
        <div style={{fontWeight:"700"}}>{f.degree||"Degree"}</div>
        <div>{f.university||"University"}{f.gradYear?` — ${f.gradYear}`:""}{f.gpa?` | GPA: ${f.gpa}`:""}</div>
      </RS>
      {exp.some(e=>e.role||e.company)&&<RS title="EXPERIENCE" accent="#111" underline>{exp.filter(e=>e.role||e.company).map((e,i)=>(
        <div key={i} style={{marginBottom:"6px"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><b>{e.role}{e.company?`, ${e.company}`:""}</b><span style={{color:"#555",fontSize:"10px"}}>{e.duration}</span></div>
          {e.description&&<div>{e.description}</div>}
        </div>
      ))}</RS>}
      {proj.some(p=>p.title)&&<RS title="PROJECTS" accent="#111" underline>{proj.filter(p=>p.title).map((p,i)=>(
        <div key={i} style={{marginBottom:"5px"}}><b>{p.title}</b>{p.description&&` — ${p.description}`}</div>
      ))}</RS>}
      {f.skills&&<RS title="SKILLS" accent="#111" underline><p style={{margin:0}}>{f.skills}</p></RS>}
    </div>
  );
}

function ResumeRender({ tplId, f, exp, proj }) {
  const accent = TEMPLATES.find(t=>t.id===tplId)?.accent||"#2563EB";
  const props = { f, exp, proj, accent };
  if (tplId==="modern")   return <ModernResume  {...props}/>;
  if (tplId==="minimal")  return <MinimalResume {...props}/>;
  if (tplId==="bold")     return <BoldResume    {...props}/>;
  if (tplId==="creative") return <CreativeResume {...props}/>;
  return <ClassicResume {...props}/>;
}

function generatePDF(f, exp, proj, tplId) {
  const accent = TEMPLATES.find(t=>t.id===tplId)?.accent||"#2563EB";
  const skillTags = f.skills
    ? f.skills.split(",").map(s=>`<span style="background:${accent}20;color:${accent};padding:2px 8px;border-radius:3px;font-size:10px;margin:2px;display:inline-block">${s.trim()}</span>`).join("")
    : "";
  const expHTML = exp.filter(e=>e.role||e.company).map(e=>`
    <div style="margin-bottom:8px">
      <div style="display:flex;justify-content:space-between">
        <strong>${e.role}${e.company?` — ${e.company}`:""}</strong>
        <span style="color:#64748b;font-size:10px">${e.duration}</span>
      </div>
      ${e.description?`<div style="color:#374151">${e.description}</div>`:""}
    </div>`).join("");
  const projHTML = proj.filter(p=>p.title).map(p=>`
    <div style="margin-bottom:6px">
      <strong>${p.title}</strong>${p.description?` — <span style="color:#374151">${p.description}</span>`:""}
    </div>`).join("");
  const section = (title,content) => `
    <div style="margin-bottom:12px">
      <div style="font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:${accent};border-bottom:2px solid ${accent};padding-bottom:3px;margin-bottom:6px">${title}</div>
      ${content}
    </div>`;
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>
    body{font-family:Georgia,serif;font-size:11px;color:#1e293b;line-height:1.55;margin:0;padding:0}
    @page{size:A4;margin:20mm}
  </style></head><body>
  <div style="background:${accent};color:white;padding:16px;margin-bottom:14px;border-radius:3px">
    <div style="font-size:21px;font-weight:700">${f.name||"Your Name"}</div>
    <div style="margin-top:4px;font-size:10px;opacity:0.9">${[f.email,f.phone,f.city,f.linkedin].filter(Boolean).join("  ·  ")||"email@example.com"}</div>
  </div>
  ${f.objective?section("Objective",`<p style="margin:0;color:#374151">${f.objective}</p>`):""}
  ${section("Education",`
    <div style="display:flex;justify-content:space-between">
      <div><strong>${f.degree||"Degree"}</strong><div style="color:#64748b">${f.university||"University"}</div></div>
      <div style="color:#64748b;text-align:right">${f.gradYear||""}${f.gpa?`<div>GPA: ${f.gpa}</div>`:""}</div>
    </div>`)}
  ${expHTML?section("Experience",expHTML):""}
  ${projHTML?section("Projects",projHTML):""}
  ${f.skills?section("Skills",`<div>${skillTags}</div>`):""}
  </body></html>`;
  const blob = new Blob([html], { type:"text/html" });
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url,"_blank");
  if (win) {
    win.onload = () => { setTimeout(()=>{ win.print(); URL.revokeObjectURL(url); }, 500); };
  }
}

function LandingPage({ onStart }) {
  return (
    <div style={{background:"#060d1a",minHeight:"100vh",color:"white",fontFamily:"'DM Sans',sans-serif",overflowX:"hidden"}}>
      <FontLink/>
      <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 48px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"22px",fontWeight:"800"}}>
          <span style={{color:"#06b6d4"}}>cv</span><span>craft</span>
          <span style={{fontSize:"10px",background:"#06b6d4",color:"#060d1a",borderRadius:"4px",padding:"2px 6px",marginLeft:"8px",fontWeight:"700",verticalAlign:"middle"}}>FREE</span>
        </div>
        <button className="btn-primary" onClick={onStart} style={{background:"linear-gradient(135deg,#06b6d4,#0ea5e9)",color:"#060d1a",border:"none",padding:"10px 24px",borderRadius:"8px",fontWeight:"700",fontSize:"14px",cursor:"pointer"}}>
          Build My Resume →
        </button>
      </nav>
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"80px 48px 60px",textAlign:"center"}}>
        <div className="fade-up" style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(6,182,212,0.1)",border:"1px solid rgba(6,182,212,0.3)",borderRadius:"20px",padding:"6px 16px",fontSize:"12px",color:"#06b6d4",marginBottom:"28px"}}>
          <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#06b6d4",display:"inline-block",animation:"pulse 2s infinite"}}/>
          No signup required · 100% Free · AI-Powered
        </div>
        <h1 className="fade-up-1" style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(36px,6vw,72px)",fontWeight:"800",lineHeight:1.1,letterSpacing:"-2px",marginBottom:"24px"}}>
          Build a resume that<br/>
          <span style={{background:"linear-gradient(135deg,#06b6d4,#0ea5e9,#818cf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>gets you hired</span>
        </h1>
        <p className="fade-up-2" style={{fontSize:"18px",color:"#94a3b8",maxWidth:"520px",margin:"0 auto 40px",lineHeight:1.7}}>
          Fill in a simple form, pick a template, and download a professional PDF resume in under 5 minutes.
        </p>
        <div className="fade-up-3" style={{display:"flex",gap:"14px",justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn-primary" onClick={onStart} style={{background:"linear-gradient(135deg,#06b6d4,#0ea5e9)",color:"#060d1a",border:"none",padding:"16px 40px",borderRadius:"12px",fontWeight:"700",fontSize:"16px",cursor:"pointer",boxShadow:"0 8px 32px rgba(6,182,212,0.3)"}}>
            🚀 Build My Resume — Free
          </button>
        </div>
        <p className="fade-up-4" style={{marginTop:"16px",fontSize:"12px",color:"#475569"}}>No credit card · No signup · Download instantly</p>
      </div>
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"0 48px 80px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"16px"}}>
          {[
            {icon:"✨",title:"AI-Powered",  desc:"Write simply — AI converts it to professional resume content."},
            {icon:"🎨",title:"5 Templates", desc:"Modern, Minimal, Bold, Creative & Classic designs."},
            {icon:"📄",title:"PDF Download",desc:"One click and your resume is ready to send."},
            {icon:"⚡",title:"5 Minutes",   desc:"The fastest way to build a resume. No account needed."},
          ].map((ft,i)=>(
            <div key={i} className="feature-card" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"16px",padding:"24px"}}>
              <div style={{fontSize:"28px",marginBottom:"12px"}}>{ft.icon}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:"700",fontSize:"15px",marginBottom:"8px"}}>{ft.title}</div>
              <div style={{color:"#64748b",fontSize:"13px",lineHeight:1.6}}>{ft.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{textAlign:"center",padding:"60px 48px 80px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(24px,4vw,40px)",fontWeight:"800",letterSpacing:"-1px",marginBottom:"16px"}}>Ready to build your resume?</h2>
        <p style={{color:"#64748b",marginBottom:"28px",fontSize:"15px"}}>It's free. No account needed. Takes 5 minutes.</p>
        <button className="btn-primary" onClick={onStart} style={{background:"linear-gradient(135deg,#06b6d4,#0ea5e9)",color:"#060d1a",border:"none",padding:"16px 48px",borderRadius:"12px",fontWeight:"700",fontSize:"16px",cursor:"pointer",boxShadow:"0 8px 32px rgba(6,182,212,0.3)"}}>
          🚀 Start Building — It's Free
        </button>
      </div>
    </div>
  );
}

function BuilderPage({ onBack }) {
  const [step, setStep]           = useState(0);
  const [tplId, setTplId]         = useState("modern");
  const [form, setForm]           = useState(initForm);
  const [exp, setExp]             = useState([emptyExp()]);
  const [proj, setProj]           = useState([emptyProj(), emptyProj()]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiDone, setAiDone]       = useState(false);
  const [errors, setErrors]       = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const uf = (k,v) => { setForm(f=>({...f,[k]:v})); setErrors(e=>({...e,[k]:""})); };
  const ue = (i,k,v) => setExp(p=>p.map((e,idx)=>idx===i?{...e,[k]:v}:e));
  const up = (i,k,v) => setProj(p=>p.map((e,idx)=>idx===i?{...e,[k]:v}:e));

  const validate = (s) => {
    const errs = {};
    if (s===1) {
      if (!form.name.trim())  errs.name  = "Name is required";
      if (!form.email.trim()) errs.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    }
    if (s===2) {
      if (!form.degree.trim())     errs.degree     = "Degree is required";
      if (!form.university.trim()) errs.university = "University is required";
    }
    setErrors(errs);
    return Object.keys(errs).length===0;
  };

  const goNext = (n) => { if (validate(step)) setStep(n); };

  const enhanceWithAI = async () => {
    setAiLoading(true);
    try {
      const res = await fetch("/api/enhance",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ objective:form.objective, experiences:exp, projects:proj }),
      });
      const data = await res.json();
      if (data.objective)   uf("objective", data.objective);
      if (data.experiences) setExp(p=>p.map((e,i)=>data.experiences[i]?{...e,description:data.experiences[i].description}:e));
      if (data.projects)    setProj(p=>p.map((e,i)=>data.projects[i]?{...e,description:data.projects[i].description}:e));
      setAiDone(true);
    } catch(err){ console.error(err); }
    setAiLoading(false);
  };

  const tplAccent = TEMPLATES.find(t=>t.id===tplId)?.accent||"#2563EB";

  const PreviewModal = () => (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:1000,display:"flex",flexDirection:"column",alignItems:"center",padding:"16px",overflowY:"auto"}}>
      <div style={{display:"flex",gap:"12px",marginBottom:"16px",flexWrap:"wrap",justifyContent:"center"}}>
        <button onClick={()=>setShowPreview(false)} style={{background:"#1e293b",color:"#e2e8f0",border:"1px solid #334155",padding:"8px 20px",borderRadius:"8px",cursor:"pointer",fontSize:"13px"}}>
          ← Back to Edit
        </button>
        <button onClick={()=>generatePDF(form,exp,proj,tplId)} style={{background:"linear-gradient(135deg,#06b6d4,#0ea5e9)",color:"#060d1a",border:"none",padding:"8px 24px",borderRadius:"8px",fontWeight:"700",fontSize:"13px",cursor:"pointer"}}>
          📄 Download PDF
        </button>
      </div>
      <div style={{background:"white",borderRadius:"8px",padding:"32px",width:"100%",maxWidth:"680px",boxShadow:"0 8px 48px rgba(0,0,0,0.5)"}}>
        <ResumeRender tplId={tplId} f={form} exp={exp} proj={proj}/>
      </div>
    </div>
  );

  return (
    <div style={{background:"#060d1a",minHeight:"100vh",fontFamily:"'DM Sans',sans-serif",color:"#e2e8f0"}}>
      <FontLink/>
      {showPreview && <PreviewModal/>}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 24px",borderBottom:"1px solid rgba(255,255,255,0.07)",background:"#0a1628"}}>
        <button onClick={onBack} style={{background:"transparent",color:"#64748b",border:"none",cursor:"pointer",fontSize:"13px"}}>← Home</button>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"18px",fontWeight:"800"}}>
          <span style={{color:"#06b6d4"}}>cv</span><span style={{color:"#e2e8f0"}}>craft</span>
        </div>
        <div style={{display:"flex",gap:"8px"}}>
          <button onClick={()=>setShowPreview(true)} style={{background:"#1e293b",color:"#e2e8f0",border:"1px solid #334155",padding:"8px 16px",borderRadius:"8px",fontSize:"13px",cursor:"pointer"}}>
            👁 Preview
          </button>
          <button onClick={()=>generatePDF(form,exp,proj,tplId)} style={{background:"linear-gradient(135deg,#06b6d4,#0ea5e9)",color:"#060d1a",border:"none",padding:"8px 16px",borderRadius:"8px",fontWeight:"700",fontSize:"13px",cursor:"pointer"}}>
            📄 PDF
          </button>
        </div>
      </div>

      <div style={{display:"flex",padding:"0 24px",background:"#0a1628",borderBottom:"1px solid rgba(255,255,255,0.07)",overflowX:"auto"}}>
        {STEPS.map((s,i)=>(
          <button key={i} onClick={()=>{ if(i<=step) setStep(i); }} style={{
            padding:"12px 16px",border:"none",background:"transparent",
            color:step===i?"#06b6d4":i<step?"#0ea5e9":"#475569",
            borderBottom:step===i?"2px solid #06b6d4":"2px solid transparent",
            cursor:i<=step?"pointer":"default",fontSize:"12px",fontWeight:step===i?"700":"400",
            whiteSpace:"nowrap",transition:"all 0.2s",
          }}>
            {s.icon} {s.label} {i<step&&"✓"}
          </button>
        ))}
      </div>

      <div style={{maxWidth:"680px",margin:"0 auto",padding:"24px 20px"}}>

        {step===0&&(
          <div>
            <SectionTitle>Choose Template</SectionTitle>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"20px"}}>
              {TEMPLATES.map(t=>(
                <div key={t.id} onClick={()=>setTplId(t.id)} style={{
                  border:`2px solid ${tplId===t.id?t.accent:"#1e293b"}`,borderRadius:"10px",padding:"12px",
                  cursor:"pointer",background:tplId===t.id?`${t.accent}12`:"#0f172a",transition:"all 0.2s",
                }}>
                  <div style={{height:"5px",background:t.accent,borderRadius:"3px",marginBottom:"10px"}}/>
                  <div style={{fontWeight:"700",fontSize:"13px",color:tplId===t.id?t.accent:"#e2e8f0"}}>{t.name}</div>
                  <div style={{fontSize:"11px",color:"#475569",marginTop:"3px"}}>{t.desc}</div>
                  {tplId===t.id&&<div style={{marginTop:"6px",fontSize:"11px",color:t.accent}}>✓ Selected</div>}
                </div>
              ))}
            </div>
            <NavBtn onNext={()=>setStep(1)} nextLabel="Next: Personal Info →" accent="#06b6d4"/>
          </div>
        )}

        {step===1&&(
          <div>
            <SectionTitle>Personal Information</SectionTitle>
            <Grid2>
              <FInput label="Full Name *"  val={form.name}     set={v=>uf("name",v)}     ph="Muhammad Ali"     err={errors.name}/>
              <FInput label="Email *"      val={form.email}    set={v=>uf("email",v)}    ph="ali@email.com"    err={errors.email} type="email"/>
              <FInput label="Phone"        val={form.phone}    set={v=>uf("phone",v)}    ph="+92-300-1234567"/>
              <FInput label="City"         val={form.city}     set={v=>uf("city",v)}     ph="Lahore, Pakistan"/>
              <FInput label="LinkedIn URL" val={form.linkedin} set={v=>uf("linkedin",v)} ph="linkedin.com/in/ali" span/>
            </Grid2>
            <div style={{marginTop:"12px"}}>
              <label style={LS}>Career Objective / Summary</label>
              <textarea value={form.objective} onChange={e=>uf("objective",e.target.value)}
                placeholder="Write your career goal in simple words — AI will enhance it later..."
                style={{...IS,height:"72px",resize:"vertical",width:"100%"}}/>
            </div>
            <NavBtn onBack={()=>setStep(0)} onNext={()=>goNext(2)} nextLabel="Next: Education →" accent="#06b6d4"/>
          </div>
        )}

        {step===2&&(
          <div>
            <SectionTitle>Education</SectionTitle>
            <Grid2>
              <FInput label="Degree *"        val={form.degree}     set={v=>uf("degree",v)}     ph="BS Computer Science" span err={errors.degree}/>
              <FInput label="University *"    val={form.university} set={v=>uf("university",v)} ph="FAST-NUCES Lahore"   span err={errors.university}/>
              <FInput label="Graduation Year" val={form.gradYear}   set={v=>uf("gradYear",v)}   ph="2025"/>
              <FInput label="CGPA / GPA"      val={form.gpa}        set={v=>uf("gpa",v)}        ph="3.5 / 4.0"/>
            </Grid2>
            <NavBtn onBack={()=>setStep(1)} onNext={()=>goNext(3)} nextLabel="Next: Experience →" accent="#06b6d4"/>
          </div>
        )}

        {step===3&&(
          <div>
            <SectionTitle>Work Experience</SectionTitle>
            <p style={{color:"#475569",fontSize:"12px",marginBottom:"16px"}}>Add internships, jobs, or roles. Leave empty if not applicable.</p>
            {exp.map((e,i)=>(
              <div key={i} style={{background:"#0a1628",borderRadius:"8px",padding:"14px",marginBottom:"12px",border:"1px solid #1e293b"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
                  <span style={{color:"#06b6d4",fontWeight:"700",fontSize:"12px"}}>Experience #{i+1}</span>
                  {exp.length>1&&<button onClick={()=>setExp(p=>p.filter((_,idx)=>idx!==i))} style={{background:"#ef444415",color:"#ef4444",border:"1px solid #ef444430",padding:"3px 10px",borderRadius:"5px",cursor:"pointer",fontSize:"11px"}}>Remove</button>}
                </div>
                <Grid2>
                  <FInput label="Company Name" val={e.company}     set={v=>ue(i,"company",v)}     ph="TechCorp Ltd."/>
                  <FInput label="Role / Title"  val={e.role}        set={v=>ue(i,"role",v)}        ph="Frontend Developer"/>
                  <FInput label="Duration"      val={e.duration}    set={v=>ue(i,"duration",v)}    ph="Jun 2023 – Aug 2023"/>
                  <FInput label="Description"   val={e.description} set={v=>ue(i,"description",v)} ph="What did you do?"/>
                </Grid2>
              </div>
            ))}
            <AddBtn onClick={()=>setExp(p=>[...p,emptyExp()])}>+ Add Another Experience</AddBtn>
            <NavBtn onBack={()=>setStep(2)} onNext={()=>setStep(4)} nextLabel="Next: Skills →" accent="#06b6d4"/>
          </div>
        )}

        {step===4&&(
          <div>
            <SectionTitle>Skills & Projects</SectionTitle>
            <FInput label="Skills (comma separated)" val={form.skills} set={v=>uf("skills",v)} ph="Python, React.js, SQL, Figma" span/>
            <div style={{margin:"18px 0 10px",fontWeight:"700",fontSize:"14px",color:"#e2e8f0"}}>Projects</div>
            {proj.map((p,i)=>(
              <div key={i} style={{background:"#0a1628",borderRadius:"8px",padding:"14px",marginBottom:"12px",border:"1px solid #1e293b"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
                  <span style={{color:"#06b6d4",fontWeight:"700",fontSize:"12px"}}>Project #{i+1}</span>
                  {proj.length>1&&<button onClick={()=>setProj(p=>p.filter((_,idx)=>idx!==i))} style={{background:"#ef444415",color:"#ef4444",border:"1px solid #ef444430",padding:"3px 10px",borderRadius:"5px",cursor:"pointer",fontSize:"11px"}}>Remove</button>}
                </div>
                <Grid2>
                  <FInput label="Project Title" val={p.title}       set={v=>up(i,"title",v)}       ph="E-commerce Website"/>
                  <FInput label="Description"   val={p.description} set={v=>up(i,"description",v)} ph="Built with React and Node.js"/>
                </Grid2>
              </div>
            ))}
            <AddBtn onClick={()=>setProj(p=>[...p,emptyProj()])}>+ Add Another Project</AddBtn>
            <div style={{marginTop:"16px",padding:"16px",background:"#0a1628",borderRadius:"10px",border:"1px solid rgba(6,182,212,0.2)"}}>
              <div style={{fontSize:"13px",color:"#06b6d4",fontWeight:"700",marginBottom:"4px"}}>✨ AI Content Enhancement</div>
              <div style={{fontSize:"12px",color:"#475569",marginBottom:"12px"}}>Write simply — AI converts to professional resume language.</div>
              <button onClick={enhanceWithAI} disabled={aiLoading} style={{
                background:aiDone?"#16a34a":"linear-gradient(135deg,#06b6d4,#0ea5e9)",
                color:aiDone?"white":"#060d1a",border:"none",padding:"9px 22px",
                borderRadius:"7px",fontSize:"13px",fontWeight:"700",cursor:aiLoading?"wait":"pointer",opacity:aiLoading?0.7:1,
              }}>
                {aiLoading?"⏳ Enhancing...":aiDone?"✅ Enhanced!":"🚀 Enhance with AI"}
              </button>
            </div>
            <div style={{marginTop:"20px",display:"flex",gap:"10px",flexWrap:"wrap"}}>
              <button onClick={()=>setStep(3)} style={{background:"transparent",color:"#475569",border:"1px solid #1e293b",padding:"10px 20px",borderRadius:"8px",cursor:"pointer",fontSize:"13px"}}>← Back</button>
              <button onClick={()=>setShowPreview(true)} style={{flex:1,background:"#1e293b",color:"#e2e8f0",border:"1px solid #334155",padding:"10px 20px",borderRadius:"8px",cursor:"pointer",fontSize:"13px",fontWeight:"600"}}>
                👁 Preview Resume
              </button>
              <button onClick={()=>generatePDF(form,exp,proj,tplId)} style={{flex:1,background:"linear-gradient(135deg,#06b6d4,#0ea5e9)",color:"#060d1a",border:"none",padding:"10px 20px",borderRadius:"8px",fontWeight:"700",fontSize:"13px",cursor:"pointer"}}>
                📄 Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing");
  return view==="landing"
    ? <LandingPage onStart={()=>setView("builder")}/>
    : <BuilderPage onBack={()=>setView("landing")}/>;
}

function SectionTitle({ children }) {
  return <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"17px",fontWeight:"800",color:"#e2e8f0",marginBottom:"16px"}}>{children}</h2>;
}
function Grid2({ children }) {
  return <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>{children}</div>;
}
function FInput({ label, val, set, ph, span, err, type="text" }) {
  return (
    <div style={{gridColumn:span?"1 / -1":undefined}}>
      <label style={LS}>{label}</label>
      <input type={type} value={val} onChange={e=>set(e.target.value)} placeholder={ph}
        style={{...IS,width:"100%",borderColor:err?"#ef4444":"#1e293b"}}/>
      {err&&<div style={{color:"#ef4444",fontSize:"11px",marginTop:"4px"}}>⚠ {err}</div>}
    </div>
  );
}
function NavBtn({ onBack, onNext, nextLabel="Next →", accent }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",marginTop:"22px"}}>
      {onBack?<button onClick={onBack} style={{background:"transparent",color:"#475569",border:"1px solid #1e293b",padding:"9px 20px",borderRadius:"7px",cursor:"pointer",fontSize:"13px"}}>← Back</button>:<div/>}
      {onNext&&<button onClick={onNext} style={{background:`linear-gradient(135deg,${accent},#0ea5e9)`,color:"#060d1a",border:"none",padding:"9px 24px",borderRadius:"7px",fontWeight:"700",cursor:"pointer",fontSize:"13px"}}>{nextLabel}</button>}
    </div>
  );
}
function AddBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{background:"transparent",color:"#06b6d4",border:"1px dashed rgba(6,182,212,0.4)",padding:"9px 18px",borderRadius:"7px",cursor:"pointer",fontSize:"13px",width:"100%",marginBottom:"8px"}}>
      {children}
    </button>
  );
}
const IS = {background:"#0a1628",border:"1px solid #1e293b",borderRadius:"6px",padding:"8px 11px",color:"#e2e8f0",fontSize:"13px",outline:"none"};
const LS = {display:"block",fontSize:"10px",color:"#475569",marginBottom:"5px",fontWeight:"600",textTransform:"uppercase",letterSpacing:"0.5px"};