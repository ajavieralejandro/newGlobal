import React, { useState } from "react";
import { Box, Chip, Typography } from "@mui/material";

interface FiltrosProps {
  opciones: string[];
  onSelect?: (filtro: string) => void;
  titulo?: string;
}

const Filtros: React.FC<FiltrosProps> = ({ opciones, onSelect, titulo }) => {
  const [filtroSeleccionado, setFiltroSeleccionado] = useState<string>("");

  const handleClick = (item: string) => {
    setFiltroSeleccionado(item);
    if (onSelect) onSelect(item);
  };

  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      {titulo && (
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 2, letterSpacing: 1 }}
        >
          {titulo}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {opciones.map((item) => (
          <Chip
            key={item}
            label={item}
            clickable
            color={filtroSeleccionado === item ? "primary" : "default"}
            onClick={() => handleClick(item)}
            sx={{
              borderRadius: "20px",
              fontWeight: 600,
              textTransform: "capitalize",
              transition: "all 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Filtros;
