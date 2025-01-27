import MainLayout from '@/common/components/layouts/MainLayout'
import RoundedButton from '@/common/components/ui/buttons/RoundedButton'
import { useCartContext } from '@/modules/cart/context/CartProvider'
import { ProductType } from '@/modules/products/types/productTypes'
import Price from '@/modules/products/ui/Price'
import apiProductos from '@/services/resources/products'
import {
  Box,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Rating,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const DetailProductPage = () => {
  const { addProduct } = useCartContext()

  const router = useRouter()

  const [product, setProduct] = useState<ProductType | null>(null)

  const [activeImage, setActiveImage] = useState('')

  const [quantity, setQuantity] = useState(1)

  const idProduct = router.query.idProduct as string

  useEffect(() => {
    if (idProduct) {
      apiProductos.getById(idProduct).then((product) => {
        setProduct(product)
        setActiveImage(product.images?.[0])
      })
    }
  }, [idProduct])

  return (
    <MainLayout title="Detail product">
      {product && (
        <Grid container sx={{ mt: 4 }}>
          <Grid size={1}>
            <Stack spacing={1}>
              {product.images.map((image, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{
                    width: 50,
                    height: 50,
                    borderWidth: 2,
                    borderColor:
                      activeImage === image ? 'primary.main' : 'auto',
                    '&:hover': {
                      cursor: 'pointer',
                      borderColor: 'primary.main',
                    },
                  }}
                  onMouseEnter={() => setActiveImage(image)}
                >
                  <Image src={image} width={50} height={50} alt={'image'} />
                </Card>
              ))}
            </Stack>
          </Grid>
          <Grid size={4} position={'relative'}>
            <Image
              src={activeImage}
              fill
              alt={'image'}
              style={{
                objectFit: 'cover',
              }}
            />
          </Grid>
          <Grid size={5}>
            <CardContent sx={{ pt: 0 }}>
              <Box mb={1}>
                <Typography variant="h5" component="div">
                  {product.title} - {product.description}
                </Typography>
                <Box display={'flex'} gap={1}>
                  <Typography
                    variant="caption"
                    display={'block'}
                    color="primary"
                  >
                    {product.rating}
                  </Typography>
                  <Rating
                    name="half-rating-read"
                    defaultValue={product.rating}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                  <Typography
                    variant="caption"
                    display={'block'}
                    color="primary"
                  >
                    {product.reviews.length} ratings
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
              </Box>
              <Divider />
              <Box mt={2} mb={1}>
                <Price price={product.price} />
                <Typography variant="caption" display={'block'}>
                  {product.warrantyInformation}
                </Typography>
                <Grid container mt={2}>
                  <ProductProperty
                    atribute={'Height'}
                    value={product.dimensions.height}
                  />
                  <ProductProperty
                    atribute={'Width'}
                    value={product.dimensions.width}
                  />
                  <ProductProperty
                    atribute={'Depth'}
                    value={product.dimensions.depth}
                  />
                </Grid>
              </Box>
              <Divider />
              <Box mt={2} mb={1}>
                <Typography variant="subtitle1" fontWeight={'bold'}>
                  About this item
                </Typography>
                <Box component={'ul'}>
                  {product.reviews.map((review, index) => (
                    <Typography key={index} component={'li'} variant="body2">
                      {review.comment}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Grid>
          <Grid size={2}>
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={1}>
                  <Price price={product.price} />
                  <Typography variant="body2" color="text.secondary">
                    {product.returnPolicy}
                  </Typography>
                  <Typography color={'success'} fontWeight={'bold'}>
                    {product.availabilityStatus}
                  </Typography>
                  <Select
                    id="quantity"
                    value={quantity}
                    fullWidth
                    size="small"
                    startAdornment={
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        Quantity:
                      </Typography>
                    }
                    sx={{ height: '32px' }}
                    onChange={(e) => setQuantity(e.target.value as number)}
                  >
                    {Array.from({ length: 100 }, (_, index) => (
                      <MenuItem key={index} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                  <RoundedButton
                    fullWidth
                    color="secondary"
                    onClick={() => {
                      const cartProduct = {
                        id: product.id,
                        image: product.thumbnail,
                        title: `${product.title} - ${product.description}`,
                        price: product.price,
                        quantity,
                      }
                      addProduct(cartProduct)
                    }}
                  >
                    Add to cart
                  </RoundedButton>
                  <RoundedButton fullWidth color="primary">
                    Buy Now
                  </RoundedButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </MainLayout>
  )
}

export default DetailProductPage

const ProductProperty = ({
  atribute,
  value,
}: {
  atribute: string
  value: number
}) => {
  return (
    <>
      <Grid size={4}>
        <Typography variant="body2" fontWeight={'bold'}>
          {atribute}
        </Typography>
      </Grid>
      <Grid size={8}>
        <Typography variant="body2">{value}</Typography>
      </Grid>
    </>
  )
}
