import MainLayout from '@/common/components/layouts/MainLayout'
import { useCartContext } from '@/modules/cart/context/CartProvider'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Box, Typography, Pagination, LinearProgress } from '@mui/material'
import ProductCard from '@/modules/products/ui/ProductCard'
import { ProductType } from '@/modules/products/types/productTypes'
import apiProductos from '@/services/resources/products'

const DEFAULT_LIMIT = 8 // Cantidad de productos por página

const CategoryPage = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { addProduct } = useCartContext()
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    const fetchProducts = async () => {
      if (!slug) return
      setLoading(true)
      try {
        const response = await apiProductos.getAll({
          limit: DEFAULT_LIMIT,
          skip: (page - 1) * DEFAULT_LIMIT,
        })
        const filteredProducts = response.products.filter(
          (product: ProductType) => product.category.toLowerCase() === slug
        )
        setProducts(filteredProducts)
        setTotalPages(Math.ceil(filteredProducts.length / DEFAULT_LIMIT))
      } catch (error) {
        console.error('Error al cargar los productos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [slug, page])

  const handleAddToCart = (product: ProductType) => {
    const cartProduct = {
      id: product.id,
      image: product.thumbnail,
      title: product.title,
      price: product.price,
      quantity: 1,
    }
    addProduct(cartProduct)
  }

  const handleProductClick = (idProducto: number) => {
    router.push(`/productos/${idProducto}`)
  }

  return (
    <MainLayout title={slug ? slug.toString().toUpperCase() : 'Categoría'}>
      <Box sx={{ pt: 3, pb: 1, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={'bold'} gutterBottom>
          {slug?.toString().toUpperCase()}
        </Typography>
        <Typography variant="body1" color={'text.secondary'}>
          Explora todos los productos disponibles en esta categoría.
        </Typography>
      </Box>
      {loading ? (
        <LinearProgress />
      ) : (
        <Box sx={{ mt: 3 }}>
          {products.map((product) => (
            <Box
              key={product.id}
              sx={{
                mb: 2, // Espaciado entre productos
                borderBottom: '1px solid #e0e0e0',
                pb: 2, // Espaciado debajo del borde
              }}
            >
              <ProductCard
                product={product}
                onClick={() => handleProductClick(product.id)}
                onAdd={() => handleAddToCart(product)}
              />
            </Box>
          ))}
        </Box>
      )}
      <Box display={'flex'} justifyContent={'center'} py={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </MainLayout>
  )
}

export default CategoryPage
