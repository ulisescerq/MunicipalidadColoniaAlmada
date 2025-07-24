import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm">CA</span>
              </div>
              <span className="font-bold text-lg">Municipalidad Colonia Almada</span>
            </div>
            <p className="text-gray-300 mb-4">Trabajando por el desarrollo y bienestar de nuestra comunidad.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-gray-300 hover:text-white">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="/ordenanzas" className="text-gray-300 hover:text-white">
                  Ordenanzas
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="text-gray-300 hover:text-white">
                  Galería
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Calle Principal 123</li>
              <li>+54 XXX XXX-XXXX</li>
              <li>info@coloniaalmada.gob.ar</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Municipalidad de Colonia Almada. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
