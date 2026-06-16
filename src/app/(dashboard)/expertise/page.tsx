"use client";

import { GenericCrud } from "@/components/GenericCrud";
import { useEffect, useState } from "react";

type ExpertiseItem = {
  _id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  features?: string[];
  accent?: string;
  tag?: string;
};

export default function ExpertisePage() {
  const [preview, setPreview] = useState(false);
  const [items, setItems] = useState<ExpertiseItem[]>([]);

  useEffect(() => {
    if (!preview) return;
    fetch("https://backendinterior.tannis.in/api/expertise")
      .then((res) => res.ok ? res.json() : [])
      .then((json) => setItems(json))
      .catch(() => setItems([]));
  }, [preview]);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Our Expertise (Admin)</h1>
        <div>
          <button className="btn mr-2" onClick={() => setPreview((p) => !p)}>
            {preview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>
      </div>

      <GenericCrud
        title="Our Expertise"
        resource="expertise"
        endpoint="https://backendinterior.tannis.in/api/expertise"
        fields={[
          { name: "title", label: "Title", type: "text" },
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "features", label: "Features", type: "json" },
          { name: "accent", label: "Accent Color", type: "text" },
          { name: "tag", label: "Tag", type: "text" },
          { name: "image", label: "Image", type: "image" },
        ]}
      />

      {preview && (
        <div className="mt-8">
          <main className="min-h-screen bg-[#FAF8F5] text-[#1A1714]">
            <div className="mx-auto max-w-300 px-10 pb-20">
              {items.map((service, idx) => (
                <div
                  key={service._id || idx}
                  className={`mb-6 flex flex-col overflow-hidden rounded-[40px] bg-white shadow-xl ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                >
                  <div className="relative basis-1/2">
                    <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
                    <div
                      className={`absolute inset-0 ${idx % 2 !== 0 ? 'bg-linear-to-l from-[rgba(26,23,20,0.15)] to-transparent' : 'bg-linear-to-r from-[rgba(26,23,20,0.15)] to-transparent'}`}
                    />
                    <div className="absolute bottom-6 left-6 text-[72px] font-light text-[rgba(250,248,245,0.18)] font-serif">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between px-11 py-12">
                    <div>
                      <h2 className="mb-2 text-[28px] font-normal">{service.title}</h2>
                      {service.subtitle && (
                        <p className="mb-4 text-base text-[#1A1714]">{service.subtitle}</p>
                      )}
                      <p className="mb-7 text-[#7A6B58]">{service.description}</p>
                      {Array.isArray(service.features) && service.features.length > 0 && (
                        <div className="grid gap-2.5 mb-6">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-[#7A6B58] text-[13px]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#C9814C]" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="mb-6 h-px bg-[#E8DDD0]" />
                      <a href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#1A1714] px-6 py-3 text-sm font-medium text-[#FAF8F5]">
                        Enquire Now <span className="ml-2">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
