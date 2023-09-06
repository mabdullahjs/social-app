import React, { useEffect, useState } from 'react'
import MAButton from '../config/components/MAButton'
import MAInput from '../config/components/MAInput'
import axios from 'axios'
import baseurl from '../config/apimethod/Apimethod'

const Home = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(()=>{
    axios.get(`${baseurl}/posts` )
    .then((res)=>{
      console.log('res==>' , res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  } , [])

  //post function
  const postData = (e)=>{
    e.preventDefault();
    console.log(title);
    console.log(description);
    setTitle('')
    setDescription('')
  }
  return (
    <>
    <h1 className='text-center mt-3'>Social App</h1>
    <form onSubmit={postData} className='d-flex justify-content-center flex-column gap-4 w-25 mx-auto mt-5'>
    <MAInput value={title} onChange={(e)=>setTitle(e.target.value)} label='Title'/>
    <MAInput value={description} onChange={(e)=>setDescription(e.target.value)} label='Description'/>
    <MAButton type='submit' label='Post' loading={false}/>
    </form>
    </>
  )
}

export default Home