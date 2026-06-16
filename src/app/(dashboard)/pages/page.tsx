"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FileText, Edit } from "lucide-react";

const pageSlugs = [
  { slug: "home", name: "Home" },
  { slug: "about", name: "About" },
  { slug: "blog", name: "Blog" },
  { slug: "commercial", name: "Commercial" },
  { slug: "contact", name: "Contact" },
  { slug: "designs", name: "Designs" },
  { slug: "ourteam", name: "Our Team" },
  { slug: "projects", name: "Projects" },
  { slug: "services", name: "Services" },
  { slug: "shop", name: "Shop" },
  { slug: "studio", name: "Studio" },
];

export default function PagesOverview() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch pages from backend to see which ones are configured
    fetch("https://backendinterior.tannis.in/api/pages")
      .then((res) => res.json())
      .then((data) => {
        setPages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pages:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pages Management</h1>
          <p className="text-muted-foreground mt-1">Manage the content of all frontend pages.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {pageSlugs.map((pageDef) => {
          const backendPage = pages.find((p) => p.slug === pageDef.slug);
          const lastUpdated = backendPage?.updatedAt
            ? new Date(backendPage.updatedAt).toLocaleDateString()
            : "Never";

          return (
            <Card key={pageDef.slug} className="flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-muted-foreground">/{pageDef.slug}</span>
                  {backendPage ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                      Configured
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      Unconfigured
                    </span>
                  )}
                </div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  {pageDef.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  Last updated: <span className="text-foreground font-medium">{lastUpdated}</span>
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Link href={`/pages/${pageDef.slug}`} className="w-full">
                  <Button variant={backendPage ? "outline" : "default"} className="w-full gap-2">
                    <Edit className="w-4 h-4" />
                    {backendPage ? "Edit Content" : "Configure Page"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
