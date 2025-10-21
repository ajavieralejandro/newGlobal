import React from "react";
import { Box, Typography } from "@mui/material";
import { useBuscador, useDatosGenerales } from "../../contextos/agencia/DatosAgenciaContext";
import SelectorPestanas from "./contenedorBusqueda/pestanias/SelectorPestanas";
import SearchInputs from "./contenedorBusqueda/camposBusqueda/SearchFields";
import BotonBusqueda from "./boton/BotonBusqueda";

const ContenedorBusqueda: React.FC = () => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();

  if (!datosGenerales) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        Cargando datos de la agencia...
      </Typography>
    );
  }

  const fontFamily =
    buscador?.tipografia ||
    datosGenerales.tipografiaAgencia ||
    "Arial, sans-serif";

  const textColor =
    buscador?.tipografiaColor ||
    datosGenerales.colorTipografiaAgencia ||
    "#000";

  // Fondo del contenedor (puede venir de datosGenerales)
  const fondoColor = "#F8D357";

  return (
    <Box
      sx={{
        position: "relative",
        width: "97%",
        maxWidth: "1250px",
        backgroundColor: fondoColor,
        color: textColor,
        fontFamily,
        borderRadius: "6px",
        boxShadow: "0px 3px 10px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        // 🔹 Ajustes responsivos de altura / padding
        pt: { xs: 1, sm: 1, md: 3 }, // menos alto en mobile
        px: { xs: 2, sm: 2, md: 8 },
        pb: { xs: 3, sm: 4, md: 6 }, // menos espacio inferior en mobile
        mb: { xs: 2, sm: 3 },

        margin: "0 auto",
        transition: "all 0.3s ease",
      }}
    >
      {/* Selector de pestañas */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mb: { xs: 1.5, sm: 3 }, // menos separación en mobile
        }}
      >
        <SelectorPestanas />
      </Box>

      {/* Campos de búsqueda */}
      <Box sx={{ width: "100%" }}>
        <SearchInputs />
      </Box>

      {/* Botón de búsqueda */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translate(-50%, 50%)",
          zIndex: 5,
        }}
      >
        <BotonBusqueda />
      </Box>
    </Box>
  );
};

export default ContenedorBusqueda;
