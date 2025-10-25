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
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  address: z.string().trim().min(10, "Please enter your complete address").max(500, "Address must be less than 500 characters"),
  giftCardImage: z.instanceof(File, { message: "Please upload a gift card image" })
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
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
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
        throw new Error('Image upload failed: ' + uploadError.message);
      }
      // 2. Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('giftcard-images')
        .getPublicUrl(fileName);
      const imageUrl = publicUrlData?.publicUrl;
      if (!imageUrl) {
        throw new Error('Could not get image public URL');
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
        throw new Error('Entry insert failed: ' + insertError.message);
      }
      setIsSuccess(true);
      setLastEmail(data.email);
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const link = `${origin}/?ref=${encodeURIComponent(data.email)}`;
      setReferralLink(link);
      toast({
        title: "Submission Successful!",
        description: "Thank you for joining! Our team will contact you shortly.",
      });
      reset();
      setPreviewImage(null);
    } catch (err: any) {
      toast({
        title: "Submission Failed",
        description: err?.message || "An error occurred. Please try again.",
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
        <h3 className="text-3xl font-bold">Thank You!</h3>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Your submission has been received. Our team will contact you shortly with further details.
        </p>
        {/* Referral UI */}
        <div className="mt-6 space-y-3">
          <p className="text-lg font-medium">Increase your chances of winning by referring others.</p>
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
              {copied ? "Copied" : "Copy"}
              <Copy className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Share this link with friends — each referred entry increases your chances.</p>
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
            Full Name *
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            {...register("fullName")}
            className="h-12 text-base"
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
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
          Complete Address *
        </Label>
        <Textarea
          id="address"
          placeholder="123 Main Street, Apt 4B, New York, NY 10001"
          {...register("address")}
          className="min-h-24 text-base resize-none"
        />
        {errors.address && (
          <p className="text-sm text-destructive">{errors.address.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="giftCard" className="text-base">
          Apple Gift Card Image *
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
                  Click to upload gift card image
                </p>
                <p className="text-sm text-muted-foreground">PNG, JPG or JPEG (Max 10MB)</p>
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
                alt="Gift card preview"
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
            Submitting...
          </>
        ) : (
          "Submit Entry"
        )}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        By submitting this form, you agree to our terms and conditions and acknowledge 
        that your information will be used solely for raffle participation.
      </p>
    </motion.form>
  );
};

export default RaffleForm;
