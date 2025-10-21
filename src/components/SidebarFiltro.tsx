// resources/js/globalExplorer/src/components/SidebarFiltro.tsx
import { useEffect, useState } from "react";

export type FiltroState = {
  destino: string;
  fechaDesde?: string;
  fechaHasta?: string;
  precioMin: number;
  precioMax: number;
  estrellas: number[];     // [3,4,5]
  regimenes: string[];     // ej: ["Desayuno", "All Inclusive"]
  tags: string[];          // ej: ["exótico","fútbol","playa","nieve"]
};

type Props = {
  value?: Partial<FiltroState>;
  onApply?: (f: FiltroState) => void;
  onReset?: () => void;
  className?: string;
};

const DEFAULTS: FiltroState = {
  destino: "",
  fechaDesde: undefined,
  fechaHasta: undefined,
  precioMin: 0,
  precioMax: 5000,
  estrellas: [],
  regimenes: [],
  tags: [],
};

const REGIMENES = ["Sólo Alojamiento", "Desayuno", "Media Pensión", "Pensión Completa", "All Inclusive"];
const TAGS = ["exótico", "fútbol", "playa", "nieve", "familia", "romántico"];

export default function SidebarFiltro({ value, onApply, onReset, className }: Props) {
  const [f, setF] = useState<FiltroState>({ ...DEFAULTS, ...value });

  useEffect(() => {
    if (value) setF((prev) => ({ ...prev, ...value }));
  }, [value]);

  const toggleArray = (arr: string[] | number[], item: any) =>
    arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];

  return (
    <aside className={["w-full rounded-xl border bg-white p-4 shadow-sm", className].filter(Boolean).join(" ")}>
      <h3 className="text-lg font-semibold">Filtrar</h3>

      {/* Destino */}
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700">Destino</label>
        <input
          type="text"
          value={f.destino}
          onChange={(e) => setF({ ...f, destino: e.target.value })}
          placeholder="Ej: Madrid, Cancún…"
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      {/* Fechas */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Desde</label>
          <input
            type="date"
            value={f.fechaDesde || ""}
            onChange={(e) => setF({ ...f, fechaDesde: e.target.value || undefined })}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Hasta</label>
          <input
            type="date"
            value={f.fechaHasta || ""}
            onChange={(e) => setF({ ...f, fechaHasta: e.target.value || undefined })}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
      </div>

      {/* Precio */}
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700">Precio (USD)</label>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={f.precioMin}
            onChange={(e) => setF({ ...f, precioMin: Number(e.target.value || 0) })}
            className="w-24 rounded-lg border px-3 py-2"
          />
          <span className="text-gray-500">–</span>
          <input
            type="number"
            min={0}
            value={f.precioMax}
            onChange={(e) => setF({ ...f, precioMax: Number(e.target.value || 0) })}
            className="w-28 rounded-lg border px-3 py-2"
          />
        </div>
      </div>

      {/* Estrellas */}
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700">Estrellas</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {[3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setF({ ...f, estrellas: toggleArray(f.estrellas, s) as number[] })}
              className={`rounded-full border px-3 py-1 text-sm ${f.estrellas.includes(s) ? "border-blue-600 bg-blue-50 text-blue-700" : "hover:bg-gray-50"}`}
            >
              {s}★
            </button>
          ))}
        </div>
      </div>

      {/* Régimen */}
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700">Régimen</label>
        <div className="mt-2 grid grid-cols-1 gap-2">
          {REGIMENES.map((r) => (
            <label key={r} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={f.regimenes.includes(r)}
                onChange={() => setF({ ...f, regimenes: toggleArray(f.regimenes, r) as string[] })}
              />
              <span className="text-sm">{r}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4">
        <label className="text-sm font-medium text-gray-700">Categorías</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setF({ ...f, tags: toggleArray(f.tags, t) as string[] })}
              className={`rounded-full border px-3 py-1 text-sm capitalize ${f.tags.includes(t) ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "hover:bg-gray-50"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => onApply?.(f)}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Aplicar
        </button>
        <button
          onClick={() => {
            setF(DEFAULTS);
            onReset?.();
          }}
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          Limpiar
        </button>
      </div>
    </aside>
  );
}
