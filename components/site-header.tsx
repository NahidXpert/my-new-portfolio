import Link from "next/link";
import Image from "next/image";

const navigation = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/#home" className="flex items-center gap-3">
          <Image
            src="/android-chrome-192x192.png"
            alt="MD Nahid Nur"
            className="h-9 w-9 rounded-lg"
            width={36}
            height={36}
          />
          <span className="hidden font-mono text-xs font-bold uppercase tracking-[0.2em] text-white sm:inline">
            MD Nahid Nur
          </span>
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-4 sm:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300 transition hover:text-lime-400 sm:text-xs"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
