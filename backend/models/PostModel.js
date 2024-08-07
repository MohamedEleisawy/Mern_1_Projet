import mongoose from 'mongoose';
//  faire le schema de la collection
const postSchema = new mongoose.Schema({
    title: {
        type: String,
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
