"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Loader2, Save } from "lucide-react";

interface SingletonEditorProps {
  title: string;
  type: string;
  fields: { name: string; label: string; type: "text" | "textarea" }[];
}

export function SingletonEditor({ title, type, fields }: SingletonEditorProps) {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://backendinterior.tannis.in/api/data/singleton/${type}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend fetch error:", err);
        setError(true);
        setLoading(false);
      });
  }, [type]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch(`https://backendinterior.tannis.in/api/data/singleton/${type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      alert("Saved successfully!");
    } finally {
      setSaving(false);
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
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">Manage content for the {title} page.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Page Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            {fields.map((f) => (
              <div key={f.name} className="space-y-2">
                <label className="text-sm font-medium">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={data[f.name] || ""}
                    onChange={(e) => setData({ ...data, [f.name]: e.target.value })}
                  />
                ) : (
                  <input
                    type={f.type}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={data[f.name] || ""}
                    onChange={(e) => setData({ ...data, [f.name]: e.target.value })}
                  />
                )}
              </div>
            ))}
            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
