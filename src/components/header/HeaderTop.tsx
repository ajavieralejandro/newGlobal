import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import ContenedorBusqueda from "../buscador/ContenedorBusqueda";

const TopHeader = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  // Alturas por tamaño de pantalla
  const contenedorHeight = {
    xs: 80,  // 🔹 Mobile más chico
    sm: 110, // Tablet
    md: 130, // Desktop
  };

  const calcularAltoHeader = () => {
    const w = window.innerWidth;
    if (w < 600) return window.innerHeight * 1.0;
    if (w < 900) return window.innerHeight * 0.75;
    return window.innerHeight * 0.65;
  };

  const calcularEspaciado = () => {
    const w = window.innerWidth;
    const baseHeight =
      w < 600 ? contenedorHeight.xs : w < 900 ? contenedorHeight.sm : contenedorHeight.md;
    if (w < 600) return 60; // 🔹 Menor separación en mobile
    const base = headerHeight + baseHeight / 2;
    return Math.min(Math.max(base, 120), 200);
  };

  useEffect(() => {
    const update = () => setHeaderHeight(calcularAltoHeader());
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1100,
        }}
      >
        <Header />
      </Box>

      {/* Contenedor de búsqueda */}
      <Box
        sx={{
          position: "absolute",
          top: {
            xs: `calc(${headerHeight}px - ${contenedorHeight.xs / 2}px)`,
            sm: `calc(${headerHeight}px - ${contenedorHeight.sm / 2}px)`,
            md: `calc(${headerHeight}px - ${contenedorHeight.md / 2}px)`,
          },
          left: "50%",
          transform: "translateX(-50%)",
          width: { xs: "100%", sm: "100%", md: "90%" },
          maxWidth: "1200px",
          height: {
            xs: `${contenedorHeight.xs}px`,
            sm: `${contenedorHeight.sm}px`,
            md: `${contenedorHeight.md}px`,
          },
          zIndex: 1101,
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          // 🔹 Ajustes visuales adicionales para mobile
          "& > *": {
            transform: { xs: "scale(0.95)", sm: "scale(1)", md: "scale(1)" },
            transition: "transform 0.2s ease",
          },
        }}
      >
        <ContenedorBusqueda />
      </Box>

      {/* Espaciador */}
      <Box sx={{ height: `${calcularEspaciado()}px` }} />
    </Box>
  );
};

export default TopHeader;
