import type { ConsultationInput } from "@/lib/schema";

/**
 * Client-side integration point for the consultation form.
 * Posts to the API route, which validates again and persists the request.
 */
export async function submitConsultation(values: ConsultationInput): Promise<{ ok: boolean }> {
  try {
    const res = await fetch("/api/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
