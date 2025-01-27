import MainLayout from '@/common/components/layouts/MainLayout'
import { useCartContext } from '@/modules/cart/context/CartProvider'
import CartProductDetail from '@/modules/cart/ui/CartProductDetail'
import {
  Box,
  Divider,
  Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'

const CartPage = () => {
  const { cartProducts, deleteProduct, updateQuantity } = useCartContext()

  const router = useRouter()

  return (
    <MainLayout title="Cart">
      <Grid container mt={4}>
        <Grid size={10}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'flex-end'}
            >
              <Typography variant="h4" fontWeight={'medium'}>
                Shopping Cart
              </Typography>
              <Typography color="text.secondary">Price</Typography>
            </Box>
            <Divider />
            <Stack divider={<Divider />}>
              {cartProducts.map((product) => (
                <CartProductDetail
                  key={product.id}
                  product={product}
                  onClick={() => router.push(`/productos/${product.id}`)}
                  onDelete={() => deleteProduct(product.id)}
                  onUpdateQuantity={(quantity) =>
                    updateQuantity(product.id, quantity)
                  }
                />
              ))}
            </Stack>
          </Paper>
        </Grid>
        <Grid size={2}>Accciones</Grid>
      </Grid>
    </MainLayout>
  )
}

export default CartPage
