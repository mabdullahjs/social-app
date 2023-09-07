import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MAButton from '../config/components/MAButton';
import MAInput from '../config/components/MAInput';
import MACard from '../config/components/MACard';
import baseurl from '../config/apimethod/Apimethod';

const Home = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    setLoading(true)

    const getPosts = async () => {
      try {
        const response = await axios.get(`${baseurl}/posts`);
        setPost(response.data);
        setLoading(false)
      } catch (error) {
        console.log('error===>', error);
        setLoading(false)
      }
    };

    getPosts();
  }, []);

  const clearInputs = () => {
    setTitle('');
    setDescription('');
  };

  const postData = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      await axios.post(`${baseurl}/post`, {
        title,
        description,
      });

      setPost([{ metadata: { body: description, title: title } }, ...post]);
      setBtnLoading(false);
      clearInputs();
    } catch (error) {
      console.log('error===>', error);
      setBtnLoading(false);
    }
  };

  const searchPost = async (e) => {
    e.preventDefault();
    setPost([]);
    setLoading(true)
    try {
      const response = await axios.post(`${baseurl}/singlepost`, {
        search,
      });

      setLoading(false)
      setPost(response.data);
      setSearch('');
    } catch (error) {
      setLoading(false)
      console.log('error===>', error);
    }
  };

  return (
    <>
      <h1 className='text-center mt-3'>Social App</h1>
      <form onSubmit={postData} className='d-flex justify-content-center flex-column gap-4 w-25 mx-auto mt-5'>
        <MAInput value={title} onChange={(e) => setTitle(e.target.value)} label='Title' />
        <MAInput value={description} onChange={(e) => setDescription(e.target.value)} label='Description' />
        <MAButton type='submit' label='Post' loading={btnLoading} />
      </form>

      <div className='col-md-6 mx-auto mt-5'>
        <form onSubmit={searchPost}>
          <TextField
            fullWidth
            variant='outlined'
            label='Search'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      {post.length > 0 ? (
        post.map((item, index) => {
          return <div key={index}>
            <MACard title={item.metadata?.title} description={item.metadata?.body} />
          </div>
        })
      ) : (
        <h5 className='text-center mt-5'>{loading ? 'Loading...' : 'No data Found...'}</h5>
      )}
    </>
  );
};

export default Home;
