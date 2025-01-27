import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Box, IconButton, MenuItem, Select, Typography } from '@mui/material'
import Image from 'next/image'
import { CartProductType } from '../types/cartTypes'

interface CartProductProps {
  cartProduct: CartProductType
  onDelete: VoidFunction
  onUpdateQuantity: (quantity: number) => void
}

const CartProduct = ({
  cartProduct,
  onUpdateQuantity,
  onDelete,
}: CartProductProps) => {
  return (
    <Box textAlign={'center'}>
      <Image
        src={cartProduct.image}
        alt={cartProduct.title}
        width={120}
        height={120}
      />
      <Typography fontWeight={'bold'}>${cartProduct.price}</Typography>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        m={2}
      >
        <Select
          id="quantity"
          value={cartProduct.quantity}
          size="small"
          sx={{ height: '32px' }}
          onChange={(e) => onUpdateQuantity(e.target.value as number)}
        >
          {Array.from({ length: 100 }, (_, index) => (
            <MenuItem key={index} value={index + 1}>
              {index + 1}
            </MenuItem>
          ))}
        </Select>
        <IconButton onClick={onDelete}>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default CartProduct
