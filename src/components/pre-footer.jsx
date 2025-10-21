const Header = () => {
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 224 12"
          fill="currentColor"
          className="w-full -mb-1 text-white"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
        </svg>
      </div>

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
          <h1 className="mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
            Global Explorer 
            <br className="hidden md:block" />
            para <span className="relative inline-block">
              agencias de viajes
              
            </span>
          </h1>

          <p className="mb-6 text-base font-thin tracking-wide text-gray-300 md:text-lg">
            Tarifas netas, cupos aéreos, grupos a medida y conexión vía API/XML.
            Sumate a nuestra red y recibí primero <strong className="font-semibold text-white">novedades, promos y bloqueos</strong>.
          </p>

          {/* Newsletter / Captación B2B */}
          <form
            className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Suscripción a novedades Global Explorer"
          >
            <input
              placeholder="Ingresá tu email de agencia"
              required
              type="email"
              className="flex-grow w-full h-12 px-4 mb-3 text-white transition duration-200 bg-transparent border-2 border-gray-400 rounded appearance-none md:mr-2 md:mb-0 focus:border-indigo-300 focus:outline-none focus:shadow-outline"
              aria-label="Email de la agencia"
              autoComplete="email"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-indigo-500 hover:bg-indigo-600 focus:shadow-outline focus:outline-none"
              aria-label="Suscribirme a novedades"
            >
              Suscribirme
            </button>
          </form>

          <p className="max-w-md mb-10 text-xs font-thin tracking-wide text-gray-400 sm:text-sm sm:mx-auto md:mb-16">
            Solo enviamos info relevante para agencias: cupos, oportunidades de último minuto, capacitaciones y actualizaciones de producto.
          </p>

         
        </div>
      </div>
    </div>
  );
};

export default Header;
