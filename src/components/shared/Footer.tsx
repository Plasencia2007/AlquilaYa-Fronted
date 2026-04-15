import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/10 bg-surface-container-low flex flex-col md:flex-row justify-between items-center px-12 py-12 gap-8">
      <div className="flex flex-col items-center md:items-start gap-4">
        <span className="text-xl font-black tracking-tighter text-primary">AlquilaYa</span>
        <p className="font-['Inter'] text-sm tracking-wide text-on-surface-variant max-w-xs text-center md:text-left opacity-70">
          © 2026 AlquilaYa. Curating Urban Living for the Modern Professional.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8">
        <Link href="#" className="font-['Inter'] text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
          Privacy Policy
        </Link>
        <Link href="#" className="font-['Inter'] text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
          Terms of Service
        </Link>
        <Link href="#" className="font-['Inter'] text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
          Help Center
        </Link>
        <Link href="#" className="font-['Inter'] text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
          Partner with Us
        </Link>
      </div>

      <div className="flex gap-4">
        <button className="material-symbols-outlined text-outline hover:text-primary transition-colors cursor-pointer">
          language
        </button>
        <button className="material-symbols-outlined text-outline hover:text-primary transition-colors cursor-pointer">
          share
        </button>
      </div>
    </footer>
  );
}

