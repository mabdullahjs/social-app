import express from "express";
import cors from 'cors';
import path from 'path';
import { customAlphabet } from 'nanoid';
import dotenv from "dotenv";
import {createPost, deletePost, editPost, getAllPost, getSinglePost} from "./controller/post.mjs";

//nano id 
const nanoid = customAlphabet('1234567890', 20)

//directory name
const __dirname = path.resolve();

//dot env config
dotenv.config();



const app = express();
app.use(express.json());
app.use(cors());


app.post('/api/v1/post', createPost)

app.get('/api/v1/posts' , getAllPost);

app.get('/api/v1/singlepost/:search' , getSinglePost);

app.put('/api/v1/updatepost/:id' , editPost);

app.delete('/api/v1/deletepost/:id' , deletePost);



//show static page on / request
app.get(express.static(path.join(__dirname, "./web/build")));
app.use("/", express.static(path.join(__dirname, "./web/build")));
app.use('/static', express.static(path.join(__dirname, 'static')))




const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});