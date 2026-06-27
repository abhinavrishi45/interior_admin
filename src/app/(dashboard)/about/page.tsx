"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Plus, Trash2, Eye, EyeOff, Loader2, Save } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "https://backendinterior.tannis.in";

const emptyData = {
  hero: { title: '', subtitle: '', backgroundImage: '' },
  stats: [],
  values: [],
  principals: [],
  servicesList: [],
  cta: { heading: '', subheading: '', buttonText: '', buttonLink: '' },
};

const defaultData = {
  hero: {
    title: "We design interiors that feel alive.",
    subtitle:
      "SSD Interior creates soulful spaces that balance luxury, comfort, and enduring character. For over a decade, our studio has partnered with homeowners, hospitality brands, and visionary developers to shape interiors that look beautiful and work beautifully.",
    backgroundImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=80",
  },
  stats: [
    { value: "340+", label: "Projects completed", suffix: "" },
    { value: "18", label: "Design awards", suffix: "" },
    { value: "12", label: "Years of craft", suffix: "" },
  ],
  values: [
    {
      title: "Human-first spaces",
      description:
        "We prioritize comfort, circulation and daily ritual so every room feels welcoming and effortless.",
      icon: "",
    },
    {
      title: "Material intelligence",
      description:
        "We combine luxe finishes with resilient, sustainable materials for lasting beauty.",
      icon: "",
    },
    {
      title: "Thoughtful craftsmanship",
      description:
        "Bespoke details and custom furnishings give each project a unique sense of place.",
      icon: "",
    },
    {
      title: "Collaborative process",
      description:
        "We work closely with clients, artisans and architects to bring each vision to life.",
      icon: "",
    },
  ],
  principals: [
    {
      name: "Anika Mehra",
      title: "Founder & Design Director",
      bio: "Anika leads the studio's vision, shaping interiors with a poetic balance of form, warmth, and precision.",
      image:
        "https://images.unsplash.com/photo-1618221220129-fd39e21f2def?w=800&q=80",
      email: "",
      linkedin: "",
    },
    {
      name: "Rohan Varma",
      title: "Executive Partner",
      bio: "Rohan oversees strategy and delivery, ensuring every project is executed with clarity, polish and the highest craft standards.",
      image:
        "https://images.unsplash.com/photo-1603415526960-f7e0328c1ec8?w=800&q=80",
      email: "",
      linkedin: "",
    },
  ],
  servicesList: [
    {
      title: "Concept & space planning",
      description:
        "We develop defining schemes that honor each client's story and the architecture of the space.",
      icon: "",
    },
    {
      title: "Interior styling & sourcing",
      description:
        "We curate furniture, lighting, finishes and art for a cohesive, luxurious experience.",
      icon: "",
    },
    {
      title: "Custom furniture & detailing",
      description:
        "Our team designs custom joinery and furniture pieces to elevate every room.",
      icon: "",
    },
    {
      title: "Project delivery",
      description:
        "We manage procurement, logistics and installation so every detail is executed precisely.",
      icon: "",
    },
  ],
  cta: {
    heading: "Let's create a home that feels unmistakably yours.",
    subheading:
      "Tell us about your project and we'll respond with ideas, timelines, and the best way to begin.",
    buttonText: "Book a consultation",
    buttonLink: "/contact",
  },
};

const safeArray = (value: any) => (Array.isArray(value) ? value : []);

const normalizeAboutData = (incoming: any) => ({
  ...emptyData,
  ...incoming,
  hero: { ...(incoming?.hero || emptyData.hero) },
  stats: safeArray(incoming?.stats),
  values: safeArray(incoming?.values).map((item: any) => ({
    ...item,
    title: item.title || item.name || '',
    description: item.description || item.desc || '',
  })),
  principals: safeArray(incoming?.principals),
  servicesList: safeArray(incoming?.servicesList).map((item: any) => ({
    ...item,
    title: item.title || item.name || '',
    description: item.description || item.desc || '',
  })),
  cta: {
    ...emptyData.cta,
    ...(incoming?.cta || {}),
    heading: incoming?.cta?.heading || incoming?.cta?.title || '',
    subheading: incoming?.cta?.subheading || incoming?.cta?.subtitle || '',
    buttonText: incoming?.cta?.buttonText || incoming?.cta?.text || '',
    buttonLink: incoming?.cta?.buttonLink || incoming?.cta?.link || '',
  },
});

export default function AboutPage() {
  const [data, setData] = useState<any>(emptyData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | false>(false);
  const [preview, setPreview] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const load = () => {
    setLoading(true);
    setError(false);
    fetch(`${API_BASE}/api/about`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(normalizeAboutData(json || {}));
      })
      .catch((err) => {
        console.error("Failed to load about content:", err);
        setError(err?.message || String(err));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const readFileAsBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result?.toString() || "");
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const updateHero = (field: string, value: string) => {
    setData((current: any) => ({
      ...current,
      hero: { ...current.hero, [field]: value },
    }));
  };

  const updateHeroImageFile = async (file: File | null) => {
    if (!file) return;
    const base64 = await readFileAsBase64(file);
    updateHero("backgroundImage", base64);
  };

  const updateCta = (field: string, value: string) => {
    setData((current: any) => ({
      ...current,
      cta: { ...current.cta, [field]: value },
    }));
  };

  const updateArrayItem = (section: string, index: number, field: string, value: string) => {
    setData((current: any) => {
      const sectionArray = Array.isArray(current[section]) ? current[section] : [];
      return {
        ...current,
        [section]: sectionArray.map((item: any, idx: number) =>
          idx === index ? { ...item, [field]: value } : item
        ),
      };
    });
  };

  const addArrayItem = (section: string, item: any) => {
    setData((current: any) => ({
      ...current,
      [section]: [...(Array.isArray(current[section]) ? current[section] : []), item],
    }));
  };

  const updatePrincipalImageFile = async (index: number, file: File | null) => {
    if (!file) return;
    const base64 = await readFileAsBase64(file);
    updateArrayItem("principals", index, "image", base64);
  };

  const removeArrayItem = (section: string, index: number) => {
    setData((current: any) => ({
      ...current,
      [section]: (Array.isArray(current[section]) ? current[section] : []).filter((_: any, idx: number) => idx !== index),
    }));
  };

  const saveContent = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/about`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
      }
      await load();
      alert("About page content saved successfully.");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || String(err));
      alert("Unable to save. Check the backend and try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-red-700">
        <h2 className="text-2xl font-semibold mb-2">Unable to load About content</h2>
        <p>Please confirm the backend is accessible and retry.</p>
        {error && <pre className="mt-2 text-xs text-red-800">{error}</pre>}
      </div>
    );
  }

  const hero = data.hero || emptyData.hero;
  const stats = safeArray(data.stats);
  const values = safeArray(data.values);
  const principals = safeArray(data.principals);
  const services = safeArray(data.servicesList);
  const cta = data.cta || emptyData.cta;

  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">About Page Editor</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Edit everything the frontend About page renders, then preview it live.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setPreview((prev) => !prev)}>
            {preview ? <><EyeOff className="mr-2 w-4 h-4" /> Hide Preview</> : <><Eye className="mr-2 w-4 h-4" /> Show Preview</>}
          </Button>
          <Button onClick={saveContent} disabled={saving}>
            {saving ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : <Save className="mr-2 w-4 h-4" />}
            Save About Content
          </Button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Hero Title</label>
                <input
                  value={hero.title}
                  onChange={(e) => updateHero("title", e.target.value)}
                  className="w-full rounded-md border border-input px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hero Subtitle</label>
                <textarea
                  value={hero.subtitle}
                  onChange={(e) => updateHero("subtitle", e.target.value)}
                  className="w-full min-h-[96px] rounded-md border border-input px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hero Image URL or Base64</label>
                <input
                  value={hero.backgroundImage}
                  onChange={(e) => updateHero("backgroundImage", e.target.value)}
                  placeholder="Paste image URL or data:image/..."
                  className="w-full rounded-md border border-input px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Hero Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => updateHeroImageFile(e.target.files?.[0] || null)}
                  className="w-full rounded-md border border-input px-3 py-2 text-sm"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((item: any, index: number) => (
                <div key={index} className="grid gap-3 md:grid-cols-[1fr_auto] items-start">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Value</label>
                    <input
                      value={item.value}
                      onChange={(e) => updateArrayItem("stats", index, "value", e.target.value)}
                      className="w-full rounded-md border border-input px-3 py-2 text-sm"
                    />
                    <label className="text-sm font-medium">Label</label>
                    <input
                      value={item.label}
                      onChange={(e) => updateArrayItem("stats", index, "label", e.target.value)}
                      className="w-full rounded-md border border-input px-3 py-2 text-sm"
                    />
                  </div>
                  <Button variant="outline" onClick={() => removeArrayItem("stats", index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="secondary" onClick={() => addArrayItem("stats", { value: "", label: "", suffix: "" })}>
                <Plus className="mr-2 w-4 h-4" /> Add Stat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {values.map((item: any, index: number) => (
                <div key={index} className="rounded-lg border border-muted/20 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">Value {index + 1}</h3>
                    <Button variant="outline" onClick={() => removeArrayItem("values", index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                      value={item.title}
                      onChange={(e) => updateArrayItem("values", index, "title", e.target.value)}
                      className="w-full rounded-md border border-input px-3 py-2 text-sm"
                    />
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateArrayItem("values", index, "description", e.target.value)}
                      className="w-full min-h-[96px] rounded-md border border-input px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              ))}
              <Button variant="secondary" onClick={() => addArrayItem("values", { title: "", description: "", icon: "" })}>
                <Plus className="mr-2 w-4 h-4" /> Add Value
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Principals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {principals.map((item: any, index: number) => (
                <div key={index} className="rounded-lg border border-muted/20 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">Principal {index + 1}</h3>
                    <Button variant="outline" onClick={() => removeArrayItem("principals", index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <input
                        value={item.name}
                        onChange={(e) => updateArrayItem("principals", index, "name", e.target.value)}
                        className="w-full rounded-md border border-input px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <input
                        value={item.title}
                        onChange={(e) => updateArrayItem("principals", index, "title", e.target.value)}
                        className="w-full rounded-md border border-input px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <textarea
                      value={item.bio}
                      onChange={(e) => updateArrayItem("principals", index, "bio", e.target.value)}
                      className="w-full min-h-[96px] rounded-md border border-input px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Image URL or Base64</label>
                      <input
                        value={item.image}
                        onChange={(e) => updateArrayItem("principals", index, "image", e.target.value)}
                        placeholder="Paste image URL or data:image/..."
                        className="w-full rounded-md border border-input px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => updatePrincipalImageFile(index, e.target.files?.[0] || null)}
                        className="w-full rounded-md border border-input px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                  {item.image && (
                    <div className="rounded-lg overflow-hidden border border-slate-200">
                      <img src={item.image} alt={item.name || `Principal ${index + 1}`} className="w-full object-cover" style={{ maxHeight: 180, width: '100%' }} />
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">LinkedIn</label>
                    <input
                      value={item.linkedin}
                      onChange={(e) => updateArrayItem("principals", index, "linkedin", e.target.value)}
                      className="w-full rounded-md border border-input px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              ))}
              <Button variant="secondary" onClick={() => addArrayItem("principals", { name: "", title: "", bio: "", image: "", email: "", linkedin: "" })}>
                <Plus className="mr-2 w-4 h-4" /> Add Principal
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service List</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.map((item: any, index: number) => (
                <div key={index} className="rounded-lg border border-muted/20 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">Service {index + 1}</h3>
                    <Button variant="outline" onClick={() => removeArrayItem("servicesList", index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                      value={item.title}
                      onChange={(e) => updateArrayItem("servicesList", index, "title", e.target.value)}
                      className="w-full rounded-md border border-input px-3 py-2 text-sm"
                    />
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateArrayItem("servicesList", index, "description", e.target.value)}
                      className="w-full min-h-[96px] rounded-md border border-input px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              ))}
              <Button variant="secondary" onClick={() => addArrayItem("servicesList", { title: "", description: "", icon: "" })}>
                <Plus className="mr-2 w-4 h-4" /> Add Service
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CTA Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Heading</label>
                <input
                  value={cta.heading}
                  onChange={(e) => updateCta("heading", e.target.value)}
                  className="w-full rounded-md border border-input px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subheading</label>
                <textarea
                  value={cta.subheading}
                  onChange={(e) => updateCta("subheading", e.target.value)}
                  className="w-full min-h-[96px] rounded-md border border-input px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Button Text</label>
                  <input
                    value={cta.buttonText}
                    onChange={(e) => updateCta("buttonText", e.target.value)}
                    className="w-full rounded-md border border-input px-3 py-2 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Button Link</label>
                  <input
                    value={cta.buttonLink}
                    onChange={(e) => updateCta("buttonLink", e.target.value)}
                    className="w-full rounded-md border border-input px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {preview && (
          <aside className="space-y-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
              <div style={{ background: '#F3EDE3', borderBottom: '1px solid #E8DDD0', padding: '80px 40px 72px', overflow: 'hidden' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                  <div className="about-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
                    <div>
                      <p className={`hero-label${heroReady ? ' ready' : ''}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9814C', marginBottom: 24 }}>
                        About Us
                      </p>
                      <h1 className="hero-title-display" style={{ fontSize: 60, fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.01em', color: '#1A1714', marginBottom: 0 }}>
                        <span className="hero-title-line">
                          <span className={`hero-title-inner${heroReady ? ' ready' : ''}`} style={{ transitionDelay: '0.08s' }}>
                            {hero.title}
                          </span>
                        </span>
                      </h1>
                      <p className={`hero-sub${heroReady ? ' ready' : ''}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: '#7A6B58', marginTop: 28, maxWidth: 440 }}>
                        {hero.subtitle}
                      </p>
                    </div>
                    <div style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.75s ease 0.4s, transform 0.75s cubic-bezier(0.22,1,0.36,1) 0.4s' }}>
                      <div className="hero-img-wrap" style={{ position: 'relative', overflow: 'hidden', minHeight: 480, borderRadius: 4 }}>
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${hero.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,23,20,0.15), transparent)' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: '64px 40px', maxWidth: 1200, margin: '0 auto' }}>
                <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  {stats.map((stat: any, i: number) => (
                    <div key={i} className={`stat-card reveal-child${heroReady ? ' visible' : ''}`} style={{ transitionDelay: heroReady ? `${i * 0.1}s` : '0s', background: '#FFFFFF', border: '1px solid #E8DDD0', borderRadius: 4, padding: 32, textAlign: 'center' }}>
                      <strong style={{ display: 'block', fontSize: 48, fontWeight: 300, color: '#1A1714', lineHeight: 1, marginBottom: 8 }}>{stat.value}</strong>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A89880' }}>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#F3EDE3', borderTop: '1px solid #E8DDD0', borderBottom: '1px solid #E8DDD0', padding: '80px 40px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                  <div style={{ marginBottom: 48 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9814C', marginBottom: 16 }}>What We Believe</p>
                    <h2 style={{ fontSize: 40, fontWeight: 300, lineHeight: 1.1, color: '#1A1714' }}>Design with purpose<br /><em style={{ fontStyle: 'italic' }}>at every scale.</em></h2>
                  </div>
                  <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                    {values.map((v: any, i: number) => (
                      <div key={i} className={`value-card reveal-child${heroReady ? ' visible' : ''}`} style={{ transitionDelay: heroReady ? `${i * 0.1}s` : '0s', background: '#FFFFFF', border: '1px solid #E8DDD0', borderRadius: 4, padding: 36, position: 'relative', overflow: 'hidden' }}>
                        <h3 style={{ fontSize: 22, fontWeight: 400, color: '#1A1714', marginBottom: 12 }}>{v.title}</h3>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: '#7A6B58' }}>{v.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ padding: '80px 40px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ marginBottom: 48 }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9814C', marginBottom: 16 }}>The Founders</p>
                  <h2 style={{ fontSize: 40, fontWeight: 300, lineHeight: 1.1, color: '#1A1714' }}>Meet the creative<br /><em style={{ fontStyle: 'italic' }}>leaders.</em></h2>
                </div>
                <div className="principals-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                  {principals.map((person: any, index: number) => (
                    <div key={index} className={`principal-card reveal-child${heroReady ? ' visible' : ''}`} style={{ transitionDelay: heroReady ? `${index * 0.08}s` : '0s', background: '#FFFFFF', border: '1px solid #E8DDD0', borderRadius: 4, overflow: 'hidden' }}>
                      <div className="img-wrap" style={{ position: 'relative', overflow: 'hidden', height: 320 }}>
                        <img src={person.image} alt={person.name || 'Principal portrait'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '28px 28px 32px' }}>
                        <h3 style={{ fontSize: 24, fontWeight: 400, color: '#1A1714', marginBottom: 4 }}>{person.name}</h3>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C9814C', marginBottom: 16 }}>{person.title}</p>
                        <div style={{ height: 1, background: '#E8DDD0', marginBottom: 16 }} />
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, lineHeight: 1.75, color: '#7A6B58' }}>{person.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: '0 40px 80px', maxWidth: 1200, margin: '0 auto' }}>
                <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9814C', marginBottom: 16 }}>Our Services</p>
                    <h2 style={{ fontSize: 40, fontWeight: 300, lineHeight: 1.1, color: '#1A1714', marginBottom: 32 }}>Full-service<br /><em style={{ fontStyle: 'italic' }}>interior design.</em></h2>
                    <div className="services-img-wrap" style={{ position: 'relative', overflow: 'hidden', borderRadius: 4, height: 380 }}>
                      <img src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=1200&q=80" alt="Contemporary interior workspace" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                  <div style={{ paddingTop: 64 }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: '#7A6B58', marginBottom: 40 }}>
                      From concept through completion, we provide a complete range of services tailored to exceptional residential and hospitality projects.
                    </p>
                    <div>
                      {services.map((s: any, i: number) => (
                        <div key={i} className={`service-item reveal-child${heroReady ? ' visible' : ''}`} style={{ transitionDelay: heroReady ? `${i * 0.1}s` : '0s', padding: '28px 0', borderBottom: '1px solid #E8DDD0' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                            <div>
                              <h3 style={{ fontSize: 20, fontWeight: 400, color: '#1A1714', marginBottom: 6 }}>{s.title}</h3>
                              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, lineHeight: 1.7, color: '#7A6B58' }}>{s.description}</p>
                            </div>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#C8B89A', marginTop: 4, flexShrink: 0 }}>0{i + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: '#1A1714', padding: '80px 40px' }}>
                <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#C9814C', marginBottom: 20 }}>
                    Start your project
                  </p>
                  <h2 style={{ fontSize: 44, fontWeight: 300, lineHeight: 1.1, color: '#FAF8F5', marginBottom: 20 }}>
                    {cta.heading}
                  </h2>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: 'rgba(250,248,245,0.5)', marginBottom: 40 }}>
                    {cta.subheading}
                  </p>
                  <a href={cta.buttonLink || '/contact'} className="inline-flex rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950" style={{ textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    {cta.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
