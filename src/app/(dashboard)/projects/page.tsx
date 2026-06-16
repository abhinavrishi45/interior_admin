"use client";

import { GenericCrud } from "@/components/GenericCrud";
import { useEffect, useState } from "react";

interface Project {
  _id?: string;
  id?: string;
  title?: string;
  image?: string;
  location?: string;
  year?: string;
  excerpt?: string;
  tag?: string;
}

export default function ProjectsPage() {
  const [preview, setPreview] = useState(false);
  const [items, setItems] = useState<Project[]>([]);

  useEffect(() => {
    if (!preview) return;
    fetch("https://backendinterior.tannis.in/api/projects")
      .then((res) => res.ok ? res.json() : [])
      .then((json) => setItems(json))
      .catch(() => setItems([]));
  }, [preview]);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Projects (Admin)</h1>
        <button className="btn mr-2" onClick={() => setPreview((p) => !p)}>
          {preview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      <GenericCrud
        title="Projects"
        resource="projects"
        endpoint="https://backendinterior.tannis.in/api/projects"
        fields={[
          { name: "title", label: "Title", type: "text" },
          { name: "category", label: "Category", type: "text" },
          { name: "location", label: "Location", type: "text" },
          { name: "year", label: "Year", type: "text" },
          { name: "area", label: "Area", type: "text" },
          { name: "excerpt", label: "Excerpt", type: "textarea" },
          { name: "image", label: "Image", type: "image" },
          { name: "tag", label: "Tag", type: "text" },
        ]}
      />

      {preview && (
        <div className="mt-8">
          <div style={{ minHeight: '100vh', background: '#FAF8F5', color: '#1A1714', padding: '40px' }}>
            <h2 style={{ fontSize: 32, fontWeight: 300, marginBottom: 40 }}>Projects Preview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {items.map((proj) => (
                <div key={proj._id || proj.id} style={{ background: '#FFF', border: '1px solid #E8DDD0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: 240 }}>
                    {proj.image && <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: 18, fontWeight: 400, marginBottom: 8 }}>{proj.title}</h3>
                    <p style={{ fontSize: 12, color: '#7A6B58', marginBottom: 8 }}>{proj.location} • {proj.year}</p>
                    <p style={{ fontSize: 13, lineHeight: 1.5, color: '#7A6B58', marginBottom: 12 }}>{proj.excerpt}</p>
                    <div style={{ fontSize: 11, color: '#A89880' }}>{proj.tag}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
