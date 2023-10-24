const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs')

// express app
const app = express()

// connect to mongodb
const dbURI = 'mongodb+srv://nodeDemoUser:test1234@cluster0.xgwvvcr.mongodb.net/node-blogs-demo?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


// blog routes
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        })
})

// handle POST request at '/blogs'
app.post('/blogs', (req, res) => {
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
app.get('/blogs/:id', (req, res) => {
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
app.delete('/blogs/:id', (req, res) => {
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

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})