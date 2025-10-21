import { FunctionComponent } from "react";
import { Stack, Typography, Box } from "@mui/material";
import { useFooter, useDatosGenerales } from "../../contextos/agencia/DatosAgenciaContext";
import PhoneIcon from "@mui/icons-material/Phone";

interface IzquierdaArribaProps {
  logo: string | null;
}

const IzquierdaArriba: FunctionComponent<IzquierdaArribaProps> = ({ logo }) => {
  const footer = useFooter();
  const datosGenerales = useDatosGenerales();

  const tipografia =
    footer?.tipografia || datosGenerales?.tipografiaAgencia || "inherit";
  const textoColor = "#1F1F1F";
  const textoFooter =
    footer?.texto || "© 2025 Citrus Energía - Todos los derechos reservados";

  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
        px: { xs: 2, sm: 4 },
        py: { xs: 2, sm: 3 },
        backgroundColor: "transparent",
      }}
    >
      {/* 🟢 FILA 1: Contacto + Teléfono */}
    
       <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        spacing={{ xs: 2, sm: 4 }}
      >
        {logo && (
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: { xs: "55vw", sm: "35vw", md: "250px", lg: "300px" },
              maxWidth: "100%",
              maxHeight: 180,
              objectFit: "contain",
              display: "block",
            }}
          />
        )}

        <Typography
          variant="h6"
          sx={{
            color: textoColor,
            fontFamily: tipografia,
            fontWeight: 600,
          }}
        >
          Contacto
        </Typography>
      </Stack>


      {/* 🟡 FILA 2: Logo + Texto de copyright */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        spacing={{ xs: 2, sm: 4 }}
      >
        <Typography
          variant="body2"
          sx={{
            color: textoColor,
            fontFamily: tipografia,
            textAlign: { xs: "center", sm: "right" },
            lineHeight: 1.6,
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          }}
        >
          {textoFooter}
        </Typography>

        {footer?.contacto?.telefono && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <PhoneIcon sx={{ color: textoColor, fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{ color: textoColor, fontFamily: tipografia }}
            >
              {footer.contacto.telefono}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default IzquierdaArriba;
