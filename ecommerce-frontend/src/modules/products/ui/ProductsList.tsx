import { LinearProgress, Stack } from '@mui/material'
import { ProductType } from '../types/productTypes'
import ProductCard from './ProductCard'

interface ProductsListProps {
  loading: boolean
  products: ProductType[]
  onClickItem: (idProducto: number) => void
  onAddProduct: (product: ProductType) => void
}

const ProductsList = ({
  products,
  loading,
  onClickItem,
  onAddProduct,
}: ProductsListProps) => {
  return (
    <Stack direction={'column'} spacing={1}>
      {loading && <LinearProgress />}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onClickItem(product.id)}
          onAdd={() => onAddProduct(product)}
        />
      ))}
    </Stack>
  )
}

export default ProductsList
