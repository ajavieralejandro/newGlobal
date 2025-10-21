import { useMemo, useState } from "react";

// Types
export type TravelPackage = {
  id: string;
  title: string;
  location: string;
  description: string;
  price: number;
  currency?: string; // defaults to USD
  nights: number;
  imageUrl: string;
  tags: string[]; // e.g., ["Exótico", "Fútbol", "Playa"]
  rating?: number; // 0..5
  popular?: boolean;
};

export type TravelPackagesSectionProps = {
  title?: string;
  subtitle?: string;
  packages?: TravelPackage[];
  allTags?: string[];
  onSelect?: (pkg: TravelPackage) => void;
};

// Helpers
const DEFAULT_TAGS = [
  "Exótico",
  "Fútbol",
  "Playa",
  "Montaña",
  "Ciudad",
  "Cultural",
  "Naturaleza",
  "Lujo",
  "Gastronomía",
  "Ski",
];

const DEFAULT_PACKAGES: TravelPackage[] = [
  {
    id: "maldivas-overwater",
    title: "Maldivas Overwater Bungalows",
    location: "Islas Maldivas",
    description:
      "7 noches en bungalow sobre el agua con desayuno. Traslados y snorkel incluidos.",
    price: 3999,
    currency: "USD",
    nights: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60",
    tags: ["Exótico", "Playa", "Lujo"],
    rating: 4.9,
    popular: true,
  },
  {
    id: "madrid-futbol-tapas",
    title: "Madrid Fútbol & Tapas",
    location: "Madrid, España",
    description:
      "4 noches con city tour, entrada a partido y ruta de tapas por La Latina.",
    price: 1290,
    currency: "USD",
    nights: 4,
    imageUrl: "https://source.unsplash.com/featured/?soccer,stadium",
    tags: ["Fútbol", "Ciudad", "Gastronomía"],
    rating: 4.6,
  },
  {
    id: "marrakech-sahara",
    title: "Marrakech & Sahara",
    location: "Marruecos",
    description:
      "5 noches entre riad en la medina y campamento en el desierto con cena bereber.",
    price: 1690,
    currency: "USD",
    nights: 5,
    imageUrl: "https://source.unsplash.com/featured/?marrakech,desert",
    tags: ["Exótico", "Cultural"],
    rating: 4.7,
  },
  {
    id: "patagonia-trek",
    title: "Patagonia Trek Experience",
    location: "El Chaltén, Argentina",
    description:
      "7 noches con trekking al Fitz Roy y laguna de los Tres. Guías certificados.",
    price: 1990,
    currency: "USD",
    nights: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=60",
    tags: ["Naturaleza", "Montaña"],
    rating: 4.8,
    popular: true,
  },
  {
    id: "paris-romantico",
    title: "París Romántico",
    location: "París, Francia",
    description:
      "5 noches con paseo por Sena y visita a Louvre. Hotel boutique cerca de la Torre.",
    price: 1490,
    currency: "USD",
    nights: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=60",
    tags: ["Ciudad", "Cultural", "Lujo"],
    rating: 4.5,
  },
  {
    id: "amazonia-aventura",
    title: "Amazonía Aventura",
    location: "Manaos, Brasil",
    description:
      "6 noches en lodge selvático con navegaciones, fauna y canopy. Pensión completa.",
    price: 1890,
    currency: "USD",
    nights: 6,
    imageUrl: "https://source.unsplash.com/featured/?rainforest,amazon",
    tags: ["Naturaleza", "Exótico"],
    rating: 4.4,
  },
];

const nf = (value: number, currency = "USD") =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency }).format(value);

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

export default function TravelPackagesSection({
  title = "Paquetes turísticos",
  subtitle = "Elegí por tema (exóticos, fútbol, playa, naturaleza…) y encontrá tu próximo viaje",
  packages = DEFAULT_PACKAGES,
  allTags = DEFAULT_TAGS,
  onSelect,
}: TravelPackagesSectionProps) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"popular" | "priceAsc" | "priceDesc" | "nights">(
    "popular"
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const clearFilters = () => {
    setActiveTags([]);
    setQuery("");
  };

  const filtered = useMemo(() => {
    const q = normalize(query);
    let list = packages.filter((p) => {
      const text = normalize(`${p.title} ${p.location} ${p.tags.join(" ")}`);
      const matchesQuery = q ? text.includes(q) : true;
      const matchesTags = activeTags.length
        ? p.tags.some((t) => activeTags.includes(t))
        : true;
      return matchesQuery && matchesTags;
    });

    switch (sort) {
      case "priceAsc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "nights":
        list = [...list].sort((a, b) => b.nights - a.nights);
        break;
      default:
        list = [...list].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return list;
  }, [packages, activeTags, query, sort]);

  const handleSelect = (pkg: TravelPackage) => {
    setSelectedId(pkg.id);
    onSelect?.(pkg);
  };

  return (
    <section className="bg-white m-20">
      <div className="mx-auto max-w-7xl ">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h2>
            <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
          </div>

          {/* Controls */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-0 sm:auto-cols-max sm:grid-flow-col sm:items-center">
            <div className="relative">
              <input
                type="search"
                placeholder="Buscar destino, ciudad, tag…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:min-w-[260px]"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="popular">Destacados</option>
              <option value="priceAsc">Precio: menor a mayor</option>
              <option value="priceDesc">Precio: mayor a menor</option>
              <option value="nights">Duración</option>
            </select>

            <button
              onClick={clearFilters}
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Tag pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const active = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={
                  "select-none rounded-full border px-4 py-1.5 text-sm font-medium transition " +
                  (active
                    ? "border-indigo-600 bg-indigo-600 text-white shadow"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50")
                }
                aria-pressed={active}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pkg) => (
            <article
              key={pkg.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={pkg.imageUrl}
                  alt={`${pkg.title} — ${pkg.location}`}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {pkg.popular && (
                  <span className="absolute left-3 top-3 rounded-full bg-indigo-600/90 px-2.5 py-1 text-xs font-semibold text-white shadow">
                    Popular
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex h-full flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {pkg.title}
                    </h3>
                    <p className="text-sm text-gray-600">{pkg.location}</p>
                  </div>
                  {typeof pkg.rating === "number" && (
                    <div className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800">
                      {pkg.rating.toFixed(1)}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 00-1.176 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81H6.93a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  )}
                </div>

                <p className="line-clamp-2 text-sm text-gray-700">{pkg.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {pkg.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{pkg.nights}</span> noches
                  </div>
                  <div className="text-base font-semibold text-indigo-700">
                    {nf(pkg.price, pkg.currency)}
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleSelect(pkg)}
                    className={
                      "flex-1 rounded-xl border px-4 py-2 text-sm font-semibold shadow-sm transition " +
                      (selectedId === pkg.id
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-indigo-600 text-indigo-700 hover:bg-indigo-50")
                    }
                    aria-pressed={selectedId === pkg.id}
                  >
                    {selectedId === pkg.id ? "Seleccionado" : "Seleccionar"}
                  </button>

                  <a
                    href="#"
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    Detalles
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-600">
            No encontramos resultados con esos filtros. Probá limpiar o cambiar los tags.
          </div>
        )}
      </div>
    </section>
  );
}

// Usage example:
// <TravelPackagesSection onSelect={(pkg) => console.log("Elegiste:", pkg)} />
