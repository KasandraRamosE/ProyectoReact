import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
} from '@mui/material'

import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone'
import { useEffect } from 'react'
import axios from 'axios'

const RecetasPage = () => {
  useEffect(() => {
    // fetch('https://dummyjson.com/recipes')
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))

    axios.get('https://dummyjson.com/recipes').then((data) => console.log(data))
  }, [])

  return (
    <>
      <AddShoppingCartTwoToneIcon />
      <Avatar variant="square" sx={{ bgcolor: 'red' }}>
        N
      </Avatar>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRK-UnPiDJW7pKWtVjZFN0HoNjCacDPTb8U4bViIlLQYhcJ0kcwwSR67SigqWYh5gwB8uHbwViCjYQoVQMfjuKzqQ"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default RecetasPage
