import { GenericCrud } from "@/components/GenericCrud";

export default function TeamPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <GenericCrud
        title="Our Team"
        resource="team"
        endpoint="https://backendinterior.tannis.in/api/team"
        fields={[
          { name: "name", label: "Full Name", type: "text" },
          { name: "role", label: "Role / Title", type: "text" },
          { name: "department", label: "Department", type: "text" },
          { name: "bio", label: "Bio", type: "textarea" },
          { name: "education", label: "Education (comma separated)", type: "json" },
          { name: "expertise", label: "Expertise (comma or newline separated)", type: "json" },
          { name: "image", label: "Profile Image", type: "image" },
          { name: "email", label: "Email", type: "text" },
          { name: "linkedin", label: "LinkedIn URL", type: "text" },
          { name: "instagram", label: "Instagram Handle", type: "text" },
          { name: "yearsOfExperience", label: "Years of Experience", type: "number" },
          { name: "awards", label: "Awards (comma separated)", type: "json" },
          { name: "languages", label: "Languages (comma separated)", type: "json" },
          { name: "order", label: "Display Order", type: "number" },
          { name: "isFeatured", label: "Featured Member", type: "text" },
        ]}
      />
    </div>
  );
}
