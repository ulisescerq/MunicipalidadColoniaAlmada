"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import { getOrdinances } from "@/lib/firebase"
import type { OrdinanceItem } from "@/types"

export function OrdinancesPage() {
  const [ordinances, setOrdinances] = useState<OrdinanceItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrdinances = async () => {
      try {
        const ordinancesData = await getOrdinances()
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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-12">Ordenanzas Municipales</h1>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/3 mt-4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-12">Ordenanzas Municipales</h1>
        <div className="grid md:grid-cols-2 gap-6">
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
                <p className="text-gray-600 mb-4">{item.description}</p>
                {item.fileUrl && (
                  <Button variant="outline" className="w-full bg-transparent" asChild>
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
        {ordinances.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay ordenanzas disponibles en este momento.</p>
          </div>
        )}
      </div>
    </div>
  )
}
