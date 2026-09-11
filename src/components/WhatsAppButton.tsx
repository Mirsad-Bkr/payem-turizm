import Link from "next/link";
import { buildWhatsAppUrl, tourReservationMessage } from "@/lib/whatsapp";

type Props = {
  phone: string;
  tourTitle?: string;
  label?: string;
  className?: string;
};

export function WhatsAppButton({
  phone,
  tourTitle,
  label = "WhatsApp ile Rezervasyon",
  className = "",
}: Props) {
  const message = tourTitle
    ? tourReservationMessage(tourTitle)
    : "Merhaba Payem Turizm, bilgi almak istiyorum.";
  const href = buildWhatsAppUrl(phone, message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center bg-black px-4 py-3 text-center font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.12em] text-white transition hover:bg-black/80 sm:px-6 ${className}`}
    >
      {label}
    </a>
  );
}

export function WhatsAppLink({
  phone,
  children,
  className = "",
}: {
  phone: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={buildWhatsAppUrl(phone, "Merhaba Payem Turizm, bilgi almak istiyorum.")}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </Link>
  );
}
