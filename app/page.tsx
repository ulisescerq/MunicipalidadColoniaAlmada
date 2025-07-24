import { Hero } from "@/components/hero"
import { NewsSection } from "@/components/news-section"
import { OrdinancesSection } from "@/components/ordinances-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <NewsSection />
      <OrdinancesSection />
      <GallerySection />
      <ContactSection />
    </main>
  )
}
