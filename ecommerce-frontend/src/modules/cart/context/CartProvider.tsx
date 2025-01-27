import { createContext, ReactNode, useContext, useState } from 'react'
import { CartProductType } from '../types/cartTypes'

interface ProductContextType {
  cartProducts: CartProductType[]
  totalItems: number
  totalCost: string
  addProduct: (product: CartProductType) => void
  deleteProduct: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
}

const ProductsContext = createContext<ProductContextType | null>(null)

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([])

  const totalItems = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0
  )

  const totalCost = cartProducts.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  )

  const addProduct = (product: CartProductType) => {
    setCartProducts(() => {
      const existProduct = cartProducts.some((p) => p.id === product.id)
      if (existProduct) {
        return cartProducts.map((p) => {
          if (p.id === product.id) {
            return {
              ...p,
              quantity: p.quantity + product.quantity,
            }
          } else {
            return p
          }
        })
      } else {
        return [product, ...cartProducts]
      }
    })
  }

  const deleteProduct = (idProduct: number) => {
    setCartProducts((cartProducts) =>
      cartProducts.filter((p) => p.id !== idProduct)
    )
  }

  const updateQuantity = (idProducto: number, quantity: number) => {
    setCartProducts((cartProducts) =>
      cartProducts.map((p) => {
        if (p.id === idProducto) {
          return {
            ...p,
            quantity,
          }
        } else {
          return p
        }
      })
    )
  }

  const value: ProductContextType = {
    cartProducts,
    totalItems,
    totalCost: totalCost.toFixed(2),
    addProduct,
    deleteProduct,
    updateQuantity,
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

export default CartProvider

export const useCartContext = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useCartContext should be called into CartProvider')
  }
  return context
}
