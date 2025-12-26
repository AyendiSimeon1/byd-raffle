import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/byd-e7-hero.jpg";
const HeroSection = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById("raffle-form");
    formSection?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow" style={{
        animationDelay: "1s"
      }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          ease: "easeOut"
        }} className="text-center lg:text-left space-y-8">
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.2,
            duration: 0.6
          }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">2025 Grand Car Raffle</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1 initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3,
                duration: 0.8
              }} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                  Build Your <span className="text-gradient">Dream</span>
                </motion.h1>

                <motion.p initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4,
                duration: 0.8
              }} className="text-2xl sm:text-3xl font-semibold text-foreground/90">
                  Take Home a 2025 BYD e7
                </motion.p>
            </div>

            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5,
            duration: 0.8
          }} className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Imagine yourself behind the wheel of a brand new 2025 BYD e7. When you buy a ticket,
              you'll not only have the chance to win this incredible vehicle, but you'll also directly contribute
              to creating a complete, clean energy ecosystem.
            </motion.p>

            {/* CTA moved to below the HowItWorks section on the Index page */}

            <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.7,
            duration: 0.8
          }} className="flex flex-wrap gap-8 justify-center lg:justify-start text-center lg:text-left pt-4">
              <div>
                
                
              </div>
              
              <div>
                <div className="text-3xl font-bold text-primary">Jan 31</div>
                <div className="text-sm text-muted-foreground">Drawing Date</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.9,
          x: 50
        }} animate={{
          opacity: 1,
          scale: 1,
          x: 0
        }} transition={{
          delay: 0.4,
          duration: 0.9,
          ease: "easeOut"
        }} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant">
              <img src={heroImage} alt="2025 BYD e7 Electric Vehicle" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div initial={{
            opacity: 0,
            scale: 0
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 1,
            duration: 0.5,
            type: "spring",
            stiffness: 200
          }} className="absolute -bottom-6 -left-6 glass-effect rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">100% Eléctrico</div>
                  <div className="text-xs text-muted-foreground">Cero Emisiones</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default HeroSection;