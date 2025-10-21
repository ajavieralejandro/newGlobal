
export type HeroCoverProps = {
  /** URL de la imagen de fondo (ocupa toda la pantalla) */
  imageUrl: string;
  /** Texto principal (título) */
  heading?: string;
  /** Texto secundario (intro / copy) */
  subheading?: string;
  /** Texto alternativo para describir la imagen (accesibilidad) */
  alt?: string;
  /** Alineación del contenido */
  align?: "left" | "center" | "right";
  /** Clase extra opcional */
  className?: string;
};

export default function HeroCover({
  imageUrl,
  heading = "Descubrí experiencias únicas",
  subheading = "Paquetes diseñados para viajar mejor: simples, claros y al mejor precio.",
  alt = "Fondo de destino turístico",
  align = "center",
  className = "",
}: HeroCoverProps) {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <section
      className={`relative isolate h-screen w-full overflow-hidden bg-gray-900 ${className}`}
      aria-label={alt}
      role="img"
    >
      {/* Imagen de fondo */}
      <img
        src={imageUrl}
        alt="" // decorativa: el aria-label del section describe la escena
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />

      {/* Degradado para legibilidad */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mt-auto mb-24 flex w-full flex-col ${alignment} gap-4`}>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">
            {heading}
          </h1>
          {subheading && (
            <p className="max-w-2xl text-base text-white/90 sm:text-lg lg:text-xl">
              {subheading}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

