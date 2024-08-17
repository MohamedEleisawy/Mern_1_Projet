import express from 'express';
import { getPost, addPost, getUserPost, deletPost, updatePost} from '../controllers/postController.js';
import auth from '../middleware/auth.js'; // importing auth middleware
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
router.post("/", auth, addPost); 
// get user posts
router.get("/user/", auth, getUserPost);

// delete post route
router.delete("/:id", auth, deletPost);
// update post route
router.put("/:id", auth, updatePost);

export { router as postRoutes };
