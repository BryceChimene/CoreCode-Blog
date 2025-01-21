import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // To parse form data

// In-memory storage for posts
let fitnessPosts = [];
let techPosts = [];

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    // Combine fitnessPosts and techPosts into a single array
    const posts = [...fitnessPosts, ...techPosts];

    // Sort posts by most recent (assuming `id` represents a timestamp)
    posts.sort((a, b) => b.id - a.id);

    // Pass the sorted posts to the homepage
    res.render('index.ejs', { posts });
});

app.get('/fitness', (req, res) => {
    res.render('fitness.ejs', { fitnessPosts });
});

app.get('/tech', (req, res) => {    
    res.render('tech.ejs', { techPosts });
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.get('/new-post', (req, res) => {
    res.render('new-post.ejs');
});

// Route to handle form submission
app.post('/new-post', (req, res) => {
    const { title, category, content } = req.body;

    // Create a new post object
    const newPost = {
        id: Date.now(), // Unique identifier for the post
        title,
        snippet: content.substring(0, 100) + '...', // Snippet of the content
        content,
    };

    // Add the post to the appropriate category
    if (category === 'Fitness') {
        fitnessPosts.push(newPost);
    } else if (category === 'Tech') {
        techPosts.push(newPost);
    }

    // Redirect to the relevant category page
    if (category === 'Fitness') {
        res.redirect('/fitness');
    } else {
        res.redirect('/tech');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
