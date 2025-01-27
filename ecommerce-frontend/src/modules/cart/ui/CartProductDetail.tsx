import {
  Box,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { CartProductType } from '../types/cartTypes'
import QuantityUpdater from './QuantityUpdater'

interface CartProductDetailProps {
  product: CartProductType
  onClick: VoidFunction
  onUpdateQuantity: (quantity: number) => void
  onDelete: VoidFunction
}

const CartProductDetail = ({
  product,
  onClick,
  onUpdateQuantity,
  onDelete,
}: CartProductDetailProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        alt={product.title}
        image={product.image}
        sx={{
          width: '240px',
          cursor: 'pointer',
        }}
        onClick={onClick}
      />
      <CardContent sx={{ width: '100%' }}>
        <Box display={'flex'} justifyContent={'space-between'} gap={2}>
          <Typography
            variant="h6"
            onClick={onClick}
            sx={{
              '&:hover': {
                color: 'primary.main',
                cursor: 'pointer',
              },
            }}
          >
            {product.title}
          </Typography>
          <Typography variant="h6" fontWeight={'bold'}>
            ${product.price}
          </Typography>
        </Box>
        <Box height={32} />
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <QuantityUpdater
            value={product.quantity}
            onChange={onUpdateQuantity}
            onDelete={onDelete}
          />
          <Typography
            variant="caption"
            onClick={onDelete}
            sx={{
              color: 'primary.main',
              '&:hover': {
                cursor: 'pointer',
                textDecoration: 'underline',
              },
            }}
          >
            Delete
          </Typography>
        </Stack>
      </CardContent>
    </Box>
  )
}

export default CartProductDetail
