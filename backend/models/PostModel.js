import mongoose from 'mongoose';
//  faire le schema de la collection
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // type de l'objet id
        required: true,
        ref : 'User', // reférence à la collection User 
    },
    title: {
        type: String , // type de l'objet id
        required: true,
    },
    body : {
        type: String,
        required: true,
    },

}, {timestamps: true});
//  faire le model de la collection
const Post = mongoose.model('Post', postSchema);

export default Post;
