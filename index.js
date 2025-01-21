import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})); // To parse form data
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {

    // Sort posts by most recent (assuming `id` represents a timestamp)
    posts.sort((a, b) => b.id - a.id);

    // Pass the sorted posts to the homepage
    res.render('index.ejs', { posts });
});

app.get('/blog', (req, res) => {
    res.render('blog.ejs', { posts });
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.get('/new-post', (req, res) => {
    res.render('new-post.ejs');
});

// Route to handle form submission
app.post('/new-post', (req, res) => {
    const { title, author, content } = req.body;

    // Create a new post object
    const newPost = {
        id: posts.length + 1, // Unique identifier for the post
        date: new Date(),
        author,
        title,
        content,
    };

    // Add the post to the appropriate category
    posts.push(newPost);


    // Redirect to the relevant category page
    res.redirect('/blog');
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
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