import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// ✅ Correcciones de rutas basadas en tu estructura real
import Footer from "../components/footer/Footer";
import PublicidadCliente from "../components/publicidad/PublicidadCliente";
import DestacadosDelMes from "../components/destacados/DestacadosDelMes";
import BannerRegistro from "../components/banner/BannerRegistro";
import ZocaloPoweredBy from "../components/footer/ZocaloPoweredBy";
import TopHeader from "../components/header/HeaderTop";
import Divisor from "../components/header/Divisor";
import SeccionQuienesSomos from "../components/quienSomos/SeccionQuienesSomos";
import FiltroTematica from "../components/tematica/FiltroTematica";
import CarruselAupisiante from "../components/auspiciantes/CarruselAupisiante";
import Filtros from "../components/filtros/Filtros";
import FiltroCategoria from "../components/filtros/FiltroCategoria";
const Home: React.FC = () => {
  function setFiltro(item: string): void {
    throw new Error("Function not implemented.");
  }
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAgenciasClick = () => {
    handleMenuClose();
    // Aquí puedes redirigir a tu página de agencias
    window.location.href = "/agencias";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Header con menú hamburguesa */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          position: "relative",
        }}
      >
        <Box> {/* Logo o título */}
        </Box>

        {/* Icono hamburguesa */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleAgenciasClick}>Agencias</MenuItem>
          {/* Aquí puedes agregar más opciones */}
        </Menu>
      </Box>

      <TopHeader />
      

      <Box sx={{ height: { xs: "80vh", md: "55vh" } }} />
      <Divisor/>

      
      {/* Componentes comentados temporalmente */}
      <PublicidadCliente /> 
      <FiltroCategoria/>


      <DestacadosDelMes /> 


      <SeccionQuienesSomos/>

      <CarruselAupisiante/>

       <BannerRegistro /> 

      
      
      <Footer /> {/* ✅ Faltaba Footer, lo agregué aquí */}
      <ZocaloPoweredBy />
      
    </Box>
  );
};

export default Home;
