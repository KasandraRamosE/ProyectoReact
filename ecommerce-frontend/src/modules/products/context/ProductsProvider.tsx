import apiProductos from '@/services/resources/products'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ProductType } from '../types/productTypes'

const DEFAULT_LIMIT = 10

const getSkip = (page: number) => {
  return (page - 1) * DEFAULT_LIMIT
}

const getTotalPage = (totalItems: number) => {
  return Math.ceil(totalItems / DEFAULT_LIMIT)
}

interface ProductContextType {
  loading: boolean
  products: ProductType[]
  page: number
  totalPages: number
  updatePage: (page: number) => void
  updateSearchValue: (value: string) => void
}

const ProductsContext = createContext<ProductContextType | null>(null)

const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProduct] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const [searchValue, setSearchValue] = useState('')

  const updatePage = (page: number) => {
    setPage(page)
  }

  const updateSearchValue = (value: string) => {
    setPage(1)
    setSearchValue(value)
  }

  useEffect(() => {
    setLoading(true)
    apiProductos
      .getAll({
        limit: DEFAULT_LIMIT,
        skip: getSkip(page),
        q: searchValue,
      })
      .then((response) => {
        setProduct(response.products)
        setTotalItems(response.total)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page, searchValue])

  const value: ProductContextType = {
    loading,
    products,
    page,
    totalPages: getTotalPage(totalItems),
    updatePage,
    updateSearchValue,
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider

export const useProductsContext = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProductsContext should be called into ProductsProvider')
  }
  return context
}
