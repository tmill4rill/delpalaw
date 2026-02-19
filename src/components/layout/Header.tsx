'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { href: '/practice-areas', label: 'Practice Areas' },
  { href: '/about', label: 'About' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/pay', label: 'Pay Online' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-blue-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-bold text-xl tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900 rounded"
          >
            DELPALaw
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="urgent" href="/contact">Book a Consult</Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Menu</span>
            <div className="w-6 h-0.5 bg-white mb-1" aria-hidden="true" />
            <div className="w-6 h-0.5 bg-white mb-1" aria-hidden="true" />
            <div className="w-6 h-0.5 bg-white" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div id="mobile-menu" className="md:hidden bg-blue-900 pb-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white py-2 px-4 text-sm font-medium hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button variant="urgent" href="/contact" className="w-full">Book a Consult</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
