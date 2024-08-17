// import  jwt
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

// req : représente la requête HTTP entrante.
// res : représente la réponse HTTP que le serveur enverra.
// next : est une fonction qui est appelée pour passer au middleware suivant.
const auth = async (req, res, next) => {
    //extrait le champ autorisation des en-têtes de la requête HTTP 
    const { authorization } = req.headers

    if (!authorization){
        return  res.status(401).json({error : "Authorization token not found"})
    }

    //grab the tocken 
    const token = authorization.split(" ")[1]

    try {
        // decode and extract the user id from token
        const {_id} = jwt.verify(token, process.env.SECRET)
        //save user in request
        req.user = await User.findById(_id).select("_id");
        next(); 
    }
    catch (error) {
        return res.status(401).json({ error : error.message })
    }
}
export default auth;