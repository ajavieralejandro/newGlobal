// resources/js/globalExplorer/src/pages/PaqueteDetallePage.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarFiltro from "../components/SidebarFiltro";

type Imagen = { url: string; alt?: string };
type Hotel = { nombre: string; estrellas: number; regimen: string; ubicacion?: string };
type Salida = { fecha: string; cupos?: number; precioUSD: number };
export type Paquete = {
  id: string;
  titulo: string;
  destino: string;
  resumen: string;
  imagenes: Imagen[];
  hotel?: Hotel;
  salidas: Salida[];
  incluye?: string[];
  noIncluye?: string[];
  tags?: string[];
};

const SKELETON: Paquete = {
  id: "",
  titulo: "Cargando…",
  destino: "",
  resumen: "",
  imagenes: [{ url: "" }, { url: "" }, { url: "" }],
  salidas: [],
};

function precioMinUSD(p: Paquete): number | null {
  if (!p.salidas?.length) return null;
  return Math.min(...p.salidas.map((s) => s.precioUSD));
}

function toQuery(f: FiltroState): string {
  const params = new URLSearchParams();
  if (f.destino) params.set("destino", f.destino);
  if (f.fechaDesde) params.set("desde", f.fechaDesde);
  if (f.fechaHasta) params.set("hasta", f.fechaHasta);
  if (f.precioMin) params.set("pmin", String(f.precioMin));
  if (f.precioMax) params.set("pmax", String(f.precioMax));
  if (f.estrellas.length) params.set("stars", f.estrellas.join(","));
  if (f.regimenes.length) params.set("reg", f.regimenes.join(","));
  if (f.tags.length) params.set("tags", f.tags.join(","));
  return params.toString();
}

export default function PaqueteDetallePage() {
  const { paqueteId } = useParams<{ paqueteId: string }>();
  const [loading, setLoading] = useState(true);
  const [paquete, setPaquete] = useState<Paquete>(SKELETON);
  const [error, setError] = useState<string | null>(null);

  // ✅ Demo de fetch — reemplazá con tu endpoint real
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        // TODO: reemplacé por un mock; integrá tu API: /api/paquetes/:id
        await new Promise((r) => setTimeout(r, 400));
        const mock: Paquete = {
          id: paqueteId || "demo-1",
          titulo: "Europa Clásica 12 noches",
          destino: "Madrid · París · Roma",
          resumen:
            "Recorrido por las capitales europeas con guías en español, asistencia 24/7 y hoteles 4★. Incluye city tours y traslados.",
          imagenes: [
            { url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop", alt: "París" },
            { url: "https://images.unsplash.com/photo-1526129318478-c3bd0e6b709b?q=80&w=1200&auto=format&fit=crop", alt: "Roma" },
            { url: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1200&auto=format&fit=crop", alt: "Madrid" },
          ],
          hotel: { nombre: "Selección 4★", estrellas: 4, regimen: "Desayuno" },
          salidas: [
            { fecha: "2025-11-10", precioUSD: 2399 },
            { fecha: "2026-01-15", precioUSD: 2290 },
          ],
          incluye: ["Aéreos ida y vuelta", "11 noches de hotel 4★", "Desayuno diario", "Traslados y city tours"],
          noIncluye: ["Impuesto PAÍS / Percepción RG", "Gastos personales", "Seguro médico opcional"],
          tags: ["exótico", "familia"],
        };
        if (alive) setPaquete(mock);
      } catch (e: any) {
        if (alive) setError(e?.message || "No se pudo cargar el paquete");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [paqueteId]);

  const minUSD = useMemo(() => precioMinUSD(paquete), [paquete]);

  const handleApplyFilters = (f: FiltroState) => {
    const qs = toQuery(f);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* offset si tu navbar es fixed */}
      <div className="h-14 md:h-16" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {/* Encabezado + layout con sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar izquierda */}
          <div className="lg:col-span-4">
            {/* En mobile, mostramos un botón para abrir filtros en diálogo simple (opcional) */}
            <div className="mb-4 lg:hidden">
              <details className="rounded-xl border bg-white p-3 shadow-sm">
                <summary className="cursor-pointer list-none select-none font-medium">Filtros</summary>
                <div className="mt-3">
                  <SidebarFiltro onApply={handleApplyFilters} onReset={() => handleApplyFilters({
                    destino: "",
                    precioMin: 0,
                    precioMax: 5000,
                    estrellas: [],
                    regimenes: [],
                    tags: [],
                  })} />
                </div>
              </details>
            </div>

            {/* Desktop: sticky */}
            <div className="hidden lg:block">
              <SidebarFiltro
                onApply={handleApplyFilters}
                onReset={() =>
                  handleApplyFilters({
                    destino: "",
                    precioMin: 0,
                    precioMax: 5000,
                    estrellas: [],
                    regimenes: [],
                    tags: [],
                  })
                }
                className="sticky top-20"
              />
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-8">
            {/* Loader / Error */}
            {loading && (
              <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="h-64 animate-pulse rounded-lg bg-gray-100" />
                <div className="mt-6 h-6 w-1/2 animate-pulse rounded bg-gray-100" />
                <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-gray-100" />
              </div>
            )}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
                {error}
              </div>
            )}
            {!loading && !error && (
              <div className="space-y-8">
                {/* Título + precio */}
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{paquete.titulo}</h1>
                    <p className="mt-1 text-gray-600">{paquete.destino}</p>
                  </div>
                  <div className="rounded-xl border bg-white px-4 py-3 text-right shadow-sm">
                    <div className="text-xs text-gray-500">Desde</div>
                    <div className="text-2xl font-semibold text-blue-700">
                      {minUSD ? `USD ${minUSD.toLocaleString("en-US")}` : "Consultar"}
                    </div>
                  </div>
                </div>

                {/* Galería */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="sm:row-span-2 overflow-hidden rounded-2xl">
                    <img
                      src={paquete.imagenes[0]?.url}
                      alt={paquete.imagenes[0]?.alt || "Imagen 1"}
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={paquete.imagenes[1]?.url}
                      alt={paquete.imagenes[1]?.alt || "Imagen 2"}
                      className="h-56 w-full object-cover sm:h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={paquete.imagenes[2]?.url}
                      alt={paquete.imagenes[2]?.alt || "Imagen 3"}
                      className="h-56 w-full object-cover sm:h-full"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Resumen + datos */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold">Descripción</h2>
                    <p className="mt-2 text-gray-700 leading-relaxed">{paquete.resumen}</p>

                    {paquete.incluye?.length || paquete.noIncluye?.length ? (
                      <div className="mt-6 grid gap-6 sm:grid-cols-2">
                        {paquete.incluye?.length ? (
                          <div>
                            <h3 className="font-semibold text-green-700">Incluye</h3>
                            <ul className="mt-2 list-disc pl-5 text-gray-700">
                              {paquete.incluye.map((it, i) => (
                                <li key={i}>{it}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        {paquete.noIncluye?.length ? (
                          <div>
                            <h3 className="font-semibold text-red-700">No incluye</h3>
                            <ul className="mt-2 list-disc pl-5 text-gray-700">
                              {paquete.noIncluye.map((it, i) => (
                                <li key={i}>{it}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold">Hotel & Salidas</h2>
                    {paquete.hotel ? (
                      <div className="mt-3 space-y-1 text-sm text-gray-700">
                        <div className="font-medium">{paquete.hotel.nombre}</div>
                        <div>{paquete.hotel.estrellas}★ · {paquete.hotel.regimen}</div>
                        {paquete.hotel.ubicacion ? <div className="text-gray-500">{paquete.hotel.ubicacion}</div> : null}
                      </div>
                    ) : (
                      <div className="mt-3 text-sm text-gray-500">Hotel a confirmar</div>
                    )}

                    <div className="mt-4">
                      <div className="text-sm font-medium text-gray-800 mb-2">Próximas salidas</div>
                      <ul className="space-y-2">
                        {paquete.salidas.map((s, i) => (
                          <li key={i} className="flex items-center justify-between rounded-lg border px-3 py-2">
                            <span className="text-sm text-gray-700">{new Date(s.fecha).toLocaleDateString()}</span>
                            <span className="text-sm font-semibold text-blue-700">USD {s.precioUSD.toLocaleString("en-US")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                      Reservar / Consultar
                    </button>
                  </div>
                </div>

                {/* Tags */}
                {paquete.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {paquete.tags.map((t, i) => (
                      <span key={i} className="rounded-full border px-3 py-1 text-xs capitalize text-gray-700">
                        #{t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
