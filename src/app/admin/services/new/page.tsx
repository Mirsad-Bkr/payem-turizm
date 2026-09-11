import { ServiceForm } from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl uppercase tracking-wide">Yeni Hizmet</h1>
      <ServiceForm />
    </div>
  );
}
