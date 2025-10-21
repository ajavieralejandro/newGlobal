import React, { useEffect, useRef, useState } from "react";
import { Box, Chip } from "@mui/material";

const opciones = [
  "Deporte",
  "Tenis",
  "F1",
  "Futbol",
  "Exóticos",
  "India Nepal",
  "Bali",
  "Gastronomía",
  "Viajes",
  "Cultura",
  "Tecnología",
  "Moda",
];

const FiltroCategoria: React.FC = () => {
  const [filtroSeleccionado, setFiltroSeleccionado] = useState<string>("");
  const contRef = useRef<HTMLDivElement | null>(null);
  const scrollSpeed = 0.5; // velocidad del desplazamiento

  const handleClick = (item: string) => {
    setFiltroSeleccionado(item);
    console.log("Filtro seleccionado:", item);
  };

  useEffect(() => {
    let animationFrameId: number;

    const scrollContinuo = () => {
      if (contRef.current) {
        const cont = contRef.current;
        cont.scrollLeft += scrollSpeed;

        if (cont.scrollLeft >= cont.scrollWidth - cont.clientWidth) {
          cont.scrollLeft = 0; // loop infinito
        }
      }
      animationFrameId = requestAnimationFrame(scrollContinuo);
    };

    animationFrameId = requestAnimationFrame(scrollContinuo);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        py: 1,
        border: "1px solid #CEAC41", // 💛 borde visible (dorado)
        borderRadius: "5px", // 🔹 bordes redondeados
        backgroundColor: "#FAFAFA", // opcional, para contraste
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // sombra suave
        overflow: "hidden",
      }}
    >
      {/* Contenedor scroll automático */}
      <Box
        ref={contRef}
        sx={{
          overflowX: "hidden",
          whiteSpace: "nowrap",
          px: { xs: 1, sm: 3 },
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          {[...opciones, ...opciones].map((item, index) => {
            const isSelected = filtroSeleccionado === item;
            return (
              <Chip
                key={`${item}-${index}`}
                label={item}
                clickable
                onClick={() => handleClick(item)}
                sx={{
                  minWidth: 110,
                  maxWidth: 110,
                  height: 36,
                  borderRadius: "20px",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: isSelected ? "#fff" : "#000",
                  backgroundColor: isSelected ? "#CEAC41" : "#F2F2F2",
                  border: isSelected ? "2px solid #b99737" : "2px solid transparent",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    backgroundColor: isSelected ? "#b99737" : "#E6E6E6",
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default FiltroCategoria;
