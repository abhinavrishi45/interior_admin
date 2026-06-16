"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";

interface NewProjectModalProps {
  onClose: () => void;
  onSave: (project: any) => void;
}

export function NewProjectModal({ onClose, onSave }: NewProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    dueDate: "",
    manager: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: `PRJ-0${Math.floor(Math.random() * 100) + 10}`,
      ...formData,
      status: "Planning",
      progress: 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
      <div className="bg-background rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">New Project Details</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">Project Name</label>
            <Input 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g. Skyline Renovation" 
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="client">Client Name</label>
            <Input 
              id="client" 
              name="client" 
              value={formData.client} 
              onChange={handleChange} 
              placeholder="e.g. Skyline Corp" 
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="dueDate">Due Date</label>
              <Input 
                id="dueDate" 
                name="dueDate" 
                type="date" 
                value={formData.dueDate} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="manager">Manager</label>
              <Input 
                id="manager" 
                name="manager" 
                value={formData.manager} 
                onChange={handleChange} 
                placeholder="e.g. Alex Rivera" 
                required 
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Project</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
