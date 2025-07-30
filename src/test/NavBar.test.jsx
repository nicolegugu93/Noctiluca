// 📦 IMPORTACIONES DE TESTING
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar from '../components/NavBar'

// 🎭 MOCK DEL ARCHIVO CSS
vi.mock('../style/NavBar.css', () => ({}))

// 🖼️ MOCK DE LA IMAGEN
vi.mock('../assets/logo-mariposa.png', () => ({
  default: 'mocked-logo-image.png'
}))

// 🎯 FUNCIÓN HELPER PARA RENDERIZAR EL COMPONENTE
const renderNavBar = () => {
  return render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  )
}

// 📋 SUITE DE TESTS PRINCIPAL
describe('NavBar Component', () => {
  
  // ✅ TEST 1: Verificar que el componente se renderiza correctamente
  it('should render the navbar with all navigation links', () => {
    renderNavBar()
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Galería')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  // ✅ TEST 2: Verificar que la imagen del logo se renderiza con los atributos correctos
  it('should render the butterfly logo image with correct attributes', () => {
    renderNavBar()
    
    const logoImage = screen.getByAltText('ala mariposa')
    
    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveClass('ala-mariposa')
    expect(logoImage).toHaveAttribute('src', 'mocked-logo-image.png')
  })

  // ✅ TEST 3: Verificar que el botón hamburguesa existe
  it('should render the hamburger menu button', () => {
    renderNavBar()
    
    const hamburgerButton = screen.getByText('☰')
    
    expect(hamburgerButton).toBeInTheDocument()
    expect(hamburgerButton.tagName).toBe('BUTTON')
    expect(hamburgerButton).toHaveClass('hamburger')
  })

  // ✅ TEST 4: Verificar funcionalidad del menú hamburguesa (toggle)
  it('should toggle menu when hamburger button is clicked', () => {
    renderNavBar()
    
    const hamburgerButton = screen.getByText('☰')
    const menuContainer = screen.getByRole('navigation').querySelector('.galeria-buttons-group')
    
    expect(menuContainer).not.toHaveClass('open')
    
    fireEvent.click(hamburgerButton)
    expect(menuContainer).toHaveClass('open')
    
    fireEvent.click(hamburgerButton)
    expect(menuContainer).not.toHaveClass('open')
  })

  // ✅ TEST 5: Verificar que los enlaces tienen las rutas correctas
  it('should have correct navigation links with proper routes', () => {
    renderNavBar()
    
    const homeLink = screen.getByText('Home').closest('a')
    const galleryLink = screen.getByText('Galería').closest('a')
    const contactLink = screen.getByText('Contacto').closest('a')
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(galleryLink).toHaveAttribute('href', '/butterflygallery')
    expect(contactLink).toHaveAttribute('href', '/contactbutterfly')
  })

  // ✅ TEST 6: Verificar que los enlaces tienen las clases CSS correctas
  it('should have correct CSS classes on navigation elements', () => {
    renderNavBar()
    
    const navContainer = screen.getByRole('navigation')
    expect(navContainer).toHaveClass('nav-container')
    
    const homeLink = screen.getByText('Home')
    const galleryLink = screen.getByText('Galería')
    const contactLink = screen.getByText('Contacto')
    
    expect(homeLink).toHaveClass('galeria-button')
    expect(galleryLink).toHaveClass('galeria-button')
    expect(contactLink).toHaveClass('galeria-button')
  })

  // ✅ TEST 7: Verificar que existe la línea decorativa
  it('should render the decorative navbar line', () => {
    renderNavBar()
    
    const navbarLine = screen.getByRole('navigation').querySelector('.navbar-line')
    
    expect(navbarLine).toBeInTheDocument()
    expect(navbarLine).toHaveClass('navbar-line')
  })

  // ✅ TEST 8: Verificar comportamiento del menú múltiples clics
  it('should handle multiple rapid clicks on hamburger button', () => {
    renderNavBar()
    
    const hamburgerButton = screen.getByText('☰')
    const menuContainer = screen.getByRole('navigation').querySelector('.galeria-buttons-group')
    
    expect(menuContainer).not.toHaveClass('open')
    
    fireEvent.click(hamburgerButton)
    expect(menuContainer).toHaveClass('open')
    
    fireEvent.click(hamburgerButton)
    expect(menuContainer).not.toHaveClass('open')
    
    fireEvent.click(hamburgerButton)
    expect(menuContainer).toHaveClass('open')
    
    fireEvent.click(hamburgerButton)
    expect(menuContainer).not.toHaveClass('open')
  })

  // ✅ TEST 9: Verificar estructura del DOM
  it('should have correct DOM structure', () => {
    renderNavBar()
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    
    const extraButtons = nav.querySelector('.galeria-extra-buttons')
    const buttonsGroup = nav.querySelector('.galeria-buttons-group')
    const navbarLine = nav.querySelector('.navbar-line')
    
    expect(extraButtons).toBeInTheDocument()
    expect(buttonsGroup).toBeInTheDocument()
    expect(navbarLine).toBeInTheDocument()
  })

  // ✅ TEST 10: Test de accesibilidad básica
  it('should be accessible', () => {
    renderNavBar()
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    
    const image = screen.getByAltText('ala mariposa')
    expect(image).toBeInTheDocument()
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
  })
})