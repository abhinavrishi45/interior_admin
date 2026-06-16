import { GenericCrud } from "@/components/GenericCrud";

export default function ServicesPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <GenericCrud
        title="Services"
        resource="services"
        fields={[
          { name: "title", label: "Service Name", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "order", label: "Display Order", type: "number" },
        ]}
      />
    </div>
  );
}
