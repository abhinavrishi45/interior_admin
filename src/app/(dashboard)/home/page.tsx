"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";

export default function HomeAdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    fetch("https://backendinterior.tannis.in/api/home")
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("https://backendinterior.tannis.in/api/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      alert("Home page updated successfully!");
    } catch (e) {
      alert("Error saving home page");
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin w-8 h-8" /></div>;
  if (!data) return <div className="p-8">Error loading data. Make sure backend is running.</div>;

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'services', label: 'Services' },
    { id: 'collection', label: 'Collection' },
    { id: 'parallax', label: 'Parallax' },
    { id: 'process', label: 'Process' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'cta', label: 'CTA' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Home Page Content</h1>
          <p className="text-muted-foreground mt-1">Manage text, images, and arrays for the front page.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </Button>
      </div>

      <div className="flex gap-2 border-b overflow-x-auto pb-2">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap ${activeTab === t.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* HERO TAB */}
      {activeTab === 'hero' && (
        <Card>
          <CardHeader><CardTitle>Hero Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Eyebrow Text</label>
                <input type="text" value={data.hero.eyebrow} onChange={e => updateSection('hero', 'eyebrow', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hero Image URL</label>
                <input type="text" value={data.hero.heroImage} onChange={e => updateSection('hero', 'heroImage', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Title (HTML allowed for breaks/em)</label>
                <textarea value={data.hero.title} onChange={e => updateSection('hero', 'title', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" rows={3} />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Subtitle</label>
                <textarea value={data.hero.subtitle} onChange={e => updateSection('hero', 'subtitle', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" rows={3} />
              </div>
            </div>
            <div className="pt-4 border-t mt-4">
              <h3 className="font-medium mb-3">Hero Stats</h3>
              <div className="space-y-3">
                {data.hero.stats.map((s: any, i: number) => (
                  <div key={i} className="flex gap-3 items-center">
                    <input type="text" placeholder="Value (e.g. 12+)" value={s.num} onChange={e => {
                      const newStats = [...data.hero.stats]; newStats[i].num = e.target.value; updateSection('hero', 'stats', newStats);
                    }} className="w-1/3 border rounded-md px-3 py-2 text-sm" />
                    <input type="text" placeholder="Label (e.g. Awards)" value={s.label} onChange={e => {
                      const newStats = [...data.hero.stats]; newStats[i].label = e.target.value; updateSection('hero', 'stats', newStats);
                    }} className="w-2/3 border rounded-md px-3 py-2 text-sm" />
                    <Button variant="ghost" size="icon" onClick={() => {
                      const newStats = data.hero.stats.filter((_: any, idx: number) => idx !== i); updateSection('hero', 'stats', newStats);
                    }}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => updateSection('hero', 'stats', [...data.hero.stats, { num: '', label: '' }])}>
                  <Plus className="w-4 h-4 mr-2" /> Add Stat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* PHILOSOPHY TAB */}
      {activeTab === 'philosophy' && (
        <Card>
          <CardHeader><CardTitle>Philosophy Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Section Label</label>
                <input type="text" value={data.philosophy.sectionLabel} onChange={e => updateSection('philosophy', 'sectionLabel', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Heading</label>
                <input type="text" value={data.philosophy.heading} onChange={e => updateSection('philosophy', 'heading', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Paragraph 1</label>
                <textarea value={data.philosophy.text1} onChange={e => updateSection('philosophy', 'text1', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" rows={3} />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Paragraph 2</label>
                <textarea value={data.philosophy.text2} onChange={e => updateSection('philosophy', 'text2', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" rows={3} />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Quote</label>
                <textarea value={data.philosophy.quote} onChange={e => updateSection('philosophy', 'quote', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" rows={2} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image 1 URL</label>
                <input type="text" value={data.philosophy.image1} onChange={e => updateSection('philosophy', 'image1', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image 2 URL</label>
                <input type="text" value={data.philosophy.image2} onChange={e => updateSection('philosophy', 'image2', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SERVICES TAB */}
      {activeTab === 'services' && (
        <Card>
          <CardHeader><CardTitle>Services Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Section Label</label>
                <input type="text" value={data.services.sectionLabel} onChange={e => updateSection('services', 'sectionLabel', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Heading</label>
                <input type="text" value={data.services.heading} onChange={e => updateSection('services', 'heading', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="pt-4 border-t mt-4">
              <h3 className="font-medium mb-3">Service Items</h3>
              <div className="space-y-4">
                {data.services.items.map((s: any, i: number) => (
                  <div key={i} className="p-4 border rounded-md space-y-3 relative">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => {
                      const newItems = data.services.items.filter((_: any, idx: number) => idx !== i); updateSection('services', 'items', newItems);
                    }}><Trash2 className="w-4 h-4" /></Button>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="Number (01)" value={s.num} onChange={e => {
                        const newItems = [...data.services.items]; newItems[i].num = e.target.value; updateSection('services', 'items', newItems);
                      }} className="w-full border rounded-md px-3 py-2 text-sm" />
                      <input type="text" placeholder="Image URL" value={s.img} onChange={e => {
                        const newItems = [...data.services.items]; newItems[i].img = e.target.value; updateSection('services', 'items', newItems);
                      }} className="w-full border rounded-md px-3 py-2 text-sm" />
                      <input type="text" placeholder="Title" value={s.title} onChange={e => {
                        const newItems = [...data.services.items]; newItems[i].title = e.target.value; updateSection('services', 'items', newItems);
                      }} className="w-full border rounded-md px-3 py-2 text-sm" />
                      <input type="text" placeholder="Tag (e.g. Signature)" value={s.tag} onChange={e => {
                        const newItems = [...data.services.items]; newItems[i].tag = e.target.value; updateSection('services', 'items', newItems);
                      }} className="w-full border rounded-md px-3 py-2 text-sm" />
                    </div>
                    <textarea placeholder="Description" value={s.desc} onChange={e => {
                      const newItems = [...data.services.items]; newItems[i].desc = e.target.value; updateSection('services', 'items', newItems);
                    }} className="w-full border rounded-md px-3 py-2 text-sm" rows={2} />
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => updateSection('services', 'items', [...data.services.items, { num: '', img: '', title: '', desc: '', tag: '' }])}>
                  <Plus className="w-4 h-4 mr-2" /> Add Service
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* COLLECTION TAB */}
      {activeTab === 'collection' && (
        <Card>
          <CardHeader><CardTitle>Collection Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Section Label</label>
                <input type="text" value={data.collection.sectionLabel} onChange={e => updateSection('collection', 'sectionLabel', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Heading</label>
                <input type="text" value={data.collection.heading} onChange={e => updateSection('collection', 'heading', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea value={data.collection.copy} onChange={e => updateSection('collection', 'copy', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" rows={2} />
              </div>
            </div>
            <div className="pt-4 border-t mt-4">
              <h3 className="font-medium mb-3">Collection Items</h3>
              <div className="grid grid-cols-2 gap-4">
                {data.collection.items.map((s: any, i: number) => (
                  <div key={i} className="flex gap-2 items-center p-3 border rounded-md">
                    <div className="flex-1 space-y-2">
                      <input type="text" placeholder="Title" value={s.title} onChange={e => {
                        const newItems = [...data.collection.items]; newItems[i].title = e.target.value; updateSection('collection', 'items', newItems);
                      }} className="w-full border rounded-md px-3 py-2 text-sm" />
                      <input type="text" placeholder="Image URL" value={s.img} onChange={e => {
                        const newItems = [...data.collection.items]; newItems[i].img = e.target.value; updateSection('collection', 'items', newItems);
                      }} className="w-full border rounded-md px-3 py-2 text-sm" />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => {
                      const newItems = data.collection.items.filter((_: any, idx: number) => idx !== i); updateSection('collection', 'items', newItems);
                    }}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => updateSection('collection', 'items', [...data.collection.items, { title: '', img: '' }])}>
                <Plus className="w-4 h-4 mr-2" /> Add Collection Item
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CTA TAB */}
      {activeTab === 'cta' && (
        <Card>
          <CardHeader><CardTitle>CTA Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Eyebrow</label>
                <input type="text" value={data.cta.eyebrow} onChange={e => updateSection('cta', 'eyebrow', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Heading</label>
                <input type="text" value={data.cta.title} onChange={e => updateSection('cta', 'title', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea value={data.cta.text} onChange={e => updateSection('cta', 'text', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" rows={2} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Button Text</label>
                <input type="text" value={data.cta.primaryBtnText} onChange={e => updateSection('cta', 'primaryBtnText', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Secondary Button Text</label>
                <input type="text" value={data.cta.secondaryBtnText} onChange={e => updateSection('cta', 'secondaryBtnText', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* PARALLAX TAB */}
      {activeTab === 'parallax' && (
        <Card>
          <CardHeader><CardTitle>Parallax Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tag</label>
                <input type="text" value={data.parallax.tag} onChange={e => updateSection('parallax', 'tag', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input type="text" value={data.parallax.title} onChange={e => updateSection('parallax', 'title', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea value={data.parallax.desc} onChange={e => updateSection('parallax', 'desc', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" rows={3} />
              </div>
            </div>
            <div className="pt-4 border-t mt-4">
              <h3 className="font-medium mb-3">Parallax Stats</h3>
              <div className="space-y-3">
                {data.parallax.stats.map((s: any, i: number) => (
                  <div key={i} className="flex gap-3 items-center">
                    <input type="text" placeholder="Value" value={s.num} onChange={e => {
                      const newStats = [...data.parallax.stats]; newStats[i].num = e.target.value; updateSection('parallax', 'stats', newStats);
                    }} className="w-1/3 border rounded-md px-3 py-2 text-sm" />
                    <input type="text" placeholder="Label" value={s.label} onChange={e => {
                      const newStats = [...data.parallax.stats]; newStats[i].label = e.target.value; updateSection('parallax', 'stats', newStats);
                    }} className="w-2/3 border rounded-md px-3 py-2 text-sm" />
                    <Button variant="ghost" size="icon" onClick={() => {
                      const newStats = data.parallax.stats.filter((_: any, idx: number) => idx !== i); updateSection('parallax', 'stats', newStats);
                    }}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => updateSection('parallax', 'stats', [...data.parallax.stats, { num: '', label: '' }])}>
                  <Plus className="w-4 h-4 mr-2" /> Add Stat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* PROCESS TAB */}
      {activeTab === 'process' && (
        <Card>
          <CardHeader><CardTitle>Process Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Section Label</label>
                <input type="text" value={data.process.sectionLabel} onChange={e => updateSection('process', 'sectionLabel', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Heading</label>
                <input type="text" value={data.process.heading} onChange={e => updateSection('process', 'heading', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
            </div>
            <div className="pt-4 border-t mt-4">
              <h3 className="font-medium mb-3">Process Steps</h3>
              <div className="space-y-4">
                {data.process.steps.map((s: any, i: number) => (
                  <div key={i} className="p-4 border rounded-md space-y-3 relative">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => {
                      const newItems = data.process.steps.filter((_: any, idx: number) => idx !== i); updateSection('process', 'steps', newItems);
                    }}><Trash2 className="w-4 h-4" /></Button>
                    <div className="flex gap-3">
                      <input type="text" placeholder="Number (01)" value={s.n} onChange={e => {
                        const newItems = [...data.process.steps]; newItems[i].n = e.target.value; updateSection('process', 'steps', newItems);
                      }} className="w-20 border rounded-md px-3 py-2 text-sm" />
                      <input type="text" placeholder="Title" value={s.title} onChange={e => {
                        const newItems = [...data.process.steps]; newItems[i].title = e.target.value; updateSection('process', 'steps', newItems);
                      }} className="flex-1 border rounded-md px-3 py-2 text-sm" />
                    </div>
                    <textarea placeholder="Description" value={s.desc} onChange={e => {
                      const newItems = [...data.process.steps]; newItems[i].desc = e.target.value; updateSection('process', 'steps', newItems);
                    }} className="w-full border rounded-md px-3 py-2 text-sm" rows={2} />
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => updateSection('process', 'steps', [...data.process.steps, { n: '', title: '', desc: '' }])}>
                  <Plus className="w-4 h-4 mr-2" /> Add Step
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TESTIMONIALS TAB */}
      {activeTab === 'testimonials' && (
        <Card>
          <CardHeader><CardTitle>Testimonials Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Section Label</label>
                <input type="text" value={data.testimonials.sectionLabel} onChange={e => updateSection('testimonials', 'sectionLabel', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Heading</label>
                <input type="text" value={data.testimonials.heading} onChange={e => updateSection('testimonials', 'heading', e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
              </div>
            </div>

            <div className="p-4 border rounded-md bg-muted/20">
              <h3 className="font-medium mb-3">Featured Testimonial</h3>
              <div className="space-y-3">
                <textarea placeholder="Quote Text" value={data.testimonials.featured.text} onChange={e => {
                  updateSection('testimonials', 'featured', { ...data.testimonials.featured, text: e.target.value });
                }} className="w-full border rounded-md px-3 py-2 text-sm bg-background" rows={3} />
                <div className="grid grid-cols-3 gap-3">
                  <input type="text" placeholder="Author Name" value={data.testimonials.featured.authorName} onChange={e => {
                    updateSection('testimonials', 'featured', { ...data.testimonials.featured, authorName: e.target.value });
                  }} className="w-full border rounded-md px-3 py-2 text-sm bg-background" />
                  <input type="text" placeholder="Author Role" value={data.testimonials.featured.authorRole} onChange={e => {
                    updateSection('testimonials', 'featured', { ...data.testimonials.featured, authorRole: e.target.value });
                  }} className="w-full border rounded-md px-3 py-2 text-sm bg-background" />
                  <input type="text" placeholder="Author Image URL" value={data.testimonials.featured.authorImg} onChange={e => {
                    updateSection('testimonials', 'featured', { ...data.testimonials.featured, authorImg: e.target.value });
                  }} className="w-full border rounded-md px-3 py-2 text-sm bg-background" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t mt-4">
              <h3 className="font-medium mb-3">Side Testimonials</h3>
              <div className="space-y-3">
                {data.testimonials.side.map((s: any, i: number) => (
                  <div key={i} className="flex gap-3 items-start border p-3 rounded-md relative">
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => {
                      const newItems = data.testimonials.side.filter((_: any, idx: number) => idx !== i); updateSection('testimonials', 'side', newItems);
                    }}><Trash2 className="w-4 h-4" /></Button>
                    <div className="w-full pr-8 space-y-2">
                      <textarea placeholder="Quote Text" value={s.text} onChange={e => {
                        const newItems = [...data.testimonials.side]; newItems[i].text = e.target.value; updateSection('testimonials', 'side', newItems);
                      }} className="w-full border rounded-md px-3 py-2 text-sm" rows={2} />
                      <input type="text" placeholder="Author" value={s.author} onChange={e => {
                        const newItems = [...data.testimonials.side]; newItems[i].author = e.target.value; updateSection('testimonials', 'side', newItems);
                      }} className="w-full border rounded-md px-3 py-2 text-sm" />
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => updateSection('testimonials', 'side', [...data.testimonials.side, { text: '', author: '' }])}>
                  <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
