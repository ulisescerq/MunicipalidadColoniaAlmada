import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Contacto</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card>
            <CardHeader className="text-center">
              <MapPin className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <CardTitle>Dirección</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Calle Principal 123
                <br />
                Colonia Almada
                <br />
                Código Postal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Phone className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <CardTitle>Teléfono</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                +54 XXX XXX-XXXX
                <br />
                +54 XXX XXX-XXXX
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Mail className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                info@coloniaalmada.gob.ar
                <br />
                contacto@coloniaalmada.gob.ar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Clock className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <CardTitle>Horarios</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                Lunes a Viernes
                <br />
                8:00 - 16:00 hs
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
