import { Box, Typography } from '@mui/material'
import React from 'react'

interface PriceProps {
  currency?: string
  price: number
}

const Price = ({ price, currency = '$' }: PriceProps) => {
  const [mainPrice, decimalPrice] = String(price.toFixed(2)).split('.')

  return (
    <Box display={'flex'} alignItems={'flex-start'}>
      <Typography variant="caption" display={'block'} mt={0.4}>
        {currency}
      </Typography>
      <Typography variant="h5" display={'block'}>
        {mainPrice}
      </Typography>
      <Typography variant="caption" display={'block'} mt={0.4}>
        {decimalPrice}
      </Typography>
    </Box>
  )
}

export default Price
