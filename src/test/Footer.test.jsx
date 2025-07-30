// 📦 IMPORTACIONES DE TESTING
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from '../components/Footer'

// 🎭 MOCK DEL ARCHIVO CSS
// Vitests no puede importar CSS por defecto, así que lo mockeamos
vi.mock('../style/Footer.css', () => ({}))

// 🎯 FUNCIÓN HELPER PARA RENDERIZAR EL COMPONENTE
// Aunque Footer no use Link, mantenemos consistencia con otros tests
const renderFooter = () => {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  )
}

// 📋 SUITE DE TESTS PRINCIPAL
describe('Footer Component', () => {
  
  // ✅ TEST 1: Verificar que el componente se renderiza correctamente
  it('should render the footer component', () => {
    renderFooter()
    
    // Verificamos que el elemento footer esté presente en el DOM
    const footerElement = screen.getByRole('contentinfo') // role="contentinfo" es el rol semántico del footer
    expect(footerElement).toBeInTheDocument()
  })

  // ✅ TEST 2: Verificar que la línea decorativa existe
  it('should render the decorative footer line', () => {
    renderFooter()
    
    // Buscamos el elemento con clase 'footer-line'
    const footerLine = document.querySelector('.footer-line')
    
    expect(footerLine).toBeInTheDocument()
    expect(footerLine).toHaveClass('footer-line')
  })

  // ✅ TEST 3: Verificar que el texto de copyright está presente
  it('should display the copyright text with correct content', () => {
    renderFooter()
    
    // Verificamos que el párrafo con el copyright esté presente
    const copyrightText = screen.getByText(/© 2025 · Proyecto realizado por/)
    expect(copyrightText).toBeInTheDocument()
    
    // Verificamos que contenga las palabras clave importantes
    expect(copyrightText).toHaveTextContent('Nicole, Maryori, Valentina, Esther, Rocío y Mariana')
    expect(copyrightText).toHaveTextContent('Bootcamp Fullstack')
    expect(copyrightText).toHaveTextContent('Factoria F5')
    expect(copyrightText).toHaveTextContent('fines educativos')
  })

  // ✅ TEST 4: Verificar que el enlace externo funciona correctamente
  it('should render external link to Factoria F5 with correct attributes', () => {
    renderFooter()
    
    // Buscamos el enlace por su href
    const externalLink = screen.getByRole('link', { name: /logo femcoders factoriaf5/i })
    
    // Verificamos que el enlace esté presente
    expect(externalLink).toBeInTheDocument()
    
    // Verificamos que tenga el href correcto
    expect(externalLink).toHaveAttribute('href', 'https://factoriaf5.org/')
    
    // Verificamos que se abra en nueva pestaña (target="_blank")
    expect(externalLink).toHaveAttribute('target', '_blank')
    
    // Verificamos que tenga el atributo de seguridad rel="noopener noreferrer"
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  // ✅ TEST 5: Verificar que la imagen del logo se renderiza correctamente
  it('should render the Factoria F5 logo image with correct attributes', () => {
    renderFooter()
    
    // Buscamos la imagen por su texto alternativo
    const logoImage = screen.getByAltText('logo femcoders factoriaf5')
    
    // Verificamos que la imagen esté presente
    expect(logoImage).toBeInTheDocument()
    
    // Verificamos que tenga la clase CSS correcta
    expect(logoImage).toHaveClass('footer-logo')
    
    // Verificamos que tenga el src correcto
    expect(logoImage).toHaveAttribute('src', 'https://femcoders.factoriaf5.org/wp-content/uploads/2021/12/Logo-FemCodersF5-color-300x224.png')
  })

  // ✅ TEST 6: Verificar la estructura del DOM
  it('should have correct DOM structure', () => {
    renderFooter()
    
    // Verificamos que existe la línea decorativa
    const footerLine = document.querySelector('.footer-line')
    expect(footerLine).toBeInTheDocument()
    
    // Verificamos que existe el elemento footer
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    
    // Verificamos que existe el contenedor del contenido
    const footerContent = footer.querySelector('.footer-content')
    expect(footerContent).toBeInTheDocument()
    expect(footerContent).toHaveClass('footer-content')
  })

  // ✅ TEST 7: Verificar que los elementos tienen las clases CSS correctas
  it('should have correct CSS classes on elements', () => {
    renderFooter()
    
    // Verificamos que el contenedor principal tenga la clase correcta
    const footerContent = document.querySelector('.footer-content')
    expect(footerContent).toHaveClass('footer-content')
    
    // Verificamos que la imagen tenga la clase correcta
    const logoImage = screen.getByAltText('logo femcoders factoriaf5')
    expect(logoImage).toHaveClass('footer-logo')
    
    // Verificamos que la línea decorativa tenga la clase correcta
    const footerLine = document.querySelector('.footer-line')
    expect(footerLine).toHaveClass('footer-line')
  })

  // ✅ TEST 8: Test de accesibilidad básica
  it('should be accessible', () => {
    renderFooter()
    
    // Verificamos que el footer tenga el rol semántico correcto
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    
    // Verificamos que la imagen tenga texto alternativo
    const image = screen.getByAltText('logo femcoders factoriaf5')
    expect(image).toBeInTheDocument()
    
    // Verificamos que haya exactamente un enlace
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(1)
    
    // Verificamos que el enlace sea accesible
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href')
  })

  // ✅ TEST 9: Verificar que el contenido de texto es el esperado
  it('should contain all expected text content', () => {
    renderFooter()
    
    // Verificamos que contenga el año actual
    expect(screen.getByText(/© 2025/)).toBeInTheDocument()
    
    // Verificamos que contenga todos los nombres de las desarrolladoras
    const names = ['Nicole', 'Maryori', 'Valentina', 'Esther', 'Rocío', 'Mariana']
    names.forEach(name => {
      expect(screen.getByText(new RegExp(name))).toBeInTheDocument()
    })
    
    // Verificamos que contenga términos clave del proyecto
    expect(screen.getByText(/Bootcamp Fullstack/)).toBeInTheDocument()
    expect(screen.getByText(/Frontend \+ Backend/)).toBeInTheDocument()
    expect(screen.getByText(/Factoria F5/)).toBeInTheDocument()
    expect(screen.getByText(/fines educativos/)).toBeInTheDocument()
  })

  // ✅ TEST 10: Verificar que el enlace es válido y seguro
  it('should have secure external link configuration', () => {
    renderFooter()
    
    const externalLink = screen.getByRole('link')
    
    // Verificamos que sea un enlace HTTPS (seguro)
    expect(externalLink.getAttribute('href')).toMatch(/^https:\/\//)
    
    // Verificamos que tenga configuración de seguridad
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(externalLink).toHaveAttribute('target', '_blank')
    
    // Verificamos que el enlace no esté vacío
    expect(externalLink.getAttribute('href')).not.toBe('')
    expect(externalLink.getAttribute('href')).toBeTruthy()
  })
})