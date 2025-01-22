import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = 3000;
const API_URL = "http://localhost:4000";
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the blog page
app.get("/blog", async (req, res) =>{
    try {
        const response = await axios.get(`${API_URL}/posts`);
        console.log(response);
        res.render("blog.ejs", {posts: response.data});
    } catch (error){
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// Route to render the about page
app.get("/about", (req, res) =>{
    try {
        res.render("about.ejs");
    } catch (error){
        res.status(404).json({ message: error.data });
    }
});

// Route to render the edit page
app.get("/post", (req, res) => {
  res.render("post.ejs", { heading: "Create a New Blog Post", submit: "Publish Post" });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    console.log(response.data);
    res.render("post.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});