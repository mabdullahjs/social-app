import { customAlphabet } from 'nanoid';
import OpenAI from 'openai';
import { PineconeClient } from "@pinecone-database/pinecone";
import dotenv from "dotenv";



//nano id 
const nanoid = customAlphabet('1234567890', 20);

//dot env config
dotenv.config();

//openai
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

//pinecone config
const pinecone = new PineconeClient();
await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT,
    apiKey: process.env.PINECONE_API_KEY,
});



//create post function
const createPost = async (req, res) => {
    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: `${req.body?.title} ${req.body?.description}`,
    })
    const vector = response?.data[0]?.embedding;
    // console.log("vector==>" , vector);

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
    // console.log(index)
    const id = nanoid()
    const upsertRequest = {
        vectors: [
            {
                id: id,
                values: vector,
                metadata: {
                    title: req.body?.title,
                    body: req.body?.description,
                }
            }
        ],
        namespace: process.env.PINECONE_NAME_SPACE,
    };

    try {
        const upsertResponse = await index.upsert({ upsertRequest });
        // console.log('upsertResponse===>', upsertResponse);
        res.send({ message: 'post has been created' , id:id })
    } catch (error) {
        console.log('error==>', error);
        res.send({ message: 'error occured' })
    }
}


//get all post function
const getAllPost = async (req, res) => {

    const queryText = '';
    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: queryText,
    });
    const vector = response?.data[0]?.embedding;

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
    try {
        const queryResponse = await index.query({
            queryRequest: {
                vector: vector,
                // id: "vec1",
                topK: 100,
                includeValues: true,
                includeMetadata: true,
                namespace: process.env.PINECONE_NAME_SPACE
            }
        });

        queryResponse.matches.map((item) => {
            // console.log(`score ${item.score.toFixed(1)} => ${JSON.stringify(item.metadata)}\n\n`);
        })
        // console.log(`${queryResponse.matches.length} records found `);
        res.send(queryResponse.matches)
    } catch (error) {
        console.log(error)
    }

}

//get single post function
const getSinglePost = async (req, res) => {

    const queryText = req.params.search;
    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: queryText,
    });
    const vector = response?.data[0]?.embedding;

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
    try {
        const queryResponse = await index.query({
            queryRequest: {
                vector: vector,
                // id: "vec1",
                topK: 3,
                includeValues: true,
                includeMetadata: true,
                namespace: process.env.PINECONE_NAME_SPACE
            }
        });

        queryResponse.matches.map((item) => {
            // console.log(`score ${item.score.toFixed(1)} => ${JSON.stringify(item.metadata)}\n\n`);
        })
        // console.log(`${queryResponse.matches.length} records found `);
        res.send(queryResponse.matches)
    } catch (error) {
        console.log(error)
    }

}

//delete Post
const deletePost = async (req, res) => {
    try {
        const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
        const deleteResponse = await index.delete1({
            ids: [req.params.id],
            namespace: process.env.PINECONE_NAME_SPACE
        })
        console.log('deleteResponse===>', deleteResponse);
        res.send({ message: 'story deleted successfully' })

    } catch (error) {
        console.log('error===>', error);
        res.status(500).send({ message: 'Failed to delete' })
    }
}


//edit post 
const editPost = async (req, res) => {

    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: `${req.body?.title} ${req.body?.description}`,
    });
    const vector = response?.data[0].embedding;

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);
    const upsertRequest = {
        vectors: [
            {
                id: req.params.id,
                values: vector,
                metadata: {
                    title: req.body?.title,
                    body: req.body?.description,
                }
            }
        ],
        namespace: process.env.PINECONE_NAME_SPACE,
    };
    try {
        const upsertResponse = await index.upsert({ upsertRequest });
        console.log("upsertResponse: ", upsertResponse);
        res.send({
            message: "story updated successfully"
        });
    } catch (e) {
        console.log("error: ", e)
        res.status(500).send({
            message: "failed to create story, please try later"
        });
    }

}

export { createPost, getAllPost, getSinglePost, deletePost, editPost }