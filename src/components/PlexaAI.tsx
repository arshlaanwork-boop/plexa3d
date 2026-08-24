import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function PlexaAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Sequence 1: Pricing
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
  const text1Scale = useTransform(scrollYProgress, [0, 0.25], [0.8, 1]);

  // Sequence 2: Experience
  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
  const text2Scale = useTransform(scrollYProgress, [0.3, 0.55], [0.8, 1]);

  // Sequence 3: AI Core
  const aiOpacity = useTransform(scrollYProgress, [0.65, 0.8, 1], [0, 1, 1]);
  const aiScale = useTransform(scrollYProgress, [0.65, 0.8], [0.5, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505] border-t border-white/5">
        <Starfield />

        {/* Sequence 1 */}
        <motion.div style={{ opacity: text1Opacity, scale: text1Scale }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <div className="relative flex items-center justify-center">
              <div className="absolute w-[300px] h-[300px] border border-white/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute w-[450px] h-[450px] border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
              <div className="absolute w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,1)] top-0 -translate-y-1/2"></div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white relative z-10 text-center tracking-tight">
                Pricing is just a number.
              </h2>
           </div>
        </motion.div>

        {/* Sequence 2 */}
        <motion.div style={{ opacity: text2Opacity, scale: text2Scale }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <div className="relative flex items-center justify-center">
              {/* Subtle rotating circular track */}
              <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full border-t-white/20 animate-spin" style={{ animationDuration: '4s' }}></div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white relative z-10 text-center tracking-tight leading-tight">
                Experience is what<br/>you're buying.
              </h2>
           </div>
        </motion.div>

        {/* Sequence 3: AI Core */}
        <motion.div style={{ opacity: aiOpacity, scale: aiScale }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
              <div className="w-16 h-[1px] bg-white/30 hidden md:block"></div>
              <h3 className="text-xs md:text-sm tracking-[0.3em] font-bold text-white uppercase text-center">PLEXA AI CONTROL CENTER</h3>
              <div className="w-16 h-[1px] bg-white/30 hidden md:block"></div>
           </div>

           <div className="relative w-full max-w-6xl h-[700px] flex items-center justify-center mt-12 scale-50 sm:scale-75 md:scale-100">
              <SolarSystem />
           </div>
        </motion.div>
      </div>
    </section>
  );
}

function SolarSystem() {
   return (
     <div className="relative w-full h-full flex items-center justify-center">
        <style>{`
          @keyframes particleOut {
            0% { transform: translateY(-60px); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-150px); opacity: 0; }
          }
          @keyframes moveAlongLine {
            0% { left: 10%; opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { left: 90%; opacity: 0; }
          }
        `}</style>

        {/* Orbital Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/20 rounded-full border-dashed animate-[spin_60s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/10 rounded-full animate-[spin_80s_linear_infinite_reverse]"></div>

        {/* Center Sun */}
        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white shadow-[0_0_80px_rgba(255,255,255,1),_0_0_150px_rgba(255,255,255,0.8),_0_0_300px_rgba(255,255,255,0.4)]">
           <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#ffffff,_#facc15_80%,_#ea580c)] mix-blend-overlay opacity-90 animate-pulse"></div>
           {/* Corona/flares */}
           <div className="absolute inset-[-20px] rounded-full border-2 border-white/30 animate-[spin_10s_linear_infinite] border-dashed"></div>
           <div className="absolute inset-[-40px] rounded-full border border-white/20 animate-[spin_15s_linear_infinite_reverse] border-dotted"></div>
           
           {/* Particles emitting from core */}
           {Array.from({length: 12}).map((_, i) => (
              <div key={i} className="absolute top-1/2 left-1/2 w-[2px] h-[2px]" style={{ transform: `rotate(${i * 30}deg)` }}>
                 <div className="w-1.5 h-1.5 bg-orange-200 rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]"
                      style={{ animation: `particleOut ${1.5 + (i%3)*0.5}s ease-in-out infinite alternate` }}></div>
              </div>
           ))}
        </div>

        {/* Planets mapped to actual business segments */}
        <Planet angle={30} distance={260} color="from-emerald-400 to-teal-800" label="CONTENT" subLabel="Active" size={70} />
        <Planet angle={90} distance={360} color="from-orange-400 to-red-800" label="WEBSITE" subLabel="100%" size={80} />
        <Planet angle={150} distance={240} color="from-red-500 to-rose-900" label="SOCIAL" subLabel="Sync" size={60} />
        <Planet angle={210} distance={420} color="from-purple-400 to-indigo-900" label="MARKETING" subLabel="Linked" size={90} />
        <Planet angle={270} distance={280} color="from-blue-400 to-cyan-800" label="CUSTOMERS" subLabel="Live" size={65} />
        <Planet angle={330} distance={380} color="from-yellow-300 to-orange-600" label="AUTOMATION" subLabel="Running" size={75} />
     </div>
   )
}

function Planet({ angle, distance, color, label, subLabel, size }: { angle: number, distance: number, color: string, label: string, subLabel: string, size: number }) {
   const rad = (angle * Math.PI) / 180;
   
   // Determine if the HUD should be on the left or right side based on the angle
   const isRightSide = angle < 90 || angle > 270;
   
   return (
     <>
       {/* Connecting Line */}
       <div className="absolute top-1/2 left-1/2 h-[1px] origin-left bg-gradient-to-r from-white/40 to-transparent"
            style={{
               width: distance,
               transform: `translateY(-50%) rotate(${angle}deg)`
            }}>
            {/* Moving dot along the line */}
            <div className="absolute top-1/2 left-0 w-2 h-2 bg-white rounded-full -translate-y-1/2 shadow-[0_0_10px_white]"
                 style={{ animation: 'moveAlongLine 3s linear infinite' }}></div>
       </div>

       {/* Planet Wrapper */}
       <div className="absolute top-1/2 left-1/2 z-20 group"
            style={{
               transform: `translate(-50%, -50%) translate(${Math.cos(rad) * distance}px, ${Math.sin(rad) * distance}px)`
            }}>
          <div className={`rounded-full bg-gradient-to-br ${color} shadow-[0_0_30px_rgba(255,255,255,0.1)] relative overflow-hidden`}
               style={{ width: size, height: size }}>
             {/* Internal lighting / 3D effect */}
             <div className="absolute inset-0 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5)]"></div>
             <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] bg-white/40 rounded-full blur-[4px]"></div>
          </div>

          {/* HUD UI Label */}
          <div className={`absolute top-1/2 ${isRightSide ? 'left-full ml-4' : 'right-full mr-4'} -translate-y-1/2 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-lg flex flex-col gap-1 w-32 shadow-xl opacity-80 group-hover:opacity-100 transition-opacity`}>
             <div className="flex justify-between items-center border-b border-white/10 pb-1 mb-1">
                <span className="text-[10px] font-mono text-gray-400">ID: {Math.floor(Math.random()*9000)+1000}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
             </div>
             <span className="text-xs font-bold text-white uppercase tracking-wider">{label}</span>
             <div className="w-full bg-white/10 h-1 mt-1 rounded-full overflow-hidden">
                <div className="h-full bg-white/60" style={{ width: '70%' }}></div>
             </div>
          </div>
       </div>
     </>
   )
}

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5,
      speed: Math.random() * 0.2 + 0.05,
      opacity: Math.random()
    }));

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'white';
      stars.forEach(star => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.x -= star.speed;
        if (star.x < 0) {
           star.x = width;
           star.y = Math.random() * height;
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40"></canvas>;
}
