"use client";
import { useEffect, useState } from "react";
import type { Item } from "@/types";
import { MOCK_ITEMS } from "@/lib/mock-data";
import { createItem, updateItemStatus } from "@/lib/api";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
type S="idle"|"loading"|"success"|"error";
export default function AdminPage() {
  const [items,setItems]=useState<Item[]>([]);
  const [form,setForm]=useState({title:"",description:"",image_url:""});
  const [cState,setCState]=useState<S>("idle");
  const [errors,setErrors]=useState<Record<string,string>>({});
  useEffect(()=>{setTimeout(()=>setItems(MOCK_ITEMS),600);},[]);
  const validate=()=>{
    const e:Record<string,string>={};
    if(!form.title.trim())e.title="Cím megadása kötelező";
    if(!form.description.trim())e.description="Leírás megadása kötelező";
    setErrors(e);return Object.keys(e).length===0;
  };
  const handleCreate=async(e:React.FormEvent)=>{
    e.preventDefault();if(!validate())return;setCState("loading");
    try{const ni=await createItem({...form,status:"talált"});setItems(p=>[...p,ni]);setForm({title:"",description:"",image_url:""});setCState("success");setTimeout(()=>setCState("idle"),2500);}
    catch{setCState("error");}
  };
  const handleReturn=async(id:number)=>{
    try{await updateItemStatus(id,"visszaadva");setItems(p=>p.map(i=>i.id===id?{...i,status:"visszaadva" as const}:i));}
    catch{console.error("Státusz frissítési hiba");}
  };
  const stats={total:items.length,found:items.filter(i=>i.status==="talált").length,returned:items.filter(i=>i.status==="visszaadva").length};
  return (
    <div style={{maxWidth:"var(--content-wide)",margin:"0 auto",padding:"var(--space-10) var(--space-6)"}}>
      <div style={{marginBottom:"var(--space-8)"}}>
        <h1 style={{fontFamily:"var(--font-display)",fontSize:"var(--text-xl)",fontWeight:500,color:"var(--color-text)",marginBottom:"var(--space-2)"}}>Admin felület</h1>
        <p style={{fontSize:"var(--text-sm)",color:"var(--color-text-muted)"}}>Tárgyak kezelése és státuszfrissítés</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:"var(--space-4)",marginBottom:"var(--space-8)"}}>
        {[{l:"Összes",v:stats.total},{l:"Talált",v:stats.found},{l:"Visszaadva",v:stats.returned}].map(s=>(
          <div key={s.l} style={{background:"var(--color-surface)",border:"1px solid var(--color-border)",borderRadius:"var(--radius-lg)",padding:"var(--space-4) var(--space-5)",boxShadow:"var(--shadow-sm)"}}>
            <p style={{fontSize:"var(--text-xl)",fontWeight:600,color:"var(--color-text)",fontVariantNumeric:"tabular-nums"}}>{s.v}</p>
            <p style={{fontSize:"var(--text-xs)",color:"var(--color-text-muted)",marginTop:"var(--space-1)"}}>{s.l}</p>
          </div>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:"var(--space-8)",alignItems:"start"}}>
        <div style={{background:"var(--color-surface)",border:"1px solid var(--color-border)",borderRadius:"var(--radius-xl)",padding:"var(--space-6)",boxShadow:"var(--shadow-sm)"}}>
          <h2 style={{fontSize:"var(--text-base)",fontWeight:600,color:"var(--color-text)",marginBottom:"var(--space-5)"}}>Új tárgy rögzítése</h2>
          {cState==="success"&&<div style={{background:"var(--color-success-highlight)",color:"var(--color-success)",padding:"var(--space-3)",borderRadius:"var(--radius-md)",fontSize:"var(--text-sm)",marginBottom:"var(--space-4)"}}>Tárgy sikeresen rögzítve!</div>}
          <form onSubmit={handleCreate} style={{display:"flex",flexDirection:"column",gap:"var(--space-4)"}}>
            <Input label="Megnevezés" placeholder="pl. Fekete kulcscsomó" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} error={errors.title}/>
            <Input label="Leírás" placeholder="pl. 3 kulcs, kék kulcstartóval" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} error={errors.description}/>
            <Input label="Kép URL (opcionális)" placeholder="https://..." value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})}/>
            <Button type="submit" variant="primary" disabled={cState==="loading"} style={{marginTop:"var(--space-1)"}}>{cState==="loading"?"Mentés...":"Rögzítés"}</Button>
          </form>
        </div>
        <div style={{background:"var(--color-surface)",border:"1px solid var(--color-border)",borderRadius:"var(--radius-xl)",overflow:"hidden",boxShadow:"var(--shadow-sm)"}}>
          <div style={{padding:"var(--space-4) var(--space-6)",borderBottom:"1px solid var(--color-divider)"}}>
            <h2 style={{fontSize:"var(--text-base)",fontWeight:600,color:"var(--color-text)"}}>Tárgyak listája</h2>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr style={{borderBottom:"1px solid var(--color-divider)"}}>
                  {["ID","Megnevezés","Státusz","Műveletek"].map(h=>(
                    <th key={h} style={{padding:"var(--space-3) var(--space-4)",textAlign:"left",fontSize:"var(--text-xs)",fontWeight:500,color:"var(--color-text-muted)",textTransform:"uppercase",letterSpacing:"0.05em"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item,i)=>(
                  <tr key={item.id} style={{borderBottom:i<items.length-1?"1px solid var(--color-divider)":"none"}}>
                    <td style={{padding:"var(--space-3) var(--space-4)",fontSize:"var(--text-xs)",color:"var(--color-text-faint)",fontVariantNumeric:"tabular-nums"}}>#{item.id}</td>
                    <td style={{padding:"var(--space-3) var(--space-4)"}}>
                      <p style={{fontSize:"var(--text-sm)",fontWeight:500,color:"var(--color-text)"}}>{item.title}</p>
                      <p style={{fontSize:"var(--text-xs)",color:"var(--color-text-muted)",marginTop:"2px"}}>{item.description}</p>
                    </td>
                    <td style={{padding:"var(--space-3) var(--space-4)"}}><Badge status={item.status}/></td>
                    <td style={{padding:"var(--space-3) var(--space-4)"}}>
                      {item.status==="talált"&&<Button variant="secondary" size="sm" onClick={()=>handleReturn(item.id)}>Visszaadva</Button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
