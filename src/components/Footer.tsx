import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <p className="text-lg font-semibold">
            Every ticket sold helps us create sustainable energy solutions that power our world responsibly.
          </p>
          <p className="text-muted-foreground">
            Get your ticket today and take your chance to make a difference — and make it electric ⚡
          </p>
          <div className="pt-6 space-y-2">
            <p className="font-medium">Best Regards,</p>
            <p className="text-primary font-semibold">The BYD Company Limited Team</p>
          </div>
          <div className="pt-6 text-sm text-muted-foreground">
            <p>© 2025 BYD Company Limited. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
