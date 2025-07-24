export interface NewsItem {
  id: string
  title: string
  content: string
  imageUrl?: string
  createdAt: Date
}

export interface OrdinanceItem {
  id: string
  title: string
  number: string
  description: string
  fileUrl?: string
  createdAt: Date
}

export interface GalleryItem {
  id: string
  title: string
  type: "image" | "video"
  url: string
  createdAt: Date
}
