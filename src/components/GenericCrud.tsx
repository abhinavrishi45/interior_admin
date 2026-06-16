"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2, Loader2, Save, X } from "lucide-react";

interface GenericCrudField {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "image" | "json";
}

interface GenericCrudProps {
  title: string;
  resource: string;
  fields: GenericCrudField[];
  endpoint?: string;
}

export function GenericCrud({ title, resource, fields, endpoint }: GenericCrudProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const baseEndpoint = endpoint ? endpoint.replace(/\/$/, '') : `https://backendinterior.tannis.in/api/data/${resource}`;

  const fetchItems = () => {
    setLoading(true);
    setError(false);
    fetch(baseEndpoint)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend fetch error:", err);
        setError(true);
        setLoading(false);
      });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...editingItem };

    fields.forEach((field) => {
      if (field.type === "json" && typeof payload[field.name] === "string") {
        const rawValue = payload[field.name].trim();
        payload[field.name] = rawValue
          ? rawValue.split(/\r?\n|,\s*/).map((item: string) => item.trim()).filter(Boolean)
          : [];
      }
    });

    const method = editingItem._id ? "PUT" : "POST";
    const url = editingItem._id
      ? `${baseEndpoint}/${editingItem._id}`
      : baseEndpoint;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setEditingItem(null);
        fetchItems();
      }
    } finally {
      setSaving(false);
    }
  };

  const readFileAsBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result?.toString() || "");
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const renderField = (f: GenericCrudField) => {
    const fieldId = `${resource}-${f.name}`;
    if (f.type === "textarea" || f.type === "json") {
      return (
        <textarea
          id={fieldId}
          title={f.label}
          className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          placeholder={f.type === "json" ? `${f.label} (comma or newline separated)` : f.label}
          value={editingItem[f.name] || ""}
          onChange={(e) => setEditingItem({ ...editingItem, [f.name]: e.target.value })}
        />
      );
    }

    if (f.type === "image") {
      return (
        <div className="space-y-2">
          <input
            type="file"
            title={f.label}
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const b64 = await readFileAsBase64(file);
              setEditingItem({ ...editingItem, [f.name]: b64 });
            }}
            className="w-full"
          />
          {editingItem[f.name] && (
            <div className="space-y-2">
              <img src={editingItem[f.name]} alt={f.label} className="w-full rounded-md max-h-40 object-cover" />
              <Button type="button" variant="outline" onClick={() => setEditingItem({ ...editingItem, [f.name]: '' })}>
                Remove image
              </Button>
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        id={fieldId}
        title={f.label}
        type={f.type}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
        placeholder={f.label}
        value={editingItem[f.name] || ""}
        onChange={(e) => setEditingItem({ ...editingItem, [f.name]: e.target.value })}
      />
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await fetch(`${baseEndpoint}/${id}`, { method: "DELETE" });
      fetchItems();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin w-6 h-6" /></div>;
  if (error) return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg border-dashed bg-red-50/50">
      <h3 className="text-lg font-bold text-red-600 mb-2">Backend Connection Failed</h3>
      <p className="text-muted-foreground">Please make sure the backend server is running on port 5000.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {!editingItem && (
          <Button onClick={() => setEditingItem({})}>
            <Plus className="w-4 h-4 mr-2" /> Add New
          </Button>
        )}
      </div>

      {editingItem ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem._id ? "Edit" : "New"} {title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              {fields.map((f) => {
                const fieldId = `${resource}-${f.name}`;
                return (
                  <div key={f.name} className="space-y-2">
                    <label htmlFor={fieldId} className="text-sm font-medium">{f.label}</label>
                    {renderField(f)}
                  </div>
                );
              })}
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setEditingItem(null)}>Cancel</Button>
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item._id}>
              {item.image && (
                <div className="overflow-hidden rounded-t-md h-40">
                  <img src={item.image} alt={item.title || item.name || 'image'} className="w-full h-full object-cover" />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{item.title || item.name || "Untitled"}</CardTitle>
              </CardHeader>
              <CardContent>
                {fields.slice(0, 2).map((f) => (
                  <p key={f.name} className="text-sm text-muted-foreground line-clamp-2 mb-1">
                    <span className="font-medium text-foreground">{f.label}:</span> {item[f.name]}
                  </p>
                ))}
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="icon" onClick={() => setEditingItem(item)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDelete(item._id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground border rounded-lg border-dashed">
              No items found. Click "Add New" to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
