"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Play } from "lucide-react"
import { getGalleryItems } from "@/lib/firebase"
import type { GalleryItem } from "@/types"

export function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const galleryData = await getGalleryItems()
        setGalleryItems(galleryData)
      } catch (error) {
        console.error("Error fetching gallery:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-12">Galería</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-gray-300 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-12">Galería</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                  <img
                    src={item.url || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold">{item.title}</p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                {item.type === "image" ? (
                  <img
                    src={item.url || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                ) : (
                  <video src={item.url} controls className="w-full h-auto max-h-[80vh]" />
                )}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        {galleryItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay elementos en la galería en este momento.</p>
          </div>
        )}
      </div>
    </div>
  )
}
