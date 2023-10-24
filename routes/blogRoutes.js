const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.blog_index);

// handle POST request at '/blogs'
router.post('/', blogController.blog_create_post);

// handle GET request at '/blogs/create'
router.get('/create', blogController.blog_create_get);

// handle GET request at '/blogs/:id'
router.get('/:id', blogController.blog_details);

// handle DELETE request at '/blogs/:id'
router.delete('/:id', blogController.blog_delete);

module.exports = router;