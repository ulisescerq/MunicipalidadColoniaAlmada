"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import Link from "next/link"
import { getOrdinances } from "@/lib/firebase"
import type { OrdinanceItem } from "@/types"

export function OrdinancesSection() {
  const [ordinances, setOrdinances] = useState<OrdinanceItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrdinances = async () => {
      try {
        const ordinancesData = await getOrdinances(3) // Get latest 3 ordinances
        setOrdinances(ordinancesData)
      } catch (error) {
        console.error("Error fetching ordinances:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrdinances()
  }, [])

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Ordenanzas Municipales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/3 mt-4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Ordenanzas Municipales</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {ordinances.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  {item.title}
                </CardTitle>
                <p className="text-sm text-gray-500">Ordenanza N° {item.number}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                {item.fileUrl && (
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-1" />
                      Descargar PDF
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        {ordinances.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/ordenanzas">
              <Button size="lg">Ver todas las ordenanzas</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
