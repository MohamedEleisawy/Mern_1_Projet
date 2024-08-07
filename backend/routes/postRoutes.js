import express from 'express';
import Post from '../models/PostModel.js';

const router = express.Router();

// router.get('/about', (req, res) => {
//     res.status(200).json({ message: 'Hello World' });
// });

// app.get('/', (req, res) => {
//   res.status(404).send('Hello World' );
// });

// app.post( '/', (req, res) => {
//     res.status(200).send('POST request');
// });

/* ################# Get All Posts #####################  */
router.get('/',async (req,res)=>{
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch(error){
        res.status(500).json({error: error.message});
    }
})


/* ################# Create New Post #####################  */

router.post('/', async (req, res) => {
    const { title, body } = req.body; // récupère les données du body
    
    if (!title || !body) {
        return res.status(400).json({ error: 'Tout les champs sont requis' });
    }
    try{
        const post = await Post.create({title , body}); // crée un nouveau post avec les données récupér
        res.status(200).json({success: " Post created successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { router as postRoutes };