import { motion } from "framer-motion";
import { Quote, CheckCircle2, Calendar } from "lucide-react";
import sarahImage from "@/assets/winner-sarah.jpg";
import marcusImage from "@/assets/winner-marcus.jpg";
import elenaImage from "@/assets/winner-elena.jpg";
import proof1 from "@/assets/winner-proof-1.jpg";
import proof2 from "@/assets/winner-proof-2.jpg";
import proof3 from "@/assets/winner-proof-3.jpg";

const testimonials = [
  {
    name: "Sarah Chen",
    location: "San Francisco, CA",
    date: "February 2025",
    image: sarahImage,
    proofImage: proof1,
    testimonial: "Winning the 2025 raffle has been absolutely incredible! The BYD e6 is even better than I expected. The entire process was smooth, and the support team was fantastic. I'm already enjoying the eco-friendly lifestyle!",
    verified: true,
  },
  {
    name: "Marcus Johnson",
    location: "Austin, TX",
    date: "April 2025",
    image: marcusImage,
    proofImage: proof2,
    testimonial: "I'm thrilled to be a 2025 winner! The BYD vehicle is exceptional - superior performance, amazing technology, and I'm saving so much on fuel. The entire raffle experience was professional and transparent. Highly recommended!",
    verified: true,
  },
  {
    name: "Elena Rodriguez",
    location: "Miami, FL",
    date: "June 2025",
    image: elenaImage,
    proofImage: proof3,
    testimonial: "I never thought my luck would turn like this! Winning in 2025 has been life-changing. The BYD electric car is perfect for Miami's weather and my lifestyle. The team made everything so easy. Thank you for this amazing opportunity!",
    verified: true,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl sm:text-5xl font-bold">
            <span className="text-gradient">Winners</span> From 2025
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real people. Real winners. Real stories. See what the 2025 raffle winners have to say
          </p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">All Winners Verified</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group"
            >
              <div className="bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 border border-border/50 h-full flex flex-col">
                {/* Proof Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={testimonial.proofImage}
                    alt={`${testimonial.name} receiving their BYD vehicle`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Verified badge */}
                  {testimonial.verified && (
                    <div className="absolute top-4 right-4 glass-effect rounded-full px-3 py-1 flex items-center gap-1.5 text-sm font-medium shadow-lg">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Verified Winner</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                    "{testimonial.testimonial}"
                  </p>

                  {/* Winner Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center ring-2 ring-card">
                        <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-base">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>{testimonial.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/20">
            <div className="flex -space-x-2">
              <img src={sarahImage} alt="" className="w-8 h-8 rounded-full ring-2 ring-background object-cover" />
              <img src={marcusImage} alt="" className="w-8 h-8 rounded-full ring-2 ring-background object-cover" />
              <img src={elenaImage} alt="" className="w-8 h-8 rounded-full ring-2 ring-background object-cover" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">Join 3 Happy Winners</p>
              <p className="text-xs text-muted-foreground">From our 2025 Raffle</p>
            </div>
          </div>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every year we give away brand new BYD electric vehicles to lucky participants.
            All winners are verified and announced publicly. Your chance could be next!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
