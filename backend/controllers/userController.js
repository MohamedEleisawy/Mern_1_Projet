import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config.js';

/* ################# Création du JWT token #####################  */
// Cette fonction, `createToken`, permet de créer un token JWT (JSON Web Token).
// Le token est signé avec un identifiant utilisateur (`id`) passé en paramètre et une clé secrète.
// La clé secrète est récupérée à partir de la variable d'environnement `SECRET`.
// Cette clé secrète doit être définie dans le fichier `.env` pour assurer la sécurité.
// Le token généré peut être utilisé pour authentifier l'utilisateur lors des requêtes ultérieures.

const createTocken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET , {expiresIn: "10d"})
}

/* ################# Enregistrement de l'utilisateur #####################  */
const registerUser = async (req, res) => {
  // Récupération des données depuis la requête
  const { email, password } = req.body;

  // Vérification que tous les champs sont remplis
  if (!email || !password) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  // Vérification si l'email existe déjà dans la base de données
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ error: "L'email existe déjà" });
  }

  // Hashage du mot de passe
  const salt = await bcrypt.genSalt(); // Génération d'un sel pour le hashage
  const hashed = await bcrypt.hash(password, salt); // Hashage du mot de passe avec le sel

  try {
    // Création de l'utilisateur dans la base de données avec l'email et le mot de passe hashé
    const user = await User.create({ email, password: hashed });

    const token = createTocken(user._id)

    // Réponse avec succès contenant l'email
    res.status(200).json({ email , token });
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la création de l'utilisateur
    res.status(500).json({ error: error.message });
  }
};

/* ################# Connexion de l'utilisateur #####################  */

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Vérification que tous les champs sont remplis
  if (!email || !password) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  // Vérification si l'email existe dans la base de données
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Email incorrect" });
  }

  // Vérification du mot de passe en comparant le mot de passe fourni avec le mot de passe stocké dans la base de données
  const match = await bcrypt.compare(password, user.password);
  // vérification pour voir si les mots de passe correspondent et de renvoyer une réponse en fonction du résultat.
  if(!match){
    return res.status(400).json({ error: "password incorect" })
  }
  
  try{
    const token = createTocken(user._id)
    res.status(200).json({ email, token });
  }
  catch(error) {
    res.status(500).json({error: error.message})
  }
};



export { registerUser, loginUser };
