
export default function PricingComparison() {
  return (
    <section className="bg-gray-50 text-gray-800">
      <div className="container mx-auto max-w-6xl p-6 overflow-x-auto">
        <table className="w-full table-auto border-collapse min-w-[720px]">
          <caption className="sr-only">Comparación de planes</caption>

          <thead>
            <tr className="align-bottom">
              <th className="w-40"></th>

              <th scope="col" className="px-2 pb-4 text-left">
                <h2 className="text-lg font-medium">Starter</h2>
                <p className="mb-3">
                  <span className="text-2xl font-bold sm:text-4xl text-gray-900">0€</span>
                  <span className="font-medium text-gray-600">/mo</span>
                </p>
              </th>

              <th scope="col" className="px-2 pb-4 text-left">
                <h2 className="text-lg font-medium">Standard</h2>
                <p className="mb-3">
                  <span className="text-2xl font-bold sm:text-4xl text-gray-900">19€</span>
                  <span className="font-medium text-gray-600">/mo</span>
                </p>
              </th>

              <th scope="col" className="px-2 pb-4 text-left">
                <h2 className="text-lg font-medium">Premium</h2>
                <p className="mb-3">
                  <span className="text-2xl font-bold sm:text-4xl text-gray-900">49€</span>
                  <span className="font-medium text-gray-600">/mo</span>
                </p>
              </th>
            </tr>
          </thead>

          <tbody className="text-center divide-y divide-gray-200">
            <tr>
              <th scope="row" className="text-left">
                <h3 className="py-3 font-medium">Euismod</h3>
              </th>
              <td className="py-3">
                <span className="block text-sm">1</span>
              </td>
              <td className="py-3">
                <span className="block text-sm">10</span>
              </td>
              <td className="py-3">
                <span className="block text-sm">100</span>
              </td>
            </tr>

            <tr>
              <th scope="row" className="text-left">
                <h3 className="py-3 font-medium">Principes et</h3>
              </th>
              <td className="py-3">
                <span className="block text-sm">0,5 GB</span>
              </td>
              <td className="py-3">
                <span className="block text-sm">5 GB</span>
              </td>
              <td className="py-3">
                <span className="block text-sm">500 GB</span>
              </td>
            </tr>

            <tr>
              <th scope="row" className="text-left">
                <h3 className="py-3 font-medium">Et mel porro</h3>
              </th>
              <td className="py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="Incluido en Starter"
                  className="w-5 h-5 mx-auto text-violet-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
              <td className="py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="Incluido en Standard"
                  className="w-5 h-5 mx-auto text-violet-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
              <td className="py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="Incluido en Premium"
                  className="w-5 h-5 mx-auto text-violet-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
            </tr>

            <tr>
              <th scope="row" className="text-left">
                <h3 className="py-3 font-medium">Veniam suscipiantur</h3>
              </th>
              <td className="py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="No incluido en Starter"
                  className="w-5 h-5 mx-auto text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
              <td className="py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="Incluido en Standard"
                  className="w-5 h-5 mx-auto text-violet-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
              <td className="py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="Incluido en Premium"
                  className="w-5 h-5 mx-auto text-violet-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
            </tr>

            <tr>
              <th scope="row" className="text-left">
                <h3 className="py-3 font-medium">Ornatus tacimates</h3>
              </th>
              <td className="py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="No incluido en Starter"
                  className="w-5 h-5 mx-auto text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
              <td className="py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="No incluido en Standard"
                  className="w-5 h-5 mx-auto text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
              <td className="py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="Incluido en Premium"
                  className="w-5 h-5 mx-auto text-violet-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
            </tr>

            <tr>
              <th scope="row" className="text-left">
                <h3 className="py-3 font-medium">Aliquam fastidii in mei</h3>
              </th>
              <td className="py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="No incluido en Starter"
                  className="w-5 h-5 mx-auto text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
              <td className="py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="No incluido en Standard"
                  className="w-5 h-5 mx-auto text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
              <td className="py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-label="Incluido en Premium"
                  className="w-5 h-5 mx-auto text-violet-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
