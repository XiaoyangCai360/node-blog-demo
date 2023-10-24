const express = require('express');
const router = express.Router();

const Blog = require('../models/blogs');

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
})

router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        })
})

// handle POST request at '/blogs'
router.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
})

// handle GET request at '/blogs/:id'
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { title: 'Blog Details', blog: result})
        })
        .catch((err) => {
            console.log(err);
        })
})

// handle DELETE request at '/blogs/:id'
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
        .then((result) => {
            // for AJAX request, has to send JSON data to the client
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err);
        })
})

module.exports = router;