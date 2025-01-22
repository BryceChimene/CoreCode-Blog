import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})); // To parse form data

// 1: GET All posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// 2: GET a specific post by id
app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const foundPost = posts.find((post) => post.id === id);
    res.json(foundPost);
});

// 3: POST a new post
app.post('/posts', (req, res) => {
    const { title, author, content } = req.body;

    // Create a new post object
    const newPost = {
        id: posts.length + 1, // Unique identifier for the post
        date: new Date(),
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
    };

    // Add the post to the appropriate category
    posts.push(newPost);
    console.log(posts.slice(-1));

    res.json(newPost);
});

// 4: PATCH a post when you just want to update one parameter
app.patch('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const existingPost = posts.find((post) => post.id === id);
    const editedPost = {
        id: id,
        date: new Date(),
        title: req.body.title || existingPost.title,
        content: req.body.content || existingPost.content,
        author: req.body.author || existingPost.author,
    }

    const searchIndex = posts.findIndex((post) => post.id === id);
    posts[searchIndex] = editedPost;
    console.log(posts[searchIndex]);
    res.json(existingPost);
});

// 5: DELETE a specific post by providing the post id.
app.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = posts.findIndex((post) => post.id === id);

    if (searchIndex > -1){
        // Remove the post from array
        posts.splice(searchIndex, 1);
        res.sendStatus(200);
    } else{
        res
        .status(400)
        .json({error: `Post with id: ${id} not found.`});
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API listening on port ${port}.`);
});



// In-memory storage for posts
const posts = [
    {
        id: 1,
        title: "The rise of Technology",
        content: "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
        author: "Lily Dawson",
        date: "2023-08-01T10:00:00Z",
    },
    {
        id: 2,
        title: "Fitness for the Win",
        content: "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
        author: "Bryce Chimene",
        date: "2024-08-01T10:00:00Z",
    },
    {
        id: 3,
        title: "New Era for Fitness",
        content: "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
        author: "Bill Bob",
        date: "2024-10-01T10:00:00Z",
    }
]