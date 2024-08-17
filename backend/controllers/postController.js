// get all g
import mongoose from "mongoose";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

/* ################# Get All Posts #####################  */
const getPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* ################# Get All Posts #####################  */
const getUserPost = async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    const userPosts = await Post.find({ user: user._id });
    res.status(200).json({ userPosts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/* ################# Create New Post #####################  */
const addPost = async (req, res) => {
  const { title, body } = req.body; // récupère les données du body

  if (!title || !body) {
    return res.status(400).json({ error: "Tout les champs sont requis" });
  }
const user = await User.findById(req.user._id);

  try {
    const post = await Post.create({ user: user._id, title, body }); // crée un nouveau post avec les données récupér
    res.status(200).json({ success: " Post created successfully", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ################# Delete Post #####################  */
const deletPost = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    // vérifie si l'id est valide
    return res.status(400).json({ error: "Invalid Post ID" });
  }
  // si l'id est valide
  const post = await Post.findById(req.params.id); // trouve le post avec l'id
  if (!post) {
    return res.status(400).json({ error: " Post not found " });
  }
  const user = await User.findById(req.user._id);
  if (!post.user.equals(user._id)) {
    return res.status(400).json({ error: "You can't delete your own post" });
  }
  try {
    await post.deleteOne(); // supprime le post
    res.status(200).json({ success: "Post deleted successfully" , post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ################# Update Post #####################  */
const updatePost = async (req, res) => {
  const { title, body } = req.body;

  // Vérification de la présence des données
  if (!title || !body) {
    return res.status(400).json({ message: "Tous les champs sont requis !" });
  }

  // Vérification de la validité de l'id
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "ID invalide" });
  }

  try {
    const user = await User.findById(req.user._id); // Trouve l'utilisateur connecté

    const post = await Post.findById(req.params.id); // Recherche le post à mettre à jour
    if (!post) {
      return res.status(400).json({ message: "Post non trouvé" });
    }

    // Vérifie si l'utilisateur actuel est bien le propriétaire du post
    if (!post.user.equals(user._id)) {
      return res.status(400).json({ error: "Vous ne pouvez pas mettre à jour ce post" });
    }

    // Mise à jour du post
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true } // Option pour renvoyer le document mis à jour
    );

    res.status(200).json({ message: "Post modifié", post: updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getPost, addPost, getUserPost, deletPost, updatePost };
