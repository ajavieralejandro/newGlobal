const Footer = () => {
  const year = new Date().getFullYear();
  const logoSrc = "https://www.globalexplorer.com.ar/images/logo.png";

  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
        {/* Marca + descripción */}
        <div className="md:max-w-md lg:col-span-2">
          <a
            href="/"
            aria-label="Ir al inicio"
            title="Global Explorer Mayorista"
            className="inline-flex items-center"
          >
            <img
              src={logoSrc}
              alt="Global Explorer Mayorista"
              className="h-8 w-auto"
              loading="lazy"
            />
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Global Explorer
            </span>
          </a>
          <div className="mt-4 lg:max-w-sm">
            <p className="text-sm text-gray-800">
              Operadora mayorista B2B para agencias de viajes. Tarifas netas,
              XML, cupos aéreos, bloqueos y grupos a medida en los principales
              destinos del mundo.
            </p>
            <p className="mt-4 text-sm text-gray-800">
              Mesa de ayuda a emisión y equipo de producto dedicado. Integración
              vía API, soporte comercial y financiamiento para el canal agencia.
            </p>
          </div>
        </div>

        {/* Listas */}
        <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
          <div>
            <p className="font-semibold tracking-wide text-gray-800">
              Productos
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/paquetes"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Paquetes Mayoristas
                </a>
              </li>
              <li>
                <a
                  href="/aereos"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Cupos Aéreos
                </a>
              </li>
              <li>
                <a
                  href="/hoteles"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Hoteles & All Inclusive
                </a>
              </li>
              <li>
                <a
                  href="/grupos"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Grupos & Incentivos
                </a>
              </li>
              <li>
                <a
                  href="/cruceros"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Cruceros
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold tracking-wide text-gray-800">
              Soluciones
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/xml"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Integración XML / API
                </a>
              </li>
              <li>
                <a
                  href="/financiacion"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Financiación & Medios de Pago
                </a>
              </li>
              <li>
                <a
                  href="/marketing"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Kits de Marketing
                </a>
              </li>
              <li>
                <a
                  href="/capacitacion"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Capacitaciones
                </a>
              </li>
              <li>
                <a
                  href="/soporte"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Soporte a Emisión
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold tracking-wide text-gray-800">
              Para Agencias
            </p>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/alta-agencia"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Alta de Agencia
                </a>
              </li>
              <li>
                <a
                  href="/iniciar-sesion"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Ingresar al Portal
                </a>
              </li>
              <li>
                <a
                  href="/facturacion"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Facturación & Pagos
                </a>
              </li>
              <li>
                <a
                  href="/contacto-comercial"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Contacto Comercial
                </a>
              </li>
              <li>
                <a
                  href="/novedades"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Novedades & Promos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold tracking-wide text-gray-800">Legales</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/terminos"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a
                  href="/privacidad"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="/contratos"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Contratos & Anexos
                </a>
              </li>
              <li>
                <a
                  href="/requisitos"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Requisitos de Operación
                </a>
              </li>
              <li>
                <a
                  href="/defensa-consumidor"
                  className="text-gray-600 transition-colors duration-300 hover:text-indigo-600"
                >
                  Defensa del Consumidor
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pie final */}
      <div className="flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row">
        <p className="text-sm text-gray-600">
          © {year} Global Explorer Operadora Mayorista. Todos los derechos
          reservados. {/* Opcional: CUIT/Legajo ficticio */}
          CUIT 30-71234567-8 · Legajo EVT 12345.
        </p>
        <div className="flex items-center mt-4 space-x-4 sm:mt-0">
          <a
            href="https://twitter.com/globalexplorer"
            aria-label="Twitter de Global Explorer"
            className="text-gray-500 transition-colors duration-300 hover:text-indigo-600"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M24 4.6c-.9.4-1.8.7-2.8.8 1-.6 1.8-1.6 2.2-2.7-1 .6-2 1-3.1 1.2A4.9 4.9 0 0 0 12 7.5c0 .4 0 .8.1 1.1C7.7 8.1 4.1 6.1 1.7 3.1c-.5.8-.7 1.6-.7 2.5 0 1.7.9 3.2 2.2 4.1-.6-.1-1.4-.3-2-.7v.1c0 2.4 1.7 4.4 3.9 4.8-.4.1-.8.2-1.3.2h-.9c.6 2 2.4 3.4 4.6 3.4-1.7 1.3-3.8 2.1-6.1 2.1-.4 0-.8 0-1.2-.1C4.9 22 7.5 22.8 10.2 22.8c9.1 0 14-7.5 14-14 0-.2 0-.4 0-.6.3-.8 1.1-1.7 1.8-2.6z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/globalexplorer"
            aria-label="Instagram de Global Explorer"
            className="text-gray-500 transition-colors duration-300 hover:text-indigo-600"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 30 30" fill="currentColor" className="h-6 w-6">
              <circle cx="15" cy="15" r="4" />
              <path d="M20 3h-10A7 7 0 0 0 3 10v10a7 7 0 0 0 7 7h10a7 7 0 0 0 7-7V10a7 7 0 0 0-7-7zm-5 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm7-12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
          </a>
          <a
            href="https://facebook.com/globalexplorer"
            aria-label="Facebook de Global Explorer"
            className="text-gray-500 transition-colors duration-300 hover:text-indigo-600"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M22 0H2C.895 0 0 .895 0 2v20c0 1.105.895 2 2 2h11v-9h-3v-4h3V8.413C13 5.313 14.893 3.625 17.659 3.625c1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763V11h4.44l-1 4h-3.44v9H22c1.105 0 2-.895 2-2V2C24 .895 23.105 0 22 0z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
