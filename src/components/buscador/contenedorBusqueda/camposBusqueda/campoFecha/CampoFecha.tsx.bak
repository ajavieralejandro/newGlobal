import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import EventIcon from "@mui/icons-material/Event";
import dayjs from "dayjs";
import { useBuscador, useDatosGenerales } from "../../../../../contextos/agencia/DatosAgenciaContext";
import { useFormulario } from "../../../../../contextos/formulario/FormularioContext";

interface CampoFechaProps {
  label: string;
}

const CampoFecha: React.FC<CampoFechaProps> = ({ label }) => {
  const buscador = useBuscador();
  const datosGenerales = useDatosGenerales();
  const { fechaSalida, setFechaSalida, uiValues, setUIValues, errors } = useFormulario();
  
  const fieldError = errors.fechaSalida;

  useEffect(() => {
    if (!fechaSalida) {
      const valoresGuardados = localStorage.getItem("valoresPrevios");
      if (valoresGuardados) {
        const { fechaSalida: fechaGuardada } = JSON.parse(valoresGuardados);
        if (fechaGuardada) {
          const fecha = new Date(fechaGuardada);
          setFechaSalida(fecha);
          setUIValues({ fechaSalidaDisplay: dayjs(fecha).format('DD/MM/YYYY') });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Sincronizar display value cuando cambia fechaSalida - solo si display está vacío
  useEffect(() => {
    const currentDisplay = uiValues.fechaSalidaDisplay;
    
    if (fechaSalida && !currentDisplay) {
      // Solo actualizar display si está vacío y hay fecha en contexto
      setUIValues({ fechaSalidaDisplay: dayjs(fechaSalida).format('DD/MM/YYYY') });
    } else if (!fechaSalida && currentDisplay) {
      // Solo limpiar display si no hay fecha en contexto pero sí hay display
      setUIValues({ fechaSalidaDisplay: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fechaSalida]);

  if (!datosGenerales) return null;

  // 🎯 Fallbacks: Buscador -> Generales -> defaults
  const fondoInput =
    buscador?.inputFondoColor ||
    buscador?.color?.secundario ||
    datosGenerales?.color?.secundario ||
    "#F5F5F5";

  const colorTexto =
    buscador?.inputColor ||
    buscador?.tipografiaColor ||
    datosGenerales?.colorTipografiaAgencia ||
    "#000000";

  const labelColor =
    buscador?.tipografiaColorLabel ||
    buscador?.tipografiaColor ||
    datosGenerales?.colorTipografiaAgencia ||
    "#000000";

  const tipografia =
    buscador?.tipografia ||
    datosGenerales?.tipografiaAgencia ||
    "Poppins, sans-serif";

  const fechaDayjs = fechaSalida ? dayjs(fechaSalida) : null;

  const handleChangeFecha = (newValue: dayjs.Dayjs | null) => {
    const fecha = newValue ? newValue.toDate() : null;
    setFechaSalida(fecha);
    
    // Actualizar display value
    if (fecha) {
      setUIValues({ fechaSalidaDisplay: dayjs(fecha).format('DD/MM/YYYY') });
    } else {
      setUIValues({ fechaSalidaDisplay: '' });
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} position="relative">
      <Box display="flex" alignItems="center" gap={2}>
        <EventIcon sx={{ color: labelColor, fontSize: 24 }} />
        <Typography sx={{ color: labelColor, fontWeight: 500, fontFamily: tipografia }}>
          {label}
        </Typography>
      </Box>

      <Box display="flex">
        <DesktopDatePicker
          format="DD/MM/YYYY"
          value={fechaDayjs}
          onChange={handleChangeFecha}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              size: "small",
              error: Boolean(fieldError),
              helperText: fieldError,
              sx: {
                backgroundColor: fondoInput,
                borderRadius: "25px",
                fontFamily: tipografia,
                "& .MuiOutlinedInput-root": {
                  color: colorTexto,
                  "& fieldset": { 
                    borderColor: fieldError ? "#f44336" : "transparent" 
                  },
                  "&:hover fieldset": { 
                    borderColor: fieldError ? "#f44336" : "transparent" 
                  },
                  "&.Mui-focused fieldset": { 
                    borderColor: fieldError ? "#f44336" : "transparent" 
                  },
                },
                "& .MuiSvgIcon-root": {
                  color: colorTexto,
                },
                "& .MuiFormHelperText-root": {
                  color: "#f44336",
                  fontSize: "0.75rem",
                  marginLeft: 1,
                  marginTop: 0.5
                }
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default CampoFecha;
