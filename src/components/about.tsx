// resources/js/globalExplorer/src/components/AboutUs.tsx
type AboutUsProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  images: [string, string, string]; // [principal, secundaria1, secundaria2]
};

export default function AboutUs({
  title = "Sobre Global Explorer",
  subtitle = "Mayorista de turismo para agencias",
  description = "Conectamos a tu agencia con una red de proveedores y tarifas competitivas. Ofrecemos stock dinámico, soporte dedicado y herramientas simples para cotizar y reservar de forma ágil.",
  images,
}: AboutUsProps): JSX.Element {
  const [imgMain, imgTopRight, imgBottomRight] = images;

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Texto */}
          <div>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
              {subtitle}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">{description}</p>

            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                Tarifas competitivas y disponibilidad actualizada.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                Herramientas claras para cotizar y reservar.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                Soporte cercano para tu operación diaria.
              </li>
            </ul>
          </div>

          {/* Collage de imágenes */}
          <div className="relative">
            {/* Glow sutil de fondo */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br from-blue-100 via-transparent to-purple-100 blur-2xl"
            />
            <div className="relative grid h-full w-full grid-cols-6 grid-rows-6 gap-3">
              {/* Principal (izquierda, alta) */}
              <div className="col-span-4 row-span-6">
                <div className="h-full w-full overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-md">
                  <img
                    src={imgMain}
                    alt="Destino destacado Global Explorer"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Superior derecha (pequeña) */}
              <div className="col-span-2 row-span-3">
                <div className="h-full w-full overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-md">
                  <img
                    src={imgTopRight}
                    alt="Experiencias y servicios"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Inferior derecha (mediana) */}
              <div className="col-span-2 row-span-3 self-end">
                <div className="h-full w-full overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-md">
                  <img
                    src={imgBottomRight}
                    alt="Atención a agencias"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Etiqueta flotante (opcional) */}
            <div className="absolute -bottom-4 left-6 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow ring-1 ring-black/5">
              Operamos con agencias de todo el país
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
