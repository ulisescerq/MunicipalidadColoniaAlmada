"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, FileText, Download } from "lucide-react"
import { getOrdinances, addOrdinance, updateOrdinance, deleteOrdinance, uploadFile } from "@/lib/firebase"
import type { OrdinanceItem } from "@/types"

export function OrdinancesManager() {
  const [ordinances, setOrdinances] = useState<OrdinanceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingOrdinance, setEditingOrdinance] = useState<OrdinanceItem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    number: "",
    description: "",
    pdfFile: null as File | null,
  })
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchOrdinances()
  }, [])

  const fetchOrdinances = async () => {
    try {
      const ordinancesData = await getOrdinances()
      setOrdinances(ordinancesData)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las ordenanzas",
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
      let fileUrl = editingOrdinance?.fileUrl || ""

      if (formData.pdfFile) {
        fileUrl = await uploadFile(formData.pdfFile, "ordinances")
      }

      const ordinanceData = {
        title: formData.title,
        number: formData.number,
        description: formData.description,
        fileUrl,
      }

      if (editingOrdinance) {
        await updateOrdinance(editingOrdinance.id, ordinanceData)
        toast({
          title: "Ordenanza actualizada",
          description: "La ordenanza se ha actualizado correctamente",
        })
      } else {
        await addOrdinance(ordinanceData)
        toast({
          title: "Ordenanza creada",
          description: "La ordenanza se ha creado correctamente",
        })
      }

      setIsDialogOpen(false)
      setEditingOrdinance(null)
      setFormData({ title: "", number: "", description: "", pdfFile: null })
      fetchOrdinances()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la ordenanza",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (ordinance: OrdinanceItem) => {
    setEditingOrdinance(ordinance)
    setFormData({
      title: ordinance.title,
      number: ordinance.number,
      description: ordinance.description,
      pdfFile: null,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta ordenanza?")) {
      try {
        await deleteOrdinance(id)
        toast({
          title: "Ordenanza eliminada",
          description: "La ordenanza se ha eliminado correctamente",
        })
        fetchOrdinances()
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar la ordenanza",
          variant: "destructive",
        })
      }
    }
  }

  const resetForm = () => {
    setEditingOrdinance(null)
    setFormData({ title: "", number: "", description: "", pdfFile: null })
  }

  if (loading) {
    return <div>Cargando ordenanzas...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Ordenanzas</h2>
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
              Nueva Ordenanza
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingOrdinance ? "Editar Ordenanza" : "Nueva Ordenanza"}</DialogTitle>
              <DialogDescription>
                {editingOrdinance
                  ? "Modifica los datos de la ordenanza"
                  : "Completa los datos para crear una nueva ordenanza"}
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
                <Label htmlFor="number">Número de Ordenanza</Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  required
                  placeholder="001/2024"
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div>
                <Label htmlFor="pdf">Archivo PDF</Label>
                <Input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFormData({ ...formData, pdfFile: e.target.files?.[0] || null })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Guardando..." : editingOrdinance ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {ordinances.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    {item.title}
                  </CardTitle>
                  <CardDescription>Ordenanza N° {item.number}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{item.description}</p>
              {item.fileUrl && (
                <Button variant="outline" size="sm" asChild>
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
    </div>
  )
}
