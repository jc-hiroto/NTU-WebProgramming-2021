import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async(req, res) => {
    await Post.find({}).exec(function(err, posts){
        // sort by timestamp
        posts.sort((a, b) => {
            return moment(b.timestamp).diff(moment(a.timestamp))
        })
        if (err) {
            res.status(403).json({
                message: "error",
                data: null
            })
        } else {
            res.status(200).json({
                message: 'success',
                data: posts
            })
        }
    })
});

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async(req, res) => {
    const postId = req.query.pid;
    await Post.findOne({"postId": postId}).exec(function(err, post){
        if (err) {
            res.status(403).json({
                message: "error",
                post: null
            })
        } else {
            res.status(200).json({
                message: 'success',
                post: post
            })
        }
    });
});

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async(req, res) => {
    const post = new Post({
        postId: req.body.postId,
        title: req.body.title,
        content: req.body.content,
        timestamp: req.body.timestamp
    });
    await post.save((err, post) =>{
        if (err) {
            res.status(403).json({
                message: "error",
                data: null
            })
        } else {
            res.status(200).json({
                message: 'success',
                data: post
            })
        }
    });
});

// TODO 5-(1): create the 4th API (/api/post)
// delete one post by postId
router.delete('/post', async(req, res) => {
    const postId = req.query.pid;
    await Post.deleteOne({"postId": postId}).exec(function(err, post){
        if (err) {
            res.status(403).json({
                message: "error",
            })
        } else {
            res.status(200).json({
                message: 'success',
            })
        }
    });
});

export default router