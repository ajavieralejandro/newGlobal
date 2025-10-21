import { Box, Typography, Skeleton, Divider } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useTarjetas, useDatosGenerales } from "../../contextos/agencia/DatosAgenciaContext";
import BotonConsultar from "./BotonConsultar";
import type { PaqueteData } from "../../interfaces/PaqueteData";

interface TarifaPaqueteProps {
  tarifa: number | null | undefined;
  impuestos: number | null | undefined;
  divisa: string | null | undefined;
  total: number | null | undefined;
  wp: PaqueteData;
  cargando?: boolean;
}

const TarifaPaquete = ({ tarifa, impuestos, total, wp, divisa, cargando = false }: TarifaPaqueteProps) => {


  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  // 🎨 Colores con fallback
  const colorPrimario = tarjetas?.color?.primario || datosGenerales?.color?.primario || "#FF9800";
  const colorTipografia = tarjetas?.tipografiaColor || datosGenerales?.colorTipografiaAgencia || "#fff";

  // 💱 Normaliza a código de 3 letras
  const normalizeCurrency = (v?: string | null): string => {
    const s = (v ?? "").toString().trim().toUpperCase();
    if (!s) return "USD";
    if (s.includes("ARS") || s.includes("PESO") || s.includes("Peso")) return "ARS";
    if (s.includes("USD") || s.includes("DOLAR") || s.includes("DÓLAR") || s.includes("U$D") || s.includes("US$")) return "USD";
    if (/^[A-Z]{3}$/.test(s)) return s;
    return "USD";
  };

  const currency = normalizeCurrency(divisa);

  // 🧮 Formateo: sin decimales, miles local "es-AR"
  const formatNumber0 = (n: number | null | undefined): string => {
    const value = typeof n === "number" && Number.isFinite(n) ? Math.round(n) : 0;
    return new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(value);
  };

  // Muestra: ARS => "$ 1.234"; USD => "USD 1.234"; otras => "XXX 1.234"
  const displayAmount = (n: number | null | undefined): string => {
    const amount = formatNumber0(n);
    if (currency === "ARS") return `$ ${amount}`;
    if (currency === "USD") return `USD ${amount}`;
    return `${currency} ${amount}`;
  };

  const mostrarConsultar = !total || total === 0;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        //backgroundColor: colorPrimario,
        backgroundColor:"#f8d357",
        pt: 4,
        px: 3,
        pb: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 1,
        boxShadow: 4,
        flexGrow: 1,
      }}
    >
      {cargando ? (
        <>
          <Skeleton width="80%" height={25} />
          <Skeleton width="60%" height={45} />
          <Skeleton width="70%" height={20} />
          <Skeleton width="50%" height={20} />
          <Skeleton width="80%" height={30} />
          <Skeleton width="60%" height={45} />
        </>
      ) : (
        <>
          {/* Encabezado / Precio principal */}
          <Box sx={{ width: "100%" }}>
            <Typography variant="body1" fontWeight="bold" sx={{ color: colorTipografia, mb: 2 }}>
              Tarifa promedio por pasajero
            </Typography>

            {mostrarConsultar ? (
              <Typography variant="h3" fontWeight="bold" sx={{ color: colorTipografia }}>
                Consultar
              </Typography>
            ) : (
              <Typography variant="h3" fontWeight="bold" sx={{ color: colorTipografia }}>
                {displayAmount(tarifa)}
              </Typography>
            )}
          </Box>

          {/* Desglose */}
          {!mostrarConsultar && (
            <Box sx={{ width: "100%", mt: 4, flexGrow: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <MonetizationOnIcon sx={{ color: colorTipografia, mr: 1 }} />
                <Typography variant="body1" sx={{ color: colorTipografia, flexGrow: 1, textAlign: "left" }}>
                  Tarifa
                </Typography>
                <Typography variant="body1" sx={{ color: colorTipografia, fontWeight: "bold" }}>
                  {displayAmount(tarifa)}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <MonetizationOnIcon sx={{ color: colorTipografia, mr: 1 }} />
                <Typography variant="body1" sx={{ color: colorTipografia, flexGrow: 1, textAlign: "left" }}>
                  Impuestos
                </Typography>
                <Typography variant="body1" sx={{ color: colorTipografia, fontWeight: "bold" }}>
                  {displayAmount(impuestos)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2, borderColor: "#fff", width: "100%" }} />

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <AttachMoneyIcon sx={{ color: colorTipografia, mr: 1 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: colorTipografia, flexGrow: 1, textAlign: "left" }}>
                  TOTAL
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: colorTipografia }}>
                  {displayAmount(total)}
                </Typography>
              </Box>
            </Box>
          )}

          {/* CTA */}
          <Box sx={{ mt: 4, width: "100%" }}>
            <BotonConsultar paquete={wp} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default TarifaPaquete;
