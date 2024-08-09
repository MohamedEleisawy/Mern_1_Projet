import express from 'express';
import { getPost, addPost, deletPost, updatePost} from '../controllers/postController.js';
const router = express.Router();


// import { get } from 'mongoose';
// router.get('/about', (req, res) => {
//     res.status(200).json({ message: 'Hello World' });
// });

// app.get('/', (req, res) => {
//   res.status(404).send('Hello World' );
// });

// app.post( '/', (req, res) => {
//     res.status(200).send('POST request');
// });

// get all posts
router.get("/", getPost); 
// add new post
router.post("/", addPost);
// delete post route
router.delete("/:id", deletPost);
// update post route
router.put("/:id", updatePost);

export { router as postRoutes };