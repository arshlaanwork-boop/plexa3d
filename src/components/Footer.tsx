export function Footer() {
  return (
    <footer className="w-full max-w-[1400px] mx-auto px-8 py-12 text-gray-400 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-4 h-4 rounded-full border border-red-500 bg-transparent relative flex items-center justify-center">
           <div className="w-1 h-1 rounded-full bg-red-500" />
        </div>
        <span className="font-semibold text-lg tracking-tight text-white">PLEXA</span>
      </div>
      
      <div className="flex items-center gap-8 text-sm font-light">
        <a href="https://instagram.com/go.plexa" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
          Instagram: @go.plexa
        </a>
        <a href="mailto:info@goplexa.in" className="hover:text-white transition-colors">
          Inquiries: info@goplexa.in
        </a>
      </div>
    </footer>
  );
}
