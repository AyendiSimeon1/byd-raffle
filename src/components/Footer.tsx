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
            Cada boleto vendido nos ayuda a crear soluciones energéticas sostenibles que impulsan nuestro mundo de manera responsable.
          </p>
          <p className="text-muted-foreground">
            Obtén tu boleto hoy y aprovecha la oportunidad de marcar la diferencia — ¡y hazlo eléctrico! ⚡
          </p>
          <div className="pt-6 space-y-2">
            <p className="font-medium">Saludos cordiales,</p>
            <p className="text-primary font-semibold">El equipo de BYD Company Limited</p>
          </div>
          <div className="pt-6 text-sm text-muted-foreground">
            <p>© 2025 BYD Company Limited. Todos los derechos reservados.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
