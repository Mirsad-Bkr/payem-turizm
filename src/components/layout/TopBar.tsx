type TopBarProps = {
  left: string;
  right: string;
  phone: string;
};

export function TopBar({ left, right, phone }: TopBarProps) {
  return (
    <div className="bg-black text-white text-xs sm:text-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5">
        <p className="truncate font-medium tracking-wide">{left}</p>
        <div className="flex shrink-0 items-center gap-3 tracking-wide">
          <span className="hidden sm:inline text-white/80">{right}</span>
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-semibold hover:opacity-80">
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
}
