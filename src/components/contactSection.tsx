import { useState } from "react";

type ContactLightProps = {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  onSubmit?: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => Promise<void> | void;
};

const ContactSectionLight: React.FC<ContactLightProps> = ({
  title = "Global Explorer Mayorista — Mesa de Atención a Agencias",
  subtitle = "Si sos agencia de viajes, completá el formulario y nuestro equipo comercial te contactará. Tiempo de respuesta estimado: 2 horas hábiles.",
  imageSrc = "https://travelconnect.com.ar/storage/travel/activar.jpg",
  imageAlt = "Equipo comercial de Global Explorer atendiendo a agencias",
  onSubmit,
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Alta de agencia",
    message: "",
    honey: "", // honeypot
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const validate = () => {
    if (form.honey) return "Error de validación."; // bot
    if (!form.name.trim()) return "Ingresá el nombre de contacto.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Ingresá un email válido de contacto.";
    if (!form.message.trim()) return "Contanos brevemente tu consulta.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        subject: form.subject,
        message: form.message.trim(),
      };
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setStatus("ok");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "Alta de agencia",
        message: "",
        honey: "",
      });
    } catch {
      setStatus("error");
      setError("No pudimos enviar tu mensaje. Intentá nuevamente.");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="relative bg-white">
      <div className="px-4 py-14 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Imagen */}
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-64 object-cover sm:h-80 lg:h-[460px]"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Global Explorer Operadora Mayorista — Tarifas netas, XML, cupos aéreos y grupos a medida.
            </p>
          </div>

          {/* Formulario */}
          <div className="order-1 lg:order-2">
            <header className="mb-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </h2>
              <p className="mt-2 text-gray-600">{subtitle}</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot invisible */}
              <input
                type="text"
                value={form.honey}
                onChange={handleChange("honey")}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                    Nombre de contacto
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="Ej.: Laura Gómez (Agencia Viajar+)"
                    autoComplete="name"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    Email de la agencia
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="operaciones@tuagencia.com"
                    autoComplete="email"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-600"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
                    Teléfono / WhatsApp (opcional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="+54 9 11 5555-5555"
                    autoComplete="tel"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">
                    Motivo de contacto
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={handleChange("subject")}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-600"
                  >
                    <option>Alta de agencia</option>
                    <option>Tarifas netas / XML</option>
                    <option>Cupo aéreo</option>
                    <option>Grupos & Incentivos</option>
                    <option>Soporte a emisión</option>
                    <option>Facturación y pagos</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={handleChange("message")}
                  rows={5}
                  placeholder="Ej.: Necesitamos tarifas netas y disponibilidad para un grupo a Rio 25 pax, salida 15/11, 3 noches, base doble. ¿Tienen cupo o propuesta mayorista?"
                  className="w-full resize-y rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none focus:border-transparent focus:ring-2 focus:ring-indigo-600"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Cuanto más contexto compartas (fechas, pax, destino, régimen, forma de pago), más rápido podremos cotizar.
                </p>
              </div>

              {/* Consentimiento */}
              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  required
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  Acepto ser contactada/o por Global Explorer para responder mi consulta y acepto la{" "}
                  <a href="/privacy" className="underline hover:text-indigo-700">
                    Política de Privacidad
                  </a>.
                </label>
              </div>

              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-70"
                >
                  {status === "loading" ? "Enviando…" : "Enviar consulta"}
                </button>
                {status === "ok" && (
                  <span className="text-sm text-green-600">¡Mensaje enviado! Te escribimos a la brevedad.</span>
                )}
                {status === "error" && (
                  <span className="text-sm text-red-600">Error al enviar. Probá nuevamente.</span>
                )}
              </div>

              <p className="mt-4 text-xs text-gray-500">
                Horario de atención: Lunes a Viernes 09:00–18:00 (ARG). Emergencias de emisión: verificar número de guardia en el pie de página.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSectionLight;
