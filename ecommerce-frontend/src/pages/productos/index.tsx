import MainLayout from '@/common/components/layouts/MainLayout'
import { useCartContext } from '@/modules/cart/context/CartProvider'
import { useProductsContext } from '@/modules/products/context/ProductsProvider'
import ProductsList from '@/modules/products/ui/ProductsList'
import { Box, Pagination, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const ProductosPage = () => {
  const { loading, products, totalPages, updatePage } = useProductsContext()
  const { addProduct } = useCartContext()

  const router = useRouter()
  return (
    <MainLayout title="Productos">
      <Box sx={{ pt: 3, pb: 1 }}>
        <Typography variant="h6" fontWeight={'bold'}>
          Results
        </Typography>
        <Typography variant="body2" color={'text.secondary'}>
          Check each product page for other buying options.
        </Typography>
      </Box>
      <ProductsList
        loading={loading}
        products={products}
        onClickItem={(idProducto) => router.push(`/productos/${idProducto}`)}
        onAddProduct={(product) => {
          const cartProduct = {
            id: product.id,
            image: product.thumbnail,
            title: `${product.title} - ${product.description}`,
            price: product.price,
            quantity: 1,
          }
          addProduct(cartProduct)
        }}
      />
      <Box display={'flex'} justifyContent={'center'} py={4}>
        <Pagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          onChange={(_, page) => {
            updatePage(page)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      </Box>
    </MainLayout>
  )
}

export default ProductosPage
