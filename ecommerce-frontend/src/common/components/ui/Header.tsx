import { useCartContext } from '@/modules/cart/context/CartProvider'
import { useProductsContext } from '@/modules/products/context/ProductsProvider'
import { AppBar, Box, Toolbar } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logoAmazon from '../../../assets/amazon-logo.png'
import CartIcon from './icons/CartIcon'
import SearchBar from './search/SearchBar'

const Header = () => {
  const { updateSearchValue } = useProductsContext()
  const { totalItems } = useCartContext()
  const router = useRouter()
  return (
    <Box sx={{ flexGrow: 1, position: 'sticky', top: 0, zIndex: 2 }}>
      <AppBar position="static" sx={{ bgcolor: '#131921' }}>
        <Toolbar>
          <Box
            display={'flex'}
            width={'100%'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Image
              src={logoAmazon}
              alt={'logo amazon'}
              width={100}
              style={{ marginTop: '16px' }}
            />
            <SearchBar
              onSearch={(value) => {
                if (router.pathname !== '/productos') {
                  router.push('/productos')
                }
                updateSearchValue(value)
              }}
            />
            <CartIcon quantity={totalItems} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
