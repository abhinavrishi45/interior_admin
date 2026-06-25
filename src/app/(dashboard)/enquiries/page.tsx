"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Enquiry {
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  enquiryType?: string;
  budget?: string;
  message?: string;
  status?: string;
  createdAt?: string;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://backendinterior.tannis.in/api/data/enquiries");
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      }
    } catch (err) {
      console.error("Error fetching enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`https://backendinterior.tannis.in/api/data/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Error updating enquiry:", err);
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    try {
      const res = await fetch(`https://backendinterior.tannis.in/api/data/enquiries/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Error deleting enquiry:", err);
    }
  };

  const getStatusVariant = (status?: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Contacted":
        return "default";
      case "Proposal Sent":
        return "secondary";
      case "Converted":
        return "success";
      default:
        return "outline";
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Consultation Enquiries</h1>
          <p className="text-muted-foreground mt-1">
            Manage contact requests from your website ({enquiries.length} total)
          </p>
        </div>
        <Button onClick={fetchEnquiries}>Refresh</Button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading enquiries...</p>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">No enquiries yet.</p>
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.map((enquiry) => (
                  <TableRow key={enquiry._id || enquiry.id}>
                    <TableCell className="font-medium">{enquiry.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <a
                          href={`mailto:${enquiry.email}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {enquiry.email}
                        </a>
                        {enquiry.phone && (
                          <a
                            href={`tel:${enquiry.phone}`}
                            className="text-xs text-muted-foreground hover:underline"
                          >
                            {enquiry.phone}
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{enquiry.enquiryType || "—"}</TableCell>
                    <TableCell className="text-sm">{enquiry.city || "—"}</TableCell>
                    <TableCell className="text-sm">{formatDate(enquiry.createdAt)}</TableCell>
                    <TableCell>
                      <select
                        value={enquiry.status || "Pending"}
                        onChange={(e) =>
                          updateStatus(
                            enquiry._id || enquiry.id || "",
                            e.target.value
                          )
                        }
                        className="text-xs px-2 py-1 rounded border border-border"
                        title="Update enquiry status"
                        aria-label="Enquiry status"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Converted">Converted</option>
                      </select>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedEnquiry(enquiry)}
                        title="View full message"
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          deleteEnquiry(enquiry._id || enquiry.id || "")
                        }
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {selectedEnquiry ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
              <div className="bg-background rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                  <div>
                    <h2 className="text-xl font-semibold">Enquiry Details</h2>
                    <p className="text-sm text-muted-foreground">Review the message sent by the user.</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedEnquiry(null)}>
                    Close
                  </Button>
                </div>
                <div className="space-y-4 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Name</p>
                      <p className="font-medium">{selectedEnquiry.name || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</p>
                      <p className="font-medium">
                        <a href={`mailto:${selectedEnquiry.email}`} className="text-blue-600 hover:underline">
                          {selectedEnquiry.email || "—"}
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedEnquiry.phone || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">City</p>
                      <p className="font-medium">{selectedEnquiry.city || "—"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Type</p>
                      <p className="font-medium">{selectedEnquiry.enquiryType || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Budget</p>
                      <p className="font-medium">{selectedEnquiry.budget || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Status</p>
                      <p className="font-medium">{selectedEnquiry.status || "Pending"}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Message</p>
                    <div className="rounded-xl border border-border bg-card p-4 text-sm leading-7 text-foreground">
                      {selectedEnquiry.message || "No message provided."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

