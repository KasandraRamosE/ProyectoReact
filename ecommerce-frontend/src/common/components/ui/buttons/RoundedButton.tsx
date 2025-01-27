import { Button, ButtonProps } from '@mui/material'
import { ReactNode } from 'react'

interface RoundedButton extends ButtonProps {
  children: ReactNode
}

const RoundedButton = ({ children, sx, ...rest }: RoundedButton) => {
  return (
    <Button
      variant="contained"
      size="small"
      sx={{
        borderRadius: 4,
        px: 2,
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}

export default RoundedButton
