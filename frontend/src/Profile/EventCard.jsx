import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'

const EventCard = () => {
  return (
    <div>
      <Card sx={{width:340}}>
        <CardMedia sx={{height:345}}
        image='https://cdn.pixabay.com/photo/2014/12/22/12/30/sweets-577228_640.jpg' />

        <CardContent>
          <Typography variant='h5'>
            Indian Fast Food
          </Typography>
          <Typography variant='body2'>
            50% off on your first order
          </Typography>
          <div className='py-2 space-y-2'>
            <p>{'Kolkata'}</p>
            <p className='text-sm text-blue-500'>Januaray 14, 2024 12:00 AM </p>
            <p className='text-sm text-red-500'>Januaray 15, 2024 12:00 AM </p>
          </div>
        </CardContent>

       {false && <CardActions>
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </CardActions>}
      </Card>
    </div>
  )
}

export default EventCard