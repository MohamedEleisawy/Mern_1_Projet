// get all g
import mongoose from "mongoose";
import Post from "../models/PostModel.js";

/* ################# Get All Posts #####################  */
const getPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
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
  try {
    const post = await Post.create({ title, body }); // crée un nouveau post avec les données récupér
    res.status(200).json({ success: " Post created successfully" });
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
  try {
    await post.deleteOne(); // supprime le post
    res.status(200).json({ success: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ################# Update Post #####################  */
const updatePost = async (req, res) => {
  const { title, body } = req.body;

  // Vérification de la présence des données
  if (!title || !body) {
    return res.status(400).json({ message: "Tous les champs sont requis !" }); // Réponse avec un statut 400 et un message JSON
  }

  // Vérification de la validité de l'id
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "ID invalide" });
  }

  // Recherche du post par son id et mise à jour avec les nouvelles données
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true } // Option pour renvoyer le document mis à jour
    );

    if (!updatedPost) {
      return res.status(400).json({ message: "Post non trouvé" });
    }

    res.status(200).json({ message: "Post modifié", post: updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { getPost, addPost, deletPost, updatePost };
