import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const FiltroTematica: React.FC = () => {
  const [tematica, setTematica] = useState("");
  const [destino, setDestino] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleBuscar = () => {
    console.log("Buscando:", { destino, tematica });
    // 🔹 Aquí podés disparar tu lógica de búsqueda o llamar a tu contexto/fetch
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        mt: { xs: 3, md: 5 },
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderRadius: "12px",
        padding: { xs: "12px", md: "16px 32px" },
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        backdropFilter: "blur(4px)",
        width: isMobile ? "90%" : "fit-content",
        mx: "auto",
      }}
    >
      <TextField
        label="Destino"
        variant="outlined"
        size="small"
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "6px",
          minWidth: { xs: "100%", sm: "200px" },
        }}
      />

      <TextField
        label="Temática"
        variant="outlined"
        size="small"
        select
        value={tematica}
        onChange={(e) => setTematica(e.target.value)}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "6px",
          minWidth: { xs: "100%", sm: "200px" },
        }}
      >
        <MenuItem value="deporte">🏅 Deporte</MenuItem>
        <MenuItem value="tenis">🎾 Tenis</MenuItem>
        <MenuItem value="f1">🏎️ F1</MenuItem>
        <MenuItem value="futbol">⚽ Fútbol</MenuItem>
        <MenuItem value="exoticos">🌴 Exóticos</MenuItem>
        <MenuItem value="india_nepal">🕌 India / Nepal</MenuItem>
        <MenuItem value="bali">🌺 Bali</MenuItem>
      </TextField>

      <Button
        variant="contained"
        size="medium"
        onClick={handleBuscar}
        startIcon={<SearchIcon />}
        sx={{
          borderRadius: "8px",
          fontWeight: "bold",
          backgroundColor: "#0077b6", // Azul TravelConnect
          "&:hover": { backgroundColor: "#005f8a" },
          px: 3,
          py: 1,
          width: isMobile ? "100%" : "auto",
        }}
      >
        Buscar
      </Button>
    </Box>
  );
};

export default FiltroTematica;
