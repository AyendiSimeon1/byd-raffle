import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import RaffleForm from "@/components/RaffleForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      
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
                Join the <span className="text-gradient">Raffle</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below to enter and win the 2025 BYD e7
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
