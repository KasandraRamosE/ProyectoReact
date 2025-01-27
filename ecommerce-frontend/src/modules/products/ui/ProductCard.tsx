import RoundedButton from '@/common/components/ui/buttons/RoundedButton'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material'
import { ProductType } from '../types/productTypes'
import Price from './Price'

interface ProductCardProps {
  product: ProductType
  onClick: VoidFunction
  onAdd: VoidFunction
}

const ProductCard = ({ product, onClick, onAdd }: ProductCardProps) => {
  const isLowStock = product.stock < 3
  return (
    <Card variant="outlined" sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        alt={product.title}
        sx={{
          width: '240px',
          backgroundColor: '#f7f7f7',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        image={product.thumbnail}
        onClick={onClick}
      />
      <Box>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{
              '&:hover': {
                cursor: 'pointer',
                color: 'primary.main',
              },
            }}
            onClick={onClick}
          >
            {product.title}
          </Typography>
          <Box display={'flex'} gap={1}>
            <Rating
              name="half-rating-read"
              defaultValue={product.rating}
              precision={0.5}
              size="small"
              readOnly
            />
            <Typography variant="caption" display={'block'} color="primary">
              {product.reviews.length}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            display={'block'}
          >
            {product.shippingInformation}
          </Typography>
          <Typography variant="caption" color="primary" display={'block'}>
            {product.brand}
          </Typography>
          <Price price={product.price} />
          <Typography variant="caption" display={'block'}>
            {product.warrantyInformation}
          </Typography>
          {isLowStock && (
            <Typography
              color="error"
              fontWeight="bold"
              variant="caption"
              display={'block'}
            >
              Only {product.stock} in stock - buy soon
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <RoundedButton color="secondary" onClick={onAdd}>
            Add to cart
          </RoundedButton>
        </CardActions>
      </Box>
    </Card>
  )
}

export default ProductCard
