"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { submitConsultation } from "@/lib/consultations";
import { consultationSchema, type ConsultationInput } from "@/lib/schema";
import { cn } from "@/lib/utils";

type Props = {
  services: string[];
  /** "split" puts name/phone and email/service side by side from the sm breakpoint. */
  layout?: "stacked" | "split";
  className?: string;
};

function Field({ label, error, id, className, children }: {
  label: string; error?: string; id: string; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium transition-colors focus-within:text-primary">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="text-xs text-red-700" style={{ animation: "fade-up 0.3s ease-out both" }}>{error}</p>}
    </div>
  );
}

export function ConsultationForm({ services, layout = "stacked", className }: Props) {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationInput>({ resolver: zodResolver(consultationSchema), defaultValues: { service: "" } });

  async function onSubmit(values: ConsultationInput) {
    setStatus("idle");
    const { ok } = await submitConsultation(values);
    if (ok) reset();
    setStatus(ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div role="status" className={cn("flex flex-col items-start gap-3 py-6", className)} style={{ animation: "pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both" }}>
        <span className="flex size-14 items-center justify-center rounded-full bg-accent/20" style={{ animation: "pulse-ring 1.6s ease-out 2" }}>
          <CheckCircle2 aria-hidden className="size-8 text-primary" />
        </span>
        <h3 className="text-2xl">Request received</h3>
        <p className="leading-7 text-muted-foreground">
          Thank you. Our team will contact you shortly to schedule your consultation.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>Send another request</Button>
      </div>
    );
  }

  const f = (name: string) => ({
    id: `${uid}-${name}`,
    "aria-describedby": errors[name as keyof ConsultationInput] ? `${uid}-${name}-error` : undefined,
    "aria-invalid": errors[name as keyof ConsultationInput] ? (true as const) : undefined,
  });
  const half = layout === "split" ? "sm:col-span-1" : "";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("grid gap-4", layout === "split" && "sm:grid-cols-2", className)}
    >
      <Field label="Name" id={`${uid}-name`} error={errors.name?.message} className={half}>
        <Input autoComplete="name" placeholder="Your full name" {...f("name")} {...register("name")} />
      </Field>
      <Field label="Phone" id={`${uid}-phone`} error={errors.phone?.message} className={half}>
        <Input type="tel" autoComplete="tel" placeholder="(480) 000-0000" {...f("phone")} {...register("phone")} />
      </Field>
      <Field label="Email" id={`${uid}-email`} error={errors.email?.message} className={half}>
        <Input type="email" autoComplete="email" placeholder="you@company.com" {...f("email")} {...register("email")} />
      </Field>
      <Field label="Services" id={`${uid}-service`} error={errors.service?.message} className={half}>
        <Select {...f("service")} {...register("service")}>
          <option value="" disabled>Select a service</option>
          {services.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
      </Field>
      <Field label="Message" id={`${uid}-message`} error={errors.message?.message} className={layout === "split" ? "sm:col-span-2" : ""}>
        <Textarea placeholder="Tell us briefly what you need help with" {...f("message")} {...register("message")} />
      </Field>
      <div className={layout === "split" ? "sm:col-span-2" : ""}>
        <Button type="submit" variant="default" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Sending..." : "Book Consultation"}
          {!isSubmitting && <ArrowRight aria-hidden className="size-4" />}
        </Button>
        {status === "error" && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            We could not send your request. Please check your connection and try again, or call us directly.
          </p>
        )}
      </div>
    </form>
  );
}
