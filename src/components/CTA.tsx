import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-8 py-48 text-white text-center border-t border-white/5">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight mb-8">
          Your business already exists.<br/>
          <span className="text-gray-500 font-light">Now make it impossible to ignore.</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 font-light mb-16">
          Tell us what you sell. We'll figure out what needs to be built.
        </p>
        <button className="px-10 py-5 rounded-full bg-white text-black hover:bg-gray-200 transition-colors text-lg font-bold tracking-wide flex items-center gap-3">
          Start a Project <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
