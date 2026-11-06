import { z } from "zod";

export const consultationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address"),
  service: z.string().min(1, "Choose a service"),
  message: z.string().trim().max(1000, "Keep it under 1000 characters").optional(),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
