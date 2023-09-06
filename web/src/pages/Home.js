import React, { useEffect, useState } from 'react'
import MAButton from '../config/components/MAButton'
import MAInput from '../config/components/MAInput'
import axios from 'axios'
import baseurl from '../config/apimethod/Apimethod'
import MACard from '../config/components/MACard'

const Home = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)


  useEffect(()=>{
    axios.get(`${baseurl}/posts` )
    .then((res)=>{
      console.log('res==>' , res.data);
      setPost(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  } , [])

  //post function
  const postData = async (e)=>{
    setLoading(true)
    e.preventDefault();
    console.log(title);
    console.log(description);
    await axios.post(`${baseurl}/post` , {
      title , description
    })
    .then((res)=>{
      console.log(res.data);
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false)
    })
    setTitle('')
    setDescription('')
  }
  return (
    <>
    <h1 className='text-center mt-3'>Social App</h1>
    <form onSubmit={postData} className='d-flex justify-content-center flex-column gap-4 w-25 mx-auto mt-5'>
    <MAInput value={title} onChange={(e)=>setTitle(e.target.value)} label='Title'/>
    <MAInput value={description} onChange={(e)=>setDescription(e.target.value)} label='Description'/>
    <MAButton type='submit' label='Post' loading={loading}/>
    </form>
    {post && post.length > 0 ? post.map((item , index)=>{
      return <div key={index}> 
        <MACard title={item.metadata.title} description={item.metadata.body}/>
      </div>
    }):post ? <h5 className='text-center mt-5'>No data Found...</h5> : <h5 className='text-center mt-5'>Loading...</h5> }
    </>
  )
}

export default Home