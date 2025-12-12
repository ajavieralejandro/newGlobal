import type { PaqueteData } from "../../interfaces/PaqueteData";

type Pagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from?: number | null;
  to?: number | null;
};

export async function obtenerPaquetesPaginados(
  page: number,
  per_page: number,
  idAgencia: string | number,
  extraParams: Record<string, any> = {}
): Promise<{
  paquetes: PaqueteData[];
  paginaActual: number;
  ultimaPagina: number;
  pagination: Pagination;
}> {
  const params = new URLSearchParams();
  params.set("id", String(idAgencia));
  params.set("page", String(page));
  params.set("per_page", String(per_page));

  Object.entries(extraParams).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") params.set(k, String(v));
  });

  // ✅ si en prod el front y el back comparten dominio, esto funciona ok
  // ✅ en dev, podés usar proxy de Vite o cambiar por VITE_API_URL
  const resp = await fetch(`/paquetes-paginados?${params.toString()}`);

  if (!resp.ok) throw new Error("Error al obtener paquetes paginados");

  const body = await resp.json();

  const paquetes = (body?.data ?? []) as PaqueteData[];
  const pagination = (body?.pagination ?? {}) as Pagination;

  return {
    paquetes,
    paginaActual: pagination.current_page ?? page,
    ultimaPagina: pagination.last_page ?? 1,
    pagination,
  };
}
