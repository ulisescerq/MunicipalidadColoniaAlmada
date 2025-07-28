"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Noticias", href: "/noticias" },
    { name: "Ordenanzas", href: "/ordenanzas" },
    { name: "Galería", href: "/galeria" },
  ]

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <img
                  src="/logo almada.jpg" 
                  alt="Logo de Municipalidad Colonia Almada"
                  className="h-full w-full rounded-full object-contain" 
                />
              </div>
              <span className="font-bold text-lg">Municipalidad Colonia Almada</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="hover:text-blue-200 transition-colors">
                {item.name}
              </Link>
            ))}
            <Link href="/admin">
              <Button variant="outline" className="text-white-900 border-white hover:bg-white bg-transparent">
                Administración
              </Button> 
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 hover:bg-blue-800 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/admin"
                className="block px-3 py-2 hover:bg-blue-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Administración
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
