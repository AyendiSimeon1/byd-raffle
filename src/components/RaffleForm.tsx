import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Loader2, Upload, X, CheckCircle2, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  fullName: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre debe tener menos de 100 caracteres"),
  email: z.string().trim().email("Por favor ingresa un correo electrónico válido").max(255, "El correo debe tener menos de 255 caracteres"),
  address: z.string().trim().min(10, "Por favor ingresa tu dirección completa").max(500, "La dirección debe tener menos de 500 caracteres"),
  giftCardImage: z.instanceof(File, { message: "Por favor sube una imagen de la tarjeta de regalo" })
});

type FormData = z.infer<typeof formSchema>;

const RaffleForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [lastEmail, setLastEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Archivo demasiado grande",
          description: "Por favor sube una imagen menor a 10MB",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Tipo de archivo inválido",
          description: "Por favor sube un archivo de imagen",
          variant: "destructive",
        });
        return;
      }

      setValue("giftCardImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    setValue("giftCardImage", undefined as any);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // 1. Upload image to Supabase Storage
      const file = data.giftCardImage;
      const fileExt = file.name.split('.').pop();
      const fileName = `${data.email.replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('giftcard-images')
        .upload(fileName, file, { upsert: false });
      if (uploadError) {
  throw new Error('Error al subir la imagen: ' + uploadError.message);
      }
      // 2. Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('giftcard-images')
        .getPublicUrl(fileName);
      const imageUrl = publicUrlData?.publicUrl;
      if (!imageUrl) {
  throw new Error('No se pudo obtener la URL pública de la imagen');
      }
      // 3. Insert entry into raffle_entries
      const { error: insertError } = await supabase.from('raffle_entries').insert([
        {
          full_name: data.fullName,
          email: data.email,
          address: data.address,
          gift_card_image_url: imageUrl,
        },
      ]);
      if (insertError) {
  throw new Error('Error al registrar tu participación: ' + insertError.message);
      }
      setIsSuccess(true);
      setLastEmail(data.email);
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const link = `${origin}/?ref=${encodeURIComponent(data.email)}`;
      setReferralLink(link);
      toast({
        title: "¡Participación exitosa!",
        description: "¡Gracias por participar! Nuestro equipo se pondrá en contacto contigo pronto.",
      });
      reset();
      setPreviewImage(null);
    } catch (err: any) {
      toast({
        title: "Error al enviar",
        description: err?.message || "Ocurrió un error. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16 space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10"
        >
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </motion.div>
        <h3 className="text-3xl font-bold">¡Gracias!</h3>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Tu participación ha sido recibida. Nuestro equipo se pondrá en contacto contigo pronto con más detalles.
        </p>
        {/* Referral UI */}
        <div className="mt-6 space-y-3">
          <p className="text-lg font-medium">Aumenta tus posibilidades de ganar refiriendo a otros.</p>
          <div className="flex items-center gap-3 max-w-xl mx-auto">
            <Input
              value={referralLink}
              onChange={(e) => setReferralLink(e.target.value)}
              className="h-12 text-base"
            />
            <Button
              size="sm"
              onClick={async () => {
                try {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    await navigator.clipboard.writeText(referralLink || "");
                  }
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                } catch (e) {
                  // fallback
                  console.error("Copy failed", e);
                }
              }}
            >
              {copied ? "Copiado" : "Copiar"}
              <Copy className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Comparte este enlace con tus amigos — cada referido aumenta tus posibilidades.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-base">
            Nombre completo *
          </Label>
          <Input
            id="fullName"
            placeholder="Juan Pérez"
            {...register("fullName")}
            className="h-12 text-base"
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base">
            Correo electrónico *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="juan@example.com"
            {...register("email")}
            className="h-12 text-base"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-base">
          Dirección completa *
        </Label>
        <Textarea
          id="address"
          placeholder="Calle Principal 123, Depto 4B, Ciudad de México, CDMX 10001"
          {...register("address")}
          className="min-h-24 text-base resize-none"
        />
        {errors.address && (
          <p className="text-sm text-destructive">{errors.address.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="giftCard" className="text-base">
          Imagen de la tarjeta de regalo Apple *
        </Label>
        <div className="space-y-4">
          {!previewImage ? (
            <label
              htmlFor="giftCard"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer hover:border-primary transition-colors duration-300 bg-secondary/50 hover:bg-secondary"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 mb-3 text-muted-foreground" />
                <p className="mb-2 text-base font-medium">
                  Haz clic para subir la imagen de la tarjeta
                </p>
                <p className="text-sm text-muted-foreground">PNG, JPG o JPEG (Máx 10MB)</p>
              </div>
              <input
                id="giftCard"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border-2 border-border">
              <img
                src={previewImage}
                alt="Vista previa de la tarjeta"
                className="w-full h-64 object-contain bg-secondary"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        {errors.giftCardImage && (
          <p className="text-sm text-destructive">{errors.giftCardImage.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full text-lg py-6 shadow-elegant hover:shadow-xl transition-all duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar participación"
        )}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        Al enviar este formulario, aceptas nuestros términos y condiciones y reconoces
        que tu información será utilizada únicamente para la participación en la rifa.
      </p>
    </motion.form>
  );
};

export default RaffleForm;
