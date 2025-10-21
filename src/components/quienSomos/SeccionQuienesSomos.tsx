import { Box, Typography, useTheme, useMediaQuery, Stack } from "@mui/material";
import { useQuienesSomos, useFooter } from "../../contextos/agencia/DatosAgenciaContext";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ExploreIcon from "@mui/icons-material/Explore";
import HikingIcon from "@mui/icons-material/Hiking";
import { motion } from "framer-motion";
import BotonAnimado from "./BotonAnimado";
import { useTarjetas, useDatosGenerales } from "../../contextos/agencia/DatosAgenciaContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const SeccionQuienesSomos = () => {
  const quienesSomos = useQuienesSomos();
  const footer = useFooter();
  const theme = useTheme();
  const esMobile = useMediaQuery(theme.breakpoints.down("md"));
  const tarjetas = useTarjetas();
  const datosGenerales = useDatosGenerales();

  if (!datosGenerales) return null;
  const tipografia = footer?.tipografia || theme.typography.fontFamily;
  //const colorTexto = footer?.tipografiaColor || theme.palette.text.primary;
  const colorTexto = "#1F1F1F"
  //const bgColor = footer?.color?.terciario || theme.palette.background.default; se deja para ponerlo en data
  const bgColor = "#E6EEF7" 
    const tituloTipografia =
    tarjetas?.tipografia || datosGenerales?.tipografiaAgencia || "Poppins, sans-serif";

  const tituloTipografiaColor =
    tarjetas?.tipografiaColorTitulo ||
    datosGenerales?.colorTipografiaAgencia ||
    "#000000";

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        bgcolor: bgColor,
        color: colorTexto,
        fontFamily: tipografia,
        py: { xs: 5, md: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          px: { xs: 3, md: 6 },
          textAlign: "center",
        }}
      >
        {/* Título */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              mb: 4,
              color: tituloTipografiaColor,
              fontFamily: tituloTipografia,
              textTransform: "uppercase",
              letterSpacing: "1px",
              position: "relative",
              display: "inline-block",
              fontSize: {
                xs: "1.8rem",
                sm: "2.2rem",
                md: "2 rem",
                lg: "3 rem",
              },
            }}
          >
            Quiénes Somos
          </Typography>
        </motion.div>

        {/* Descripción */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={1}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.125rem",
              lineHeight: 1.8,
              opacity: 0.92,
              maxWidth: "760px",
              mx: "auto",
              fontFamily: tipografia,
              mt: 3,
            }}
          >
            {quienesSomos?.quienes_somos_es || "No se ha cargado la descripción."}
          </Typography>
        </motion.div>

        {/* Íconos turísticos */}
        <Stack
          direction={esMobile ? "column" : "row"}
          spacing={esMobile ? 4 : 6}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 4 }}
        >
          {[
            { icon: <FlightTakeoffIcon sx={{ fontSize: 48, color: "#F2CA4C" }} />, label: "Viajes Personalizados" },
            { icon: <ExploreIcon sx={{ fontSize: 48, color: "#F2CA4C" }} />, label: "Destinos Increíbles" },
            { icon: <HikingIcon sx={{ fontSize: 48, color: "#F2CA4C" }} />, label: "Experiencias Únicas" },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={index + 2}
            >
              <Stack alignItems="center" spacing={1}>
                {item.icon}
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ fontFamily: tipografia }}
                >
                  {item.label}
                </Typography>
              </Stack>
            </motion.div>
          ))}
        </Stack>

        {/* Botón animado */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={5}>
          <Box sx={{ mt: 5 }}>
            <BotonAnimado />
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default SeccionQuienesSomos;
