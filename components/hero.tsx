import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Municipalidad de
            <span className="block text-yellow-400">Colonia Almada</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Trabajando juntos por el desarrollo y bienestar de nuestra comunidad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/noticias">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Ver Noticias
              </Button>
            </Link>
            <Link href="/ordenanzas">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
              >
                Ordenanzas Municipales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
