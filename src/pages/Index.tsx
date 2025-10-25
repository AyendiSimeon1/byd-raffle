import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import RaffleForm from "@/components/RaffleForm";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById("raffle-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      {/* CTA placed after HowItWorks per request */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Button size="lg" onClick={scrollToForm} className="group text-lg px-8 py-6 shadow-elegant hover:shadow-xl transition-all duration-300">
              ¡Obtén tu boleto!
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
      <Testimonials />
      
      {/* Form Section */}
      <section id="raffle-form" className="py-24 sm:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Participa en la <span className="text-gradient">Rifa</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Completa el formulario para participar y ganar el BYD e7 2025
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 sm:p-12 shadow-elegant border border-border/50">
              <RaffleForm />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
