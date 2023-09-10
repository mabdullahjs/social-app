import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';

const MACard = ({ title, description , deletePost, editPost }) => {
  return (
    <>
      <div style={{ backgroundColor: '#0559ac' }} className="container w-50 text-white p-5 rounded shadow-lg mt-5 mb-5">
        <h2>Title: <span className='h4'>{title}</span></h2>
        <h2>Description: <span className='h5'>{description}</span></h2>
        <Box className='mt-5'>
          <DeleteIcon sx={{cursor:'pointer'}} onClick={deletePost}/>
          <EditIcon sx={{marginLeft:'40px' , cursor:'pointer'}} onClick={editPost}/>
        </Box>
      </div>
    </>
  )
}

export default MACard