import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, InputAdornment, Typography, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MAButton from '../config/components/MAButton';
import MAInput from '../config/components/MAInput';
import MACard from '../config/components/MACard';
import MAModal from '../config/components/MAModal';
import baseurl from '../config/apimethod/Apimethod';

const Home = () => {
  const [title, setTitle] = useState('');
  const [updatetitle, setUpdateTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updatedescription, setUpdateDescription] = useState('');
  const [search, setSearch] = useState('');
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [uid, setuid] = useState('');
  const [index, setIndex] = useState(0);


  useEffect(() => {
    setLoading(true);

    const getPosts = async () => {
      try {
        const response = await axios.get(`${baseurl}/posts`);
        setPost(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log('error===>', error);
        setLoading(false);
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
      const response = await axios.post(`${baseurl}/post`, {
        title,
        description,
      });
      setPost([{ id: response.data.id, metadata: { body: description, title: title } }, ...post]);
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
      const response = await axios.get(`${baseurl}/singlepost/${search}`);

      setLoading(false)
      setPost(response.data);
      setSearch('');
    } catch (error) {
      setLoading(false)
      console.log('error===>', error);
    }
  };

  const openDeleteModal = (id, index) => {
    setDeleteModal(true);
    setIndex(index);
    setuid(id);
    console.log(id);
  }

  const openEditModal = (id, index) => {
    setEditModal(true);
    setIndex(index);
    setuid(id);
    setUpdateDescription(post[index].metadata.body);
    setUpdateTitle(post[index].metadata.title);
    console.log('postid==>', id);
    console.log('postindex==>', index);
  }

  const deletePost = async (id) => {
    try {
      await axios.delete(`${baseurl}/deletepost/${id}`);
      post.splice(index, 1);
      setDeleteModal(false);
    } catch (error) {
      console.log('error===>', error);
    }
  }

  const editPost = async (id) => {

    console.log('updateid==>', id);
    setUpdateDescription('');
    setUpdateTitle('');
    setEditModal(false);
    try {
      const updatedArray = [...post];
      updatedArray[index].metadata = {
        body: updatedescription,
        title: updatetitle
      };
      await axios.put(`${baseurl}/updatepost/${id}`, {
        title: updatetitle,
        description: updatedescription
      });
      setPost(updatedArray);
      setDeleteModal(false);
    } catch (error) {
      console.log('error===>', error);
    }
  }

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
            <MACard title={item.metadata?.title} description={item.metadata?.body} deletePost={() => openDeleteModal(item.id, index)} editPost={() => openEditModal(item.id, index)} />
          </div>
        })
      ) : (
        <h5 className='text-center mt-5'>{loading ? 'Loading...' : 'No data Found.'}</h5>
      )}

      <MAModal
        width="400px"
        open={deleteModal}
        close={() => setDeleteModal(false)}
        modalTitle="Delete Post"
        innerContent={<Box>
          <Typography>Are you sure you want to delete Post?</Typography>
          <MAButton onClick={() => deletePost(uid)} className="m-2" color="error" label="Yes" />
          <MAButton onClick={() => setDeleteModal(false)} label="No" />
        </Box>}
      />
      <MAModal
        width="400px"
        open={editModal}
        close={() => setEditModal(false)}
        modalTitle="Edit Post"
        innerContent={<Box>
          <form onSubmit={(e) => {
            e.preventDefault();
            editPost(uid);
          }}>
            <MAInput value={updatetitle} onChange={(e) => setUpdateTitle(e.target.value)} label="Title" variant="filled" /> <br /><br />
            <MAInput value={updatedescription} onChange={(e) => setUpdateDescription(e.target.value)} label="description" variant="filled" /> <br /><br />
            <MAButton type='submit' onClick={() => editPost(uid)} label="Update" className='m-1' color='error' />
            <MAButton onClick={() => setEditModal(false)} label="No" className='m-1' />
          </form>
        </Box>}
      />
    </>
  );
};

export default Home;
