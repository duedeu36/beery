const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Profile model (needed for deleting post)
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Test post route
// @access  Public
router.get('/test', (req, res) => res.json({
   msg: 'Posts works'
}));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
   Post.find()
      .sort({
         date: -1
      })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({
         noPostsFound: 'No posts found'
      }));
})

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', (req, res) => {
   Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err => res.status(404).json({
         noPostFound: 'No post found'
      }));
})

// @route   GET api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {
   session: false
}), (req, res) => {
   const {
      errors,
      isValid
   } = validatePostInput(req.body);

   // Check Validaiton
   if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
   }
   const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
   });

   newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {
   session: false
}), (req, res) => {
   // Makes sure the User whos deleting this is the owner of the post
   Profile.findOne({
         user: req.user.id
      })
      .then(profile => {
         Post.findById(req.params.id)
            .then(post => {
               // Check for post owner
               if (post.user.toString() !== req.user.id) {
                  return res.status(401).json({
                     notAuthorized: 'User not authorized'
                  });
               }
               // Delete
               post.remove().then(() => res.json({
                  success: true
               }));
            })
            .catch(err => res.status(404).json({
               postNotFound: 'No post found'
            }));
      })
});

// @route   POST api/posts/like/:id
// @desc    Post a like
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {
   session: false
}), (req, res) => {
   // Makes sure the User whos deleting this is the owner of the post
   Profile.findOne({
         user: req.user.id
      })
      .then(profile => {
         Post.findById(req.params.id)
            .then(post => {
               if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                  return res.status(400).json({ alreadyLiked: 'User already liked this post'});
               }
               // Add user ID to likes array
               post.likes.unshift({user: req.user.id});

               post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({
               postNotFound: 'No post found'
            }));
      })
});

// @route   DELETE api/posts/unlike/:id
// @desc    Remove a like / unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {
   session: false
}), (req, res) => {
   // Makes sure the User whos deleting this is the owner of the post
   Profile.findOne({
         user: req.user.id
      })
      .then(profile => {
         Post.findById(req.params.id)
            .then(post => {
               if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                  return res.status(400).json({ notLiked: 'You have not liked yet this post'});
               }
               // Get remove index (give the index we want to remove)
               const removeIndex = post.likes.map(item => item.user.toString())
               .indexOf(req.user.id);

               // Splice out of array
               post.likes.splice(removeIndex, 1);

               // Save
               post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({
               postNotFound: 'No post found'
            }));
      })
});

module.exports = router;