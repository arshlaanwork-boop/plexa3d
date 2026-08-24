export function About() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-8 py-32 text-white border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Built by young people who wanted to build differently.</h2>
        </div>
        <div>
            <div className="space-y-6 text-xl md:text-2xl font-light text-gray-400 leading-relaxed">
                <p>
                    We saw businesses with good products, good stores and real ambition struggling to keep up with content, websites, social media and technology.
                </p>
                <p>
                    So we decided to bring those things together.
                </p>
                <p className="text-white font-medium">
                    Online when the business needs digital.<br/>
                    On-ground when the business needs execution.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
