export function buildWhatsAppUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}

export function tourReservationMessage(tourTitle: string) {
  return `Merhaba Payem Turizm, "${tourTitle}" için rezervasyon yaptırmak istiyorum. Tarih ve kişi sayısı hakkında bilgi alabilir miyim?`;
}
