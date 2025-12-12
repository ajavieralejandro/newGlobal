import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { PaqueteData } from "../interfaces/PaqueteData";

interface FiltrosBusqueda {
  id?: string | number;
  destino?: string;
  fecha_desde?: string;
  fecha_hasta?: string;
  page?: number;
  per_page?: number;
  [key: string]: any;
}

type Pagination = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from?: number | null;
  to?: number | null;
};

export const useBusqueda = () => {
  const [paquetes, setPaquetes] = useState<PaqueteData[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const lastFiltrosRef = useRef<FiltrosBusqueda>({});
  const abortRef = useRef<AbortController | null>(null);

  const buildUrl = (filtros: FiltrosBusqueda) => {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });

    return "/paquetes-paginados" + (params.toString() ? `?${params.toString()}` : "");
  };

  const buscarPaquetes = useCallback(async (filtros: FiltrosBusqueda = {}) => {
    try {
      setLoading(true);
      setError(null);

      abortRef.current?.abort();
      abortRef.current = new AbortController();

      const merged: FiltrosBusqueda = {
        per_page: filtros.per_page ?? 12,
        page: 1,
        ...filtros,
      };

      lastFiltrosRef.current = merged;

      const resp = await fetch(buildUrl(merged), { signal: abortRef.current.signal });

      if (!resp.ok) {
        setError("Error al buscar paquetes.");
        setPaquetes([]);
        setPagination(null);
        return;
      }

      const body = await resp.json();
      const items = (body?.data ?? []) as PaqueteData[];
      const pag = (body?.pagination ?? null) as Pagination | null;

      setPaquetes(items);
      setPagination(pag);

      localStorage.setItem("resultadosBusqueda", JSON.stringify(items));
      window.dispatchEvent(new Event("actualizarPaquetes"));
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      console.error("Error en buscarPaquetes:", e);
      setError("Error al buscar paquetes.");
      setPaquetes([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const cargarMas = useCallback(async () => {
    if (!pagination) return;
    if (loadingMore) return;
    if (pagination.current_page >= pagination.last_page) return;

    try {
      setLoadingMore(true);
      setError(null);

      const nextPage = pagination.current_page + 1;
      const filtros = { ...lastFiltrosRef.current, page: nextPage };

      const resp = await fetch(buildUrl(filtros));
      if (!resp.ok) {
        setError("Error al cargar más paquetes.");
        return;
      }

      const body = await resp.json();
      const items = (body?.data ?? []) as PaqueteData[];
      const pag = (body?.pagination ?? null) as Pagination | null;

      setPaquetes((prev) => {
        const merged = [...prev, ...items];
        localStorage.setItem("resultadosBusqueda", JSON.stringify(merged));
        window.dispatchEvent(new Event("actualizarPaquetes"));
        return merged;
      });

      setPagination(pag);
    } catch (e) {
      console.error("Error en cargarMas:", e);
      setError("Error al cargar más paquetes.");
    } finally {
      setLoadingMore(false);
    }
  }, [pagination, loadingMore]);

  const verDetallePaquete = useCallback(
    (paquete: PaqueteData) => {
      if (!paquete) return;

      const idCrudo =
        (paquete as any).paquete_externo_id ??
        (paquete as any).id ??
        (paquete as any).slug;

      if (!idCrudo) {
        console.warn("Paquete sin identificador usable:", paquete);
        return;
      }

      const id = String(idCrudo).trim();

      localStorage.setItem("paqueteAct", JSON.stringify(paquete));
      localStorage.setItem("resultadosBusqueda", JSON.stringify([paquete]));
      window.dispatchEvent(new Event("actualizarPaquetes"));

      navigate(`/paquetes-busqueda/${encodeURIComponent(id)}`);
    },
    [navigate]
  );

  const limpiarBusqueda = useCallback(() => {
    setPaquetes([]);
    setPagination(null);
    setError(null);
    localStorage.removeItem("resultadosBusqueda");
    window.dispatchEvent(new Event("actualizarPaquetes"));
  }, []);

  const hayMas = !!pagination && pagination.current_page < pagination.last_page;

  return {
    paquetes,
    pagination,
    hayMas,
    loading,
    loadingMore,
    error,
    buscarPaquetes,
    cargarMas,
    verDetallePaquete,
    limpiarBusqueda,
  };
};
