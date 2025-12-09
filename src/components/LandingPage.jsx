import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Code, Heart, Zap, Coffee, ArrowRight } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const marqueeRef = useRef(null);

  // Scroll Event Listener for the Marquee
  useEffect(() => {
    const handleScroll = () => {
      if (marqueeRef.current) {
        // Calculate movement based on scroll position
        const transformValue = window.scrollY * 2; 
        
        // Apply transform: Moves left as you scroll down
        marqueeRef.current.style.transform = `translateX(-${transformValue}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-black font-sans selection:bg-pink-500 selection:text-white">
      <NavBar />

      <main className="pt-24 pb-20 px-4 max-w-7xl mx-auto overflow-hidden">
        
        {/* HERO SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mt-10">
          
          {/* Left: Copy */}
          <div className="flex-1 space-y-8 relative z-10">
            {/* Badge */}
            <div className="inline-block bg-yellow-400 border-2 border-black px-4 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
              ⚠️ Warning: May cause serious commitment
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
              MATCH.<br />
              CHAT.<br />
              <span className="text-pink-500">DEPLOY.</span>
            </h1>

            <p className="text-xl md:text-2xl font-bold text-gray-800 border-l-8 border-black pl-6 py-2 bg-white/50">
              The only dating app where merge conflicts are actually romantic.
            </p>

            {/* Neo-Brutalist Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <button
                onClick={() => navigate("/signup")}
                className="cursor-pointer group relative px-8 py-4 bg-pink-500 text-white font-black text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
              >
                <span className="flex items-center gap-3">
                  START MATCHING <ArrowRight className="w-6 h-6" />
                </span>
              </button>
              
              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer px-8 py-4 bg-white text-black font-black text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[6px] hover:translate-y-[6px] hover:bg-yellow-400 transition-all"
              >
                LOGIN
              </button>
            </div>
          </div>

          {/* Right: Visual Chaos */}
          <div className="flex-1 relative w-full h-[500px] hidden lg:block">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-blue-400 border-4 border-black rounded-full opacity-20 transform translate-x-10 translate-y-10"></div>
            
            {/* Card 1: User Profile */}
            <div className="absolute top-10 left-10 bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-80 transform -rotate-3 z-20 hover:rotate-0 transition-all hover:z-50 duration-300">
                <div className="w-full h-48 bg-[#f0f0f0] mb-4 border-2 border-black overflow-hidden relative flex items-center justify-center">
                    {/* Updated Image: Changed object-contain to object-cover for better fit */}
                    <img 
                      src="/images/developer-avatar.jpg"
                      alt="Gaurav Avatar" 
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                    />
                </div>
                {/* Updated Name */}
                <h3 className="text-2xl font-black uppercase">GAURAV</h3>
                <div className="bg-yellow-300 inline-block px-2 py-1 text-sm font-bold border-2 border-black mt-2">FULL STACK</div>
                <p className="mt-4 font-bold text-sm">"I promise not to force push to master."</p>
            </div>

            {/* Card 2: Code Snippet */}
            <div className="absolute bottom-20 right-10 bg-black p-6 border-4 border-black shadow-[8px_8px_0px_rgba(255,0,255,1)] w-72 transform rotate-6 z-10">
                <div className="text-green-400 font-mono text-xs">
                    <p>while(alive) &#123;</p>
                    <p className="pl-4">eat();</p>
                    <p className="pl-4">sleep();</p>
                    <p className="pl-4">code();</p>
                    <p className="pl-4 text-pink-500">findLove();</p>
                    <p>&#125;</p>
                </div>
            </div>
            
            {/* Decorative Icon */}
            <div className="absolute top-0 right-0 bg-pink-500 p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full animate-bounce">
                <Heart className="text-white w-8 h-8 fill-current"/>
            </div>
          </div>
        </div>

        {/* MARQUEE BANNER (Scroll Controlled) */}
        <div className="mt-32 -mx-4 border-y-4 border-black bg-yellow-400 py-4 overflow-hidden whitespace-nowrap">
            <div 
              ref={marqueeRef} 
              className="inline-block text-4xl font-black tracking-widest text-black will-change-transform"
            >
                {Array(20).fill("EAT SLEEP CODE DATE REPEAT  •  ").join("")}
            </div>
        </div>

        {/* FEATURES GRID */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <BrutalCard 
                icon={<Code className="w-8 h-8"/>} 
                title="Syntax Highlighting" 
                desc="We match you based on your preferred indentation. Tabs vs Spaces is a dealbreaker here."
                color="bg-blue-300"
            />
             <BrutalCard 
                icon={<Zap className="w-8 h-8"/>} 
                title="Fast Performance" 
                desc="Built on the MERN stack. Our servers are faster than your ex's replies."
                color="bg-green-300"
            />
             <BrutalCard 
                icon={<Coffee className="w-8 h-8"/>} 
                title="Coffee Friendly" 
                desc="Filter matches by their caffeine intake. Find someone to pull all-nighters with."
                color="bg-purple-300"
            />
        </div>

      </main>
      <Footer />
    </div>
  );
};

// Sub-component for the cards
const BrutalCard = ({ icon, title, desc, color }) => {
    return (
        <div className={`p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${color}`}>
            <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {icon}
            </div>
            <h3 className="text-2xl font-black mb-3 uppercase">{title}</h3>
            <p className="font-bold text-gray-800 leading-relaxed">
                {desc}
            </p>
        </div>
    )
}

export default LandingPage;