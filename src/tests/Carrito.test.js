import { describe, it, expect } from 'vitest'               
import { validateCarrito } from '../utils/validacionCarrito'

describe('validateCarrito - límite $500.000 (total con IVA 19%)', () => {
  it('marca error cuando el TOTAL supera $500.000', () => {
    // subtotal 424.800 -> IVA 80.712 -> total 505.512 (>500mil)                  
    const carrito = [
      { precio: 14990, cantidad: 20 },   // 299.800                             
      { precio: 12500, cantidad: 10 },   // 125.000                             
    ]
    const res = validateCarrito(carrito)                                        
    expect(res.total).toBeDefined()                                             
  })

  it('no marca error cuando el TOTAL está bajo el límite', () => {
    // subtotal 420.000 -> total 499.800 (válido)                               
    const carrito = [
      { precio: 20000, cantidad: 10 }, // 200.000                             
      { precio: 11000, cantidad: 10 }, // 110.000                             
      { precio:  5500, cantidad: 20 }, // 110.000
                                    // subtotal 420.000         
    ]
    const res = validateCarrito(carrito)                                        
    expect(res.total).toBeUndefined()                                           
  })

  it('carrito vacío o con valores 0 no rompe ni da error', () => {
    const carrito = [
      { precio: 0, cantidad: 0 },                                   
    ]
    const resVacio = validateCarrito([])                                        
    const resCeros = validateCarrito(carrito)                                   
    expect(resVacio.total).toBeUndefined()                                      
    expect(resCeros.total).toBeUndefined()                                      
  })
})