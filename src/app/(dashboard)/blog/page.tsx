import { GenericCrud } from "@/components/GenericCrud";

export default function BlogPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <GenericCrud
        title="Blog Posts"
        resource="blog"
        fields={[
          { name: "title", label: "Title", type: "text" },
          { name: "slug", label: "URL Slug", type: "text" },
          { name: "excerpt", label: "Excerpt", type: "textarea" },
          { name: "content", label: "Content", type: "textarea" },
          { name: "author", label: "Author", type: "text" },
          { name: "image", label: "Image", type: "image" },
        ]}
      />
    </div>
  );
}
