import React from "react";
import { Box, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CampoBusqueda from "./CampoBusqueda";
import CampoFecha from "./campoFecha/CampoFecha";
import CampoPasajeros from "./campoPasajeros/CampoPasajeros";

// Importación para evitar errores con MUI DatePicker
import type {} from "@mui/x-date-pickers/themeAugmentation";

const SearchInputs: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          backgroundColor: "transparent",
          borderRadius: "6px",
          // 🔹 Padding más chico en mobile
          p: { xs: 0.5, sm: 1.5, md: 2 },
        }}
      >
        <Grid
          container
          alignItems="flex-start"
          justifyContent="space-between"
          // 🔹 Menos espacio entre filas y columnas en mobile
          spacing={{ xs: 0.5, sm: 0.5, md: 3 }}
          rowSpacing={{ xs: 0.5, sm: 0.5, md: 2 }}
          columnSpacing={{ xs: 0.5, sm: 1.5, md: 3 }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              minWidth: "200px",
              // 🔹 Margen inferior más chico en mobile
              mb: { xs: -4, sm: 1 },
            }}
          >
            <CampoBusqueda label="salida" />
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{ minWidth: "200px", mb: { xs: -4, sm: 1 } }}>
            <CampoBusqueda label="destino" />
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{ minWidth: "200px", mb: { xs: -4, sm: 1 } }}>
            <CampoFecha label="Fecha de Salida" />
          </Grid>

          <Grid item xs={12} sm={6} md={3} sx={{ minWidth: "200px", mb: { xs: -4, sm: 1 } }}>
            <CampoPasajeros label="Viajeros" />
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default SearchInputs;
