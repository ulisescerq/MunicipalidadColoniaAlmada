"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, ImageIcon, Video, Play } from "lucide-react"
import {
  getGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  uploadImage,
  uploadVideo,
} from "@/lib/firebase"
import type { GalleryItem } from "@/types"

export function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    type: "image" as "image" | "video",
    file: null as File | null,
  })
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      const galleryData = await getGalleryItems()
      setGalleryItems(galleryData)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los elementos de la galería",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      let url = editingItem?.url || ""

      if (formData.file) {
        if (formData.type === "image") {
          url = await uploadImage(formData.file, "gallery")
        } else {
          url = await uploadVideo(formData.file, "gallery")
        }
      }

      const galleryData = {
        title: formData.title,
        type: formData.type,
        url,
      }

      if (editingItem) {
        await updateGalleryItem(editingItem.id, galleryData)
        toast({
          title: "Elemento actualizado",
          description: "El elemento se ha actualizado correctamente",
        })
      } else {
        await addGalleryItem(galleryData)
        toast({
          title: "Elemento creado",
          description: "El elemento se ha creado correctamente",
        })
      }

      setIsDialogOpen(false)
      setEditingItem(null)
      setFormData({ title: "", type: "image", file: null })
      fetchGalleryItems()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el elemento",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      type: item.type,
      file: null,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
      try {
        await deleteGalleryItem(id)
        toast({
          title: "Elemento eliminado",
          description: "El elemento se ha eliminado correctamente",
        })
        fetchGalleryItems()
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el elemento",
          variant: "destructive",
        })
      }
    }
  }

  const resetForm = () => {
    setEditingItem(null)
    setFormData({ title: "", type: "image", file: null })
  }

  if (loading) {
    return <div>Cargando galería...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Galería</h2>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Elemento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Editar Elemento" : "Nuevo Elemento"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Modifica los datos del elemento" : "Completa los datos para crear un nuevo elemento"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Tipo</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "image" | "video") => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Imagen</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="file">{formData.type === "image" ? "Imagen" : "Video"}</Label>
                <Input
                  id="file"
                  type="file"
                  accept={formData.type === "image" ? "image/*" : "video/*"}
                  onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                  required={!editingItem}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Guardando..." : editingItem ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-square">
              {item.type === "image" ? (
                <img src={item.url || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <video src={item.url || "/placeholder.svg"} controls className="w-full h-full object-cover" />
              )}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="h-8 w-8 text-white" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button size="sm" variant="secondary" onClick={() => handleEdit(item)}>
                  <Edit className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="secondary" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium truncate">{item.title}</p>
              <div className="flex items-center mt-1">
                {item.type === "image" ? (
                  <ImageIcon className="h-3 w-3 mr-1 text-gray-500" />
                ) : (
                  <Video className="h-3 w-3 mr-1 text-gray-500" />
                )}
                <span className="text-xs text-gray-500 capitalize">{item.type}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
