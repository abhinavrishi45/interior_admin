import { SingletonEditor } from "@/components/SingletonEditor";

export default function ContactPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <SingletonEditor
        title="Contact Page Info"
        type="contact"
        fields={[
          { name: "email", label: "Email Address", type: "text" },
          { name: "phone", label: "Phone Number", type: "text" },
          { name: "address", label: "Physical Address", type: "textarea" },
          { name: "workingHours", label: "Working Hours", type: "text" },
        ]}
      />
    </div>
  );
}
